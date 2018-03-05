$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body'
  })
})

function getBlogDate() {
  let date = new Date();
  let day = date.getDate();
  day = day.length > 1 ? day : '0' + day;

  let month = date.getMonth();
  let matchMonth = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let year = date.getFullYear();
  let displayDate = matchMonth[month] + ' ' + day + ',' + ' '+ year

  $('p[name="date"]').each(function(ele,ind) {
    this.innerHTML = displayDate
  })
}
getBlogDate()




function contactForm() {
  let submitForm = document.getElementById('submitContactForm')
  submitForm.onclick = function() {
    getVals();
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
      inputArr.push(inputVals[ind].value)
    }
    dataObj.name = inputArr[0]
    dataObj.email = inputArr[1]
    dataObj.message = inputArr[2]
    sendData(dataObj)
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
  }
}
contactForm()
