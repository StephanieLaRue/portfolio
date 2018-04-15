$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body'
  })
})

function contactForm() {
  let submitForm = document.getElementById('submitContactForm')
  submitForm.onclick = function() {
    let inputVals = document.getElementsByClassName('input');
    let checkVals = [];
    for(let ind = 0; ind < inputVals.length; ind++) {
      checkVals.push(inputVals[ind].value)
    }

    let filter = checkVals.filter(vals) 
    
    function vals(el, ind) {
      if(el !== "") {
        return true;   
      }
      else {return false;}
    }

    if(filter.length !== 3) {
      alert('Please fill out the form before submitting.')
      return;
    }
    else {
      checkEmail()
    }
  }

  function checkEmail() {
    let email = document.getElementById('emailInput').value
    email = email.trim()
    if(validateEmail(email)) {
      getVals();
    }
    else {
      alert('Please enter a valid email address.')
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function clearForm() {
    let inputVals = document.getElementsByClassName('input');
    for(let ind = 0; ind < inputVals.length; ind++) {
      inputVals[ind].value = "";
    }
  }

  function confirmMessageSent(data) {
    console.log(data);
    let confirm = document.getElementById('textArea')
    confirm.value = data;
    confirm.setAttribute("style", "color: rgb(18, 69, 157); text-align: center")
    let time;
    confirmationTimer(time)
  }

  function confirmationTimer(time) {
    let text = document.getElementById('textArea')
    time = setTimeout(function(){
      text.value = "";
      text.removeAttribute("style", "color: rgb(18, 69, 157); text-align: center")
    }, 4000)
  }

  function getVals() {
    let inputArr = []
    let dataObj = {
      name: '',
      email: '',
      message: ''
    }
    let inputVals = document.getElementsByClassName('input');
    for(let ind = 0; ind < inputVals.length; ind++) {
      // to give prop names during loop
      // let inputId = inputVals[ind].id.replace("Input", "")
      // dataObj[inputId] = inputVals[ind].value
      // global dataObj would be empty {}
      inputArr.push(inputVals[ind].value)
    }
    dataObj.name = inputArr[0]
    dataObj.email = inputArr[1]
    dataObj.message = inputArr[2]
    sendData(dataObj)
    clearForm()
  }


  function sendData(dataObj) {
    let params = {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataObj)
    }
    fetch(`${location.origin}/contact`, params)
    .then(function(res) {
      return res.text()
    })
    .then(function(data) {
      confirmMessageSent(data)
    })
    .catch(error => console.error('Error:', error))
  }
}
contactForm()