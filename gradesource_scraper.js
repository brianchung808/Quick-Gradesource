var PAGES = {
	home     : '/index.html',
	standings: '/coursestand.html',
	stats    : '/course.html',
}

function getOverall(URL, secret_number, div_id) {
	jQuery.get(URL + PAGES.standings, 
		function(data) {
			var $data = $(data);
			var $rows = $data.find('tr');

			$.each($rows, function(indx, val) {
				var $col1 = $(val).children().first();
				var target = $col1.text();

				if(secret_number == target) {
					var grade = $(val).children().last().text();
					console.log(secret_number + " == " + target + ". Grade = " + grade);

					if(parseFloat(grade.split('%')[0]) > 70.0) {
						$(div_id).addClass("good");
					} else {
						$(div_id).addClass("bad");
					}

					$(div_id).append(grade);
				}
			});
		}
	);	
}

function getMeanMedian(URL, mean_div, median_div) {
	jQuery.get(URL + PAGES.stats, 
		function(data) {
			var $data = $(data);
			var $rows = $data.find('tr');

			$.each($rows, function(indx, val) {
				var $col1 = $(val).children().first();
				var target = $col1.text();

				if('Mean:' == target) {
					var mean = $(val).children().last().text();
					$(mean_div).append(mean + "%");
				}

				if('Median:' == target) {
					var median = $(val).children().last().text();
					$(median_div).append(median + "%");
				}
			});
		}

	);

}

