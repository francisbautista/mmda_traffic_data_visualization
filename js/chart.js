var w = 300;
var h = 300;
var r = h/2;


//var color = d3.scale.category20b();

var color = d3.scale.ordinal()
  .domain(["High", "Medium", "Low"])
  .range(["#af1111","#dbd823","#6ba351"]);

function init(hour){

d3.csv("../data_vis/output/station_day_summary/s0d01_nospace.csv", 
  function(data) {
    var filtered =  data.filter(function(d) {return d["hour"]==hour });
    var dataset = filtered.map(function(d) { 
       return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];     
    });

  
});

}


// get JSON data from sliders
function getData()
{
  d3.csv("../data_vis/output/station_day_summary/s0d01_nospace.csv", 
    function(data) {
      var filtered =  data.filter(function(d) {return d["hour"]==hour });
      var dataset = filtered.map(function(d) { 
         return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];     
      });

  });
}



// draw pie chart
function pieChart()
{ 
    var json = getData();    
    
    d3.select("#chart svg").remove();
    
    // svg canvas
    var svg = d3.select("#chart")
        .append("svg:svg")
        .attr("width", radius*2)
        .attr("height", radius*2)
            .append("svg:g")
            .attr("transform", "translate("+radius+","+radius+")");
    
    // slices
    var arcs = svg.selectAll("path").data(pie(getData()))
    
    // render the slices
    arcs.enter()
        .append('svg:path')
        .attr("fill", function(d,i){ return color(i); })
        .attr("d", arc)
        .each(function(d){ this._current = d; })
            .append('title')
            .text(function(d,i){ return json[i].value + '%'; });
    
    // render the labels
    arcs.enter()
        .append("svg:text")
        .attr("transform", function(d){
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d,i){ 
            if(json[i].value > 1) return json[i].label;
            else return null;
        });
}

// update pie chart
function updatePieChart()
{
    updateArcs();
    updateLabels();
}

// update the slices of the pie chart
function updateArcs()
{
    var json = getData();
    
    d3.selectAll("#pie path title")
        .text(function(d,i){ return json[i].value + '%'; });
    
    d3.selectAll("#pie path")
        .data(pie(json))
        .transition()
            .duration(700)
            .attrTween('d', arcTween);
}

// update the labels of the pie chart
function updateLabels()
{
    d3.selectAll("#pie text")
        .data(pie(getData()))
        .transition()
            .duration(700)
            .attr("transform", function(d){
                return "translate(" + arc.centroid(d) + ")";
            })
            .text(function(d, i){ 
                if(getData()[i].value > 0) return getData()[i].label;
                else return null;
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
}