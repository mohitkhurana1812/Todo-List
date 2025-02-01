
const checkBoxList = document.querySelectorAll(".customCheckBox");
const goalInputList = document.querySelectorAll(".goalInput");
const progressBar = document.querySelector(".progressBar")
const progressValue = document.querySelector(".progressValue")
const firstInput = document.querySelector('#firstInput');
const secondInput = document.querySelector('#secondInput');
const thirdInput = document.querySelector('#thirdInput');
const quoteLabel = document.querySelector('.raiseText');
let inputPresent = true;

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let completedGoals = Object.values(allGoals).filter((obj) => obj.completed).length
progressValue.style.width = `${completedGoals/goalInputList.length * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoals}/${goalInputList.length} goals completed`;
const allQuotes = ["Raise the bar by completing your goals!","Well begun is half done!","Just a step away, keep going!","Whoa! You just completed all the goals, time for chill :D"]
quoteLabel.innerText = allQuotes[completedGoals];

checkBoxList.forEach((checkBox) => {
      checkBox.addEventListener('click', (e) => {
            inputPresent = true;
            goalInputList.forEach((input) => {
                  if (!input.value)
                  { inputPresent = false; }
            })
            if (inputPresent) {
                  checkBox.parentElement.classList.toggle('completed');
                  const id = checkBox.nextElementSibling.id;
                  allGoals[id].completed = !allGoals[id].completed;
                  completedGoals = Object.values(allGoals).filter((obj)=>obj.completed).length
                  progressValue.style.width = `${completedGoals/goalInputList.length * 100}%`;
                  progressValue.firstElementChild.innerText = `${completedGoals}/${goalInputList.length} goals completed`;
                  localStorage.setItem('allGoals', JSON.stringify(allGoals));
                  quoteLabel.innerText = allQuotes[completedGoals];
            }
            else
            {
                  progressBar.classList.add("showError");
                  
                  }
      })
      
})

goalInputList.forEach((input) => {
      input.value = allGoals[input.id] ? allGoals[input.id].name : '';
      if (allGoals[input.id] && allGoals[input.id].completed) {
            input.parentElement.classList.add('completed');
      }
      input.addEventListener('focus', () => {
            progressBar.classList.remove("showError");
      }
      )
      input.addEventListener('input', (e) => {
            if (allGoals[input.id] && allGoals[input.id].completed) {
                  e.target.value = allGoals[input.id].name ;
                  return;
            }
            allGoals[input.id] = { name: e.target.value, completed: false };
            localStorage.setItem('allGoals', JSON.stringify(allGoals));
      })
})
