import { verbSet } from './verbSet.js'
import { qs } from './questionSet.js'

const home = id('home')

const tenseContainer = id('tenseContainer')
const grammarContainer = id('grammarContainer')
const practiceContainer = id('practiceContainer')
const summaryContainer = id('summaryContainer')
const sideBarContainer = id('sideBarContainer')
const grammarBox = id('grammarBox')

const sectionBtns = document.querySelectorAll('[data-practice-btn]')

const headerEl = id('header')

// The questions variable (pulled from questionSet.js) + chosenSub. eg... questions.present
let questionSet
// The questions variable + chosenSub + position of current item in the chosenSub. eg... questions.present[0]
let questionIndex = 0
// User's answer to each questions is assigned to this variable
let userAnswer
// After user answers question, it is pushed to this array
let ansArr = []
// Last 10 wrong answers
let wrongAnsHist = []
// Final score
let finalScore = {date: null, correct: 0, total: 0}
// Score history
let scoreHistory = []

// Responsive design
// Fill out question set

home.addEventListener('click', () => {
    const retHome = function () {
        tenseContainer.style.display = 'flex'
        practiceContainer.style.display = 'none'
        sideBarContainer.style.display = 'block'
        grammarContainer.style.display = 'none'
        headerEl.innerHTML = `<h1>Practice</h1>`
        questionSet = undefined
    }

    if (questionSet !== undefined) {
        if (confirm('If you select OK, your current test will not be saved.') === true) retHome()
    } else {
        retHome()
    }
})

// Assign question set
sectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnDataSet = btn.dataset.practiceBtn
        if(qs.hasOwnProperty(btnDataSet)) {
            finalScore.tense = qs[btnDataSet].tense
            questionSet = qs[btnDataSet].questions
            loadQuestions(questionSet[questionIndex])
            tenseContainer.style.display = 'none'
            practiceContainer.style.display = 'block'
            sideBarContainer.style.display = 'none'
            headerEl.innerHTML = `<h1>${qs[btnDataSet].tense}</h1>`
        } else {
            alert('Sorry, your choice doesn\'t exist yet')
        }
    })
})

// Render question next question to screen
function loadQuestions(item) {
    if (questionIndex < questionSet.length) {
        // generateTemplate(item)
        genTemp(item)
        const submitBtn = id('submitBtn')
        const nextBtn = id('nextBtn')
        // If a multiple choice question, assign the user's answer to a variable called userAnswer
        const userAnswerEl = id('userAnswerEl')
        if (item.type === 'multipleChoice') {
            const userAnsBtn = document.querySelectorAll('[data-ans-btn]')
            userAnsBtn.forEach(ansBtn => {
                ansBtn.addEventListener('click', () => {
                    userAnswer = ansBtn.dataset.ansBtn
                    highlight()
                })
            })
            // Higlight the choice
            function highlight() {
                userAnsBtn.forEach(ansBtn => {
                    if(ansBtn.dataset.ansBtn === userAnswer) {
                        ansBtn.style.backgroundColor = 'var(--sec-clr)'
                        ansBtn.style.color = 'var(--trim-txt)'
                    } else {
                        ansBtn.style.backgroundColor = ''
                        ansBtn.style.color = ''
                    }
                })
            }

        }
        submitBtn.addEventListener('click', () => {
            if (item.type === 'write') userAnswer = userAnswerEl.value
            submitBtn.style.display = 'none'
            assignAnswer(item)
            nextBtn.style.display = 'block'        
        })
    } else {
        practiceContainer.style.display = 'none'
        summary()
        headerEl.innerHTML = '<h1>Summary</h1>'
        id('scoreContainer').innerHTML = score(ansArr)
        id('finishBtn').addEventListener('click', () => {
            resetState()
            id('finishBtn').style.display = 'none'
            id('summaryBoxContainer').innerHTML = ''
            headerEl.innerHTML = `<h1>Practice</h1>` // Change to be tense
            summaryContainer.style.display = 'none'
            tenseContainer.style.display = 'block'
            sideBarContainer.style.display = 'block'
            scoreTemp()
        })
    }
}

// Assigns the user answer to a variable
function assignAnswer(item) {
    checkAnswer(item)
    nextBtn.addEventListener('click', () => {
        questionIndex++
        headerEl.innerHTML = `<h1>Practice</h1>` // Change to be tense
        headerEl.style.backgroundColor = ''
        loadQuestions(questionSet[questionIndex])
    })
}

// Checks user answer against actual answer and saves it to object
function checkAnswer(item) {
    questionSet[questionIndex].userAnswer = userAnswer
    finalScore.date = dateFormat()
    finalScore.total++
    if (userAnswer === questionSet[questionIndex].answers.correct) {
        finalScore.correct++
        headerEl.innerHTML = `<h1>Correct</h1>`
        headerEl.style.backgroundColor = 'var(--correct)'
        questionSet[questionIndex].correct = true
        playaudio(item.fullText, 1)
    } else {
        headerEl.innerHTML = `<h1>Wrong</h1>`
        headerEl.style.backgroundColor = 'var(--incorrect)'
        questionSet[questionIndex].correct = false
        wrongAnsHist.push(questionSet[questionIndex])
    }
    ansArr.push(questionSet[questionIndex])
}

// Work out in-test scoring
function score(item) {
    let correctScore = 0
    for (let i = 0; i < item.length; i++) {
        if (item[i].correct === true) {
            correctScore++
        }
    }
    return `<p><span style="font-weight: 900">Score: </span>${correctScore} / ${item.length}</p>`
}

