$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body'
  })
})

// function getBlogDate() {
//   let date = new Date();
//   let day = date.getDate();
//   // day = day.length < 10 ? day : '0' + day;
//   if(day < 10) {
//     day = '0' + day;
//   }
//
//   let month = date.getMonth();
//   let matchMonth = [
//     "January", "February", "March",
//     "April", "May", "June", "July",
//     "August", "September", "October",
//     "November", "December"
//   ];
//
//   let year = date.getFullYear();
//   let displayDate = matchMonth[month] + ' ' + day + ',' + ' '+ year
//
//   $('p[name="date"]').each(function(ele,ind) {
//     this.innerHTML = displayDate
//   })
// }
//
// getBlogDate()




function contactForm() {
  let submitForm = document.getElementById('submitContactForm')
  submitForm.onclick = function() {
    let inputVals = document.getElementsByClassName('input');
    for(let ind = 0; ind < inputVals.length; ind++) {
      if(inputVals[ind].value == "") {
        alert('Please fill out the form before submitting.')
        return;
      }
    }
    getVals();
  }

  // function validateEmail() {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if()
  // }

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
    .then(res => res.text())
    .then(function(data) {
      console.log(data);
      let confirm = document.getElementById('textArea')
      confirm.innerHTML = data;
    })
    .catch(error => console.error('Error:', error))
  }
}
contactForm()
