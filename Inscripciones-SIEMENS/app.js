const franjas = [
  '8:30', '9:10', '9:50', '10:30', '11:10', '11:50', 
  '12:30', '13:10', '13:50', '14:30', '15:10', '15:50',
  '16:30', '17:10'
];

const franjaSelect = document.getElementById('franja');
const registroForm = document.getElementById('registro-form');

// Generar opciones de franja horaria dinámicamente
franjas.forEach(franja => {
  const option = document.createElement('option');
  option.value = franja;
  option.textContent = franja;
  franjaSelect.appendChild(option);
});

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value;
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const franja = franjaSelect.value;

  // Validar el formato del correo electrónico
  if (!email.endsWith('@udistrital.edu.co')) {
    alert('Por favor, ingresa un correo electrónico válido con el dominio @udistrital.edu.co');
    return;
  }

  const response = await fetch('respuestas.json');
  const respuestas = await response.json();

  // Verificar si el usuario ya ha respondido
  const usuarioRegistrado = respuestas.some(registro =>
    registro.codigo === codigo || registro.email === email
  );

  if (usuarioRegistrado) {
    alert('Ya has respondido anteriormente. No puedes responder de nuevo.');
    return;
  }

  if (respuestas[franja] && respuestas[franja].length >= 25) {
    alert('Lo siento, esta franja horaria ya está llena.');
  } else {
    const nuevoRegistro = { codigo, nombre, email };
    respuestas[franja] ? respuestas[franja].push(nuevoRegistro) : respuestas[franja] = [nuevoRegistro];
    alert('¡Registro exitoso!');
    registroForm.reset();
  }
});
