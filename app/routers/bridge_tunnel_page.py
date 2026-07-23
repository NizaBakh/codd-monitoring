from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")


@router.get("/bridge-tunnels", response_class=HTMLResponse)

async def bridge_tunnels_page(request: Request):

    return templates.TemplateResponse(

        "bridge_tunnels.html",

        {

            "request": request

        }

    )