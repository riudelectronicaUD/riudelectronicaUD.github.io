fetch('data.json')
    .then(res => res.json())
    .then(data => {

        /* =========================
           📊 PROMEDIOS (ACORDEÓN)
        ==========================*/
        const estudiantes = data.estudiantes;

        // Agrupar por semestre
        const porSemestre = {};
        estudiantes.forEach(e => {
            if (!porSemestre[e.semestre]) {
                porSemestre[e.semestre] = [];
            }
            porSemestre[e.semestre].push(e);
        });

        // Bloques de periodos
        const bloques = {
            bloque1: ["20201", "20202", "20211"],
            bloque2: ["20212", "20221", "20222"],
            bloque3: ["20231", "20232", "20241"],
            bloque4: ["20242", "20251", "20252"]
        };

        // Renderizar promedios
        Object.keys(bloques).forEach(bloqueId => {

            const container = document.getElementById(bloqueId);

            if (!container) return;

            bloques[bloqueId].forEach(semestre => {

                const col = document.createElement("div");
                col.classList.add("col");

                col.innerHTML = `
                <div class="col-header">
                    <span>${formatearSemestre(semestre)}</span>
                </div>

                <div class="tabla">
                    ${renderTablaPromedios(porSemestre[semestre] || [])}
                </div>
            `;

                container.appendChild(col);
            });
        });

        /* =========================
           🏅 MATRÍCULAS DE HONOR (TABLA)
        ==========================*/
        const tabla = document.getElementById("tabla-matriculas");

        if (tabla) {
            data.matriculas.forEach(est => {
                tabla.innerHTML += `
                <tr>
                    <td><span class="check"></span></td>
                    <td>${est.nombre}</td>
                    <td>${est.codigo}</td>
                    <td>${est.semestre}</td>
                </tr>
            `;
            });
        }

    });

/* =========================
   🧩 FUNCIONES
=========================*/

// Tabla de promedios
function renderTablaPromedios(lista) {
    return `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cód.</th>
                </tr>
            </thead>
            <tbody>
                ${lista.map(e => `
                    <tr>
                        <td>${e.nombre}</td>
                        <td>${e.codigo}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

// Formatear semestre (20231 → 2023-1)
function formatearSemestre(s) {
    return s.slice(0, 4) + "-" + s.slice(4);
}

/* =========================
   🔽 ACCORDION (SOLO PROMEDIOS)
=========================*/
document.querySelectorAll(".accordion").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");

        const panel = btn.nextElementSibling;

        panel.style.display =
            panel.style.display === "block" ? "none" : "block";
    });
});

const firstAccordion = document.querySelector(".accordion");
if (firstAccordion) {
    firstAccordion.classList.add("active");
    const firstPanel = firstAccordion.nextElementSibling;
    if (firstPanel) {
        firstPanel.style.display = "block";
    }
}