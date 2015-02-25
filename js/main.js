var axis = d3.svg.axis().orient("top").ticks(4);
d3.select('#slider6').call(d3.slider().axis(axis));

d3.select('#slider7').call(d3.slider().axis(true).min(0).max(24).step(1));


//d3.select('#slider7').call(d3.slider().axis(true).min(0).max(10).step(1));
