document.addEventListener('DOMContentLoaded', () => {
    const margin = { y: 100 };
    const svg = d3.select('#viewers-svg').append('svg')
        .style('background', '#f1f1f1')
        .attr("transform", "translate(" + 0 + "," + margin.y + ")");

    d3.csv('http://localhost:8080/src/data/average-viewership.csv').then(function(data) {
        console.log(data);
        const bars = svg.selectAll('div').data(data);
        bars.enter().append('div').classed('bars', true)
        .text(function(d){ console.log(d.Viewers);})

    });

})