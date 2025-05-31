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
    // Si tienes formularios para quiz o resultados, agrégalos aquí
};

const buttons = {
    newRegistration: document.getElementById("new-registration-btn"),
    viewUsers: document.getElementById("view-users-btn"),
    nextQuestionBtn: document.getElementById("next-question-btn"),
    backToMainBtn: document.getElementById("back-to-main-btn"),
};

function showScreen(screenName) {
    Object.values(screens).forEach((screen) => {
        screen.classList.remove("active");
    });
    screens[screenName].classList.add("active");
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
    // Mostrar pantalla de registro al hacer click en "Nuevo Registro"
    buttons.newRegistration.addEventListener("click", startNewRegistration);

    // Capturar el submit del formulario de username
    
    });



