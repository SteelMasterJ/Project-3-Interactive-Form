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
        nameWarning.style.display = 'none';
        return true;
    } else {
        name.style.borderColor = 'red';
        nameWarning.style.display = '';
        nameWarning.style.color = 'red';
        nameWarning.textContent = "Please input your name";
        return false;
    }
}

//assigning variable to name warning label div
let nameWarning = document.getElementById('name-warning');

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
    if (emailValue.length <= 0) {
        email.style.borderColor = 'red';
        emailWarning.style.display = '';
        emailWarning.style.color = 'red';
        emailWarning.textContent = "Please input an email";
        return false;
    }
    else if (atIndex >= 1 && periodLastIndex > (atIndex + 1)) {
        email.style.borderColor = 'white';
        emailWarning.style.display = 'none';
        return true;
      } else {
        email.style.borderColor = 'red';
        emailWarning.style.display = '';
        emailWarning.style.color = 'red';
        emailWarning.textContent = "Please input your email in a valid format (Joey@example.com)";
        return false;
      }
}

//assigning variable to email warning label div
let emailWarning = document.getElementById('email-warning');

    //real time validation event listener for Email input
email.addEventListener('blur', (e) => {
    emailValidation();
  });

    //activities checkbox validation function
function activitiesValidation() {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            // activities.removeChild(activitiesWarning);
            activitiesWarning.style.display = 'none';
            return true;
          } 
    }
    activitiesWarning.style.display = '';
    activitiesWarning.textContent = 'Please select at least one activity';
    return false;
}

//created a warning variable to be displayed if no activiy is selected
let activitiesWarning = document.createElement('div');
activitiesWarning.style.color = 'red';
activities.appendChild(activitiesWarning);

//real time activities validation
activities.addEventListener('click', (e) => {
    activitiesValidation();
});


//function to validate credit card field
function cardNumberValidation() {
    let ccValue = ccNumber.value;
    if (payment[1].selected && /^\d{13,16}$/.test(ccValue)) {
        ccNumber.style.borderColor = '';
        ccWarning.style.display = 'none';
        return true
    } else {
        ccNumber.style.borderColor = 'red';
        ccWarning.style.display = '';
        ccWarning.style.color = 'red';
        ccWarning.textContent = "Credit Card numbers must be between 13-16 digits";
        return false;
    }
}

//assigning variable to cc warning label div
let ccWarning = document.getElementById('cc-warning');

//real time credit card form validation event listener
ccNumber.addEventListener('blur', cardNumberValidation);

//function to validate zip code
function zipValidation() {
    let zipValue = zipCode.value;
    if (payment[1].selected && /^\d{5}$/.test(zipValue)) {
        zipCode.style.borderColor = '';
        zipWarning.style.display = 'none';
        return true
    } else {
        zipCode.style.borderColor = 'red';
        zipWarning.style.display = '';
        zipWarning.style.color = 'red';
        zipWarning.textContent = "Zip Codes must be 5 digits";
        return false;
    }
}

//assigning variable to zip warning label div
let zipWarning = document.getElementById('zip-warning');

//real time zip code form validation event listener
zipCode.addEventListener('blur', zipValidation);

//function to validate CVV input
function cvvValidation() {
    let cvvValue = cvv.value;
    if (payment[1].selected && /^\d{3}$/.test(cvvValue)) {
        cvv.style.borderColor = '';
        cvvWarning.style.display = 'none';
        return true
    } else {
        cvv.style.borderColor = 'red';
        cvvWarning.style.display = '';
        cvvWarning.style.color = 'red';
        cvvWarning.textContent = "CVV must be 3 digits";
        return false;
    }
}

//assigning variable to cvv warning label div
let cvvWarning = document.getElementById('cvv-warning');

//real time cvv validation event listener
cvv.addEventListener('blur', cvvValidation);

//removing cc real time validation if paypal or bitcoin are selected
payment.addEventListener('change', (e) => {
    if (payment[3].selected || payment[2].selected) {
        cvv.removeEventListener('blur', cvvValidation);
        zipCode.removeEventListener('blur', zipValidation);
        ccNumber.removeEventListener('blur', cardNumberValidation);
        console.log('event remover for bitcoin/ paypal is working');
    }
    if (payment[1].selected) {
        cvv.addEventListener('blur', cvvValidation);
        zipCode.addEventListener('blur', zipValidation);
        ccNumber.addEventListener('blur', cardNumberValidation);
        console.log('event adder for cc is working');
    }
});

//form submission validation event listener
button.addEventListener('click', (e) => {
    console.log('form submission event listener is functional');
    //e.preventDefault();
    // nameValidation();
    // emailValidation();
    // activitiesValidation();
    // cardNumberValidation(ccNumber.value);
    // zipValidation(zipCode.value);
    // cvvValidation(cvv.value);
    if (!nameValidation()) {
        e.preventDefault();
        console.log('name validation is working');
    }
    if (!emailValidation()) {
        e.preventDefault();
    }
    if (!activitiesValidation()) {
        e.preventDefault();
    }
    if (payment[1].selected) {
        if (!cardNumberValidation(ccNumber.value) && !zipValidation(zipCode.value) && !cvvValidation(cvv.value)) {
            e.preventDefault();
        }
    }
});