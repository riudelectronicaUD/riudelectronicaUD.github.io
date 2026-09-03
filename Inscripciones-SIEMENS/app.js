const franjas = [
  '8:30', '9:10', '9:50', '10:30', '11:10', '11:50',
  '12:30', '13:10', '13:50', '14:30', '15:10', '15:50',
  '16:30', '17:10'
];

// IMPORTANTE:
// PEGA AQUÍ TU URL DE APPS SCRIPT QUE TERMINA EN /exec
const API_URL = 'https://script.google.com/macros/s/AKfycbwTtGotEiF4y-AUdmWrmpgr3fAFlqPofPcbrxbFS-J97C-UP2X7cK8hrNbk6nC1Lb9DEg/exec';

const franjaSelect = document.getElementById('franja');
const registroForm = document.getElementById('registro-form');

// Crear las opciones de horario
franjas.forEach(franja => {
  const option = document.createElement('option');
  option.value = franja;
  option.textContent = franja;
  franjaSelect.appendChild(option);
});

// Enviar el formulario
registroForm.addEventListener('submit', async (e) => {

  e.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const franja = franjaSelect.value;

  // Validar correo institucional
  if (!email.endsWith('@udistrital.edu.co')) {
    alert('Debes utilizar un correo @udistrital.edu.co');
    return;
  }

  const boton = registroForm.querySelector('button[type="submit"]');

  boton.disabled = true;
  boton.textContent = 'Registrando...';

  const datos = {
    codigo: codigo,
    nombre: nombre,
    email: email,
    franja: franja
  };

  try {

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(datos)
    });

    const texto = await response.text();

    console.log('Respuesta del servidor:', texto);

    const resultado = JSON.parse(texto);

    if (resultado.ok) {

      let mensaje = resultado.mensaje;

      if (resultado.cuposRestantes !== undefined) {
        mensaje += '\n\nCupos restantes: ' + resultado.cuposRestantes;
      }

      alert(mensaje);

      registroForm.reset();

    } else {

      alert(resultado.mensaje);

    }

  } catch (error) {

    console.error('Error:', error);

    alert(
      'No fue posible realizar el registro.\n\n' +
      error.message
    );

  } finally {

    boton.disabled = false;
    boton.textContent = 'Registrarse';

  }

});
