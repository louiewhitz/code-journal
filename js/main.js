var form = document.querySelector('#form');
var imgSrc = document.querySelector('.photo-url');
var placeholder = document.querySelector('.placeholder');

// addEventListeners
imgSrc.addEventListener('input', changeSrc);
form.addEventListener('submit', handleSubmit);

// functions for listener events
function changeSrc(event) {
  if (placeholder === '') {
    imgSrc.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    placeholder.setAttribute('src', imgSrc.value);
  }
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
  form.reset();
  placeholder.setAttribute('src', '/images/placeholder-image-square.jpg');
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

// function renderDomEntry(entry) {
//   var li = document.createE

// }
