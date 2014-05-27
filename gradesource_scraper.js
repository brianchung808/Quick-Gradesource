var PAGES = {
	home     : '/index.html',
	standings: '/coursestand.html',
}

var home_url = 'http://www.gradesource.com/reports/3965/25436/index.html';
var arr = home_url.split('/'); arr.pop();
var URL = arr.join('/');

var secret_number = '8855';
var div = '#result'

function getOverall(secret_number, div_id) {
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

getOverall(secret_number, div);