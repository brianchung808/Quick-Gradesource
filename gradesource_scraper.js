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

					var $div = $('<div>')
						.attr({'id': 'overall'})
						.addClass("number")
						.text(grade);

					if(parseFloat(grade.split('%')[0]) > 70.0) {
						$div.addClass("good");
					} else {
						$div.addClass("bad");
					}

					$("#overall").remove();
					$(div_id).append($div);
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

					var $div = $('<div>')
					.attr({'id': 'mean_number'})
					.addClass("number")
					.text(mean + "%");

					$('#mean_number').remove();
					$(mean_div).append($div);
				}

				if('Median:' == target) {
					var median = $(val).children().last().text();

					var $div = $('<div>')
					.attr({'id': 'median_number'})
					.addClass("number")
					.text(median + "%");

					$('#median_number').remove();
					$(median_div).append($div);
				}
			});
		}

	);

}

