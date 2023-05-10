const noteForm = $("#note-form");
const noteInput = $("#note-input");
const noteList = $("#note-list");

let notes = {};
let id = 0;

if (localStorage.getItem("notes") !== null) {
  notes = JSON.parse(localStorage.getItem("notes"));
  id = Number(localStorage.getItem("id"));
}

// Add notes after browser refresh.
$.each(notes, function(curId) {
  addNoteToUl(curId);
});

function addNoteToUl(curId) {
  const li = $("<li>").attr("id", "parent-" + curId).text(notes[curId]);

  // Creating the Buttons and their classes.
  const div = $("<div>").addClass("note-buttons");
  const editButton = $("<button>").addClass("edit-button");
  const deleteButton = $("<button>").addClass("delete-button").attr("id", curId);

  // Creating the Button icons and their classes.
  const editButtonIcon = $("<i>").addClass("fas fa-edit");
  const deleteButtonIcon = $("<i>").addClass("fas fa-trash-alt");

  // Adding the note to the html with the buttons included.
  editButton.append(editButtonIcon);
  deleteButton.append(deleteButtonIcon);
  div.append(editButton).append(deleteButton);
  li.append(div);
  noteList.append(li);

  // Clear input
  noteInput.val("");
}

function addNote() {
  // Get note text
  const text = noteInput.val().trim();
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
  localStorage.setItem("id", id);
}

noteForm.on("submit", function (event) {
  event.preventDefault();
  addNote();
});

// Delete note.
function delete_note(del_id) {
  parentId = "parent-" + del_id;
  $("#" + parentId).remove();
  delete notes[del_id];

  localStorage.setItem("notes", JSON.stringify(notes));
}

// Allow tabs in the notes.
$("#note-input").on("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set note-input value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});
