var URL = 'http://www.gradesource.com/reports/3965/25436/'
var secret_number = '8855';
var div = '#result'

function getOverall(secret_number, div_id) {
	jQuery.get(URL + '/coursestand.html', 
		function(data) {
			var $data = $(data);


			var $rows = $data.find('tr');

			$.each($rows, function(indx, val) {
				var $col1 = $(val).children().first();
				var target = $col1.text();


				if(secret_number == target) {
					var grade = $(val).children().last().text();
					console.log(secret_number + " == " + target + ". Grade = " + grade);

					$(div_id).append(grade);
				}
			})

		}
	);	
}

getOverall(secret_number, div);