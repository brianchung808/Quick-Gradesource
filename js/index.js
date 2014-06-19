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
		});
	});
});

// given class name, load the percentages and such.
function loadPage(name) {
	storageArea.get(name, function(items) {
		var url = items[name][0];
		var secret_number = items[name][1];

		getOverall(url, secret_number, div, function(grade) {
			var $overall = $('#overall');
			$overall.text(grade);

			// get the mean to compare with overall
			jQuery.get(url + PAGES.stats, 
				function(data) {
					var $data = $(data);
					var $rows = $data.find('tr');

					$.each($rows, function(indx, val) {
						var $col1 = $(val).children().first();
						var target = $col1.text();

						if('Mean:' == target) {
							var mean = $(val).children().last().text();

							if(parseFloat(grade.split('%')[0]) > parseFloat(mean)) {
								$overall.removeClass("bad");
								$overall.addClass("good");
							} else {
								$overall.removeClass("good");
								$overall.addClass("bad");
							}
						}
					});
				}
			);

			// open course standings on click
			$overall.off();
			$overall.on('click', function() {
				chrome.tabs.create({url: url + PAGES.standings});
			});
		});
		
		getMeanMedian(url, mean_div, median_div, 
			function(mean) {
				$('#mean_number').text(mean + "%");

			}, function(median) {
				$('#median_number').text(median + "%");
			});
	});
}

