"use strict";

displayList();

function displayList() {
    let stringObject = localStorage.getItem('createdList');
    let parsedObject = JSON.parse(stringObject);
    let ul = document.getElementById('list');

    if(!parsedObject) { parsedObject = []; }
    // loop through the parsedObject array
    document.getElementById('list').innerHTML = "";
    for (let ind = 0; ind < parsedObject.length; ind++) {
        // store each instance/loop of the user's input in the inputData variable
        let inputData = parsedObject[ind];
        //create a text node of the data and store it in inputText
        let inputText = document.createTextNode(inputData)
        let listDiv = document.createElement('div');
        let li = document.createElement('li');
        li.className = 'listItem';
        // div needs class names and id. classnames to style all elements and an id to manipulate one item
        listDiv.className = 'listDiv';
        // give an element an id and apply its index(for use when manipulating only a single element)
        listDiv.id = 'listIndex'+ind;

        // append the inputtext/data to a div item
        listDiv.appendChild(inputText)
        //append each div to a list item
        li.appendChild(listDiv);
        //append each list item to the unordered list
        ul.appendChild(li)

        let removeItem = document.createElement('button');
        let removeItemText = document.createTextNode('Remove Item');
        removeItem.className = 'removeItemButton';
        removeItem.appendChild(removeItemText);
        li.appendChild(removeItem);

        let editButton = document.createElement('button');
        let editButtonText = document.createTextNode('Edit');
        editButton.className = 'editButton';

        editButton.appendChild(editButtonText);
        li.appendChild(editButton);

        let saveButton = document.createElement('button');
        let saveButtonText = document.createTextNode('Save');
        saveButton.className = 'saveButton';

        saveButton.appendChild(saveButtonText);
        li.appendChild(saveButton);


        removeItem.onclick = function() {
                //remove a single array element from the specified index
                parsedObject.splice(ind, 1)
                // stringify the array
                let stringObject = JSON.stringify(parsedObject);
                // reset the list to localstorage without the removed element
                localStorage.setItem('createdList', stringObject);
                // remove the element from its parent/the list
                this.parentNode.parentNode.removeChild(this.parentNode);
        }

        editButton.onclick = function() {
                // stop display of edit button on click
                editButton.style.display = 'none';
                // display save button
                saveButton.style.display = 'block';
                parsedObject[ind] = listDiv.innerHTML = '';
               // Create a textarea on button click
                let inputEditable = document.createElement('textarea');
                //create the type of info the textarea accepts and give it a name
                inputEditable.name = 'edited';
                inputEditable.id = 'edited'+ind;
                // get the id for the div element + the index of the specific element, append the editableinput to the div
                document.getElementById('listIndex'+ind).appendChild(inputEditable);
        };


        saveButton.onclick = function() {
            // stop display of edit button on click
            editButton.style.display = 'block';
            // display save button
            saveButton.style.display = 'none';
            let text = document.getElementById('edited'+ind)
            parsedObject[ind] = text.value;
            let stringObject = JSON.stringify(parsedObject);
            localStorage.setItem('createdList', stringObject);
            // console.log(stringObject)
            let textarea = document.getElementById('edited'+ind);
            let editedInput = document.getElementById('listIndex'+ind);
            editedInput.removeChild(textarea);
            editedInput.innerHTML = text.value
        };

    }

    // delete the entire list from localstorage and the browser
    let deleteList = document.getElementById('deleteListButton');
    deleteListButton.addEventListener('click', () => {
        localStorage.removeItem('createdList');
        ul.innerHTML = '';
    })
}

let submit = document.getElementById('submit_userData');

submit.addEventListener('click', () => {
    // retrieve list item from localstorage
    let storedObject = localStorage.getItem('createdList');
    // parse the stored item and store it in the parsedObject variable
    let parsedObject = JSON.parse(storedObject);

    if(!parsedObject) { parsedObject = []; }


    let input = document.getElementById('user_input').value;
    let inputText = document.createTextNode(input)
    let li = document.createElement('li');
    let ul = document.getElementById('list');

    li.appendChild(inputText)
    ul.appendChild(li)

    // push each user input into the parsedObject array
    parsedObject.unshift(input);
    // turn the objects in the array into strings(localstorage only accepts strings)
    let stringObject = JSON.stringify(parsedObject);
    // set the key value pairs(put the string objects into localstorage)
    localStorage.setItem('createdList', stringObject);
    // clear the input box
    document.getElementById('user_input').value = "";
    //call the displayList function so it will display the list with the added user input
    displayList()
});
console.log('hello world')
