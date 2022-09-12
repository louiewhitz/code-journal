var form = document.querySelector('#form');
var imgSrc = document.querySelector('.photo-url');
var placeholder = document.querySelector('#placeholder');

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
