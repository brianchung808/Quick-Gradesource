(function($) {
	var storageArea = chrome.storage.sync;

	var div = '#result';
	var mean_div = '#mean';
	var median_div = "#median";
	var grade_default = '--------';

	var Grades = Backbone.Model.extend({
		defaults: {
			overall: grade_default,
			mean   : grade_default,
			median : grade_default,
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
		el: $('#grades'),

		events: {
			'click #overall': 'openGradesource'
		},

		initialize: function() {
			_.bindAll(this, 'render', 'openGradesource');

			this.model = new Grades();
			this.listenTo(this.model, 'change', this.render);
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

			// Listeners
			$('#add_class').on('click', function() {
				chrome.tabs.create({url: "options.html"});
			});
		},

		render: function() {
			var overall  = this.model.get('overall');
			var mean     = this.model.get('mean');
			var median   = this.model.get('median');
			var url      = this.model.get('url');

			var $overall = $('#overall');
			$overall.text(overall + "%");
			$('#mean_number').text(mean + "%");
			$('#median_number').text(median + "%");

			if(!(_.every([overall, mean, median], isNaN))) {
				if(parseFloat(overall) > parseFloat(mean)) {
					$overall.removeClass("bad");
					$overall.addClass("good");
				} else {
					$overall.removeClass("good");
					$overall.addClass("bad");
				}
			}
		},

		openGradesource: function() {
			chrome.tabs.create({url: this.model.get('url') + PAGES.standings});
		}
	});

	var gradeView = new GradeView();

})(jQuery);
