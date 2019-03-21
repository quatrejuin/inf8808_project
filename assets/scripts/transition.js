"use strict";

let dur_time = 1000

function transitionView(view) {
    if (window.currentView === view) view = view === "overall" ? "country" : "overall";
    d3.selectAll(".g-buttons button[data-view]").classed("g-active", function(v) {
        return v === view;
    })
    switch (window.currentView = view) {
        case "overall":
            return void transitionOverall();
        case "country":
            return void transitionCountry();
    }
}

function transitionOverall() {
    var g = d3.select("g.focus")
    var u = g.selectAll('circle.dot')
            .transition()
            .duration(dur_time)
            .attr("cx",d=>d.x0)
            .attr("cy",d=>d.y0)

    d3.select("svg")
    .transition()
    .duration(dur_time)
    .attr("height",450)

    d3.select("g.x.axis")
    .transition()
    .duration(dur_time)
    .attr("transform","translate(0,400)")
}

function transitionCountry() {
    var g = d3.select("g.focus")
    var u = g.selectAll('circle.dot')
    .transition()
    .duration(1000)
    .attr("cx",d=>d.x1)
    .attr("cy",d=>d.y1)

    d3.select("svg")
    .transition()
    .duration(dur_time)
    .attr("height",1400)

    d3.select("g.x.axis")
    .transition()
    .duration(dur_time)
    .attr("transform","translate(0,1300)")
}