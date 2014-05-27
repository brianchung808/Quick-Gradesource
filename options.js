var storageArea = chrome.storage.sync;
// Saves options to chrome.storage
function save_options() {
  var link = $('#link').val();
  var name = $('#name').val();
  var secret_number = $('#secret_number').val();

  storageArea.set({
    link: link,
    name: name,
    secret_number: secret_number
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  storageArea.get(null, function(data) {
    for(var key in data) {
      console.log(key);
      console.log(data[key]);
    }

  });


  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}
$(function() {
  restore_options();
  $('#save').on('click', save_options);
});
