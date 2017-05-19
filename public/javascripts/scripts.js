jQuery(document).ready(function($) {
	var channelA = new TimeSeries();
	var channelB = new TimeSeries();
	// var dataReceivedA = [];
	// var dataReceivedB = [];
	// var dataPlotA = [];
	// var dataPlotB = [];
	var currentTime = 0;
	var wave = 'SQU'
	var freq = 100;
	var interpolation = 'step';


	createTimeline(interpolation);

	var socket = new WebSocket('ws://107.170.249.214:3131');

	socket.onopen = function() {
		var msg = JSON.stringify(["OpenLabsHost", "Connect"]);
		socket.send(msg);
	};

	$('#wind-speed').hide();
	//btnstop = $("#stoplabBtn");   test to see if it work when replaced with the repetition
	$("#stoplabBtn").prop('disabled', true);

	$("#startlabBtn").click(function() {
		$("#startlabBtn").prop('disabled', true);
		$("#stoplabBtn").prop('disabled', false);
		$('#wind-speed').show();
	});

	$("#stoplabBtn").click(function() {
		$("#startlabBtn").prop('disabled', false);
		$("#stoplabBtn").prop('disabled', true);
	});

	$("#changewaveform").click(function() { //send button
		wave = $('#waveform').val(); //select type of wave
		freq = $('#frequency').val(); //select frequency
		
		
		if (wave == 'SIN') {
			interpolation = 'bezier'; //doesn't work
			createTimeline(interpolation);
		} else {
			interpolation = 'step';
			createTimeline(interpolation);
		}
		channelA.data = [];
		channelB.data = [];
		var msg = JSON.stringify(["OpenLabsClient", [wave + freq,interpolation]]);//send back to client for change
		socket.send(msg);
	});

	socket.onmessage = function(msg) {

		var positionA = msg.data.indexOf('A');
		var positionB = msg.data.indexOf('B');
		var positionC = msg.data.indexOf('C');
		var positionT = msg.data.indexOf('T');
		var valueA = msg.data.substring(positionA + 1, positionB);
		var valueB = msg.data.substring(positionB + 1, positionC);
		var valueC = msg.data.substring(positionC + 1, positionT);
		var valueT = parseInt(msg.data.substr(positionT + 1));
		valueA -= valueC;
		valueB -= valueC;
		//console.log(msg);
		// dataReceivedA.push(parseFloat(valueA));
		// dataReceivedB.push(parseFloat(valueB));
		if (currentTime === 0) {
			currentTime = new Date().getTime();
		} else {
			currentTime += valueT;
		}
		console.log(currentTime);
		console.log('Wave: ' + wave);
		console.log('Int: ' + interpolation);
		channelA.append(currentTime, valueA);
		channelB.append(currentTime, valueB);
		// if (dataReceivedA.length == 30){
		//     dataPlotA = dataReceivedA;
		//     dataPlotB = dataReceivedB;
		//     dataPlotA.forEach(populateChannelA);
		//     dataPlotB.forEach(populateChannelB);
		//     dataReceivedA = [];
		//     dataReceivedB = [];
		//     //call function to refill dataReceivedA and dataReceivedB
		// }

	};

	// function populateChannelA(item) {
	//     channelA.append(new Date().getTime(),item);
	// }
	//
	// function populateChannelB(item) {
	//     channelB.append(new Date().getTime(),item);
	// }

	$('#main-navbar .nav a[href="' + this.location.pathname + '"]').parent().addClass('active');

	function createTimeline(interpolation) {
		//var chart = new SmoothieChart();
		var specs = {
			interpolation: interpolation,
			minValue: -1000.00,
			maxValue: 1000.00,
			grid: {
				fillStyle: '#0e033b',
				sharpLines: true,
				lineWidth: 1,
				millisPerLine: 1000,
				verticalSections: 6
			}
		}
		var chart = new SmoothieChart(specs);
		chart.addTimeSeries(channelA, {
			strokeStyle: '#2df307',
			fillStyle: 'rgba(0, 255, 0, 0)',
			lineWidth: 2
		});
		chart.addTimeSeries(channelB, {
			strokeStyle: '#f2f1f7',
			fillStyle: 'rgba(240, 0, 0, 0)',
			lineWidth: 2
		});
		chart.streamTo(document.getElementById("mycanvas"), 1000);
	}
});