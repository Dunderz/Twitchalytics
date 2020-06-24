document.addEventListener('DOMContentLoaded', () => {
    var data = [{"year": 2010, "loss":4500}, {"year": 2011, "loss":3000}, {"year": 2012, "loss":5000}, {"year": 2013, "loss":7500}, {"year": 2014, "loss":6000}];
    var spacing = 120, width = 600, height = 500;
    
    var svg = d3.select("#viewers-svg").append("svg")
                .attr("width", width).attr("height", height)
                .style("background", "pink")
                .append("g")
                .attr("transform", "translate(" + spacing/2 + "," + spacing/2 + ")");
    
    var xScale = d3.scaleLinear()
                    .domain([d3.min(data, function(d){return d.year;}), d3.max(data, function(d){return d.year;})])
                    .range([0, width-spacing]);
    var yScale = d3.scaleLinear()
                    .domain([2500, 8000])
                    .range([height-spacing, 0]);
    
    var xAxis = d3.axisBottom(xScale)
    .ticks(5).tickFormat(function(d){return d;});
    var yAxis = d3.axisLeft(yScale)
    .tickFormat(function(d){return "$" + d;});
    
    svg.append("g").attr("transform", "translate(30," + (height-spacing) + ")").call(xAxis);
    svg.append("g").call(yAxis);
    d3.select("g path").remove();
    var rect = svg.selectAll("rect").data(data);
    rect.enter().append("rect")
        .attr("width", 30)
        .attr("height", function(d){return (height-spacing) - yScale(d.loss);})
        .attr("x", function(d){return xScale(d.year) + 15;})
        .attr("y", function(d){return yScale(d.loss)})
        .style("fill", "indigo");

    // const height = 500;
    // const width = 940;
    // const spacing = 100;
    
    // const margin = 100;
    // const svg = d3.select('#viewers-svg').append('svg')
    //     .style('background', '#f1f1f1')
    //     .attr('height', height)
    //     .attr("transform", "translate(" + 0 + "," + margin + ")")
    //     .append('g')
    //     .attr('transform', 'translate(' +
    //     spacing/2 + ',' + spacing/2 + ')');

    // const data = [{"year": 2010, "loss":4500}, {"year": 2011, "loss":3000}, {"year": 2012, "loss":5000}, {"year": 2013, "loss":7500}, {"year": 2014, "loss":6000}];

    // const xScale = d3.scaleLinear()
    //     .domain([
    //         d3.min(data, function(d){return d.year;}), d3.max(data, function(d){return d.year;})
    //     ])
    //     .range(0, width);

    // const xAxis = d3.axisBottom(xScale)
    //     .ticks(5).tickFormat(function(d, i){return d});

    // svg.append('g').attr("transform", "translate(30," + height-spacing + ")").call(xAxis);

    // d3.csv('http://localhost:8080/src/data/average-viewership.csv').then(function(data) {
        
        // const yScale = d3.scaleLinear()
        //     .domain([0, d3.max(data, function(d){return +d.Viewers;})])
        //     .range([0, height-spacing]);

        // const yAxis = d3.axisLeft(yScale)
        //     .ticks(6).tickFormat(function(d, i) {return d});

        // d3.select("g path").remove();

        // svg.append('g').attr("transform", "translate(30," + height-spacing + ")").call(xAxis);
        // svg.append('g').call(yAxis);
        // const bars = svg.selectAll('rect').data(data);
        // bars.enter().append('rect').classed('bars', true)
        //     .style('background', 'pink')
        //     .attr('height', function(d) {return yScale(+d.Viewers)})
        //     .attr('x', function(d, i) {return i * 40;})
        //     .attr('y', function(d) {return height - (yScale(+d.Viewers));})
        //     .text(function(d){ return d.Viewers ;})

    // });

})