var d3 = require("d3");

var test_data = ["Saab", "Volvo", "BMW"];

d3.csv("data/daily_status/collated_status_20140725.csv", function(data) {
   dataset = data.map(function(d) { return +d["year"], +d["month"],[ +d["day"], +d["hour"], +d["lineID"], +d["stationID"], +d["statusN"], +d["statusS"] ]; });
   console.log(dataset)
});
