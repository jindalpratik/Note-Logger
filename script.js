const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteList = document.querySelector("#note-list");

let notes = {};
let id = 0;

if (!(localStorage.getItem("notes") === null)) {
  notes = JSON.parse(localStorage.getItem("notes"));
  id = Number(localStorage.getItem("id"));
}

// Add notes after browser refresh.
for (curId in notes) {
  addNoteToUl(curId);
}

function addNoteToUl(curId) {
  const li = document.createElement("li");
  li.setAttribute("id", "parent-" + curId);
  li.textContent = notes[curId];

  // Creating the Buttons and their classes.
  const div = document.createElement("div");
  div.setAttribute("class", "note-buttons");
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-button");
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("id", curId);
  deleteButton.setAttribute("onclick", "delete_note(id);");

  // Creating the Button icons and their classes.
  const editButtonIcon = document.createElement("i");
  editButtonIcon.setAttribute("class", "fas fa-edit");
  const deleteButtonIcon = document.createElement("i");
  deleteButtonIcon.setAttribute("class", "fas fa-trash-alt");

  // Adding the note to the html with the buttons included.
  editButton.appendChild(editButtonIcon);
  deleteButton.appendChild(deleteButtonIcon);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  li.appendChild(div);
  noteList.appendChild(li);

  // Clear input
  noteInput.value = "";
}

function addNote() {
  // Get note text
  const text = noteInput.value.trim();
  if (text === "") {
    return;
  }

  //Increment ID
  id += 1;

  // Add note to dictionary
  notes[id] = text;

  addNoteToUl(id);

  //Store the notes in browser storage
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(localStorage.getItem("notes"));
  localStorage.setItem("id", id);
}

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addNote();
});

// Delete note.
function delete_note(del_id) {
  parentId = "parent-" + del_id;
  const li = document.getElementById(parentId);
  li.remove();
  delete notes[del_id];

  localStorage.setItem("notes", JSON.stringify(notes));
}
