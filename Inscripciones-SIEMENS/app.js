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


// ================================================
// PEGA AQUÍ TU URL DE APPS SCRIPT
// Debe terminar en /exec
// ================================================

const API_URL =
  'https://script.google.com/macros/s/AKfycbwycSj_FFl2Yr6CE2afeRf7y0tOTCN-hZwixyawBintvmE_ISDz3rIYg6o7XzrCd4YbDw/exec';


const franjaSelect =
  document.getElementById('franja');

const registroForm =
  document.getElementById('registro-form');


// ================================================
// CREAR FRANJAS HORARIAS
// ================================================

franjas.forEach(franja => {

  const option =
    document.createElement('option');

  option.value = franja;
  option.textContent = franja;

  franjaSelect.appendChild(option);

});


// ================================================
// ENVIAR FORMULARIO
// ================================================

registroForm.addEventListener('submit', async (e) => {

  e.preventDefault();


  const tipoDocumento =
    document.getElementById('tipoDocumento').value;

  const documento =
    document.getElementById('documento').value.trim();

  const codigo =
    document.getElementById('codigo').value.trim();

  const nombre =
    document.getElementById('nombre').value.trim();

  const email =
    document.getElementById('email')
      .value
      .trim()
      .toLowerCase();

  const franja =
    franjaSelect.value;


  // ================================================
  // VALIDAR DOCUMENTO
  // ================================================

  if (!/^[0-9]+$/.test(documento)) {

    alert(
      'El número de documento debe contener únicamente números.'
    );

    return;
  }


  // ================================================
  // VALIDAR CORREO
  // ================================================

  if (!email.endsWith('@udistrital.edu.co')) {

    alert(
      'Debes utilizar un correo institucional @udistrital.edu.co'
    );

    return;
  }


  const boton =
    registroForm.querySelector(
      'button[type="submit"]'
    );


  boton.disabled = true;
  boton.textContent = 'Registrando...';


  const datos = {

    tipoDocumento: tipoDocumento,

    documento: documento,

    codigo: codigo,

    nombre: nombre,

    email: email,

    franja: franja

  };


  try {

    const response =
      await fetch(API_URL, {

        method: 'POST',

        headers: {
          'Content-Type':
            'text/plain;charset=utf-8'
        },

        body: JSON.stringify(datos)

      });


    const texto =
      await response.text();


    console.log(
      'Respuesta del servidor:',
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

    } else {

      alert(resultado.mensaje);

    }


  } catch (error) {

    console.error(error);


    alert(
      'No fue posible realizar el registro.\n\n' +
      error.message
    );

  } finally {

    boton.disabled = false;

    boton.textContent =
      'Registrarse';

  }

});
