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
  g.append("g")
  .attr("class","graph")
  .selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class","dot")
  .attr("cx",d=>{return x(d.Date)})
  .attr("cy",d=>{return 0})
  .attr("r",d=>{return r(d.YIELD)})
  .attr("fill",d=>{return color("us")})
  .attr("stroke","white")
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);
}