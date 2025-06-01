let respuestasUsuario = [];

let user = {
    username: "",
    score: 0,
    time: 0,
};

const screens = {
    "main-screen": document.getElementById("main-screen"),
    "username-screen": document.getElementById("username-screen"),
    "quiz-screen": document.getElementById("quiz-screen"),
    "result-screen": document.getElementById("result-screen"),
    userList: document.getElementById("users-list"),
};

const forms = {
    usernameForm: document.getElementById("username-form"),
    quizForm: document.getElementById("quiz-form"),




    // Si tienes formularios para quiz o resultados, agrégalos aquí
};

const buttons = {
    newRegistration: document.getElementById("new-registration-btn"),
    viewUsers: document.getElementById("view-users-btn"),
    nextQuestionBtn: document.getElementById("next-question-btn"),
    backToMainBtn: document.getElementById("back-to-main-btn"),
    
};
buttons.backToMainBtn.addEventListener("click", function() {
    showScreen("main-screen");
});

function showScreen(screenName) {
    Object.values(screens).forEach((screen) => {
        screen.classList.remove("active");
    });
    screens[screenName].classList.add("active");
}
function handleSubmitUsername(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  user.username= username;
  showScreen("quiz-screen");
}
document.getElementById("back-to-main-btn-users").addEventListener("click", function() {
    showScreen("main-screen");
});


function startNewRegistration() {
    user = {
        username: "",
        score: 0,
        time: 0,
    };
    showScreen("username-screen");
}

document.addEventListener("DOMContentLoaded", () => {
    forms.usernameForm.addEventListener("submit", handleSubmitUsername);
    

    // Mostrar pantalla de registro al hacer click en "Nuevo Registro"
    buttons.newRegistration.addEventListener("click", startNewRegistration);
    buttons.viewUsers.addEventListener("click", gotToUserList);
    

    // Capturar el submit del formulario de username
    
    });

// Diccionario de preguntas
const preguntas = [
  {
    pregunta: "¿Quién es el capitán de los Piratas de Sombrero de Paja?",
    opciones: ["zoro", "Sanji", "Luffy", "Nami"],
    respuesta: 2
  },
  {
    pregunta: "¿Qué fruta del diablo comió Luffy?",
    opciones: ["hito hito nika", "gomu gomu no mi", "mera mera no mi", "ope ope no mi"],
    respuesta: 0
  },
  {
    pregunta: "¿Cual es la especialidad magica de frieren?",
    opciones: ["Magie fuego", "Magia hielo", "Magia flores", "Magia ilusion"],
    respuesta: 3
  },
  {
    pregunta: "¿Cual es el aprendiz de frieren?",
    opciones: ["Stark", "Fern", "Heiter", "himmel"],
    respuesta: 1
  },
  {
    pregunta: "¿Cual es el demonio que trae denji?",
    opciones: ["Infierno", "Pochita", "Control", "Makima"],
    respuesta: 1
  },
  {
    pregunta: "¿Que quiere conseguir denji como su mayor deseo al inicio de la historia?",
    opciones: ["Venganza", "Poder ilimitado", "Tostada con mermelada", "Tetas"],
    respuesta: 2
  },
  {
    pregunta: "¿Cual es el nombre del zanpakuto de byakuya?",
    opciones: ["Senbonzakura", "Hyorinmaru", "Zabimaru", "Kyoka Suigetsu"],
    respuesta: 0
  },
  {
    pregunta: "¿Cual es la tecnica unica del clan de Itachi uchiha?",
    opciones: ["tsukuyomi", "Susanoo", "Amaterasu", "Kamui"],
    respuesta: 0
  },
  {
    pregunta: "¿Cual es el nombre de la habilidad de subaru que permite volver despues de morir?",
    opciones: ["Return by Death", "Rewind Time", "Death Loop", "Checkpoint"],
    respuesta: 0
  },
  {
    pregunta: "¿Cual es el verdadero nombre de archer en Fate/stay?",
    opciones: ["Gilgamesh", "Kotomine", "Artoria pendragon", "Emiya shirou"],
    respuesta: 3
  },
  {
    pregunta: "¿Cual es la tecnica de magia que aprende rudeus de Rosy?",
    opciones: ["Fireball", "Heal", "Teleport", "Quagmire"],
    respuesta: 3
  },
  {
    pregunta: "¿Quien fue la primera esposa de Rudeus?",
    opciones: ["Ninguna", "Eris", "Roxy", "Silphy"],
    respuesta: 3
  },
  {
    pregunta: "¿Cual es el titan que contiene Eren Yeager al inicio?",
    opciones: ["Ataque", "Acorazado", "Hembra", "Colozal"],
    respuesta: 0
  },
  {
    pregunta: "¿Cual es la tecnica maldita de Megumi Fushiguro?",
    opciones: ["Limite infinito", "Manipulcion de Sangre", "Diez Sombras", "Black Bird"],
    respuesta: 2
  },
  {
    pregunta: "¿Cual es el nombre del sistemas de Jin-Woo?",
    opciones: ["Juego de Muerte", "El sistema", "El monarca", "El Diosss"],
    respuesta: 1
  },
];

