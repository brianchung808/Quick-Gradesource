var storageArea = chrome.storage.sync;

var home_url = 'http://www.gradesource.com/reports/3965/25436/index.html';
var arr = home_url.split('/'); arr.pop();
var url = arr.join('/');

var div = '#result';
var mean_div = '#mean';
var median_div = "#median";

function setClassInfo(description, url, secret_number) {
	var params = {};
	var key = url + ":secret_number";
	params[key] = secret_number;   // from url:"secret_number", get secret_number
	params[description] = url;     // from description, get url

	storageArea.set(params);
}

			storageArea.clear();

			setClassInfo('CSE127', url, '8855');

			setClassInfo('CSE190', 'http://www.gradesource.com/reports/3519/25440', '7076');

$(document).ready(function() {

	storageArea.get(null, function(data) {

		var $dropdown = $('<select>');

		$dropdown.append($('<option>').attr({value: ''}).text('-- Select Class --'));

		for(var key in data) {
			if(key.indexOf(':secret_number') == -1) {
				var $option = $('<option>');
				$option.attr(
					{value: key}
				).text(key);

				$dropdown.append($option);
			}
		}

		$('#classes').empty();
		$('#classes').append($dropdown);

		$dropdown.on('change', function() {
			var _class = $(this).val();

			storageArea.get(_class, function(data) {
				var url = data[_class];

				loadPage(url);
			});
		});
	});
});

function loadPage(url) {
	var key = url + ":secret_number";

	storageArea.get(key, function(items) {

		var secret_number = items[key];

		getOverall(url, secret_number, div);
		getMeanMedian(url, mean_div, median_div);
	});
}





