//global variable declarations
const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('mail');
const otherTitle = document.getElementById('other-title');
const title = document.getElementById('title');
const colors = document.getElementById('colors-js-puns');
const color = document.getElementById('color');
const designTheme = document.getElementById('design');
const activities = document.querySelector('.activities')
const checkboxes = document.querySelectorAll('.activities input');
const payment = document.getElementById('payment');
const ccNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const button = document.querySelector('button');

//Make the focus go to the name input field upon page load
name.focus();

//Hide the "other-title" input field when it is not chosen in the drop down for job role.
otherTitle.style.display = 'none';

//Show the 'other-title' input field when "other" is selected from the job role drop down.
title.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherTitle.style.display = '';
    } else {
        otherTitle.style.display = 'none';
    }
});

//Hide the 'colors-js-puns' div until a theme is chosen
colors.style.display = 'none';

//Show the 'colors-js-puns' div when a theme is selected
designTheme.addEventListener('change', (e) => {
    if (e.target.value === 'js puns') {
        colors.style.display = 'block';
        for (let i = 0; i <= 5; i++) {
            color[i].style.display = 'block';
        }
        for (let i = 3; i <= 5; i++) {
            color[i].style.display = 'none';
        }
        color[0].selected = true;
    } else if (e.target.value === 'heart js') {
        colors.style.display = 'block';
        for (let i = 0; i <= 5; i++) {
            color[i].style.display = 'block';
        }
        for (let i = 0; i <= 2; i++) {
            color[i].style.display = 'none';
        }
        color[3].selected = true;
    } else {
        colors.style.display = 'none';
    }
});

//event listener for 'activities'
activities.addEventListener('change', (e) => {
    let clicked = e.target;
    let clickedTime = clicked.getAttribute('data-day-and-time');
    //console.log(clicked);
    //console.log(clickedTime);
    for (let i = 0; i < checkboxes.length; i++) {
        
        let checkboxTime = checkboxes[i].getAttribute('data-day-and-time');
        if (clickedTime == checkboxTime && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
                checkboxes[i].parentNode.className = 'inactive';
            } else {
                checkboxes[i].parentNode.classList.remove('inactive');
                checkboxes[i].disabled = false;
            }

        }
    }
});

//declaring the variables that will hold the total cost of the selected activities, and appending it to the activities fieldset.
let htmlTotal = document.getElementById('total-cost');
htmlTotal.hidden = true;
let clickedCost = 0;

//running total functions to be called when activities are clicked
function addTotal(additive) {
    clickedCost += additive;
}

function minusTotal(subtractant) {
    clickedCost -= subtractant;
}

//event listener to append the total cost to the end of the activities section
activities.addEventListener('change', (e) => {
    let clicked = e.target;
    if (e.target.checked) {
        addTotal(Number(clicked.getAttribute('data-cost')));
    } else {
        minusTotal(Number(clicked.getAttribute('data-cost')));
    }
    if (clickedCost == 0) {
        htmlTotal.style.display = 'none';
    }
    if (clickedCost > 0) {
        htmlTotal.style.display = 'block';
        // htmlTotal.hidden = false;
        htmlTotal.innerHTML = `Total Cost $${clickedCost}`;
    }
});

//making credit card the default selected option for payment
payment[1].selected = true;

//hiding paypal and bitcoin payment options to start
document.getElementById('paypal').style.display = 'none';
document.getElementById('bitcoin').style.display = 'none';

//event listener that hides the non-selected payment options info
payment.addEventListener('change', (e) => {
    document.getElementById('paypal').style.display = 'block';
    document.getElementById('bitcoin').style.display = 'block';
    document.getElementById('credit-card').style.display = 'block';
    if (e.target.value === 'credit card') {
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'none';
    } else if (e.target.value === 'paypal') {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('paypal').style.display = 'none';
    }
});

//Name validation function
function nameValidation() {
    const nameValue = name.value;
    console.log(nameValue);
    if (nameValue.length > 0) {
        name.style.borderColor = 'white';
        return true;
    } else {
        name.style.borderColor = 'red';
        return false;
    }
}

//real time validation event listener for Name input
name.addEventListener('blur', (e) => {
    nameValidation();
  });

  //email validation function
function emailValidation() {
    const emailValue = email.value;
    console.log(emailValue);
    let atIndex = emailValue.indexOf('@');
    let periodLastIndex = emailValue.lastIndexOf('.');
    if (atIndex >= 1 && periodLastIndex > (atIndex + 1)) {
        email.style.borderColor = 'white';
        return true;
      } else {
        email.style.borderColor = 'red';
        return false;
      }
}

    //real time validation event listener for Email input
email.addEventListener('blur', (e) => {
    emailValidation();
  });

    //checkbox validation function
function activitiesValidation() {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            activities.style.borderColor = '';
            return true;
          }
        let activitiesWarning = document.createElement('div');
        activitiesWarning.textContent = 'Please select at least one activity';
        activitiesWarning.style.color = 'red';
        activities.appendChild(activitiesWarning);
        return false;
    }
}

//function to validate credit card field
function cardNumberValidation(number) {
    if (payment[1].selected && /^\d{13,16}$/.test(number)) {
        ccNumber.style.borderColor = '';
        return true
    } else {
        ccNumber.style.borderColor = 'red';
        return false;
    }
}

//real time credit card form validation event listener
ccNumber.addEventListener('blur', (e) => {
    cardNumberValidation(ccNumber.value);
  });

//function to validate zip code
function zipValidation(zip) {
    if (payment[1].selected && /^\d{5}$/.test(zip)) {
        zipCode.style.borderColor = '';
        return true
    } else {
        zipCode.style.borderColor = 'red';
        return false;
    }
}

//real time zip code form validation event listener
zipCode.addEventListener('blur', (e) => {
    zipValidation(zipCode.value);
  });

//function to validate CVV input
function cvvValidation(cvvNumber) {
    if (payment[1].selected && /^\d{3}$/.test(cvvNumber)) {
        cvv.style.borderColor = '';
        return true
    } else {
        cvv.style.borderColor = 'red';
        return false;
    }
}

//real time cvv validation event listener
cvv.addEventListener('blur', (e) => {
    cvvValidation(cvv.value);
  });

//form submission validation event listener
button.addEventListener('click', (e) => {
    console.log('form submission event listener is functional');
    e.preventDefault();
    nameValidation();
    emailValidation();
    activitiesValidation();
    cardNumberValidation(ccNumber.value);
    zipValidation(zipCode.value);
    cvvValidation(cvv.value);
});