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
const clearBtn = document.querySelector('.celar-btn');

// edit 

let editElement;
let editFlag = false;
let editID = '';