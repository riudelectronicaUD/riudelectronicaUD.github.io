const franjas = [
  '8:30 a. m. - 9:10 a. m.',
  '9:10 a. m. - 9:50 a. m.',
  '9:50 a. m. - 10:30 a. m.',
  '10:30 a. m. - 11:10 a. m.',
  '11:10 a. m. - 11:50 a. m.',
  '11:50 a. m. - 12:30 p. m.',
  '12:30 p. m. - 1:10 p. m.',
  '1:10 p. m. - 1:50 p. m.',
  '1:50 p. m. - 2:30 p. m.',
  '2:30 p. m. - 3:10 p. m.',
  '3:10 p. m. - 3:50 p. m.',
  '3:50 p. m. - 4:30 p. m.',
  '4:30 p. m. - 5:10 p. m.'
];


// ======================================================
// PEGA AQUÍ TU URL REAL DE APPS SCRIPT
// ======================================================

const API_URL =
  'PEGA_AQUI_TU_URL_QUE_TERMINA_EN_EXEC';


const franjaSelect =
  document.getElementById('franja');

const registroForm =
  document.getElementById('registro-form');


// ======================================================
// CARGAR DISPONIBILIDAD DE LAS FRANJAS
// ======================================================

async function cargarFranjas() {

  // Mientras consulta Google Sheets
  franjaSelect.innerHTML = `
    <option value="" disabled selected>
      Cargando franjas...
    </option>
  `;

  franjaSelect.disabled = true;


  try {

    const response =
      await fetch(API_URL);


    const resultado =
      await response.json();


    if (
      !resultado.ok ||
      !resultado.disponibilidad
    ) {

      throw new Error(
        'No se pudo obtener la disponibilidad.'
      );

    }


    // Limpiar select
    franjaSelect.innerHTML = `
      <option value="" disabled selected>
        Selecciona una franja
      </option>
    `;


    // Crear todas las opciones
    resultado.disponibilidad.forEach(item => {

      const option =
        document.createElement('option');


      option.value =
        item.franja;


      // =========================================
      // SI YA NO HAY CUPOS
      // =========================================

      if (item.cuposRestantes <= 0) {

        option.disabled = true;

        option.textContent =
          item.franja + ' — AGOTADA';

      } else {

        option.textContent =
          item.franja +
          ' — ' +
          item.cuposRestantes +
          ' cupos disponibles';

      }


      franjaSelect.appendChild(option);

    });


    franjaSelect.disabled = false;


  } catch (error) {

    console.error(
      'Error cargando franjas:',
      error
    );


    franjaSelect.innerHTML = `
      <option value="" disabled selected>
        No fue posible cargar las franjas
      </option>
    `;

  }

}


// ======================================================
// CARGAR FRANJAS AL ABRIR LA PÁGINA
// ======================================================

cargarFranjas();


// ======================================================
// ENVIAR FORMULARIO
// ======================================================

registroForm.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();


    const tipoDocumento =
      document
        .getElementById('tipoDocumento')
        .value;


    const documento =
      document
        .getElementById('documento')
        .value
        .trim();


    const codigo =
      document
        .getElementById('codigo')
        .value
        .trim();


    const nombre =
      document
        .getElementById('nombre')
        .value
        .trim();


    const email =
      document
        .getElementById('email')
        .value
        .trim()
        .toLowerCase();


    const franja =
      franjaSelect.value;


    // ==================================================
    // VALIDAR DOCUMENTO
    // ==================================================

    if (!/^[0-9]+$/.test(documento)) {

      alert(
        'El número de documento debe contener únicamente números.'
      );

      return;

    }


    // ==================================================
    // VALIDAR CÓDIGO
    // ==================================================

    if (!/^[0-9]+$/.test(codigo)) {

      alert(
        'El código estudiantil debe contener únicamente números.'
      );

      return;

    }


    // ==================================================
    // VALIDAR CORREO
    // ==================================================

    if (
      !email.endsWith(
        '@udistrital.edu.co'
      )
    ) {

      alert(
        'Debes utilizar un correo institucional @udistrital.edu.co'
      );

      return;

    }


    // ==================================================
    // VALIDAR FRANJA
    // ==================================================

    if (!franja) {

      alert(
        'Debes seleccionar una franja horaria disponible.'
      );

      return;

    }


    const boton =
      registroForm.querySelector(
        'button[type="submit"]'
      );


    boton.disabled = true;

    boton.textContent =
      'Registrando...';


    const datos = {

      tipoDocumento:
        tipoDocumento,

      documento:
        documento,

      codigo:
        codigo,

      nombre:
        nombre,

      email:
        email,

      franja:
        franja

    };


    try {

      const response =
        await fetch(
          API_URL,
          {

            method: 'POST',

            headers: {

              'Content-Type':
                'text/plain;charset=utf-8'

            },

            body:
              JSON.stringify(datos)

          }
        );


      const texto =
        await response.text();


      console.log(
        'Respuesta:',
        texto
      );


      const resultado =
        JSON.parse(texto);


      if (resultado.ok) {

        let mensaje =
          resultado.mensaje;


        if (
          resultado.cuposRestantes !== undefined
        ) {

          mensaje +=
            '\n\nCupos restantes en esta franja: ' +
            resultado.cuposRestantes;

        }


        alert(mensaje);


        registroForm.reset();


        // ==========================================
        // ACTUALIZAR CUPOS AUTOMÁTICAMENTE
        // ==========================================

        await cargarFranjas();


      } else {

        alert(
          resultado.mensaje
        );


        // Por si otra persona tomó el último cupo
        // mientras este usuario llenaba el formulario.

        await cargarFranjas();

      }


    } catch (error) {

      console.error(
        'Error:',
        error
      );


      alert(
        'No fue posible realizar el registro.\n\n' +
        error.message
      );


    } finally {

      boton.disabled = false;

      boton.textContent =
        'Registrarse';

    }

  }
);
