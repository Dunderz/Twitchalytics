document.addEventListener('DOMContentLoaded', function() {
    const width = 460;
    const height = 560;
    const radius = Math.min(width-50, height-50) / 2;
    const donutWidth = 180;

    let loaded = false;

    const color = d3.scaleOrdinal()
        .range([
            '#A64C79',
            '#674EA7',
            '#3C84C6',
            '#3B77D8',
            '#44818E',
            '#6AA84E',
            '#F1C231',
            '#E69038',
            '#CC0000',
            '#AA0000'
        ]);

    const svg = d3.select('#games-svg').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width/2) + ',' + (height / 2) + ')');

    const arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    const pie = d3.pie()
        .value(function(d) {
            return +d.Viewers;
        })
        .sort(null);
    
    const arcOver = d3.arc().outerRadius(radius + 20).innerRadius(radius - 170);

    d3.csv('http://localhost:8080/src/data/top-games.csv').then(function(data) {
        const loadDonut = () => {
            svg.selectAll('path')
                .data(pie(data))
                .enter()
                .append('path')
                .style('fill', function(d, i){
                    return color(d.data.Game);
                })
                .on("mouseenter", function (d) {
                    d3.select(this)
                        .attr("stroke", "white")
                        .transition()
                        .duration(200)
                        .attr("d", arcOver)
                        .attr("stroke-width", 1);
                })
                .on("mouseleave", function (d) {
                    d3.select(this).transition()
                        .duration(200)
                        .attr("d", arc)
                        .attr("stroke", "none");
                })
                .attr('transform', 'translate(0, 50)')
                .transition().delay(function(d,i) {
                    return 190; }).duration(500)
                    .attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t); 
                        return arc(d)
                    }
                })
        }

        const hoverDonut = () => {
            setTimeout(function(){
                d3.select('#games-svg')
                    .style('pointer-events', 'auto')
            }, 670)
        }

        if (window.scrollY >= 2200) {
            loaded = true;
            loadDonut();
            hoverDonut();
        }

        window.addEventListener('scroll', function() {
            if (window.scrollY >= 2200 && loaded == false) {
                loaded = true;
                loadDonut();
                hoverDonut();
            }
        })

        
    })
})