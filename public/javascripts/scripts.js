// jQuery(document).ready(function($) {
// 	/*if($('#plotly-div').length){ //refer to graphing.js
//         graphingFxn();
//   	}*/
// 		var bufferValue = 30
// 		var channelA = new TimeSeries();
//   	var channelB = new TimeSeries();
// 		var dataReceived = new Array(bufferValue);
// 		var dataPlot = new Array(bufferValue);
//     createTimeline();
// 		var socket = new WebSocket( 'ws://107.170.249.214:3131' );
	
// 		socket.onopen = function(){
// 					var msg = JSON.stringify(["OpenLabsHost","Connect"]);
// 					socket.send(msg);
// 			}
//     $('#wind-speed').hide();
//     $("#stoplabBtn").prop('disabled', true);

//     $("#startlabBtn").click(function(){
//         $("#startlabBtn").prop('disabled', true);
//         $("#stoplabBtn").prop('disabled', false);
//         $('#wind-speed').show();
//     });

//     $("#stoplabBtn").click(function(){
//         $("#startlabBtn").prop('disabled', false);
//         $("#stoplabBtn").prop('disabled', true);
//     });
// 	//console.log(this.location.pathname);
// 	socket.onmessage = function(msg){
		
// 		var positionA = msg.data.indexOf('A');
// 		var positionB = msg.data.indexOf('B');
// 		var positionC = msg.data.indexOf('C');
// 		var valueA = msg.data.substring(positionA + 1, positionB);
// 		var valueB = msg.data.substring(positionB + 1, positionC);
// 		var valueC = msg.data.substr(positionC + 1);
// 		valueA -= valueC;
// 		valueB -= valueC;
// 		console.log(msg);
// 		//$(".voltage").html(valueB);
// 		setTimeout(addValues, 2500);
		
// 		function addValues() {
//     	channelA.append(new Date().getTime(), parseFloat(valueA));
// 			channelB.append(new Date().getTime(), parseFloat(valueB));
// 		}
		
// 	}
	
// 	$('#main-navbar .nav a[href="' + this.location.pathname + '"]').parent().addClass('active');

//     function createTimeline() {
//         //var chart = new SmoothieChart();
// 				var chart = new SmoothieChart({interpolation:'step', minValue: -500.00, maxValue: 500.00,
// 																			grid: {fillStyle:'#0e033b', sharpLines:true, lineWidth: 1, millisPerLine: 1000, verticalSections: 6}});
// 				chart.addTimeSeries(channelA, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0)', lineWidth: 2 });
// 				chart.addTimeSeries(channelB, { strokeStyle: 'rgba(240, 0, 0, 1)', fillStyle: 'rgba(240, 0, 0, 0)', lineWidth: 2 });
//         chart.streamTo(document.getElementById("mycanvas"), 1000);
//     }
// });

jQuery(document).ready(function($) {
    var channelA = new TimeSeries();
    var channelB = new TimeSeries();
    // var dataReceivedA = [];
    // var dataReceivedB = [];
    // var dataPlotA = [];
    // var dataPlotB = [];
    var currentTime = 0;
    createTimeline();

    var socket = new WebSocket( 'ws://107.170.249.214:3131' );

    socket.onopen = function(){
        var msg = JSON.stringify(["OpenLabsHost","Connect"]);
        socket.send(msg);
    };

    $('#wind-speed').hide();
    //btnstop = $("#stoplabBtn");   test to see if it work when replaced with the repetition
    $("#stoplabBtn").prop('disabled', true);

    $("#startlabBtn").click(function(){
        $("#startlabBtn").prop('disabled', true);
        $("#stoplabBtn").prop('disabled', false);
        $('#wind-speed').show();
    });

    $("#stoplabBtn").click(function(){
        $("#startlabBtn").prop('disabled', false);
        $("#stoplabBtn").prop('disabled', true);
    });

    socket.onmessage = function(msg){

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
        if (currentTime === 0){
            currentTime = new Date().getTime();
        }
        else {
            currentTime += valueT
        }
				console.log(currentTime);
        channelA.append(currentTime, valueA);
        channelB.append(currentTime, valueA);
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

    function createTimeline() {
        //var chart = new SmoothieChart();
        var chart = new SmoothieChart({interpolation: 'step', minValue: -500.00, maxValue: 500.00,
            grid: {fillStyle:'#0e033b', sharpLines:true, lineWidth: 1, millisPerLine: 1000, verticalSections: 6}});
        chart.addTimeSeries(channelA, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0)', lineWidth: 2 });
        chart.addTimeSeries(channelB, { strokeStyle: 'rgba(240, 0, 0, 1)', fillStyle: 'rgba(240, 0, 0, 0)', lineWidth: 2 });
        chart.streamTo(document.getElementById("mycanvas"), 1000);
    }
});