

console.log(d3.time.hour);
var start = moment().startOf('day').fromNow();
var end = moment().endOf('day').fromNow();


//d3.select('#slider7').call(d3.slider().axis(true).min(startTime).max(endTime).step(60));
//d3.select('#slider7').call(d3.slider().axis(true).min(0).max(24).step(1));



//d3.select('#slider7').call(d3.slider().axis(true).min(0).max(10).step(1));


$('select[name=line_select]').change(function() {

    if (this.value !==  '') {
		$("span.line_name").html(this.value).show();
		$("span.line_name").css("color", "#222");
		$("span.line_name").css("background-color", "rgba(141, 142, 142, 0.5)");
		//$("span.line_name").fadeIn("slow");	
		$($('select[name=station_select]').removeAttr('disabled')).focus();	
    }
    else {
        $("span.line_name").hide();
        $('select[name=station_select]').attr('disabled', 'disabled');
    }

        
	

});

$('select[name=station_select]').change(function() {
    if (this.value != '') {
		$("span.station_name").html(this.value).show;
		$("span.station_name").css("color", "#222");
		$("span.station_name").css("background-color", "rgba(141, 142, 142, 0.5)");
		//$("span.line_name").fadeIn("slow");		
    }
    else {
        $("span.station_name").hide();

    }

});

$('button').click(function() {
	var val = $(this).data('label');
	$("span.when").html(val).show();
	$("span.when").css("color", "#222");
	$("span.when").css("background-color", "rgba(141, 142, 142, 0.5)");
});