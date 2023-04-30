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
  noteList.appendChild(li);

  // Clear input
  noteInput.value = '';
}

noteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addNote();
});
