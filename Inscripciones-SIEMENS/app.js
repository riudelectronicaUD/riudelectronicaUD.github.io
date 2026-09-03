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
// ==========================================================

// PEGA AQUÍ TU URL REAL.
// Debe terminar en /exec

const API_URL =
  'https://script.google.com/macros/s/AKfycbyQRVhvKUmrT7j6iIcVIJ0ax8TehXe6bUNrcVf2ze5BAtElJRcoYbcAqja_opkJFXFUig/exec';


// ==========================================================
// ELEMENTOS DEL HTML
// ==========================================================

const franjaSelect =
  document.getElementById('franja');

const registroForm =
  document.getElementById('registro-form');


// ==========================================================
// CREAR MENÚ DE FRANJAS
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
    // El value solamente contiene la franja.
    option.value = franja;


    option.textContent =
      franja;


    franjaSelect.appendChild(
      option
    );

  });

}


// Crear menú inmediatamente
crearFranjas();


// ==========================================================
// CONSULTAR DISPONIBILIDAD DE CUPOS
// ==========================================================

async function revisarCupos() {

  try {

    /*
      Date.now() evita que Chrome
      utilice una consulta vieja
      almacenada en caché.
    */

    const response =
      await fetch(
        API_URL +
        '?consulta=cupos&t=' +
        Date.now(),
        {
          cache: 'no-store'
        }
      );


    if (!response.ok) {

      console.warn(
        'No fue posible consultar los cupos.'
      );

      return;

    }


    const resultado =
      await response.json();


    if (
      !resultado.ok ||
      !Array.isArray(
        resultado.disponibilidad
      )
    ) {

      console.warn(
        'La disponibilidad no tiene el formato esperado.'
      );

      return;

    }


    // ======================================================
    // ACTUALIZAR CADA FRANJA
    // ======================================================

    resultado.disponibilidad.forEach(
      item => {


        const opcion =
          Array.from(
            franjaSelect.options
          ).find(
            option =>
              option.value ===
              item.franja
          );


        if (!opcion) {
          return;
        }


        const cupos =
          Number(
            item.cuposRestantes
          );


        // ==================================================
        // SIN CUPOS
        // ==================================================

        if (cupos <= 0) {


          /*
            Si el estudiante tenía seleccionada
            esta franja justo cuando se agotó,
            quitamos la selección.
          */

          if (
            franjaSelect.value ===
            item.franja
          ) {

            franjaSelect.value = '';

          }


          opcion.disabled = true;


          opcion.textContent =
            item.franja +
            ' — SIN CUPOS';

        }


        // ==================================================
        // CON CUPOS
        // ==================================================

        else {

          opcion.disabled = false;


          /*
            Mostramos solamente la hora.

            Si después quieres mostrar:
            "4 cupos disponibles",
            también se puede.
          */

          opcion.textContent =
            item.franja;

        }

      }
    );


  } catch (error) {

    /*
      Si falla temporalmente la consulta,
      NO bloqueamos el formulario.
    */

    console.warn(
      'Error consultando cupos:',
      error
    );

  }

}


// ==========================================================
// CONSULTAR AL ABRIR LA PÁGINA
// ==========================================================

revisarCupos();


// ==========================================================
// ACTUALIZAR AUTOMÁTICAMENTE CADA 5 SEGUNDOS
// ==========================================================

setInterval(
  revisarCupos,
  5000
);


// ==========================================================
// CONSULTAR CUANDO EL USUARIO VUELVE A LA PESTAÑA
// ==========================================================

window.addEventListener(
  'focus',
  revisarCupos
);


// ==========================================================
// CONSULTAR CUANDO VA A SELECCIONAR UNA FRANJA
// ==========================================================

franjaSelect.addEventListener(
  'focus',
  revisarCupos
);


