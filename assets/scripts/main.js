(function(d3, localization) {
    "use strict";

    var margin = {
        top: 20,
        right: 95,
        bottom: 10,
        left: 125
    },
    width = 970 - margin.left - margin.right,
    height;
    // tickExtension = 20; // extend grid lines beyond scale range

    var formatPercent = d3.format(".0%"),
    formatTenthPercent = d3.format(".1%"),
    formatNumber = d3.format(",.3s"),
    formatDollars = function(d) {
        return (d < 0 ? "-" : "") + "$" + formatNumber(Math.abs(d)).replace(/G$/, "B");
    };

    var x = d3.scaleLinear()
    .rangeRound([0, width - 60]);

    var y = d3.scaleOrdinal();

    var y0 = 150;


    var r = d3.scaleSqrt()
    .domain([0, 1e9])
    .range([0, 1]);

    var countries = [{name:"United States",code:"us"}, 
    {name:"United Kindom",code:"uk"},
    {name:"Russia",code:"ru"},
    {name:"France",code:"fr"},
    {name:"China",code:"cn"},
    {name:"India",code:"in"},
    {name:"Pakistan",code:"pk"},
    {name:"North Korea",code:"nk"}
    ]

    
    var color = d3.scaleOrdinal()
    .range(["#b35806", "#f1a340", "#fee0b6", "#d8daeb", "#998ec3", "#542788"]);

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
    

    domainX(x)
    domainY(y)

   
    
})
})
})
})
})
})

})(d3, localization);