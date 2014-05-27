var storageArea = chrome.storage.sync;

var div = '#result';
var mean_div = '#mean';
var median_div = "#median";

$(function() {
	$('#add_class').on('click', function() {
		chrome.tabs.create({url: "options.html"});
	});

	// load the dropdown with saved classes
	storageArea.get(null, function(data) {
		var $dropdown = $('<select>');

		$dropdown.append($('<option>').attr({value: ''}).text('-- Select Class --'));

		for(var key in data) {
			var $option = $('<option>');
			$option.attr({
				value: key
			}).text(key);

			$dropdown.append($option);
		}

		$('#classes').append($dropdown);

		// load page with selected class
		$dropdown.on('change', function() {
			var _class = $(this).val();

			loadPage(_class);
			storageArea.get(_class, function(data) {

			});
		});
	});
});

// given class name, load the percentages and such.
function loadPage(name) {
	storageArea.get(name, function(items) {
		var url = items[name][0];
		var secret_number = items[name][1];

		getOverall(url, secret_number, div);
		getMeanMedian(url, mean_div, median_div);
	});
}

