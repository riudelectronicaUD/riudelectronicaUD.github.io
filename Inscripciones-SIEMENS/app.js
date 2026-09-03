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
// URL DEL APPS SCRIPT
// ==========================================================

const API_URL =
  'PEGA_AQUI_TU_URL_REAL_QUE_TERMINA_EN_EXEC';


// ==========================================================
// ELEMENTOS
// ==========================================================

const franjaSelect =
  document.getElementById('franja');

const registroForm =
  document.getElementById('registro-form');


// ==========================================================
// CREAR FRANJAS COMO FUNCIONABAN ANTES
// ==========================================================

function crearFranjas() {

  franjaSelect.innerHTML = `
    <option value="" disabled selected>
      Selecciona una franja
    </option>
  `;

  franjas.forEach(franja => {

    const option =
      document.createElement('option');

    // IMPORTANTE:
    // El value SIEMPRE conserva solamente la franja.
    option.value = franja;

    option.textContent = franja;

    franjaSelect.appendChild(option);

  });

}


// Crear el menú inmediatamente
crearFranjas();


// ==========================================================
// CONSULTAR SOLO SI UNA FRANJA ESTÁ LLENA
// ==========================================================

async function revisarCupos() {

  try {

    const response =
      await fetch(
        API_URL + '?t=' + Date.now()
      );


    const resultado =
      await response.json();


    // Si falla esta consulta,
    // NO afecta el funcionamiento del formulario.
    if (
      !resultado.ok ||
      !Array.isArray(resultado.disponibilidad)
    ) {

      console.log(
        'No se pudo consultar la disponibilidad.'
      );

      return;

    }


    resultado.disponibilidad.forEach(item => {

      const opcion =
        Array
          .from(franjaSelect.options)
          .find(
            option =>
              option.value === item.franja
          );


      if (!opcion) {
        return;
      }


      // ==============================================
      // SI NO HAY CUPOS
      // ==============================================

      if (Number(item.cuposRestantes) <= 0) {

        opcion.disabled = true;

        opcion.textContent =
          item.franja +
          ' — SIN CUPOS';

      }

      // ==============================================
      // SI TODAVÍA HAY CUPOS
      // ==============================================

      else {

        opcion.disabled = false;

        // Solamente mostramos la hora.
        // Si quieres mostrar los cupos también
        // te digo cómo hacerlo.
        opcion.textContent =
          item.franja;

      }

    });


  } catch (error) {

    /*
      MUY IMPORTANTE:
      si esta consulta falla,
      no bloqueamos el formulario.
    */

    console.log(
      'No fue posible consultar cupos:',
      error
    );

  }

}


// Consultar cuando abre la página
revisarCupos();


// ==========================================================
// REGISTRO
// ESTA ES LA LÓGICA NORMAL QUE YA FUNCIONABA
// ==========================================================

registroForm.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();


    // ======================================================
    // DATOS
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
    // VALIDAR TIPO DE DOCUMENTO
    // ======================================================

    if (!tipoDocumento) {

      alert(
        'Selecciona el tipo de documento.'
      );

      return;

    }


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
        'Selecciona una franja horaria.'
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
    // DATOS QUE SE ENVÍAN
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

      // IMPORTANTE:
      // Aquí enviamos solamente la hora original.
      franja:
        franja

    };


    try {

      // ====================================================
      // ENVIAR REGISTRO
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


      // Primero leer como texto
      const texto =
        await response.text();


      console.log(
        'Respuesta de Google:',
        texto
      );


      // Convertir respuesta a JSON
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


        // Guardamos cuál fue la franja utilizada
        const franjaRegistrada =
          franja;


        // Limpiar formulario
        registroForm.reset();


        // ==================================================
        // SI ESE ERA EL ÚLTIMO CUPO
        // ==================================================

        if (
          Number(
            resultado.cuposRestantes
          ) <= 0
        ) {

          const opcion =
            Array
              .from(
                franjaSelect.options
              )
              .find(
                option =>
                  option.value ===
                  franjaRegistrada
              );


          if (opcion) {

            opcion.disabled =
              true;

            opcion.textContent =
              franjaRegistrada +
              ' — SIN CUPOS';

          }

        }


        // Consultar nuevamente por si cambió otra franja
        revisarCupos();

      }

      // ====================================================
      // EL SERVIDOR RECHAZÓ EL REGISTRO
      // ====================================================

      else {

        alert(
          resultado.mensaje
        );


        /*
          Si alguien tomó el último cupo
          mientras se diligenciaba el formulario,
          actualizamos el menú.
        */

        revisarCupos();

      }


    } catch (error) {

      console.error(
        'ERROR DE REGISTRO:',
        error
      );


      alert(
        'No fue posible realizar el registro. ' +
        'Por favor intenta nuevamente.'
      );

    }


    // ======================================================
    // REACTIVAR BOTÓN
    // ======================================================

    finally {

      boton.disabled = false;

      boton.textContent =
        'Registrarse';

    }

  }
);
