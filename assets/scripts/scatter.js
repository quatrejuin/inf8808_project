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
function initialBubbleChart(data, x, y, r ,view, countries, pBar, endFunc) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.
  var i = 0;   // Tick iteration counter
  var simulation = d3.forceSimulation(data)
  .force('x', d3.forceX().x(function(d) {
    return x(d.date);
  }).strength(1))
  .force('y', d3.forceY().y(function(d) {
    var y_base = 0
    if (view == "country")
    {
      y_base = y(countries[d.country][0])
    }
    if (isNaN(y_base))
    {
      console.log(d.country)
    }
    return y_base

  }))
  .force('collision', d3.forceCollide().radius(function(d) {
    return r(d.YIELD)+0.5;
  }).strength(1).iterations(3))
  .on("tick",()=>{
    updateProgressBar(pBar, i/400)
    i++
  })
  .on("end", endFunc)




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

var cg = g.append("g").selectAll('g')
.data(data)
.enter()                    // select the countries
.append('g')
.attr("class",d=>d.country)
.classed("dots",true)
.selectAll('circle')
.data(d=>d.tests,d=>d.gid)
.enter()                    // select the expositions in each country
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

function createHorizontalLines(focus, x, y, countries)
{
  focus.append("g")
  .selectAll("g.x.axis.country")
  .data(y.domain())
  .enter()
  .append("g")
  .attr("class","x axis country")
  .attr("id",(d,id)=>id)
  .attr("transform",d=>`translate(0,${y(d)})`)
  .append("line")
  .attr("x1",x.range()[0])
  .attr("x2",x.range()[1])
  .attr("y1",0)
  .attr("y2",0)
  .style("stroke","#fff")
  .style("stroke-width",1)
  .style("shape-rendering","crispEdges")
  .attr("stroke-dasharray","4,2")

}


function createCountryNameLabel(focus, x, y, color, countries)
{
  let g = d3.selectAll("g.x.axis.country")

  let labelGroupY = d3.scalePoint()
  g = g.selectAll("g.countryNameGroup")
  // Data is the country code array. e.g: ["us"],["in","pk","nk"]
  .data(id=>getCountriesByAxisGroup(countries, id)) 
  .enter()
  .append("g")
  .classed("countryNameGroup",true)

  g.append("rect")
  .classed("countryNameBox",true)
  .attr("rx",10)
  .attr("ry",10)
  .attr("x", -100)
  .attr("y", -15)
  .attr("width",100)
  .attr("height",30)
  .style("fill",code=>color(code))
  

  g.append("text")
  .attr("x",-50)
  .attr("fill","white")
  .attr("font-size",12)
  .attr("text-anchor","middle")
  .attr("alignment-baseline","middle")
  .text(
    code=>countries[code][1]
    )
}