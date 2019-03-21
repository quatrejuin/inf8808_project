"use strict";

/**
 * Crée le graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param data    Les données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 * @param color   L'échelle pour la couleur des cercles.
 * @param tip     L'infobulle à afficher lorsqu'un cercle est survolé.
 * @param view
 */
function initialBubbleChart(data, x, y, r ,view) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.
  var simulation = d3.forceSimulation(data)
  .force('x', d3.forceX().x(function(d) {
    return x(d.date);
  }))
  .force('y', d3.forceY().y(function(d) {
    var y_base = 0
    if (view == "country")
    {
      y_base = y(y.domain().includes(d.country)?d.country:'others')
    }
    if (isNaN(y_base))
    {
      console.log(d.country)
    }
    return y_base

  }))
  .force('collision', d3.forceCollide().radius(function(d) {
    return r(d.YIELD)+0.1;
  }))
  .stop()

for (var i = 0;i <500;i++) simulation.tick()

}


/**
 * Crée le graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param data    Les données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 * @param color   L'échelle pour la couleur des cercles.
 * @param tip     L'infobulle à afficher lorsqu'un cercle est survolé.
 * @param view
 */
function createBubbleChart(g, data, x, y, r, color, tip, view) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.

var u = g.append("g").selectAll('circle')
.data(data);

u.enter()
.append('circle')
.classed("dot",true)
.attr('r', function(d) {
  return r(d.YIELD);
})
.style('fill', function(d) {
  return color(d.country);
})
.attr('cx', function(d) {
  return d.x;
})
.attr('cy', function(d) {
  return d.y;
})
.on('mouseover', tip.show)
.on('mouseout', tip.hide);


}

function createHorizontalLines(x,y,countries)
{
  let g = d3.select("g.focus")
  .append("g")
  // For overall view
  g.append("g")
  .attr("class","x axis overall")
  .append("line")
  .attr("x1",x.range()[0])
  .attr("x2",x.range()[1])
  .attr("y1",0)
  .attr("y2",0)
  .style("stroke","#00000050")
  .style("stroke-width",1)
  .attr("stroke-dasharray","10,5")


  // For country view
  g.selectAll("g.x.axis.country")
  .data(y.domain())
  .enter()
  .append("g")
  .attr("class","x axis country")
  .attr("id",(d,id)=>id)
  .append("line")
  .attr("x1",x.range()[0])
  .attr("x2",x.range()[1])
  .attr("y1",d=>y(d))
  .attr("y2",d=>y(d))
  .style("stroke","#00000050")
  .style("stroke-width",1)
  .attr("stroke-dasharray","10,5")
}