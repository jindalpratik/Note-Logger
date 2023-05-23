// All global variables which are in local storage.
let notes = {};
let dates = {};
let id = 0;
let dateTime = true;

// Global variables not in local storage.
let curEdit = [];

// Retrieve all the varibales from browser storage.
if (localStorage.getItem("notes") !== null) {
  notes = JSON.parse(localStorage.getItem("notes"));
  id = Number(localStorage.getItem("id"));
  if (localStorage.getItem("dates") !== null) {
    dates = JSON.parse(localStorage.getItem("dates"));
  }
  if (localStorage.getItem("dateTime") !== null) {
    if (localStorage.getItem("dateTime") == "true") {
      dateTime = true;
    } else {
      dateTime = false;
    }
  }
}

// Add notes after browser refresh.
$.each(notes, function (curId) {
  addNoteToUl(curId);
});

// Function to add the notes to list.
function addNoteToUl(curId) {
  // Initializing the list element and the text that goes in it.
  const li = $("<li>").attr("id", "li-" + curId);
  const p = $("<p>")
    .attr("id", "p-" + curId)
    .attr("hidden", false)
    .attr("class", "note-content")
    .text(notes[curId]);
  const textarea = $("<textarea>")
    .addClass("no-tabs")
    .attr("id", "textarea-" + curId)
    .attr("hidden", true);

  // Creating the Buttons and their classes.
  const div1 = $("<div>").addClass("note-buttons");
  const div2 = $("<div>").addClass("note-title");
  const editButton = $("<button>")
    .addClass("edit-button")
    .attr("id", "edit-" + curId);
  const deleteButton = $("<button>")
    .addClass("delete-button")
    .attr("id", "delete-" + curId);

  // Initializing the date element for the note.
  let curDate;

  // Calculations for what date to add to the note.
  if (dateTime) {
    if (dates[curId] !== undefined) {
      curDate = new Date(dates[curId]).toLocaleString();
    } else {
      // Set default date in case no date is available due to migration from an old to a new version of the site.
      dates[curId] = new Date();
      curDate = dates[curId].toLocaleString();
      localStorage.setItem("dates", JSON.stringify(dates));
    }
  } else {
    curDate = new Date(dates[curId]).toLocaleDateString();
  }

  const date = $("<p>")
    .attr("id", "date-" + curId)
    .attr("class", "dates")
    .text(curDate);

  // Creating the Button icons and their classes.
  const editButtonIcon = $("<i>").addClass("fas fa-edit");
  const deleteButtonIcon = $("<i>").addClass("fas fa-trash-alt");

  // Adding the li element to note with all it's elements.
  editButton.append(editButtonIcon);
  deleteButton.append(deleteButtonIcon);
  div1.append(date).append(editButton).append(deleteButton);
  div2.append(date).append(div1);
  li.append(div2);
  li.append(p);
  li.append(textarea);
  $("#note-list").append(li);

  // Clear input.
  $("#note-input").val("");
}

function addNote() {
  // Get input text.
  const text = $("#note-input").val().trim();
  if (text === "") {
    return;
  }

  // Update all the variables.
  id += 1;
  notes[id] = text;
  dates[id] = new Date();

  addNoteToUl(id);

  // Update the variables in browser storage.
  localStorage.setItem("dates", JSON.stringify(dates));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("id", id);
}

// Event listener for addition of new notes.
$("#note-form").on("submit", function (event) {
  event.preventDefault();
  addNote();
});

// Event listener for deleting a note.
$(document).on("click", ".delete-button", function () {
  const del_id = $(this).attr("id");
  const liId = "#li-" + del_id.substr(7);

  // Deleting all the required elements and variables.
  $(liId).remove();
  delete notes[del_id.substr(7)];
  delete dates[del_id.substr(7)];

  // Update the deleted variables in browser storage.
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("dates", JSON.stringify(dates));
});

// Event listener for editing a note.
$(document).on("click", ".edit-button", function () {
  const edit_id = $(this).attr("id");
  const id = edit_id.substr(5);
  const textareaId = "#textarea-" + id;
  const pId = "#p-" + edit_id.substr(5);

  // Keep track of all the notes that in an edit state.
  if (curEdit.indexOf(Number(id)) == -1) {
    $(pId).hide();
    $(textareaId).val(notes[id]).show();
    curEdit.push(Number(id));
  } else {
    // Update the note with the edited text.
    notes[id] = $(textareaId).val().trim();
    $(pId).show().text(notes[id]);
    $(textareaId).val("").hide();
    const remIndex = curEdit.indexOf(Number(id));
    curEdit.splice(remIndex, 1);
  }

  // Update the variables in browser storage.
  localStorage.setItem("notes", JSON.stringify(notes));
});

// Allow tabs in the notes.
$(".no-tabs").on("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set note-input value to: text before caret + tab + text after caret
    $(this).val(
      $(this).val().substring(0, start) + "\t" + $(this).val().substring(end)
    );

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

// Event listener for handling switching between the setting and the home page.
$(document).ready(function () {
  const noteElements = $("#note-elements");
  const settingsElements = $("#setting-container");
  const settingsButton = $("#settings-button");
  const homeButton = $("#home-button");

  // Show note elements and hide settings.
  function showNoteElements() {
    noteElements.show();
    settingsElements.hide();
    settingsButton.show();
    homeButton.hide();
  }

  // Show settings and hide note elements.
  function showSettings() {
    noteElements.hide();
    settingsElements.show();
    settingsButton.hide();
    homeButton.show();
  }

  // Handle home button click
  homeButton.on("click", function () {
    window.location.reload();
    showNoteElements();
  });

  // Handle settings button click
  settingsButton.on("click", function () {
    showSettings();
  });

  // Show note elements by default
  showNoteElements();
});

// DateTime Settings.
const dayDateSetting = $("#dayDate-setting");
let settingState = true;

dayDateSetting.on("change", function () {
  settingState = $(this).is(":checked");
  if (settingState) {
    dateTime = false;
    localStorage.setItem("dateTime", false);
  } else {
    dateTime = true;
    localStorage.setItem("dateTime", true);
  }
});

// Clear data Settings.
const clearDataButton = $("#clear-data-button");

clearDataButton.on("click", function () {
  // Show confirmation dialog
  showConfirmationDialog();
});

function showConfirmationDialog() {
  const confirmDialog = confirm(
    "Are you sure you want to clear all site data?"
  );
  if (confirmDialog) {
    dayDateSetting[0].checked = false;
    localStorage.clear();
    window.location.reload();
    console.log("Clearing site data...");
  } else {
    return;
  }
}
