/* eslint-disable dot-notation */
/* global data */

var $formContainer = document.querySelector('#formID');

var $newImage = document.querySelector('.url');

var $image = document.querySelector('#img');

function changeUrl(event) {
  var userValue = event.target.value;
  $image.setAttribute('src', userValue);
}
$newImage.addEventListener('input', changeUrl);

function submitEvent(event) {
  event.preventDefault();
  var $title = $formContainer.elements.title.value;
  var $photo = $formContainer.elements['photo-url'].value;
  var $note = $formContainer.elements.note.value;

  var obj = {
    title: $title,
    photoUrl: $photo,
    notes: $note,
    entryId: data.nextEntryId

  };
  data.entries.unshift(obj);
  data.nextEntryId += 1;
  $formContainer.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$formContainer.addEventListener('submit', submitEvent);
