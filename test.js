var d3 = require("d3");

var test_data = ["2015", "01", "19","4", "0", "0", "1", "2"];

// #year,month,day,hour,qtr,lineID,stationID,statusN,statusS
// 2015,01,19,00,1, 0,  0,1,0

d3.csv("data/daily_status/collated_status_20140725.csv", function(data) {
   dataset = data.map(function(d) { return +d["year"], +d["month"],[ +d["day"], +d["hour"], +d["lineID"], +d["stationID"], +d["statusN"], +d["statusS"] ]; });
   console.log(dataset)
});
