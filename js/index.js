var storageArea = chrome.storage.sync;

var div = '#result';
var mean_div = '#mean';
var median_div = "#median";


(function($) {

	var Grades = Backbone.Model.extend({
		defaults: {
			overall: '----',
			mean   : '----',
			median : '----',
			url    : null
		},

		getGrades: function(name) {
			var self = this;
			storageArea.get(name, function(items) {
				var url = items[name][0];
				var secret_number = items[name][1];
				self.set('url', url);

				getOverall(url, secret_number, div, function(grade) {
					self.set('overall', grade);
				});
				
				getMeanMedian(url, mean_div, median_div,
					function(mean) {
						self.set('mean', mean);
					}, function(median) {
						self.set('median', median);
					});
			});
		}
	});

	var GradeView = Backbone.View.extend({
		id: 'grades',

		initialize: function() {
			_.bindAll(this, 'render', 'setColors');

			this.model = new Grades();
			this.model.bind('change', this.render); // on any change, rerender view 

			$('#add_class').on('click', function() {
				chrome.tabs.create({url: "options.html"});
			});

			var self = this;

			// load the dropdown with saved classes
			storageArea.get(null, function(data) {
				var $dropdown = $('<select>');

				$dropdown.append($('<option>').attr({value: ''}).text('-- Select Class --'));

				_.each(data, function(value, key, list) {
					var $option = $('<option>');
					$option.attr({
						value: key
					}).text(key);

					$dropdown.append($option);
				});

				$('#grades #classes').append($dropdown);

				// load page with selected class
				$dropdown.on('change', function() {
					var _class = $(this).val();

					self.model.getGrades(_class);
				});
			});

			this.render();
		},

		render: function() {
			var grade  = this.model.get('overall');
			var mean   = this.model.get('mean');
			var median = this.model.get('median');
			var url    = this.model.get('url');

			var $overall = $('#overall');
			$overall.text(grade + "%");
			$('#mean_number').text(mean + "%");
			$('#median_number').text(median + "%");

			this.setColors();

			// open course standings on click
			$overall.off();
			$overall.on('click', function() {
				chrome.tabs.create({url: url + PAGES.standings});
			});
		},

		setColors: function() {
			var grade  = this.model.get('overall');
			var mean   = this.model.get('mean');
			var median = this.model.get('median');
			var url    = this.model.get('url');
			var $overall = $('#overall');

			if(parseFloat(grade.split('%')[0]) > parseFloat(mean)) {
				$overall.removeClass("bad");
				$overall.addClass("good");
			} else {
				$overall.removeClass("good");
				$overall.addClass("bad");
			}
		}
	});

	var gradeView = new GradeView();

})(jQuery);




$(function() {

});

// given class name, load the percentages and such.
function loadPage(name) {
	
}

