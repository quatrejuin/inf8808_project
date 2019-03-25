"use strict";

/**
 * 
 * @param {*} g 
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 */
function createProgressBar(g, positionX, positionY, width, color)
{
    var pBar = g.append("rect")
                .attr("id","pbar")
                .attr("height",20)
                .attr("width",0)
                .attr("x",positionX)
                .attr("y",positionY)
                .attr("fill",color)

    pBar.width = d3.scaleLinear()
                    .domain([0,1])
                    .range([0,width])

    return pBar
}

/**
 * 
 * @param {*} pBar Progress bar d3 object
 * @param {*} rate Completed rate, [0,1]
 */
function updateProgressBar(pBar, rate)
{
    pBar.attr("width", d=>pBar.width(rate))
}