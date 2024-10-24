let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let userEmail = "";

// Initialize EmailJS with your USER_ID
emailjs.init("1Nspur_zrN3gVD69g");

function startQuiz() {
    const emailInput = document.getElementById("email");
    userEmail = emailInput.value;

    if (!userEmail) {
        alert("Please enter your email to start the quiz.");
        return;
    }

    document.getElementById("login").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    timeLeft = 30;
    updateTimerDisplay();
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);

    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.text;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
}

function updateTimerDisplay() {
    document.getElementById("time-left").textContent = timeLeft;
}

function checkAnswer(selectedOptionIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedOptionIndex === question.correctIndex) {
        score++;
    }
    clearInterval(timer);
    submitAnswer();
}

function submitAnswer() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `${score} out of ${questions.length}`;

    // Log data before sending to ensure everything is correct
    console.log("Attempting to send email with following details:");
    console.log("User Email:", userEmail);
    console.log("Score:", score);

    // Send score to user's email using EmailJS
    emailjs.send("service_l8inr93", "template_jh7lfoa", {
        email: userEmail,
        score: `${score} out of ${questions.length}`
    }).then((response) => {
        alert(`Quiz completed! Your score is ${score} out of ${questions.length}. An email has been sent to ${userEmail}.`);
        console.log("SUCCESS!", response.status, response.text);
    }).catch((error) => {
        alert("Failed to send email. Please try again. Check console logs for more details.");
        console.error("FAILED...", error);
    });
}

// Questions Array Example - Updated for 10 Questions
const questions = [
    {
        text: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctIndex: 2
    },
    {
        text: "Which language is primarily used for Android development?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correctIndex: 2
    },
    {
        text: "What is the largest planet in our solar system?",
        options: ["Mars", "Earth", "Jupiter", "Venus"],
        correctIndex: 2
    },
    {
        text: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium", "Olive"],
        correctIndex: 0
    },
    {
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Ernest Hemingway"],
        correctIndex: 1
    },
    {
        text: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctIndex: 1
    },
    {
        text: "What is the speed of light?",
        options: ["299,792 km/s", "150,000 km/s", "200,000 km/s", "1,000,000 km/s"],
        correctIndex: 0
    },
    {
        text: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctIndex: 0
    },
    {
        text: "What is the freezing point of water?",
        options: ["0°C", "100°C", "32°F", "0°F"],
        correctIndex: 0
    },
    {
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctIndex: 2
    }
];
