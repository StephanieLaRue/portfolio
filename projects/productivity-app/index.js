'use strict'

displayInput()
$(document).ready(function() {
  // $('#title').on('click', function() {
  //   $('#writePop').css('display', 'inline-block');
  // })
  //
  // $('#addDay').on('click', function() {
  //   $('#writePop').css('display', 'inline-block');
  // })

  // $(document).mouseup(function (e) {
  //   var pop = $('#writePop');
  //
  //   if(!pop.is(e.target)
  //     && pop.has(e.target).length === 0)
  //     {
  //       pop.hide();
  //     }
  // })

  $('#addDay').on('click', function() {
    createInput();
  })
})

let counterTotal = 0;

function displayInput() {
  let stringObject = localStorage.getItem('inputList');
  let parsedObject = JSON.parse(stringObject);

  let ul = document.getElementById('ulList');
  if(!parsedObject) { parsedObject = []; }

  for(let ind = 0; ind < parsedObject.length; ind++) {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    if(day < 10) {
      day = '0' + day;
    }

    if(month < 10) {
      month = '0' + month;
    }

    today = month + '/' + day + '/' + year;

    let date = document.createTextNode(today);

    let data = parsedObject[ind];
    let text = document.createTextNode(data)
    let li = document.createElement('li');
    let div = document.createElement('div');

    let div2 = document.createElement('div')


    div.id = 'data'+ind;
    div.className = 'appendedInput';
    div2.className = "inp";
    li.className = "li"
    div.appendChild(text);
    div2.appendChild(date)
    li.appendChild(div);
    li.appendChild(div2)

    ul.appendChild(li);

    let removeButton = document.createElement('button');
    let removeText = document.createTextNode('Remove');
    removeButton.className = "removeButton";
    removeButton.appendChild(removeText)
    li.appendChild(removeButton)


    removeButton.onclick = function () {
      parsedObject.splice(ind, 1)
      let stringObject = JSON.stringify(parsedObject)
      localStorage.setItem('inputList', stringObject)
      this.parentNode.parentNode.removeChild(this.parentNode);
    }

  }

  // let deleteList = document.getElementById('deleteList');
  // deleteList.addEventListener('click', () =>  {
  //   localStorage.removeItem('inputList');
  //   ul.innerHTML = ""
  // })
}

function createInput() {
    let storedObject = localStorage.getItem('inputList');
    let parsedObject = JSON.parse(storedObject);

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    if(day < 10) {
      day = '0' + day;
    }

    if(month < 10) {
      month = '0' + month;
    }

    today = month + '/' + day + '/' + year;
    let div = document.createElement('div')

    let date = document.createTextNode(today);
    div.className = 'appendedInput';
    div.appendChild(date)
    let li = document.createElement('li');
    let ul = document.getElementById('ulList');
    li.appendChild(div)
    ul.prepend(li)



    let div2 = document.createElement('div')
    let input = document.getElementsByClassName('fitList')
    Array.prototype.forEach.call(input, function(e) {
      let inputVal = e.options[e.selectedIndex].text
      if(e.options[e.selectedIndex].value == 0) {
        e.remove[e.selectedIndex]
      }
      else {

      let val = document.createTextNode(inputVal);



      div2.appendChild(val)
      li.appendChild(div2)

      let ul = document.getElementById('ulList');

      div2.className = "inp";
      li.className = "li"
      ul.prepend(li)
      console.log(inputVal)

      // document.getElementById('addInput').value = "";
      // if input val is empty return

      if(!parsedObject) { parsedObject = []; }

      parsedObject.unshift(inputVal)
      let stringObject = JSON.stringify(parsedObject);
      localStorage.setItem('inputList', stringObject)
      // document.getElementById('addInput').value = "";
      }
    })

}
