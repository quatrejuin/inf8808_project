"use strict";


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

}

function transitionCountry() {

}