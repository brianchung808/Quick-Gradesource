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
	var key = "secret_number";
	params[key] = secret_number;

	storageArea.set(params);
	storageArea.get(key, function(items) { console.log(items.secret_number); });

}

storageArea.set({'test': '8855'});

storageArea.get('test', function(items) {
	console.log(items.test);
})

setClassInfo(url, '8855');

$(document).ready(function() {
	$('#test').click(function() {
		loadPage(url);
	});
});

function loadPage(url) {
	var key = "secret_number";

	storageArea.get(key, function(items) {

		secret_number = items.secret_number;

		getOverall(url, secret_number, div);
		getMeanMedian(url, mean_div, median_div);
	});
}