// Función para mezclar el array de preguntas
function mezclarPreguntas(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

let preguntaActual = 0;
let score = 0;
let timer; // Temporizador
const tiempoLimite = 5 * 60 * 1000; // 5 minutos en ms
let preguntasSeleccionadas = [];

// Mostrar pregunta en el formulario
function mostrarPregunta() {
  const q = preguntasSeleccionadas[preguntaActual]; // Usar preguntasSeleccionadas
  document.getElementById("quiz-number").textContent = preguntaActual + 1;
  document.getElementById("quiz-question-text").textContent = q.pregunta;
  q.opciones.forEach((op, idx) => {
    document.getElementById(`option-${idx}`).textContent = op;
    // Limpiar selección previa
    document.querySelector(`input[name="quiz-option"][value="${idx}"]`).checked = false;
  });
}

// Manejar envío del formulario de quiz
forms.quizForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const seleccionadaInput = document.querySelector('input[name="quiz-option"]:checked');
  let seleccionada = null;
  if (seleccionadaInput) {
    seleccionada = parseInt(seleccionadaInput.value);
  }
  respuestasUsuario[preguntaActual] = seleccionada; // Guardar respuesta (o null si no respondió)
  
  if (seleccionada === preguntasSeleccionadas[preguntaActual].respuesta) {
      score++;
  }
  preguntaActual++;
  if (preguntaActual < preguntasSeleccionadas.length) {
      mostrarPregunta();
  } else {
      finalizarQuiz();
  }
});
function finalizarQuiz() {
  clearInterval(timer);
  // Completar respuestas faltantes como incorrectas (null)
  for (let i = respuestasUsuario.length; i < preguntasSeleccionadas.length; i++) {
      respuestasUsuario[i] = null; 
  }
  // Recalcular score por si hubo preguntas sin responder contabilizadas
  score = 0;
  for (let i = 0; i < preguntasSeleccionadas.length; i++) {
      if (respuestasUsuario[i] === preguntasSeleccionadas[i].respuesta) {
          score++;
      }
  }
  user.score = score;
  // Redirigir a la pantalla principal si el tiempo se acabó
  if (score === 0) { // Si no hay respuestas correctas, redirigir a la pantalla principal
      showScreen("main-screen");
  } else {
      showScreen("result-screen");
      document.getElementById("score-text").textContent =
          `Tu puntaje final es: ${score} de ${preguntasSeleccionadas.length}`;
      saveUser(user); // aqui agregue 
      mostrarResumenQuiz();
  }
}
// Mostrar resumen del quiz
function mostrarResumenQuiz() {
  const resumenDiv = document.getElementById("quiz-summary");
  resumenDiv.innerHTML = "<h3>Resumen de tus respuestas:</h3>";
  preguntasSeleccionadas.forEach((q, idx) => {
    const seleccion = respuestasUsuario[idx];
    const correcta = q.respuesta;
    let color = seleccion === correcta ? 'green' : 'red';
    resumenDiv.innerHTML += `
      <div class="resumen-pregunta">
        <strong>${idx + 1}. ${q.pregunta}</strong><br>
        Tu respuesta: <span style="color:${color};">${seleccion !== null && seleccion !== undefined ? q.opciones[seleccion] : 'No respondida'}</span><br>
        ${seleccion === correcta ? '<span style="color:green;">¡Correcto!</span>' : `<span style="color:red;">Incorrecto</span>. Respuesta correcta: <span style="color:green;">${q.opciones[correcta]}</span>`}
      </div>
      <hr>
    `;
  });
}
// aqui 
function gotToUserList() {
  displayUsers();
  showScreen("userList");
}
// hasta aca 


