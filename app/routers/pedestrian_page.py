from fastapi import APIRouter
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(tags=["Pedestrian Crossings Page"])

templates = Jinja2Templates(directory="app/templates")


@router.get(
    "/pedestrian-crossings",
    response_class=HTMLResponse
)
async def pedestrian_crossings_page(request: Request):

    return templates.TemplateResponse(

        "pedestrian.html",

        {
            "request": request
        }

    )