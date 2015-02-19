var d3 = require("d3");
var dataset = []
d3.csv("collated_status_20140725.csv", function(data) {
   dataset = data.map(function(d) { return [ +d["statusN"], +d["statusS"] ]; });
});
console.log(dataset)
