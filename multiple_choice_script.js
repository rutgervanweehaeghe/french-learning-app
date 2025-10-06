const allVocabulary = [...vocabularyList_school, ...vocabularyList_sports];
let correctAnswer = "";
let questionCount = 0;
const totalQuestions = 20;

// Shuffle helper
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate a new question
function generateQuestion() {
    const [french, english] = allVocabulary[Math.floor(Math.random() * allVocabulary.length)];
    correctAnswer = english;

    // Get wrong answers
    const wrongChoices = shuffleArray(
        allVocabulary.filter(([_, eng]) => eng !== english).map(([_, eng]) => eng)
    ).slice(0, 3);

    // Combine and shuffle answers
    const choices = shuffleArray([correctAnswer, ...wrongChoices]);

    // Update question text
    const questionEl = document.getElementById("question");
    questionEl.textContent = `What is the English translation of "${french}"?`;

    // Update buttons
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((btn, index) => {
        btn.textContent = choices[index];
        btn.onclick = () => checkAnswer(choices[index]);
    });

    // Reset result and hide next button
    document.getElementById("result").textContent = "";
    document.getElementById("next-btn").style.display = "none";

    buttons.forEach((btn) => {
        btn.classList.remove("correct", "incorrect");
        btn.disabled = false;
    });
}

// Handle answer selection
function checkAnswer(selected) {
    const result = document.getElementById("result");
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn) => {
        if (btn.textContent === selected) {
            if (selected === correctAnswer) {
                btn.classList.add("correct");
            } else {
                btn.classList.add("incorrect");
            }
        }
    });

    if (selected === correctAnswer) {
        result.textContent = "Correct!";
        result.style.color = "lightgreen";
        document.getElementById("next-btn").style.display = "block";
    } else {
        result.textContent = `Wrong!`;
        result.style.color = "lightcoral";
    }
}

// Progress bar logic
function updateProgressBar() {
    questionCount++;
    const progressBar = document.getElementById("progress-bar-fill");
    const progressCounter = document.getElementById("progress-counter");
    const progressIcon = document.getElementById("progress-icon");
    const goalMessage = document.getElementById("goal-message");

    const percentage = Math.min((questionCount / totalQuestions) * 100, 100);
    progressBar.style.width = `${percentage}%`;
    progressCounter.textContent = `${questionCount} / ${totalQuestions}`;

    if (questionCount === totalQuestions) {
        progressBar.classList.add("celebration");
        progressIcon.textContent = "🥇";

        // 🎯 Show goal reached message
        goalMessage.classList.add("show");

        // 🎉 Optional background celebration
        document.body.classList.add("confetti");
        setTimeout(() => document.body.classList.remove("confetti"), 3000);
    }
}

// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-btn").addEventListener("click", () => {
        generateQuestion();
        updateProgressBar();
    });

    generateQuestion(); // first question
});
