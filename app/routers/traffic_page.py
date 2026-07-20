from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/traffic-lights", response_class=HTMLResponse)
def traffic_page(request: Request):

    return templates.TemplateResponse(
        "traffic.html",
        {
            "request": request
        }
    )