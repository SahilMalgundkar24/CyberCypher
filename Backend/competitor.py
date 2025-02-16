import requests
from bs4 import BeautifulSoup
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from transformers import pipeline
from serpapi import GoogleSearch
import os
from dotenv import load_dotenv
import google.generativeai as genai
import logging
from typing import List, Dict, Any
# Download necessary NLTK data
nltk.download("vader_lexicon")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CompetitorAnalysis:
    def __init__(self, serpapi_key: str, gemini_key: str):
        """
        Initialize the CompetitorAnalysis class with API keys and models.
        """
        self.serpapi_key = serpapi_key
        self.gemini_key = gemini_key
        self.sia = SentimentIntensityAnalyzer()
        self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

        # Configure Gemini
        genai.configure(api_key=self.gemini_key)
        self.gemini_model = genai.GenerativeModel("gemini-pro")

    def search_competitors(self, query: str, num_results: int = 5) -> List[str]:
        """
        Search for competitors using SerpAPI with a more specific query.
        """
        try:
            # Create a focused search query
            search_query = f"{query} app competitors OR alternatives OR similar apps"

            params = {
                "engine": "google",
                "q": search_query,
                "api_key": self.serpapi_key,
                "num": num_results,
            }
            search = GoogleSearch(params)
            results = search.get_dict()

            # Filter out irrelevant results (e.g., articles, guides)
            competitors = []
            for result in results.get("organic_results", []):
                title = result.get("title", "").lower()
                snippet = result.get("snippet", "").lower()
                # Skip results that are not likely to be competitors
                if any(
                    x in title or x in snippet
                    for x in ["how to", "guide", "tutorial", "list of", "article"]
                ):
                    continue
                competitors.append(result["title"])

            return competitors[:num_results]

        except Exception as e:
            logger.error(f"Error searching for competitors: {str(e)}")
            return []

    def scrape_website(self, url: str) -> str:
        """
        Scrape the content of a website.
        """
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            response = requests.get(url, headers=headers, timeout=10)
            soup = BeautifulSoup(response.content, "html.parser")

            # Remove scripts and styles
            for script in soup(["script", "style"]):
                script.decompose()

            # Extract visible text
            website_content = " ".join(soup.stripped_strings)
            return website_content[:5000]  # Limit content length

        except Exception as e:
            logger.error(f"Error scraping website {url}: {str(e)}")
            return ""

    def analyze_sentiment(self, text: str) -> Dict[str, float]:
        """
        Analyze the sentiment of the given text.
        """
        return self.sia.polarity_scores(text)

    def summarize_text(self, text: str, max_length: int = 150) -> str:
        """
        Summarize the given text using the BART model.
        """
        try:
            return self.summarizer(
                text, max_length=max_length, min_length=50, do_sample=False
            )[0]["summary_text"]
        except Exception as e:
            logger.error(f"Error summarizing text: {str(e)}")
            return text[:max_length] + "..."

    def analyze_competitor(self, competitor_name: str) -> Dict[str, Any]:
        """
        Analyze a competitor by scraping their website and performing sentiment analysis.
        """
        try:
            # Search for the competitor's website
            params = {
                "engine": "google",
                "q": f"{competitor_name} app official website",
                "api_key": self.serpapi_key,
                "num": 1,
            }
            search = GoogleSearch(params)
            results = search.get_dict()

            # Get the website URL from the first organic result
            organic_results = results.get("organic_results", [])
            if not organic_results:
                return {
                    "name": competitor_name,
                    "sentiment": {"neg": 0, "neu": 1, "pos": 0, "compound": 0},
                    "summary": "No website found",
                }

            website_url = organic_results[0].get("link")

            # Scrape and analyze the website content
            website_content = self.scrape_website(website_url)
            sentiment = self.analyze_sentiment(website_content)
            summary = self.summarize_text(website_content)

            return {
                "name": competitor_name,
                "website": website_url,
                "sentiment": sentiment,
                "summary": summary,
            }

        except Exception as e:
            logger.error(f"Error analyzing competitor {competitor_name}: {str(e)}")
            return {
                "name": competitor_name,
                "sentiment": {"neg": 0, "neu": 1, "pos": 0, "compound": 0},
                "summary": f"Error analyzing competitor: {str(e)}",
            }

    def suggest_differentiation(self, competitors_data: List[Dict[str, Any]]) -> str:
        """
        Generate suggestions for differentiating the app idea based on competitor analysis.
        """
        positive_aspects = []
        negative_aspects = []

        for competitor in competitors_data:
            if competitor["sentiment"]["compound"] > 0.2:
                positive_aspects.append(
                    f"{competitor['name']} is viewed positively for: {competitor['summary']}"
                )
            elif competitor["sentiment"]["compound"] < -0.2:
                negative_aspects.append(
                    f"{competitor['name']} has negative aspects: {competitor['summary']}"
                )

        suggestion = (
            f"Consider addressing these pain points: {', '.join(negative_aspects)}. "
        )
        suggestion += (
            f"While also improving upon the positives: {', '.join(positive_aspects)}."
        )

        return suggestion

    def analyze_feasibility(self, app_idea: str, competitors_data: List[Dict[str, Any]]) -> str:
        """
        Analyze the feasibility of the app idea using Gemini.
        """
        try:
            # Prepare the input for Gemini
            competitor_summaries = "\n".join(
                [f"{comp['name']}: {comp['summary']}" for comp in competitors_data]
            )
            prompt = f"""
            Analyze the feasibility of the following app idea:
            App Idea: {app_idea}

            Competitor Analysis:
            {competitor_summaries}

            Provide a detailed feasibility report covering:
            1. Market demand
            2. Competition level
            3. Potential challenges
            4. Opportunities for differentiation
            5. Recommendations for success
            """

            # Generate the feasibility report using Gemini
            response = self.gemini_model.generate_content(prompt)
            return response.text

        except Exception as e:
            logger.error(f"Error analyzing feasibility with Gemini: {str(e)}")
            return "Unable to generate feasibility report."
