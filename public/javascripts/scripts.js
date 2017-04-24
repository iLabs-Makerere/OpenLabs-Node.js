
jQuery(document).ready(function($) {
	/*if($('#plotly-div').length){ //refer to graphing.js
        graphingFxn();
  	}*/
    createTimeline();
    $('#wind-speed').hide();
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
	//console.log(this.location.pathname);
	$('#main-navbar .nav a[href="' + this.location.pathname + '"]').parent().addClass('active');

    function createTimeline() {
        var chart = new SmoothieChart();
        chart.streamTo(document.getElementById("mycanvas"), 500);
    }
});


