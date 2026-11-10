
/* =========================
   📊 LECTURA DEL EXCEL (PROMEDIOS + MATRÍCULAS DE HONOR)
=========================*/

fetch('Mejores estudiantes.xlsx')
    .then(res => res.arrayBuffer())
    .then(buffer => {

        const workbook = XLSX.read(buffer, { type: 'array' });
        const porSemestre = {};

        let listaMatriculas = [];
        let listaMatriculas2 = [];

        console.log("Pestañas encontradas en el Excel:", workbook.SheetNames);

        // Recorrer todas las pestañas del Excel
        workbook.SheetNames.forEach(sheetName => {

            const worksheet = workbook.Sheets[sheetName];
            const filas = XLSX.utils.sheet_to_json(worksheet);
            const nombreHoja = sheetName.trim().toLowerCase();

            /* =========================
               CASO A: PRIMERA PESTAÑA DE MATRÍCULAS
            =========================*/

            if (nombreHoja === "matriculas de honor 2025-3") {

                listaMatriculas = filas.map(row => ({
                    nombre: row["Periodo de ingreso"] ? String(row["Periodo de ingreso"]).trim() : "",
                    codigo: row["Codigo"] ? String(row["Codigo"]).trim() : "",
                    periodo: row["Nombre"] ? String(row["Nombre"]).trim() : ""
                }));

                return;
            }

            /* =========================
               CASO B: SEGUNDA PESTAÑA DE MATRÍCULAS
            =========================*/

            if (nombreHoja === "matriculas de honor 2026-1") {

                console.log("HOJA 2 ENCONTRADA");
                console.log("Encabezados:", Object.keys(filas[0] || {}));
                console.log("Registros encontrados:", filas);

                listaMatriculas2 = filas.map(row => ({
                    nombre: row["Periodo de ingreso"] ? String(row["Periodo de ingreso"]).trim() : "",
                    codigo: row["Codigo"] ? String(row["Codigo"]).trim() : "",
                    periodo: row["Nombre"] ? String(row["Nombre"]).trim() : ""
                }));

                console.log("Datos preparados para la segunda tabla:", listaMatriculas2);

                return;
            }

            /* =========================
               CASO C: PESTAÑAS DE SEMESTRES (TOP 10)
            =========================*/

            const activos = filas.filter(row => {
                const estado = row["ESTADO"]
                    ? String(row["ESTADO"]).trim().toUpperCase()
                    : "";

                return estado === "ACTIVO";
            });

            activos.sort((a, b) => {
                const promA = parseFloat(a["PROMEDIO"]) || 0;
                const promB = parseFloat(b["PROMEDIO"]) || 0;

                return promB - promA;
            });

            const top10 = activos.slice(0, 10);

            porSemestre[sheetName.trim()] = top10.map(row => ({
                codigo: row["COD. ESTUDIANTE"] ? String(row["COD. ESTUDIANTE"]) : "",
                nombre: row["NOMBRE"] ? String(row["NOMBRE"]) : ""
            }));

        });


        /* =========================
           📊 RENDERIZAR PROMEDIOS
        =========================*/

        const bloques = {
            bloque4: ["2025-1", "2025-3", "2026-1"]
        };

        Object.keys(bloques).forEach(bloqueId => {

            const container = document.getElementById(bloqueId);
            if (!container) return;

            container.innerHTML = "";

            bloques[bloqueId].forEach(semestre => {

                const col = document.createElement("div");
                col.classList.add("col");

                col.innerHTML = `
                    <div class="col-header">
                        <span>${semestre}</span>
                    </div>

                    <div class="tabla">
                        ${renderTablaPromedios(porSemestre[semestre] || [])}
                    </div>
                `;

                container.appendChild(col);

            });

        });


        /* =========================
           🏅 FUNCIÓN PARA RENDERIZAR MATRÍCULAS
        =========================*/

        function renderMatriculas(lista, idTabla) {

            const tabla = document.getElementById(idTabla);

            if (!tabla) return;

            tabla.innerHTML = "";

            lista.forEach(est => {

                let semFormateado = est.periodo;

                if (semFormateado.length === 5 && !semFormateado.includes("-")) {
                    semFormateado = semFormateado.slice(0, 4) + "-" + semFormateado.slice(4);
                }

                tabla.innerHTML += `
                    <tr>
                        <td><span class="check"></span></td>
                        <td>${est.nombre}</td>
                        <td>${est.codigo}</td>
                        <td>${semFormateado}</td>
                    </tr>
                `;

            });

        }

        // Primera tabla
        renderMatriculas(listaMatriculas, "tabla-matriculas");

        // Segunda tabla
        renderMatriculas(listaMatriculas2, "tabla-matriculas-anteriores");

    })
    .catch(error => console.error("Error al cargar o leer el archivo Excel:", error));


/* =========================
   🧩 FUNCIONES AUXILIARES
=========================*/

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


/* =========================
   🔽 ACCORDION
=========================*/

document.querySelectorAll(".accordion").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.classList.toggle("active");

        const panel = btn.nextElementSibling;

        panel.style.display =
            panel.style.display === "block" ? "none" : "block";

    });

});
