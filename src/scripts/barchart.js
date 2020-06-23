document.addEventListener('DOMContentLoaded', () => {
    const height = 500;
    const width = 940;
    
    const margin = { y: 100 };
    const svg = d3.select('#viewers-svg').append('svg')
        .style('background', '#f1f1f1')
        .attr('height', height)
        .attr("transform", "translate(" + 0 + "," + margin.y + ")");

    d3.csv('http://localhost:8080/src/data/average-viewership.csv').then(function(data) {
        const xScale = d3.scaleLinear()
            .domain([2016, 2020])
            .range(10000, 0);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){return +d.Viewers;})])
            .range([0, 500]);

        console.log();

        const xAxis = d3.axisBottom(xScale)
            .ticks(5).tickFormat(function(d, i){return d});

        const yAxis = d3.axisLeft(yScale)
            .ticks(6).tickFormat(function(d, i) {return d});

        d3.select("g path").remove();

        svg.append('g').attr("transform", "translate(30," + 10 + ")").call(xAxis);
        svg.append('g').call(yAxis);
        const bars = svg.selectAll('rect').data(data);
        bars.enter().append('rect').classed('bars', true)
            .attr('height', function(d) {return yScale(+d.Viewers)})
            .attr('x', function(d, i) {return i * 40;})
            .attr('y', function(d) {return height - (yScale(+d.Viewers));})
            .text(function(d){ return d.Viewers ;})

    });

})