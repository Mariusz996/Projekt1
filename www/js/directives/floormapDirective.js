app.directive('floormap', function() {
    return {
        restrict: 'E',
        scope: {
          data: '=',
          width: '=',
          height: '='
        }, 
        link: function (scope, element, attrs) {
           // j wysokość i szerokość naszej mapy
            var width = scope.width;
            var height = scope.height;
            // dolacza el svg do <floormap>
            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("height", height)
            
            // dodaje obraz
            svg.append("svg:image")
               .attr('width', width)
               .attr('height', height)
               .attr("xlink:href","images/floorplan.jpg")

            // obiekt lini
            var line = d3.svg.line()
                .interpolate("cardinal")
            
            // przejscie do animacji
            function transition(path) {
              path.transition()
                  .duration(7500)
                  .attrTween("stroke-dasharray", tweenDash)
                  .each("end", function() { d3.select(this).call(transition); });
            }
            function tweenDash() {
              var l = this.getTotalLength(),
                  i = d3.interpolateString("0," + l, l + "," + l);
              return function(t) { return i(t); };
            }
          
           
            // pokazuje linie
            scope.$watch('data', function (newVal, oldVal) {
                // Skip when newVal is not set
                if (!newVal){
                    return
                }
                
              //przypisuje/wiaze dane newVal z obiektem SVG
                svg.datum(newVal);
                // atrybuty lini
                svg.append("path")
                    .style("stroke", "#666")
                    .style("stroke-dasharray", "4,4")
                    .attr("d", line);
              // rysuje niebieska linie
                svg.append("path")
                    .attr("d", line)
                    .call(transition);
                // zaznacza punkty
                svg.selectAll(".dot")
                    .data(newVal)
                  .enter().append("circle")
                    .attr("class", "dot")
                    .attr("cx", line.x())
                    .attr("cy", line.y())
                    .attr("r", 5);
            });
        }
    };
});