// Mostrar la primera pregunta al entrar al quiz
function iniciarQuiz() {
  preguntaActual = 0;
  score = 0;
  respuestasUsuario = [];
  document.getElementById("quiz-summary").innerHTML = "";
  
  // Mezclar preguntas y seleccionar las primeras 10
  mezclarPreguntas(preguntas);
  preguntasSeleccionadas = preguntas.slice(0, 10); // Seleccionar solo las primeras 10 preguntas
  
  mostrarPregunta();
  iniciarTemporizador(); // Iniciar el temporizador
}
// Función para iniciar el temporizador
function iniciarTemporizador() {
  let tiempoRestante = tiempoLimite;
  const tiempoDisplay = document.getElementById("timer");
  timer = setInterval(() => {
      tiempoRestante -= 1000;
      const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
      tiempoDisplay.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
      if (tiempoRestante <= 0) {
          clearInterval(timer);
          mostrarAlertaTiempo();
      }
  }, 1000);
}
// Nueva función para mostrar la alerta y redirigir
function mostrarAlertaTiempo() {
  const alerta = document.getElementById("timeout-alert");
  alerta.style.display = "block";
  setTimeout(() => {
    alerta.style.display = "none";
    showScreen("main-screen");
  }, 4000); // 4 segundos
}
// Llama a iniciarQuiz cuando el usuario termina el registro
forms.usernameForm.addEventListener("submit", function (event) {
  event.preventDefault();
  user.username = document.getElementById("username").value.trim();
  showScreen("quiz-screen");
  iniciarQuiz();
});



// desde aqui hasta aca 

function saveUser(userData) {
  let users = getUsers();

    // Verificar si el usuario existe
    const existingUserIndex = users.findIndex(
      (user) => user.username === userData.username
);
  if (existingUserIndex !== -1) {
      users[existingUserIndex] = {
          username: userData.username,
          score: userData.score,
          time: userData.time
      }; // Actualizar el usuario existente
  } else {
      users.push({
          username: userData.username,
          score: userData.score,
          time: userData.time
      });
  }

  localStorage.setItem("travelUser", JSON.stringify(users));
  return userData;
}

function getUsers() {
    const users = localStorage.getItem("travelUser ");
    return JSON.parse(users) || [];
}

function displayUsers() {
    const users = getUsers();
  const userContent = document.getElementById("users-content");
  if (users.length === 0) {
      userContent.innerHTML = "<p>No hay usuarios registrados.</p>";
  } else {
      userContent.innerHTML = ""; // Limpiar el contenido anterior
      users.forEach((user) => {
          const userItem = document.createElement("div");
          userItem.innerHTML = `
              <div class="user-card">
                  <h3>${user.username}</h3>
                  <p><strong>Puntaje:</strong> ${user.score}</p>
                  <p><strong>Tiempo:</strong> ${user.time} segundos</p>
              </div>
          `;
          userContent.appendChild(userItem);
      });
  }
}
// aca 












