from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")

router = APIRouter(tags=["Railway Page"])


@router.get("/railway", response_class=HTMLResponse)
def railway_page(request: Request):

    return templates.TemplateResponse(
        "railway.html",
        {
            "request": request,
            "title": "Железная дорога"
        }
    )