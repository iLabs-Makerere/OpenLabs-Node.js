jQuery(document).ready(function($) {
	if($('#plotly-div').length){
        graphingFxn();
  	}
	console.log(this.location.pathname);
	$('#main-navbar .nav a[href="' + this.location.pathname + '"]').parent().addClass('active');
});

