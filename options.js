var storageArea = chrome.storage.sync;

// save the information
function setClassInfo(name, url, secret_number) {
  var params = {};
  params[name] = [url, secret_number];

  storageArea.set(params, restore_options);
}

// Saves options to chrome.storage
function save_options() {
  var link = $('#link').val();
  if(link.indexOf('.html') != -1) {
    var arr = link.split('/'); arr.pop();
    link = arr.join('/');  
  }
  
  var name = $('#name').val();
  var secret_number = $('#secret_number').val();

  // save the class & clear the form
  setClassInfo(name, link, secret_number)
  
  $('#link').val('');
  $('#name').val('');
  $('#secret_number').val('');
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  // load all stored classes into table
  storageArea.get(null, function(data) {
    $('#saved_table').remove();
    var $table = $('<table>').attr({'class': 'table table-bordered', 'id': 'saved_table'}).css({'width': '400px'});

    for(var key in data) {
      var $row = $('<tr>');

      $row.append($('<td>').text(key));

      var $del_link = $('<a>').text('Remove').attr({'href': '#', 'id': 'delete_' + key});
      var $edit_link = $('<a>').text('Edit').attr({'href': '#', 'id': 'edit_' + key});

      $row.append($('<td>').html($del_link));
      $row.append($('<td>').html($edit_link));
      $del_link.on('click', delete_class);
      $edit_link.on('click', edit_class);

      $table.append($row);
    }

    $('#saved').append($table);
  });
}

// delete the class. Used as callback for event listener
function delete_class() {
  var arr = $(this).attr('id').split('_');
  var class_to_delete = arr.pop();

  storageArea.remove(class_to_delete);
  restore_options();
}

// edit the class. Used as callback for event listener
function edit_class() {
  var arr = $(this).attr('id').split('_');
  var class_to_edit = arr.pop();

  storageArea.get(class_to_edit, function(data) {
    var info = data[class_to_edit];

    $('#link').val(info[0]);
    $('#name').val(class_to_edit);
    $('#secret_number').val(info[1]);
  });
}

// on load, show user data & add event listeners
$(function() {
  restore_options();
  $('#add').on('click', save_options);
});
