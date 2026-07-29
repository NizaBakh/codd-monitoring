from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/telekomsoft", response_class=HTMLResponse)
async def telekomsoft_page(request: Request):

    return templates.TemplateResponse(

        "telekomsoft.html",

        {

            "request": request,

            "page": "telekomsoft"

        }

    )