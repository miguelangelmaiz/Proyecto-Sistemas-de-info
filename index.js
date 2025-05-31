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

    // Capturar el submit del formulario de username
    
    });

// Diccionario de preguntas
const preguntas = [
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: ["Madrid", "París", "Roma", "Berlín"],
    respuesta: 1
  },
  {
    pregunta: "¿Cuál es el planeta más grande del sistema solar?",
    opciones: ["Marte", "Júpiter", "Saturno", "Venus"],
    respuesta: 1
  },
  {
    pregunta: "¿Quién escribió 'Cien años de soledad'?",
    opciones: ["Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar"],
    respuesta: 1
  }
];

let preguntaActual = 0;
let score = 0;

// Mostrar pregunta en el formulario
function mostrarPregunta() {
  const q = preguntas[preguntaActual];
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
  // Obtener opción seleccionada
  const seleccionada = parseInt(document.querySelector('input[name="quiz-option"]:checked').value);
  if (seleccionada === preguntas[preguntaActual].respuesta) {
    score++;
  }
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
  mostrarPregunta();
} else {
  user.score = score;
  showScreen("result-screen");
  // Mostrar el score en la pantalla de resultados
  document.getElementById("score-text").textContent =
    `Tu puntaje final es: ${score} de ${preguntas.length}`;
    mostrarResumenQuiz();
}
});
// Mostrar resumen del quiz
function mostrarResumenQuiz() {
  const resumenDiv = document.getElementById("quiz-summary");
  resumenDiv.innerHTML = "<h3>Resumen de tus respuestas:</h3>";
  preguntas.forEach((q, idx) => {
    const seleccion = respuestasUsuario[idx];
    const correcta = q.respuesta;
    resumenDiv.innerHTML += `
      <div class="resumen-pregunta">
        <strong>${idx + 1}. ${q.pregunta}</strong><br>
        Tu respuesta: <span${seleccion === correcta ? ' style="color:green;"' : ' style="color:red;"'}>${q.opciones[seleccion] ?? 'No respondida'}</span><br>
        Respuesta correcta: <span style="color:green;">${q.opciones[correcta]}</span>
      </div>
      <hr>
    `;
  });
}


// Mostrar la primera pregunta al entrar al quiz
function iniciarQuiz() {
  preguntaActual = 0;
  score = 0;
  respuestasUsuario = [];
  document.getElementById("quiz-summary").innerHTML = "";
  mostrarPregunta();
}

// Llama a iniciarQuiz cuando el usuario termina el registro
forms.usernameForm.addEventListener("submit", function (event) {
  event.preventDefault();
  user.username = document.getElementById("username").value.trim();
  showScreen("quiz-screen");
  iniciarQuiz();
});





