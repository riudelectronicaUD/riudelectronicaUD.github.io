const franjas = [
  '8:30',
  '9:10',
  '9:50',
  '10:30',
  '11:10',
  '11:50',
  '12:30',
  '13:10',
  '13:50',
  '14:30',
  '15:10',
  '15:50',
  '16:30',
  '17:10'
];


// ======================================================
// PEGA AQUÍ LA URL DE GOOGLE APPS SCRIPT
// ======================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbwTtGotEiF4y-AUdmWrmpgr3fAFlqPofPcbrxbFS-J97C-UP2X7cK8hrNbk6nC1Lb9DEg/exec';


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

const franjaSelect = document.getElementById('franja');
const registroForm = document.getElementById('registro-form');


// ======================================================
// CREAR LAS FRANJAS
// ======================================================

franjas.forEach(franja => {

  const option = document.createElement('option');

  option.value = franja;
  option.textContent = franja;

  franjaSelect.appendChild(option);

});


// ======================================================
// ENVIAR FORMULARIO
// ======================================================

registroForm.addEventListener('submit', async (e) => {

  e.preventDefault();


  const codigo =
    document.getElementById('codigo').value.trim();

  const nombre =
    document.getElementById('nombre').value.trim();

  const email =
    document.getElementById('email').value.trim().toLowerCase();

  const franja =
    franjaSelect.value;


  // Validar correo

  if (!email.endsWith('@udistrital.edu.co')) {

    alert(
      'Por favor, ingresa un correo electrónico institucional @udistrital.edu.co'
    );

    return;
  }


  const boton = registroForm.querySelector('button[type="submit"]');


  try {

    boton.disabled = true;
    boton.textContent = 'Registrando...';


    const datos = {
      codigo,
      nombre,
      email,
      franja
    };


    const response = await fetch(API_URL, {

      method: 'POST',

      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },

      body: JSON.stringify(datos)

    });


    const resultado = await response.json();


    if (resultado.ok) {

      let mensaje = resultado.mensaje;

      if (
        resultado.cuposRestantes !== undefined
      ) {

        mensaje +=
          `\n\nCupos restantes en esta franja: ${resultado.cuposRestantes}`;

      }


      alert(mensaje);

      registroForm.reset();

    } else {

      alert(resultado.mensaje);

    }


  } catch (error) {

    console.error(error);

    alert(
      'No fue posible realizar el registro. Intenta nuevamente.'
    );

  } finally {

    boton.disabled = false;
    boton.textContent = 'Registrarse';

  }

});
