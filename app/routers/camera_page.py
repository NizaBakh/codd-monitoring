from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/cameras", response_class=HTMLResponse)
async def cameras_page(request: Request):

    return templates.TemplateResponse(

        "cameras.html",

        {

            "request": request,

            "page": "cameras"

        }

    )