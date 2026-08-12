from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")

router = APIRouter(tags=["Bus Routes Page"])


@router.get("/bus-routes", response_class=HTMLResponse)
def bus_routes_page(request: Request):
    return templates.TemplateResponse(
        "bus_routes.html",
        {
            "request": request,
            "title": "Автобусные маршруты"
        }
    )