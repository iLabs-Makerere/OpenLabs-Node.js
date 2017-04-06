jQuery(document).ready(function($) {
	/*if($('#plotly-div').length){ //refer to graphing.js
        graphingFxn();
  	}*/
    $("#startlabBtn").click(function(){
        $("#startlabBtn").toggleClass("btn btn-md btn-danger");
    });
	//console.log(this.location.pathname);
	$('#main-navbar .nav a[href="' + this.location.pathname + '"]').parent().addClass('active');
});

