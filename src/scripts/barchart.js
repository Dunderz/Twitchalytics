document.addEventListener('DOMContentLoaded', () => {
    const height = 400;
    const width = 797;
    const spacing = 120;
    const margin = 100;

    let loaded = false;

    const svg = d3.select('#viewers-svg').append('svg')
        .attr('height', height+100)
        .attr("transform", "translate(" + 0 + "," + margin + ")")
        .append('g')
        .attr('transform', 'translate(' +
        spacing/2 + ',' + spacing/2 + ')');


    d3.csv('http://localhost:8080/src/data/average-viewership.csv').then(function(data) {
        const xScale = d3.scaleLinear()
                    .domain([
                        d3.min(data, function(d){return +d.Year;}), 
                        2021
                    ])
                    .range([0, width-spacing]);
        
        const xAxis = d3.axisBottom(xScale)
                    .ticks(5).tickFormat(function(d){return d;});
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){return +d.Viewers ;})])
            .range([height-spacing+50, 0]);

        const yAxis = d3.axisLeft(yScale)
            .tickSize(0)
            .tickFormat(function(d, i) {return d});

        svg.append("g")
            .classed('viewers-x', true)
            .attr("transform", "translate(30," + (height-100) + ")")
            .call(xAxis);

        svg.append('g')
            .classed('viewers-y', true)
            .attr("transform", "translate(0," + -30 + ")")
            .call(yAxis);

        
        const bars = svg.selectAll('rect').data(data);

        const loadBars = (sections) => {
            sections.enter().append('rect')
                .classed('bar', true)
                .attr('width', 28)
                .attr('x', function(d, i) {return ((i+0.45) * 34);})
                .attr('y', function(d) {return height - 100;})
                .transition().delay(function(d, i) {return i*65})
                .duration(500)
                .attr('height', function(d) {return height - 60 - yScale(+d.Viewers)})
                .attr('x', function(d, i) {return ((i+0.45) * 34);})
                .attr('y', function(d) {return yScale(+d.Viewers) - 40;})
        }

        // refactor

        if (window.scrollY >= 1400) {
            loaded = true;
            loadBars(bars);
        }

        if (loaded == false) {
            window.addEventListener('scroll', function() {
                if (window.scrollY >= 1400) {
                    loadBars(bars);
                }
            })
        }

        
    });

})