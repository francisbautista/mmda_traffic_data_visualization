var line = $('select[name=line_select]').val();
var station = $('select[name=station_select]').val();
var day = $('button').data('int');

$(function() {
    $('select[name=line_select]').val(0);
    $('select[name=select_select]').val(0);
    $("button#default-day").css("background-color", "rgba(255,255,255,0.9)");
});

$('select[name=line_select]').change(function() {
	$("button#default-day").css("background-color", "rgba(255,255,255,0.4)");
	

	var val = $(this).find(':selected').data('name');

    if (this.value !==  '') {
		$("span.line_name").html(val).show();

		var temp = $('select[name=station_select]').val();
		
		if (temp !== ''){
			$("span.station_name").hide();
		}

		$("span.line_name").css("color", "#33691E");
		$("span.line_name").css("background-color", "rgba(255, 249, 196,0.8)");
		$($('select[name=station_select]').removeAttr('disabled')).focus();	
    }
    else {
        $("span.line_name").hide();
        $('select[name=station_select]').attr('disabled', 'disabled');
    }

    line = this.value;
        
	

});

$('select[name=station_select]').change(function() {
	$("button#default-day").css("background-color", "rgba(255,255,255,0.4)");
	var val = $(this).find(':selected').data('name');

    if (this.value != '') {
    	$("span.station_name").show();
		$("span.station_name").html(val).show;
		$("span.station_name").css("color", "#33691E");
		$("span.station_name").css("background-color", "rgba(255, 249, 196,0.8)");
		//$("span.line_name").fadeIn("slow");		
    }
    else {
        $("span.station_name").hide();
    }

    station = this.value;

});


$('button.when-btn').click(function() {
	$("button#default-day").css("background-color", "rgba(255,255,255,0.4)");
	var val = $(this).data('label');
	$("span.when").html(val).show();
	$("span.when").css("color", "#33691E");
	$("span.when").css("background-color", "rgba(255, 249, 196,0.8)");

	day = $(this).data('int');

	console.log("Day " + day);
	

	updatePieChart(7, line, station, day);
	updatePieChartSB(7, line, station, day);

});


