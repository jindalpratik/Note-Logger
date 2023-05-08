const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteList = document.querySelector('#note-list');

let notes = [];

function addNote() {
  // Get note text
  const text = noteInput.value.trim();
  if (text === '') {
    return;
  }

  // Add note to array
  notes.push(text);

  // Add note to list
  const li = document.createElement('li');
  li.textContent = text;


  // Creating the elements and their classes.
  const div = document.createElement('div');
  div.setAttribute("class","note-buttons");
  const editButton = document.createElement('button');
  editButton.setAttribute("class","edit-button");
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute("class","delete-button");
  const editButtonIcon = document.createElement('i');
  editButtonIcon.setAttribute("class","fas fa-edit");
  const deleteButtonIcon = document.createElement('i');
  deleteButtonIcon.setAttribute("class","fas fa-trash-alt");
  
  // Adding the note to the html with the buttons included.
  editButton.appendChild(editButtonIcon);
  deleteButton.appendChild(deleteButtonIcon);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  li.appendChild(div);
  noteList.appendChild(li);

  // Clear input
  noteInput.value = '';
}

noteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addNote();
});
