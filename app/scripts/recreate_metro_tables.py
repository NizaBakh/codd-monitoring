from app.core.database import engine
from app.models.metro_station import MetroStation
from app.models.metro_line import MetroLine

print("Удаляем таблицы...")

MetroStation.__table__.drop(engine, checkfirst=True)
MetroLine.__table__.drop(engine, checkfirst=True)

print("Создаем заново...")

MetroStation.__table__.create(engine)
MetroLine.__table__.create(engine)

print("Готово.")