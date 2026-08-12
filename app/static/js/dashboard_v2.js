document.addEventListener("DOMContentLoaded", async () => {

    await loadDashboardDistricts();

});

async function loadDashboardDistricts() {

    const response = await fetch("/api/districts/");

    const districts = await response.json();

    const container = document.getElementById("districtCards");

    container.innerHTML = "";

    districts.forEach(d => {

        container.innerHTML += `

        <div class="district-card">

            <h3>${d.name_ru}</h3>

            <div class="stats">

                <div>🚦 Светофоры: <b>0</b></div>

                <div>🚌 Остановки: <b>0</b></div>

                <div>🛣 Дороги: <b>0</b></div>

                <div>🚇 Метро: <b>0</b></div>

                <div>📷 Камеры: <b>0</b></div>


            </div>

        </div>

        `;

    });

}