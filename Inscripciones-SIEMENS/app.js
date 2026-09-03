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

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const franja = franjaSelect.value;

  const response = await fetch('respuestas.json');
  const respuestas = await response.json();

  if (respuestas[franja] && respuestas[franja].length >= 25) {
    alert('Lo siento, esta franja horaria ya está llena.');
  } else {
    const nuevoRegistro = { nombre, email };
    respuestas[franja] ? respuestas[franja].push(nuevoRegistro) : respuestas[franja] = [nuevoRegistro];
    alert('¡Registro exitoso!');
    registroForm.reset();
  }
});
