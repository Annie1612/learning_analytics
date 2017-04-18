


demo = {

		initChartist: function(){    



			var chart = new Chartist.Line('.ct-charts', {
				responsive: true,
				labels: ['HW', 'InClass', 'Midterm', 'Project', 'FE'],
				series: [
					[10, 50, 20, 50, 40],
					[20, 30, 40, 80, 10],
					[50, 40, 30, 20, 10],
					[30, 10, 10, 30, 20]
					]
			}, {
				low: 0,
				showArea: false,
				showPoint: true,
				fullWidth: true,

			});

			chart.on('draw', function(data) {
				if(data.type === 'line' || data.type === 'area') {
					data.element.animate({
						d: {
							begin: 2000 * data.index,
							dur: 2000,
							from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
							to: data.path.clone().stringify(),
							easing: Chartist.Svg.Easing.easeOutQuint
						}
					});
				}
			});

			var data = {
					labels: ['HW', 'InClass', 'Quiz', 'Project', 'Mid term', 'Finals'],
					series: [
						{
							label: 'Scores1',
							fillColor: '#382765',
							data: [20, 19, 41, 98, 89, 95]
						},
						{
							label: 'Scores2',
							fillColor: '#7BC225',
							data: [30, 16, 31, , , ]
						},
						{
							label: 'Scores3',
							fillColor: '#7BC225',
							data: [35, 16, 40,80 ,80 ,80 ]
						}
						]
			};

			var options = {
					seriesBarDistance: 20,
					axisX: {
						showGrid: false
					},
					height: "245px"
			};

			var responsiveOptions = [
				['screen and (max-width: 1040px)', {
					seriesBarDistance: 5,
					axisX: {
						labelInterpolationFnc: function (value) {
							return value[0];
						}
					}
				}]
				];

			Chartist.Bar('#chartActivity', data, options, responsiveOptions);

			var dataPreferences = {
					series: [
						[25, 30, 20, 25]
						]
			};

			var optionsPreferences = {
					donut: true,
					donutWidth: 40,
					startAngle: 0,
					total: 100,
					showLabel: true,
					axisX: {
						showGrid: true
					}
			};

			/* Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%'],
          series: [62, 32, 6]
        });  */ 

			var dataScore = {


					labels: ['01', '02', '03', '04', '05', '06', '07', '08'],
					series: [
						[50, 38, 49, 92, 55, 86, 98, 95],
						[27, 22, 43, 90, 28, 80, 90, 91],
						[23, 11, 37, 100, 90, 93, 70, 80]
						]
			};

			var maximumScore = {
					lineSmooth: false,
					low: 0,
					high: 100,
					showArea: true,
					height: "245px",
					axisX: {
						showGrid: false,
					},
					lineSmooth: Chartist.Interpolation.simple({
						divisor: 2
					}),
					showLine: false,
					showPoint: true,

			};

			var responsiveScore = [
				['screen and (max-width: 10px)', {
					axisX: {
						labelInterpolationFnc: function (value) {
							return value[1];
						}
					}
				}]
				];

			Chartist.Line('#chartHour', dataScore, maximumScore, responsiveScore);

			var times = function(n) {
				return Array.apply(null, new Array(n));
			};

			var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
				data.labels.push(index + 1);
				data.series.forEach(function(series) {
					series.push(Math.random() * 100)
				});

				return data;
			}, {
				labels: [],
				series: times(4).map(function() { return new Array() })
			});

			var options = {
					showLine: false,
					axisX: {
						labelInterpolationFnc: function(value, index) {
							return index % 13 === 0 ? 'W' + value : null;
						}
					}
			};

			var responsiveOptions = [
				['screen and (min-width: 640px)', {
					axisX: {
						labelInterpolationFnc: function(value, index) {
							return index % 4 === 0 ? 'W' + value : null;
						}
					}
				}]
				];

			new Chartist.Line('.ct-char', data, options, responsiveOptions);
			var chart = new Chartist.Pie('.ct-chart', {
				series: [10, 20, 50],
				labels: ['Average', 'Alert!','Good']
			}, {
				donut: true,
				showLabel: true
			});

			chart.on('draw', function(data) {
				if(data.type === 'slice') {
					// Get the total path length in order to use for dash array animation
					var pathLength = data.element._node.getTotalLength();

					// Set a dasharray that matches the path length as prerequisite to animate dashoffset
					data.element.attr({
						'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
					});

					// Create animation definition while also assigning an ID to the animation for later sync usage
					var animationDefinition = {
							'stroke-dashoffset': {
								id: 'anim' + data.index,
								dur: 1000,
								from: -pathLength + 'px',
								to:  '0px',
								easing: Chartist.Svg.Easing.easeOutQuint,
								// We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
								fill: 'freeze'
							}
					};

					// If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
					if(data.index !== 0) {
						animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					}

					// We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
					data.element.attr({
						'stroke-dashoffset': -pathLength + 'px'
					});

					// We can't use guided mode as the animations need to rely on setting begin manually
					// See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
					data.element.animate(animationDefinition, false);
				}
			});

			// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
			/*chart.on('created', function() {
        		  if(window.__anim21278907124) {
        		    clearTimeout(window.__anim21278907124);
        		    window.__anim21278907124 = null;
        		  }
        		  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
        		});*/


			var times = function(n) {
				return Array.apply(null, new Array(n));
			};

			var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
				data.labels.push(index + 1);
				data.series.forEach(function(series) {
					series.push(Math.random() * 100)
				});

				return data;
			}, {
				labels: [],
				series: times(4).map(function() { return new Array() })
			});

			var options = {
					showLine: false,
					axisX: {
						labelInterpolationFnc: function(value, index) {
							return index % 13 === 0 ? 'W' + value : null;
						}
					}
			};

			var responsiveOptions = [
				['screen and (min-width: 640px)', {
					axisX: {
						labelInterpolationFnc: function(value, index) {
							return index % 4 === 0 ? 'W' + value : null;
						}
					}
				}]
				];

			new Chartist.Line('#scatterChart', data, options, responsiveOptions);
		}


	

		


}



