//GLOBAL VALUES
var line = 0;
var station = 0;
var day = 0;
var hour = 7;

init(hour);
// init_sb(hour);

function reset(){
	var line = 4;
	var station = 0;
	var day = 1;
	var hour = 7;
	updatePieChart(hour, line, station, day)
}


//GLOBAL VALUES