// Generates template for each question before rendering to screen
function genTemp(item) {
    const tempType = () => {
        if(item.type === 'write') {
            return `
                <textarea name="" id="userAnswerEl" cols="30" rows="10"></textarea>
            </div>
            `
        }    
        if(item.type === 'multipleChoice') {
            return `
            </div>
            <div class="flex-col">
                <button class="ans-btn" id="ansBtn" data-ans-btn="${item.answers.other[0]}">${item.answers.other[0]}</button>
                <button class="ans-btn" id="ansBtn" data-ans-btn="${item.answers.correct}">${item.answers.correct}</button>
                <button class="ans-btn" id="ansBtn" data-ans-btn="${item.answers.other[1]}">${item.answers.other[1]}</button>
            </div>
            `
        }
    }

    const html = `
    <div class="text-sm" id="textSmEl">
        <h3 id="titleEl">${item.instuction}</h3>
        <div class="flex-col">
            <div class="flex-col translate-box">
                <p>${item.text}</p>
                ${tempType()}
            <div>
                <button class="btn btn-submit" id="submitBtn">Submit</button>
                <button class="btn btn-next" id="nextBtn">Next</button>
            </div>
        </div>
    </div>
    `
    practiceContainer.innerHTML = html
}

// Generates and renders summary to screen after user has answered questions
function summary() {
    summaryContainer.style.display = 'flex'
    ansArr.forEach(ans => {
        const correctHtml= `
        <h4>Correct answer:</h4> 
        <p>${ans.answers.correct}</p>
        `
        const ansCorrect = () => ans.correct === true ? 'correct' : 'incorrect'
        const showCorrect = () => ans.correct === false ? correctHtml : ''
        const summary = `
        <div class="summary-item">
            <div class="summary-box ${ansCorrect()}">
                <h3>${ans.instuction}</h3>
                <p>${ans.fullText}</p>
                <h4>Your answer:</h4> 
                <p>${ans.userAnswer}</p>
                ${showCorrect()}
            </div>
        </div>
        `
        id('summaryBoxContainer').innerHTML += summary
    })
    id('finishBtn').style.display = 'block'
    if(scoreHistory.length < 5) {
        scoreHistory.push(finalScore)
      } else {
        scoreHistory.splice(0,1)
        scoreHistory.push(finalScore)
      }
}

// Render score history template to screen
function scoreTemp() {
    id('scoreEl').innerHTML = ''
    scoreHistory.forEach(score => {
        id('scoreEl').innerHTML += `
        <div class="text-sm">
            <h4>${score.tense}</h4>
            <p>${score.date}</p>
            <p>Score: ${score.correct} / ${score.total}</p>
        </div>
        `
    })
}

// Format date
function dateFormat() {
    const daysofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date()
    const dayWeek = daysofWeek[date.getDay()]
    let day = date.getDate()
    let month = monthName[date.getMonth() + 1]
    const year = date.getFullYear()
    let hour = date.getHours()
    let mins = date.getMinutes()
    hour = addZero(hour)
    mins = addZero(mins)

    return `${dayWeek} ${day} ${month} ${year} @ ${hour}: ${mins}`

    function addZero(el) {
        if (el < 10) {
            return `0${el}`
        } else {
            return el
        }
    }
}

// Grammar element
verbSet.forEach(verb => {
    id('grammarEl').innerHTML += `
    <div class="text-sm grammar-card">
        <button class="btn btn-gram" data-ele="${verb.tense}">GO</button>
        <p>${verb.tense}</p>
    </div>`
})

const gramEl = document.querySelectorAll('[data-ele]')
gramEl.forEach(grEl => {
    grEl.addEventListener('click', () => {
        const subject = grEl.dataset.ele
        const vs = Object.values(verbSet)
        for (let i = 0; i < vs.length; i++) {
            if (vs[i].tense === subject) genGrammarTemp(vs[i])
        }
    })
})

function genGrammarTemp(item) {
    tenseContainer.style.display = 'none'
    grammarContainer.style.display = 'flex'
    headerEl.innerHTML = `<h1>${item.tense}</h1>`
    grammarBox.innerHTML = `<div>
        <p>${item.info}</p>`
        genSectionTemp(item)
        
        
}

function genSectionTemp(item) {
    item.types.forEach(itemType => {
        genTableTemp(itemType)
    })
}

function genTableTemp(item) {
    item.examples.forEach(item => {
        grammarBox.innerHTML += `
    <h4>${item.ending} verbs use the following endings:</h4>
        <table class="ex-table">
            <tr>
                <th>Pronoun</th>
                <th>${item.ending}</th>

                <th>Pronoun</th>
                <th>${item.ending}</th>
            </tr>
            <tr>
                <td class="grTr">Yo</td>
                <td>${item.conj.yo}</td>

                <td class="grTr">Nosotros</td>
                <td>${item.conj.nosotros}</td>
            </tr>
            <tr>
                <td class="grTr">Tú</td>
                <td>${item.conj.tu}</td>

                <td class="grTr">Vosotros</td>
                <td>${item.conj.vosotros}</td>
            </tr>
            <tr>
                <td class="grTr">El / Ella / Usted</td>
                <td>${item.conj.el}</td>

                <td class="grTr">Ellos / Ellas / Ustedes</td>
                <td>${item.conj.ustedes}</td>
            </tr>
        </table>
    `
    })
}

// Play audio at end of each correct answer
function playaudio(text, speed) {
    const speech = new SpeechSynthesisUtterance()
    if(speechSynthesis.speaking) return
    speech.lang = 'es-ES'
    speech.text = text
    speech.rate = speed || 1
    speechSynthesis.speak(speech)
}

// Reset state
function resetState() {
    questionSet = ''
    questionIndex = 0
    userAnswer = ''
    ansArr = []
    finalScore = {correct: 0, total: 0}
}

// Helper
function id(id) {
    return document.getElementById(id)
}