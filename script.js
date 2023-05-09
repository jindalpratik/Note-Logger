const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteList = document.querySelector("#note-list");

let notes = {};
let id = 0;

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

  // Add note to list
  const li = document.createElement("li");
  li.setAttribute("id", "parent-" + id);
  li.textContent = text;

  // Creating the elements and their classes.
  const div = document.createElement("div");
  div.setAttribute("class", "note-buttons");
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-button");
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("id", id);
  deleteButton.setAttribute("onclick", "delete_note(id);");

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
}
