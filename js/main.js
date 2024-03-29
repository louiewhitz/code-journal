var form = document.querySelector('#form');
var $photoUrl = document.querySelector('#photo');
var placeholder = document.querySelector('#placeholder');
var ulList = document.querySelector('#ul-list');
var newButton = document.querySelector('#new-btn');
var headerContainer = document.querySelector('.header-container');

var deleteButton = document.querySelector('.delete-entry');
var modalContainer = document.querySelector('.modal-box');
var formh1 = document.querySelector('.formh1');
var confirmButton = document.querySelector('.confirm-modal');
var cancelButton = document.querySelector('.cancel-modal');

var $entriesContainer = document.querySelector('[data-view=entries]');
var $formContainer = document.querySelector('[data-view=entry-form]');

headerContainer.addEventListener('click', handleHeaderClick);
$photoUrl.addEventListener('input', changeSrc);
form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
newButton.addEventListener('click', handleNewButtonClick);
ulList.addEventListener('click', handleEditIcon);
// functions for listener events

deleteButton.addEventListener('click', handleDelete);
cancelButton.addEventListener('click', handleCancel);
confirmButton.addEventListener('click', handleConfirm);
function handleHeaderClick(event) {

  viewSwap('entries');

}

function changeSrc(event) {
  if (placeholder === '') {
    $photoUrl.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    placeholder.setAttribute('src', form.elements.photo.value);
  }
}

function handleNewButtonClick(event) {
  formh1.textContent = 'New Entry';
  data.editing = null;
  form.reset();

  placeholder.setAttribute('src', 'images/placeholder-image-square.jpg');

  data.view = 'entry-form';
  viewSwap(data.view);
}

function handleSubmit(event) {
  event.preventDefault();
  if (data.editing === null) {

    var entries = {
      title: form.elements.title.value,
      photoUrl: form.elements.photoUrl.value,
      notes: form.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.entries.unshift(entries);
    data.nextEntryId++;
    // viewSwap('entry-form');
    loadEntry(entries);

    // placeholder.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {

    var editLi = document.querySelectorAll('li');
    for (var j = 0; j < data.entries.length; j++) {
      if (data.entries[j].entryId === data.editing.entryId) {

        entries = {
          title: form.elements.title.value,
          photoUrl: form.elements.photoUrl.value,
          notes: form.elements.notes.value,
          entryId: data.nextEntryId
        };
        if (data.editing.entryId.toString() === editLi[j].closest('li').getAttribute('data-entry-id')) {
          editLi[j].replaceWith(renderDomEntry(entries));
        }
      }
    }
  }
  form.reset();
  $photoUrl.setAttribute('src', '/images/placeholder-image-square.jpg');
  data.view = 'entries';
  viewSwap(data.view);

}

function handleEditIcon(event) {
  if (event.target.tagName === 'I') {
    var entryId = Number(event.target.closest('li').getAttribute('data-entry-id'));
    for (var u = 0; u < data.entries.length; u++) {
      if (data.entries[u].entryId === entryId) {
        data.editing = data.entries[u];
        loadEditEntryView(data.editing);
      }
    }

  }
}

function loadEditEntryView(entry) {
  var $notes = document.querySelector('#notes');
  var $photo = document.querySelector('#photo');
  var $title = document.querySelector('#title');
  formh1.textContent = 'Edit Entry';
  $photoUrl.value = entry.photoUrl;
  $title.value = entry.title;
  $notes.value = entry.notes;
  formh1.textContent = 'Edit Entry';
  viewSwap('entry-form');
  $photo.value = entry.photoUrl;
  $title.value = entry.title;
  $notes.value = entry.notes;
  placeholder.setAttribute('src', entry.photoUrl);
}



function loadEntry(entry) {
  var newEntry = renderDomEntry(entry);
  ulList.prepend(newEntry);
  viewSwap(data.view);
}

function handleDOMContentLoaded() {

  for (var i = 0; i < data.entries.length; i++) {
    var previousEntry = renderDomEntry(data.entries[i]);
    ulList.append(previousEntry);

  }
  viewSwap(data.view);
}

// editEntry(data.entries);

// dummy entry for dom tree
//  <li class="row">
//             <div class="column-half">
//               <img src="images/tree.jpeg" class="object-fit">
//             </div>
//             <div class="column-half">
//               <h3>My name is Lorem Ipsum</h3>
//               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, deleniti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio dignissimos, soluta omnis culpa libero. Ab suscipit impedit vitae corrupti aliquam a laboriosam corporis temporibus!</p>
//             </div>
//           </li>

// functions that make things happen when a listener fires

function renderDomEntry(entry) {
  var li = document.createElement('li');
  li.className = 'single-entry';
  li.setAttribute('data-entry-id', entry.entryId);
  li.setAttribute('class', 'row');
  li.style.marginBottom = '30px';
  var columnHalfOne = document.createElement('div');
  columnHalfOne.setAttribute('class', 'column-half');
  var newImg = document.createElement('img');
  newImg.setAttribute('src', entry.photoUrl);
  newImg.setAttribute('class', 'object-fit');
  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.setAttribute('class', 'column-half');
  var newTitle = document.createElement('h3');
  newTitle.textContent = entry.title;
  var anchorLi = document.createElement('a');
  anchorLi.setAttribute('href', '#');
  anchorLi.style.textAlign = 'right';
  var editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pen';

  editIcon.style.color = '#562B81';

  anchorLi.appendChild(editIcon);
  var newNote = document.createElement('p');
  newNote.textContent = entry.notes;
  var newRow = document.createElement('div');
  newRow.setAttribute('class', 'row');
  newRow.setAttribute('class', 'space-between');
  li.appendChild(columnHalfOne);
  columnHalfOne.appendChild(newImg);
  li.appendChild(columnHalfTwo);
  columnHalfTwo.appendChild(newRow);
  newRow.appendChild(newTitle);
  newRow.appendChild(anchorLi);
  columnHalfTwo.appendChild(newNote);
  return li;
}

function viewSwap(view) {
  if (view === 'entry-form') {
    $formContainer.className = 'view';
    $entriesContainer.className = 'view hidden';
  } else if (view === 'entries') {
    $formContainer.className = 'view hidden';
    $entriesContainer.className = 'view';
  }
}

function handleDelete(event) {
  modalContainer.className = 'modal-box';
}

function handleCancel(event) {
  modalContainer.className = 'modal-box hidden';
}

function handleConfirm(event) {
  modalContainer.className = 'modal-box hidden';
  var $currentLi = document.querySelectorAll('li');
  for (var u = 0; u < data.entries.length; u++) {
    for (var e = 0; e < $currentLi.length; e++) {
      if (data.entries[u].entryId === data.editing.entryId && data.entries[u].entryId === +$currentLi[e].getAttribute('data-entry-id')) {
        $currentLi[e].remove();
        data.entries.splice(u, 1);
        data.view = 'entries';
        viewSwap(data.view);
      }
    }
  }
}
