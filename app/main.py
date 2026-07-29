from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.core.database import Base
from app.core.database import engine

# ==========================
# MODELS
# ==========================

import app.models.traffic_light
import app.models.bus_stop
import app.models.intersection
import app.models.road
import app.models.incident
import app.models.pedestrian_crossing
import app.models.district
import app.models.metro_station
import app.models.metro_line
import app.models.bridge_tunnel
import app.models.bicycle_lane
import app.models.parking
import app.models.camera
import app.models.telekomsoft

Base.metadata.create_all(bind=engine)
from sqlalchemy.orm import Session

from app.models.bridge_tunnel import BridgeTunnel
from app.models.bicycle_lane import BicycleLane
from app.models.parking import Parking

import subprocess
import sys

db = Session(bind=engine)

if db.query(BridgeTunnel).count() == 0:
    subprocess.run([sys.executable, "-m", "app.scripts.import_bridge_tunnels"])

if db.query(BicycleLane).count() == 0:
    subprocess.run([sys.executable, "-m", "app.scripts.import_bicycle_lanes"])

if db.query(Parking).count() == 0:
    subprocess.run([sys.executable, "-m", "app.scripts.import_parkings"])
from app.models.camera import Camera

if db.query(Camera).count() == 0:
    subprocess.run([sys.executable, "-m", "app.scripts.import_cameras"])

db.close()

# ==========================
# API ROUTERS
# ==========================

from app.routers.dashboard import router as dashboard_router

from app.routers.traffic_light import router as traffic_router
from app.routers.bus_stop import router as bus_stop_router
from app.routers.road import router as road_router
from app.routers.intersection import router as intersection_router
from app.routers.pedestrian_crossing import router as pedestrian_router
from app.routers.district import router as district_router
from app.routers.metro import router as metro_router
from app.routers.bridge_tunnel import router as bridge_tunnel_router
from app.routers.bicycle_lane import router as bicycle_lane_router
from app.routers.parking import router as parking_router
from app.routers.weather import router as weather_router
from app.routers.camera import router as camera_router
from app.routers.telekomsoft import router as telekomsoft_router
# ==========================
# PAGE ROUTERS
# ==========================

from app.routers.traffic_page import router as traffic_page_router
from app.routers.bus_stop_page import router as bus_stop_page_router
from app.routers.road_page import router as road_page_router
from app.routers.intersections_page import router as intersections_page_router
from app.routers import pedestrian_page
from app.routers.metro_page import router as metro_page_router
from app.routers.bridge_tunnel_page import router as bridge_tunnel_page_router
from app.routers.bicycle_lane_page import router as bicycle_lane_page_router
from app.routers.parking_page import router as parking_page_router
from app.routers.camera_page import router as camera_page_router
from app.routers.telekomsoft_page import router as telekomsoft_page_router

# ==========================
# FASTAPI
# ==========================

app = FastAPI(

    title="CODD Monitoring System",

    version="1.0"

)

# ==========================
# STATIC
# ==========================

app.mount(

    "/static",

    StaticFiles(directory="app/static"),

    name="static"

)

# ==========================
# API
# ==========================

app.include_router(dashboard_router)

app.include_router(traffic_router)
app.include_router(bus_stop_router)
app.include_router(road_router)
app.include_router(intersection_router)
app.include_router(pedestrian_router)
app.include_router(district_router)
app.include_router(metro_router)
app.include_router(bridge_tunnel_router)      # <-- API
app.include_router(bicycle_lane_router)
app.include_router(parking_router)
app.include_router(weather_router)
app.include_router(camera_router)
app.include_router(telekomsoft_router)
# ==========================
# PAGES
# ==========================

app.include_router(traffic_page_router)
app.include_router(bus_stop_page_router)
app.include_router(road_page_router)
app.include_router(intersections_page_router)
app.include_router(pedestrian_page.router)
app.include_router(metro_page_router)
app.include_router(bridge_tunnel_page_router) # <-- HTML страница
app.include_router(bicycle_lane_page_router)
app.include_router(parking_page_router)
app.include_router(camera_page_router)
app.include_router(telekomsoft_page_router)