var PAGES = {
	home     : '/index.html',
	standings: '/coursestand.html',
	stats    : '/course.html',
}

// Get the overall score for the specified secret number for the
// class at the specified url.
// Replace the div_id with the grade
function getOverall(URL, secret_number, div_id, callback) {
	jQuery.get(URL + PAGES.standings, 
		function(data) {
			var $data = $(data);
			var $rows = $data.find('tr');

			$.each($rows, function(indx, val) {
				var $col1 = $(val).children().first();
				var target = $col1.text();

				if(secret_number == target) {
					var grade = $(val).children().last().text();

					// do something with the grade
					callback(grade);
					return false;
				}
			});
		}
	);	
}

// Get the mean and median score for the class at the specified url.
// Replace the mean_div and median_div with the grade
function getMeanMedian(URL, mean_div, median_div, mean_callback, median_callback) {
	jQuery.get(URL + PAGES.stats, 
		function(data) {
			var $data = $(data);
			var $rows = $data.find('tr');

			$.each($rows, function(indx, val) {
				var $col1 = $(val).children().first();
				var target = $col1.text();

				if('Mean:' == target) {
					var mean = $(val).children().last().text();
					mean_callback(mean);
				}

				if('Median:' == target) {
					var median = $(val).children().last().text();
					median_callback(median);
				}
			});
		}
	);
}

