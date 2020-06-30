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

    d3.select('#viewers-svg')
        .append('div')
        .attr('class', 'viewer-tooltip')
        .attr('style', 'position: fixed; opacity: 0;');


    d3.csv('https://dunderproto.github.io/Twitchalytics/src/data/average-viewership.csv').then(function(data) {
        const xScale = d3.scaleLinear()
                    .domain([
                        d3.min(data, function(d){return +d.Year;}), 
                        2020
                    ])
                    .range([-2, width-spacing-135]);
        
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

        const barToolTip = (d) => {
            return (`
                    <div>
                        <div>Date: ${d.Month} ${d.Year}</div>
                    </div>
                    <div>
                        <div>Viewers: ${d.Viewers}</div>
                    </div>
            `)
        }

        const loadBars = (sections) => {
            sections.enter().append('rect')
                .classed('bar', true)
                .attr('width', 28)
                .attr('x', function(d, i) {return ((i+0.45) * 34);})
                .attr('y', function(d) {return height - 100;})
                .on('mouseenter', function(d) {
                    d3.select('.viewer-tooltip')
                        .style('opacity', 1)
                        .style('left', event.target.getBoundingClientRect().x - 70 + 'px')
                        .style("top",  event.target.getBoundingClientRect().y - 95 + "px")
                        .html(barToolTip(d))
                })
                .on('mouseleave', function(d) {
                    d3.select('.viewer-tooltip')
                        .style('opacity', 0)
                })
                .transition().delay(function(d, i) {return i*65})
                .duration(500)
                .attr('height', function(d) {return height - 60 - yScale(+d.Viewers)})
                .attr('y', function(d) {return yScale(+d.Viewers) - 40;})
        }

        // refactor

        if (window.scrollY >= 1400) {
            loaded = true;
            loadBars(bars);
        }

        window.addEventListener('scroll', function() {
            if (window.scrollY >= 1400 && loaded == false) {
                loaded = true;
                loadBars(bars);
            }
        })

    });

})