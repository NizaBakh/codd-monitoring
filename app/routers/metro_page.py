from fastapi import APIRouter
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


router = APIRouter()

templates = Jinja2Templates(
    directory="app/templates"
)


@router.get(
    "/metro",
    response_class=HTMLResponse
)
def metro_page(request: Request):

    return templates.TemplateResponse(

        "metro.html",

        {

            "request": request

        }

    )