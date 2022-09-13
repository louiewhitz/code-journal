var form = document.querySelector('#form');
var imgSrc = document.querySelector('.photo-url');
var placeholder = document.querySelector('#placeholder');
var ulList = document.querySelector('#ul-list');
var newButton = document.querySelector('#new-btn');
var entriesBtn = document.querySelector('.nav-entries');

var $entriesContainer = document.querySelector('[data-view=entries]');
var $formContainer = document.querySelector('[data-view=entry-form]');

entriesBtn.addEventListener('click', handleHeaderClick);

imgSrc.addEventListener('input', changeSrc);
form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
newButton.addEventListener('click', handleNewButtonClick);

// functions for listener events
function handleHeaderClick(event) {
  viewSwap('entries');
}

function changeSrc(event) {
  if (placeholder === '') {
    imgSrc.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    placeholder.setAttribute('src', form.elements.photo.value);
  }
}

function handleNewButtonClick(event) {
  viewSwap('entry-form');
}

function handleSubmit(event) {
  event.preventDefault();
  var title = form.elements.title.value;
  var photoUrl = form.elements.photo.value;
  var notes = form.elements.notes.value;

  var entry = {
    title,
    photoUrl,
    notes,
    entryId: data.nextEntryId
  };
  data.entries.unshift(entry);
  data.nextEntryId++;
  viewSwap('entry-form');
  loadEntry(entry);
  form.reset();
  placeholder.setAttribute('src', '/images/placeholder-image-square.jpg');
}

function loadEntry(entry) {
  viewSwap('entries');
  var newEntry = renderDomEntry(entry);
  ulList.prepend(newEntry);
}

function handleDOMContentLoaded() {
  if (data.entries.length > 0) {
    for (var i = 0; i < data.entries.length; i++) {
      var previousEntry = renderDomEntry(data.entries[i]);
      ulList.append(previousEntry);
    }
  }
  viewSwap(data.view);
}

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

function renderDomEntry(newEntry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.style.marginBottom = '30px';
  var columnHalfOne = document.createElement('div');
  columnHalfOne.setAttribute('class', 'column-half');
  var newImg = document.createElement('img');
  newImg.setAttribute('src', newEntry.photoUrl);
  newImg.setAttribute('class', 'object-fit');
  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.setAttribute('class', 'column-half');
  var newTitle = document.createElement('h3');
  newTitle.textContent = newEntry.title;
  var newNote = document.createElement('p');
  newNote.textContent = newEntry.notes;

  // appending action of dummy entry to the page

  li.appendChild(columnHalfOne);
  columnHalfOne.appendChild(newImg);
  li.appendChild(columnHalfTwo);
  columnHalfTwo.appendChild(newTitle);
  columnHalfTwo.appendChild(newNote);
  return li;
}

function viewSwap(view) {
  data.view = view;
  if (view === 'entry-form') {
    $formContainer.className = 'view';
    $entriesContainer.className = 'view hidden';
  } else if (view === 'entries') {
    $formContainer.className = 'view hidden';
    $entriesContainer.className = 'view';
  }
}
