// InitChart();
d3.csv("/datavis/data/04_data/s5d04.csv", function(error, data) {
    //   data.forEach(function(d) {
    //       d.Hour = parseInt(d.Hour);
    //       d.nHigh = +d.nHigh; });
    InitChart(data);
}) ;
function InitChart(data) {
    var vis = d3.select("#visualisation"),
    WIDTH = 1125,
    HEIGHT = 400,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 16,
        left: 30
    },
    xRange = d3.scale.linear()
    .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([0,23]),

    yRange = d3.scale.linear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([0,100]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),


    yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient("left")
    .tickSubdivide(true);


    vis.append("svg:g")
    .attr("class", "x axis")
    .attr("stroke-width", 4)
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

    vis.append("text")      // text label for the x axis
    .attr("class", "x label")
    .attr("x", WIDTH/2-1)
    .attr("y", HEIGHT)
    .style("text-anchor", "middle")
    .text("Time");

    vis.append("svg:g")
    .attr("stroke-width", 4)
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

    vis.append("text")
    .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Percentage:");


    var line = d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.nHigh);
    })
    .interpolate('linear');

    var line2= d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.nMed);
    })
    .interpolate('linear');

    var line3= d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.nLow);
    })
    .interpolate('linear');



    vis.append("svg:path")
    .datum(data)
    .attr("d", line(data))
    .attr("stroke", "#af1111")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("svg:path")
    .attr("d", line2(data))
    .attr("stroke", "#dbd823")
    .attr("stroke-width", 4)
    .attr("fill", "none");
    vis.append("svg:path")
    .attr("d", line3(data))
    .attr("stroke", "#6fb640")
    .attr("stroke-width", 4)
    .attr("fill", "none");

}
