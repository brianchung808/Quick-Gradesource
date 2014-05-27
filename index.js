var storageArea = chrome.storage.sync;

var home_url = 'http://www.gradesource.com/reports/3965/25436/index.html';
var arr = home_url.split('/'); arr.pop();
var url = arr.join('/');
//var secret_number = '8855';


var div = '#result';
var mean_div = '#mean';
var median_div = "#median";

var secret_number;

function setClassInfo(url, secret_number) {
	var params = {};
	var key = url + ":secret_number";
	params[key] = secret_number;

	storageArea.set(params);

}

storageArea.clear();

setClassInfo(url, '8855');

$(document).ready(function() {
	$('#test').click(function() {
		loadPage(url);
	});
});

function loadPage(url) {
	var key = url + ":secret_number";

	storageArea.get(key, function(items) {

		secret_number = items[key];

		getOverall(url, secret_number, div);
		getMeanMedian(url, mean_div, median_div);
	});
}





