var axis = d3.svg.axis().orient("top").ticks(4);
d3.select('#slider6').call(d3.slider().axis(axis));

d3.select('#slider7').call(d3.slider().axis(true).min(0).max(24).step(1));


//d3.select('#slider7').call(d3.slider().axis(true).min(0).max(10).step(1));


$('select[name=line_select]').change(function() {
	var val = this.value;
	$("span.line_name").html(val).show();
	//$("span.line_name").fadeIn("slow");
	$($('select[name=station_select]').removeAttr('disabled')).focus();
});

$('select[name=station_select]').change(function() {
	var val = this.value;
	$("span.station_name").html(val).show();

});

$('button').click(function() {
	var val = $(this).data('label');
	$("span.when").html(val).show();
});