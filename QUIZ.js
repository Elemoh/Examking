let timer;
let timeLeft = 120; // 2 minutes
let currentQuestion = 0;
const questions = [
    {
        question: "What is the synonym of 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        answer: 1
    },
    {
        question: "What does 'benevolent' mean?",
        options: ["Kind", "Mean", "Greedy", "Selfish"],
        answer: 0
    },
    {
        question: "Choose the correctly spelled word.",
        options: ["Acomodate", "Accommodate", "Acommodate", "Accomodete"],
        answer: 1
    },
    {
        question: "Which sentence is grammatically correct?",
        options: [
            "He go to the store.",
            "He goes to the store.",
            "He gone to the store.",
            "He going to the store."
        ],
        answer: 1
    },
    {
        question: "What is the opposite of 'difficult'?",
        options: ["Easy", "Hard", "Tough", "Complicated"],
        answer: 0
    },
    {
        question: "What does 'emulate' mean?",
        options: ["To copy", "To ignore", "To help", "To hate"],
        answer: 0
    },
    {
        question: "Select the antonym of 'generous'.",
        options: ["Giving", "Selfish", "Open-handed", "Charitable"],
        answer: 1
    },
    {
        question: "What does 'meticulous' mean?",
        options: ["Careless", "Detailed", "Quick", "Hasty"],
        answer: 1
    },
    {
        question: "What is a synonym for 'benevolent'?",
        options: ["Unkind", "Charitable", "Mean", "Greedy"],
        answer: 1
    },
    {
        question: "Choose the correct past tense of 'go'.",
        options: ["Gone", "Goes", "Went", "Going"],
        answer: 2
    }
];
let score = 0;

function startQuiz() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert("Please enter your name.");
        return; // Prevents starting the quiz if the name is empty
    }
    
    document.getElementById('user-name').innerText = username;
    
    // Display the subject
    const subject = "English Language";
    document.getElementById('subject-name').innerText = subject;

    document.getElementById('login').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    startTimer();
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = Math.floor(timeLeft / 60) + ':' + (timeLeft % 60).toString().padStart(2, '0');
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    
    questionElement.innerText = questions[currentQuestion].question;
    answersElement.innerHTML = '';

    questions[currentQuestion].options.forEach((option, index) => {
        answersElement.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${index}"> ${option}
            </label><br>
        `;
    });

    document.getElementById('question-number').innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please choose an answer.");
        return; // Prevents moving to the next question if no answer is selected
    }

    const answerIndex = parseInt(selectedOption.value);
    if (answerIndex === questions[currentQuestion].answer) {
        score++;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitQuiz() {
    clearInterval(timer);
    
    // Get the subject name
    const subject = document.getElementById('subject-name').innerText;
    
    // Calculate the score message, including the subject
    const scoreMessage = `User ${document.getElementById('user-name').innerText} scored ${score} out of ${questions.length} in ${subject}.`;
    
    // Display the score result
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `${score} out of ${questions.length}`;

    // Create WhatsApp link
    const whatsappNumber = "YOUR_ADMIN_WHATSAPP_NUMBER"; // Replace with the admin's WhatsApp number
    const whatsappMessage = encodeURIComponent(scoreMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000); // Redirect after 2 seconds
}
