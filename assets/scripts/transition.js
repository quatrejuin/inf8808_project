"use strict";

let dur_time = 1000

function transitionView(curView,height,margin,y) {
    let view = curView.attr("data-view")
    d3.selectAll(`.g-buttons button[data-view]`)
    .classed("g-active", function(d){
        return d3.select(this).attr("data-view")==view
    })

    var v = (view== "overall")?0:1
    var viewParams = {
        h: [height.overall, height.country][v],
        translateY: [height.overall/2, y.step()/2][v],
        showCountryAxis: v,    // 0: Hide; 1: Show
        showOverallAxis: 1-v,   // 0: Hide; 1: Show
        axisY: [c=>0,c=>y(c)][v],
        posLabelGp: [{0:-120,1:-90,2:-60,3:-30,4:0,5:30,6:60,7:90},
            {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0}][v],
        showAnnotation: v,      // 0: Hide; 1: Show
    }
    var g = d3.select("g.focus")
    var u = g.selectAll('circle.dot')
    .transition()
    .duration(dur_time)
    .delay(d=>d["x"+v])
    .attr("cx",d=>d["x"+v])
    .attr("cy",d=>d["y"+v])

    d3.select(".annotation-explosions")
    .transition()
    .duration(dur_time)
    .attr("opacity",viewParams.showAnnotation)

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

    d3.selectAll("g.x.axis.country")
    .transition()
    .duration(dur_time)
    .attr("transform",d=>`translate(0,${viewParams.axisY(d)})`)
    .each(function(d,i){
        let cur = d3.select(this)
        cur.selectAll("line")
        .transition()
        .duration(dur_time)
        .style("opacity",d!=0?viewParams.showCountryAxis:1)   // Always show the #0 axis
    })

    d3.selectAll("g.countryNameGroup")
    .transition()
    .duration(dur_time)
    .attr("transform",function(d,i) {
        return `translate(0,${viewParams.posLabelGp[i]})`
    })

    d3.selectAll(".tick line").attr("y", 0)
    .transition()
    .duration(dur_time)
    .attr("y2",-viewParams.h);

}