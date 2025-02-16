from typing import Union, List, Dict, Any
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from networking import MentorFinder
from competitor import CompetitorAnalysis
from dotenv import load_dotenv
import os

app = FastAPI()

# Load environment variables
load_dotenv()

# Get API keys from environment
serpapi_key = os.getenv("SERPAPI_API_KEY")
gemini_key = os.getenv("GEMINI_API_KEY")

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/findMentors")
async def find_mentors(
    business_idea: str = Query(..., description="The business idea to find mentors for"),
    location: str = Query(None, description="Preferred location for mentors")
) -> List[Dict[str, Any]]:
    finder = MentorFinder()
    mentors = await finder.find_potential_mentors(field=business_idea, location=location, min_experience=1)
    return mentors

@app.get("/findCompetitors")
async def find_competitors(
    business_idea: str = Query(..., description="The business idea to find competitors for")
) -> Dict[str, Any]:
    if not serpapi_key or not gemini_key:
        return {"error": "API keys are not set. Please set the SERPAPI_API_KEY and GEMINI_API_KEY environment variables."}

    analyzer = CompetitorAnalysis(serpapi_key, gemini_key)

    # Search for competitors
    competitors = analyzer.search_competitors(business_idea)
    competitors_data = []
    for competitor in competitors:
        data = analyzer.analyze_competitor(competitor)
        competitors_data.append(data)

    # Analyze feasibility using Gemini
    feasibility_report = analyzer.analyze_feasibility(business_idea, competitors_data)

    return {
        "competitors": competitors_data,
        "feasibility_report": feasibility_report
    }