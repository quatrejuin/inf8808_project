(function(d3, localization) {
    "use strict";

    var margin = {
        top: 20,
        right: 95,
        bottom: 10,
        left: 125
    },
    width = 970 - margin.left - margin.right,
    height = 1000,
    tickExtension = 20; // extend grid lines beyond scale range

    var formatPercent = d3.format(".0%"),
    formatTenthPercent = d3.format(".1%"),
    formatNumber = d3.format(",.3s"),
    formatDollars = function(d) {
        return (d < 0 ? "-" : "") + "$" + formatNumber(Math.abs(d)).replace(/G$/, "B");
    };

    var countries = [{name:"United States",code:"us"}, 
    {name:"United Kindom",code:"uk"},
    {name:"Russia",code:"ru"},
    {name:"France",code:"fr"},
    {name:"China",code:"cn"},
    {name:"India",code:"in"},
    {name:"Pakistan",code:"pk"},
    {name:"North Korea",code:"nk"}
    ]

    
    let data = []
    d3.csv("./data/china.csv").then(function(dataChina) {
        d3.csv("./data/france.csv").then(function(dataFrance) {
            d3.csv("./data/russia.csv").then(function(dataRussia) {
                d3.csv("./data/uk.csv").then(function(dataUK) {
                    d3.csv("./data/us.csv").then(function(dataUS) {
                        d3.csv("./data/others.csv").then(function(dataOthers) {

    data.push(createResources(dataChina, 'cn', countries))
    data.push(createResources(dataFrance, 'fr', countries))
    data.push(createResources(dataRussia, 'ru', countries))
    data.push(createResources(dataUK, 'uk', countries))
    data.push(createResources(dataUS, 'us', countries))
    data.push(createResources(dataOthers.filter(d=>
            d["ID#"][0]==="1"
            ), 'in', countries))

        data.push(createResources(dataOthers.filter(d=>
            d["ID#"][0]==="2"
            ), 'pk', countries))

        data.push(createResources(dataOthers.filter(d=>
            d["ID#"][0]==="3"
            ), 'nk', countries))
    
    initializeData(data)


    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xFocus = d3.scaleTime()
    .rangeRound([0, width - 60]);

    var xContext = d3.scaleTime()
    .rangeRound([0, width - 60]);

    var y = d3.scaleOrdinal();

    var y0 = 150;


    var r = d3.scaleSqrt()
    .range([5, 50]);

    domainX(xFocus, xContext ,data)
    domainY(y, data)
    domainR(r, data)
    domainColor(color, countries)

    var xAxisFocus = d3.axisBottom(xFocus)//.tickFormat(localization.getFormattedDate);
    //var yAxisFocus = d3.axisLeft(yFocus);
  
    var xAxisContext = d3.axisBottom(xContext).tickFormat(localization.getFormattedDate);

    // Add view switch button
    window.currentView = "country";

    d3.selectAll(".g-content button[data-view]")
        .datum(function(d) {
            return this.getAttribute("data-view");
        })
        .on("click", transitionView);
    
    var svg = d3.select(".g-graphic").append("svg")
        .attr("height", 420 + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        
    var focus =svg.append("g")
        .classed("focus",true)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

    var context =svg.append("g")
        .classed("context",true)
        .attr("transform", "translate(" + margin.left + "," + 0 + ")");

    var heightContext  = 100
    context.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightContext/2 + ")")
        .call(xAxisContext);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);
    
    createBubbleChart(focus, data[4].tests, xFocus, y, r, color, tip)


    tip.html(function(d) {
        return getToolTipText.call(this, d, localization.getFormattedNumber)
    });
    focus.call(tip);

    domainX(x)
    domainY(y)

   
    
})
})
})
})
})
})

})(d3, localization);