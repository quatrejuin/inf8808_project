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
 */
function createBubbleChart(g, data, x, y, r, color, tip) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.


  // g.append("g")
  // .attr("class","graph")
  // .selectAll(".dot")
  // .data(data)
  // .enter()
  // .append("circle")
  // .attr("class","dot")
  // .attr("cx",d=>{return x(d.Date)})
  // .attr("cy",d=>{return 0})
  // .attr("r",d=>{return r(d.YIELD)})
  // .attr("fill",d=>{return color("us")})
  // .attr("stroke","red")
  // .on('mouseover', tip.show)
  // .on('mouseout', tip.hide);


  var simulation = d3.forceSimulation(data)
  .force('x', d3.forceX().x(function(d) {
    return x(d.Date);
  }))
  .force('y', d3.forceY().y(function(d) {
    return 0;
  }))
  .force('collision', d3.forceCollide().radius(function(d) {
    return r(d.YIELD)+0.1;
  }))
  .on('tick', ticked);

function ticked() {
  var u = g.selectAll('circle')
    .data(data);

  u.enter()
    .append('circle')
    .attr('r', function(d) {
      return r(d.YIELD);
    })
    .style('fill', function(d) {
      return color(d.country);
    })
    //.merge(u)
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  u.exit().remove();
}
}