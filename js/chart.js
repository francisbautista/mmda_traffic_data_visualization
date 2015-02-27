var w = 300;
var h = 300;
var r = h/2;


//var color = d3.scale.category20b();

var color = d3.scale.ordinal()
  .domain(["High", "Medium", "Low"])
  .range(["#af1111","#dbd823","#6ba351"]);

var pie = d3.layout.pie().value(function(d){return d.value;});

var arc = d3.svg.arc()
    .innerRadius(r/2)
    .outerRadius(r);

function init(hour){


  var file = "../data_vis/output/station_day_summary/s0d00_nospace.csv";

   d3.csv(file, 
    function(data) {
      var filtered =  data.filter(function(d) {return d["hour"]==hour });
      var dataset = filtered.map(function(d) { 
         return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];     
      });
      piePlotter(dataset[0]);
  });
 
}

function getData(hour, line, station, day, fn){

  var file = "../data_vis/output/station_day_summary/s"+station+"d0"+day+"_nospace.csv"

 // var file = "../data_vis/output/station_day_summary/s"+station+"d0"+day+".csv"


   d3.csv(file, 
    function(data) {
      var filtered =  data.filter(function(d) {return d["hour"]==hour });
      var dataset = filtered.map(function(d) { 
         return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];     
      });

      fn(dataset[0]);
     
    });

}


function piePlotter(dataset){

  var data = [{"label":"High", "value": dataset[0]}, 
              {"label":"Medium", "value":dataset[1]}, 
              {"label":"Low", "value":dataset[2]}];

  var vis = d3.select('#chart')
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");


  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

  arcs.append("svg:path")
      .attr("fill", function(d, i){
          return color(i);
      })
      .attr("d", function (d) {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
      })
      .each(function(d){ this._current = d; })
          .append('title')
          .text(function(d,i){ return data[i].value + '%'; });
    
  // render the labels
  arcs.append("svg:text")
      .attr("transform", function(d){
          return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d,i){ 
          return data[i].value+"%";
      });

  //Center Text
  vis.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "rgba(255,255,255,0.85)")
        .attr("class", "inside_nb")
        .text(function(d) { return 'NB'; });
  
}


function updatePieChart(hour, line, station, day)
{
    console.log("Line ", line);
    console.log("Station ", station);
    console.log("Day ", day);
    updateArcs(hour, line, station, day);
    updateLabels(hour, line, station, day);
}


// update the slices of the pie chart
function updateArcs(hour, line, station, day)
{

  getData(hour, line, station, day, function(data){
      console.log(data);

      var data =  [{"label":"High", "value": data[0]}, 
                {"label":"Medium", "value":data[1]}, 
                {"label":"Low", "value":data[2]}];

      console.log("Low " + data[2].value);
    
      d3.selectAll("#chart path title")
        .text(function(d,i){ return data[i].value + '%'; });
    
      d3.selectAll("#chart path")
        .data(pie(data))
        .transition()
            .duration(700)
            .attrTween('d', arcTween);

    });
}


// update the labels of the pie chart
function updateLabels(hour, line, station, day)
{
   getData(hour, line, station, day, function(data){
     var data =  [{"label":"High", "value": data[0]}, 
        {"label":"Medium", "value":data[1]}, 
        {"label":"Low", "value":data[2]}];

    d3.selectAll("#chart text")
        .data(pie(data))
        .transition()
            .duration(700)
            .attr("transform", function(d){
                return "translate(" + arc.centroid(d) + ")";
            })
            .text(function(d,i){ 
                return data[i].value+"%";
            });

  });
}

// transition for the arcs
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}
