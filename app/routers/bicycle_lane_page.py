from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/bicycle-lanes", response_class=HTMLResponse)
async def bicycle_page(request: Request):

    return templates.TemplateResponse(
        "bicycle_lanes.html",
        {
            "request": request
        }
    )