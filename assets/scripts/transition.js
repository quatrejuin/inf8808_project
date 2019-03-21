"use strict";

let dur_time = 1000

function transitionView(curView,height,margin,y) {
    let view = curView.attr("data-view")
    d3.selectAll(`.g-buttons button[data-view="${view}"]`)
    .classed("g-active", function(d){
        return d3.select(this).attr("data-view")==view
    })

    var v = (view== "overall")?0:1
    var viewParams = {
        h: [height.overall, height.country][v],
        translateY: [height.overall/2, y.step()/2][v],
        showCountryAxis: v,    // 0: Hide; 1: Show
        showOverallAxis: 1-v   // 0: Hide; 1: Show
    }
    var g = d3.select("g.focus")
    var u = g.selectAll('circle.dot')
    .transition()
    .duration(dur_time)
    .delay(d=>d["x"+v])
    .attr("cx",d=>d["x"+v])
    .attr("cy",d=>d["y"+v])

    d3.select("svg")
    .transition()
    .duration(dur_time)
    .attr("height",viewParams.h + height.context + margin.top + margin.bottom)

    d3.select("g.focus")
    .transition()
    .duration(dur_time)
    .attr("transform","translate(0,"+viewParams.translateY+")")

    d3.select("g.context")
    .transition()
    .duration(dur_time)
    .attr("transform","translate(0,"+(viewParams.h)+")")

    d3.selectAll("g.x.axis.country").style("opacity",viewParams.showCountryAxis)
    d3.selectAll("g.x.axis.overall").style("opacity",viewParams.showOverallAxis)
}