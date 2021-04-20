
// The client-side storage with localStorage was implemented by following the Mozilla developers documentation Link: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
document.body.onload = dataCheck;

// constants for player data 
const rememberDiv = document.querySelector('.remember_name');
const forgetDiv = document.querySelector('.forget_name');
const form = document.querySelector('form');
const nameInput = document.querySelector('#putName');
const submitBtn = document.querySelector('#submitName');
const forgetBtn = document.querySelector('#forgetName');
const assistant = document.querySelector('#stored');

//prevent submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
});


// when "Save" button is clicked, do the checkData function and store the values of chosen assistant and name
submitBtn.addEventListener('click', function () {

    localStorage.setItem('assistant', assistant.value);
    localStorage.setItem('name', nameInput.value);
    dataCheck();

});

// when "Forget" button is clicked, do the checkData function and remove the values of chosen assistant and name
forgetBtn.addEventListener('click', function () {

    localStorage.removeItem('name');
    localStorage.removeItem('assistant')
    dataCheck();

});

// this  function checks if there is values on the name input and chosen option for the assistant
// if yes, hide save data and the inputs
// if not, hide the forget  data question with button
function dataCheck() {

    if (localStorage.getItem('name') && localStorage.getItem('assistant')) {

        forgetDiv.style.display = 'block';
        rememberDiv.style.display = 'none';
    } else {

        forgetDiv.style.display = 'none';
        rememberDiv.style.display = 'block';
    }
}