// También cuando hace clic sobre el selector
franjaSelect.addEventListener(
  'mousedown',
  revisarCupos
);


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
        .getElementById(
          'tipoDocumento'
        )
        .value;


    const documento =
      document
        .getElementById(
          'documento'
        )
        .value
        .trim();


    const codigo =
      document
        .getElementById(
          'codigo'
        )
        .value
        .trim();


    const nombre =
      document
        .getElementById(
          'nombre'
        )
        .value
        .trim();


    const email =
      document
        .getElementById(
          'email'
        )
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
    // VALIDAR NÚMERO DE DOCUMENTO
    // ======================================================

    if (
      !/^[0-9]+$/.test(
        documento
      )
    ) {

      alert(
        'El número de documento debe contener únicamente números.'
      );

      return;

    }


    // ======================================================
    // VALIDAR CÓDIGO
    // ======================================================

    if (
      !/^[0-9]+$/.test(
        codigo
      )
    ) {

      alert(
        'El código estudiantil debe contener únicamente números.'
      );

      return;

    }


    // ======================================================
    // VALIDAR NOMBRE
    // ======================================================

    if (!nombre) {

      alert(
        'Ingresa tu nombre completo.'
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
        'Selecciona una franja horaria disponible.'
      );

      return;

    }


    // ======================================================
    // REVISAR CUPOS JUSTO ANTES DEL REGISTRO
    // ======================================================

    await revisarCupos();


    /*
      Es posible que mientras el estudiante
      llenaba el formulario se haya agotado
      la franja.

      Si revisarCupos() la deshabilitó,
      el select queda vacío.
    */

    if (!franjaSelect.value) {

      alert(
        'La franja seleccionada acaba de quedarse sin cupos. ' +
        'Por favor selecciona otra franja.'
      );

      return;

    }


    // Tomamos nuevamente la franja
    const franjaFinal =
      franjaSelect.value;


    // ======================================================
    // BOTÓN
    // ======================================================

    const boton =
      registroForm.querySelector(
        'button[type="submit"]'
      );


    boton.disabled =
      true;


    boton.textContent =
      'Registrando...';


    // ======================================================
    // DATOS PARA GOOGLE SHEETS
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
        franjaFinal

    };


    try {

      // ====================================================
      // ENVIAR REGISTRO
      // ====================================================

      const response =
        await fetch(
          API_URL,
          {

            method:
              'POST',

            headers: {

              'Content-Type':
                'text/plain;charset=utf-8'

            },

            body:
              JSON.stringify(
                datos
              )

          }
        );


      // ====================================================
      // LEER RESPUESTA
      // ====================================================

      const texto =
        await response.text();


      console.log(
        'Respuesta de Google:',
        texto
      );


      let resultado;


      try {

        resultado =
          JSON.parse(
            texto
          );

      } catch (errorJSON) {

        console.error(
          'Respuesta no válida:',
          texto
        );


        throw new Error(
          'Google no devolvió una respuesta válida.'
        );

      }


      // ====================================================
      // REGISTRO EXITOSO
      // ====================================================

      if (resultado.ok) {


        let mensaje =
          resultado.mensaje;


        if (
          resultado.cuposRestantes !==
          undefined
        ) {

          mensaje +=
            '\n\nCupos restantes en esta franja: ' +
            resultado.cuposRestantes;

        }


        alert(
          mensaje
        );


        // Guardamos la franja antes del reset
        const franjaRegistrada =
          franjaFinal;


        // Limpiar formulario
        registroForm.reset();


        // ==================================================
        // SI ERA EL ÚLTIMO CUPO
        // ==================================================

        if (
          Number(
            resultado.cuposRestantes
          ) <= 0
        ) {


          const opcion =
            Array.from(
              franjaSelect.options
            ).find(
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


        // Actualizar todas las franjas
        await revisarCupos();

      }


      // ====================================================
      // REGISTRO RECHAZADO
      // ====================================================

      else {


        alert(
          resultado.mensaje
        );


        /*
          Si otra persona tomó el último cupo
          exactamente antes de este registro,
          actualizamos inmediatamente.
        */

        await revisarCupos();

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

      boton.disabled =
        false;


      boton.textContent =
        'Registrarse';

    }

  }
);
