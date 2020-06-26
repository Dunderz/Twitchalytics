document.addEventListener('DOMContentLoaded', function() {
    const width = 900;
    const height = 560;
    const radius = Math.min(width-150, height-150) / 2;
    const donutWidth = 120;

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
        .attr('transform', 'translate(' + (width/2) + ',' + (height / 2 - 50) + ')');

    const arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    const pie = d3.pie()
        .value(function(d) {
            return +d.Viewers;
        })
        .sort(null);
    
    const arcOver = d3.arc().outerRadius(radius + 20).innerRadius(radius - 150);

    d3.select('.game-tooltip')
        .attr('style', 'opacity: 0;')
        

    d3.csv('https://dunderproto.github.io/Twitchalytics/src/data/top-games.csv').then(function(data) {
        const legends = svg.append('g').attr('transform', 'translate(200, -100)')
                .selectAll('.legends').data(data);
            
        const legend = legends.enter().append('g').classed('legends', true)
                .attr('transform', function(d, i){return "translate(60," + (i+1)*30 + ")";});

        legend.append('rect').attr('width', 20).attr('height', 20)
                .attr('fill', function(d, i){
                    return color(d.Game);
                });

        legend.append('text').classed('game-name', true).text(function(d){return d.Game;})
                .attr('x', 30)
                .attr('y', 14);

        const gameToolTip = (d) => {
            return (`
                    <div class="game-tooltip-section">
                        <span>Game:</span> <span>${d.data.Game}</span>
                    </div>
                    <div class="game-tooltip-section">
                        <span>Percentage:</span> <span>${d.data.Percentage}</span>
                    </div>
                    <div class="game-tooltip-section">
                        <span>Viewers:</span> <span>${d.data.Viewers}</span>
                    </div>
            `)
        }

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
                        .style('cursor', 'pointer')
                        .attr("stroke", "white")
                        .transition()
                        .duration(100)
                        .attr("d", arcOver)
                        .attr("stroke-width", 1);
                    
                    d3.select('.game-tooltip')
                        .style('opacity', 1)
                        .style("top",  '10px')
                        .style('left', '0px')
                        .html(gameToolTip(d))
                })
                .on("mouseleave", function (d) {
                    d3.select(this).transition()
                        .duration(200)
                        .attr("d", arc)
                        .attr("stroke", "none");

                    d3.select('.game-tooltip')
                        .style('opacity', 0)
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