/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('data');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', beforeUnload);
function beforeUnload() {
  var jsonData = JSON.stringify(data);
  localStorage.setItem('data', jsonData);
}
