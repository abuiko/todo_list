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
const deleteBtn = document.querySelector('.delete-btn');
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
        console.log('editing');
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

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item);
        });
    }
    groceryContainer.classList.remove('show-container');

}


//     LOCAL STORAGE
function addTolocalStorage(id, value) {
    console.log('add to local storage');
}