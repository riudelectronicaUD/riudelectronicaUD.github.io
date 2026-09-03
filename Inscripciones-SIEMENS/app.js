// ==========================================================
// FRANJAS HORARIAS
// ==========================================================

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


// ==========================================================
// URL DE GOOGLE APPS SCRIPT
// DEJA AQUÍ TU URL REAL QUE TERMINA EN /exec
// ==========================================================

const API_URL =
  'PEGA_AQUI_TU_URL_REAL_QUE_TERMINA_EN_EXEC';


// ==========================================================
// ELEMENTOS DEL HTML
// ==========================================================

const franjaSelect =
  document.getElementById('franja');

const registroForm =
  document.getElementById('registro-form');


// ==========================================================
// CREAR EL MENÚ INMEDIATAMENTE
// ==========================================================

function crearMenuFranjas() {

  franjaSelect.innerHTML = `
    <option value="" disabled selected>
      Selecciona una franja
    </option>
  `;

  franjas.forEach(franja => {

    const option =
      document.createElement('option');

    option.value = franja;

    option.textContent = franja;

    option.disabled = false;

    franjaSelect.appendChild(option);

  });

}


// Crear inmediatamente
crearMenuFranjas();


// ==========================================================
// CONSULTAR CUPOS EN SEGUNDO PLANO
// ==========================================================

async function actualizarDisponibilidad() {

  try {

    /*
      Agregamos un parámetro para evitar
      que el navegador use información vieja.
    */

    const response = await fetch(
      API_URL + '?consulta=disponibilidad&t=' + Date.now()
    );


    if (!response.ok) {

      throw new Error(
        'Respuesta HTTP: ' + response.status
      );

    }


    const resultado =
      await response.json();


    /*
      IMPORTANTE:

      Si Google no devuelve disponibilidad,
      NO destruimos el menú.

      Simplemente dejamos las franjas normales.
    */

    if (
      !resultado.ok ||
      !Array.isArray(resultado.disponibilidad)
    ) {

      console.warn(
        'No se recibió información de disponibilidad.'
      );

      return;

    }


    resultado.disponibilidad.forEach(item => {

      /*
        Buscar la opción correspondiente
        por su value.
      */

      const option =
        Array.from(franjaSelect.options)
          .find(
            opcion =>
              opcion.value === item.franja
          );


      if (!option) {
        return;
      }


      // ==============================================
      // FRANJA LLENA
      // ==============================================

      if (item.cuposRestantes <= 0) {

        option.disabled = true;

        option.textContent =
          item.franja +
          ' — SIN CUPOS';

      }

      // ==============================================
      // FRANJA DISPONIBLE
      // ==============================================

      else {

        option.disabled = false;

        option.textContent =
          item.franja +
          ' — ' +
          item.cuposRestantes +
          ' cupos disponibles';

      }

    });


  } catch (error) {

    /*
      Si falla Google Apps Script,
      el menú NO deja de funcionar.
    */

    console.warn(
      'No fue posible actualizar los cupos:',
      error
    );

  }

}


// Consultamos disponibilidad,
// pero sin bloquear el menú.
actualizarDisponibilidad();


// ==========================================================
// ENVIAR FORMULARIO
// ==========================================================

registroForm.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();


    // ======================================================
    // OBTENER DATOS
    // ======================================================

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


    // ======================================================
    // VALIDAR DOCUMENTO
    // ======================================================

    if (!/^[0-9]+$/.test(documento)) {

      alert(
        'El número de documento debe contener únicamente números.'
      );

      return;

    }


    // ======================================================
    // VALIDAR CÓDIGO
    // ======================================================

    if (!/^[0-9]+$/.test(codigo)) {

      alert(
        'El código estudiantil debe contener únicamente números.'
      );

      return;

    }


    // ======================================================
    // VALIDAR CORREO
    // ======================================================

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


    // ======================================================
    // VALIDAR FRANJA
    // ======================================================

    if (!franja) {

      alert(
        'Debes seleccionar una franja horaria.'
      );

      return;

    }


    // ======================================================
    // BOTÓN
    // ======================================================

    const boton =
      registroForm.querySelector(
        'button[type="submit"]'
      );


    boton.disabled = true;

    boton.textContent =
      'Registrando...';


    // ======================================================
    // DATOS A ENVIAR
    // ======================================================

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

      // ====================================================
      // ENVIAR A GOOGLE APPS SCRIPT
      // ====================================================

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
        'Respuesta del servidor:',
        texto
      );


      const resultado =
        JSON.parse(texto);


      // ====================================================
      // REGISTRO EXITOSO
      // ====================================================

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


        // ==================================================
        // SI ACABA DE OCUPAR EL ÚLTIMO CUPO
        // ==================================================

        if (
          resultado.cuposRestantes !== undefined &&
          resultado.cuposRestantes <= 0
        ) {

          const option =
            Array.from(
              franjaSelect.options
            ).find(
              opcion =>
                opcion.value === franja
            );


          if (option) {

            option.disabled = true;

            option.textContent =
              franja +
              ' — SIN CUPOS';

          }

        }


        // Limpiar formulario

        registroForm.reset();


        /*
          Consultar nuevamente los cupos
          para actualizar todas las franjas.
        */

        actualizarDisponibilidad();

      }

      // ====================================================
      // REGISTRO NO PERMITIDO
      // ====================================================

      else {

        alert(
          resultado.mensaje
        );


        /*
          Puede ocurrir que otra persona haya
          tomado el último cupo mientras este
          estudiante llenaba el formulario.
        */

        actualizarDisponibilidad();

      }


    } catch (error) {

      console.error(
        'Error:',
        error
      );


      alert(
        'No fue posible realizar el registro.\n\n' +
        'Por favor, intenta nuevamente.'
      );

    }


    // ======================================================
    // ACTIVAR BOTÓN
    // ======================================================

    finally {

      boton.disabled = false;

      boton.textContent =
        'Registrarse';

    }

  }
);
