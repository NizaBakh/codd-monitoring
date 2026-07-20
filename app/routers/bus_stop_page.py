from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/bus-stops", response_class=HTMLResponse)
def bus_stop_page(request: Request):

    return templates.TemplateResponse(
        "bus_stops.html",
        {
            "request": request
        }
    )