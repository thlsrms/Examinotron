'use strict';
const submitQuizBtn = document.getElementById('submitQuiz');
const quizResultModal = document.getElementById('quizResultModal');
const closeModal = document.getElementById('closeModal');

for (const form of document.forms) {
    form.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() == 'input') {
            sessionStorage.setItem(e.target.closest('.question').id, e.target.value)
        }
    })
}

const makeItBold = (element) => {
    let bElement = document.createElement('b');
    element.parentNode.insertBefore(bElement, element);
    bElement.appendChild(element);
}

submitQuizBtn.onclick = async () => {
    let answers = await axios.get('api/questions/answers');
    let correctAnswers = 0;
    let wrongAnswers = 0;
    answers.data.forEach(question => {
        let selectedOption = sessionStorage.getItem(question._id);
        if (question.correctAns == selectedOption) {
            correctAnswers += 1;
            document.getElementById(`${selectedOption}_${question._id}_label`).classList.add('correct', 'solution');
            makeItBold(document.getElementById(`${selectedOption}_${question._id}_label`));
        } else {
            wrongAnswers += 1;
            if (selectedOption) {
                makeItBold(document.getElementById(`${selectedOption}_${question._id}_label`));
                document.getElementById(`${selectedOption}_${question._id}_label`).classList.add('wrong');
            }
            makeItBold(document.getElementById(`${question.correctAns}_${question._id}_label`));
            document.getElementById(`${question.correctAns}_${question._id}_label`).classList.add('solution');
        }
    });

    document.getElementById('rightAnswersAmount').innerHTML = correctAnswers;
    document.getElementById('wrongAnswersAmount').innerHTML = wrongAnswers;
    document.getElementById('totalScore').innerHTML = correctAnswers - (Math.floor(wrongAnswers / 3));

    quizResultModal.style.display = 'block';
}

closeModal.onclick = () => quizResultModal.style.display = 'none';

window.onclick = (e) => {
    if (e.target == quizResultModal) {
        quizResultModal.style.display = 'none';
    }
}

window.onbeforeunload = (e) => {
    sessionStorage.clear();
}