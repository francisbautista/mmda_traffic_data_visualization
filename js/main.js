


$('#myonoffswitch').change(function(){
	 if (this.checked){
		$('#visualisationNB').fadeToggle("slow");
		$('#visualisationSB').hide();
	}
	else {
		$('#visualisationSB').fadeToggle("slow");
		$('#visualisationNB').hide();
	}

});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

// $(".onoffswitch").click(function(){
// 	$("#visualisationSB").show();
// 	$("#visualisationNB").hide();
// });


console.log(d3.time.hour);
var start = moment().startOf('day').fromNow();
var end = moment().endOf('day').fromNow();


//d3.select('#slider7').call(d3.slider().axis(true).min(startTime).max(endTime).step(60));
//d3.select('#slider7').call(d3.slider().axis(true).min(0).max(24).step(1));



//d3.select('#slider7').call(d3.slider().axis(true).min(0).max(10).step(1));


$('select[name=line_select]').change(function() {
	var val = $(this).find(':selected').data('name')
    if (this.value !==  '') {
		$("span.line_name").html(val).show();
		$("span.line_name").css("color", "#33691E");
		//$("span.line_name").css("background-color", "rgba(141, 142, 142, 0.5)");
		$("span.line_name").css("background-color", "rgba(255, 249, 196,0.8)");
		//$("span.line_name").fadeIn("slow");
		$($('select[name=station_select]').removeAttr('disabled')).focus();
    }
    else {
        $("span.line_name").hide();
        $('select[name=station_select]').attr('disabled', 'disabled');
    }




});

$('select[name=station_select]').change(function() {
	var val = $(this).find(':selected').data('name')
    if (this.value != '') {
		$("span.station_name").html(val).show;
		$("span.station_name").css("color", "#33691E");
		$("span.station_name").css("background-color", "rgba(255, 249, 196,0.8)");
		//$("span.line_name").fadeIn("slow");
    }
    else {
        $("span.station_name").hide();

    }

});

$('button').click(function() {
	var val = $(this).data('label');
	$("span.when").html(val).show();
	$("span.when").css("color", "#33691E");
	$("span.when").css("background-color", "rgba(255, 249, 196,0.8)");
});


$('form').submit(function(e){
	e.preventDefault();

	var reg = $( 'select[name="reg_id"]').val();
	var pro = $( 'select[name="pro_id"]').val();
	var mun = $( 'select[name="mun_id"]').val();
	var are = $( 'select[name="are_id"]').val();
	var start_date = $( 'input#start-date').val();
	var end_date = $( 'input#end-date').val();


	if (are != ""){
		ajax_call(are, start_date, end_date, "are");

	}
	else if (mun != "") {
		ajax_call(mun, start_date, end_date, "mun");
	}
	else if (pro != "") {
		ajax_call(pro, start_date, end_date, "pro");
	}
	else if (reg != "") {
		ajax_call(reg, start_date, end_date, "reg");
	}
	else {
		ajax_call(null, start_date, end_date, null);
	}

});
