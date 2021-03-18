// global variables
const alert = document.querySelector('.alert');
const list = document.querySelector('.grocery-list');

// inputs 
const groceryInput = document.getElementById('grocery');
const groceryTitle = document.querySelector('.title');

// containers
const formContainer = document.querySelector('.form-container');
const groceryContainer = document.querySelector('.grocery-container');

// selected buttons
const submitBtn = document.querySelector('.form-btn');
const clearBtn = document.querySelector('.clear-btn');

// edit 

let editElement;
let editFlag = false;
let editID = '';

// event listeners

formContainer.addEventListener('submit', addElement);
clearBtn.addEventListener('click', clearItems);

// functions

function addElement(e) {
    e.preventDefault();
    const value = groceryInput.value;
    const valueID = new Date().getTime().toString();
    if (value && !editFlag) {

        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = valueID;

        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="button-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

        list.appendChild(element);

        // display alert
        displayAlert('item added to the list', 'green');

        // show container 
        groceryContainer.classList.add('show-container');
        // add to local storage
        addTolocalStorage(valueID, value);
        // set back to default
        setBackToDefault();

    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'green');
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('please, enter value', 'danger');

    }
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

function setBackToDefault() {
    groceryInput.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'Submit';
}

// delete item when trash icon clicked
function deleteItem(e) {
    const groceryItem = e.currentTarget.parentElement.parentElement;
    const id = groceryItem.dataset.id;
    list.removeChild(groceryItem);
    if (list.children.length === 0) {
        groceryContainer.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    // removeFromLocalStorage(id);
}

function editItem(e) {
    const groceryItem = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    groceryInput.value = editElement.innerHTML;
    editFlag = true;
    editID = groceryItem.dataset.id;
    submitBtn.textContent = 'Edit';

}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item);
        });
    }
    groceryContainer.classList.remove('show-container');
    setBackToDefault();

}

//     LOCAL STORAGE
function addTolocalStorage(id, value) {
    const grocery = {
        id,
        value
    };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}


function removeFromLocalStorage(id) {}

function editLocalStorage(id, value) {
    // local storage api
    // setItem
    // getItem
    // removeItem
    // save as strings

}

function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// localStorage.setItem('orange', JSON.stringify(['item', 'item2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges);
// localStorage.removeItem('orange');