(function(d3, localization) {
    "use strict";

    var margin = {
        top: 50,
        right: 95,
        bottom: 20,
        left: 125
    },
    height = {
        overall: 400,
        country: 950,
        context: 50,
    },
    width = 1200 - margin.left - margin.right,
    tickExtension = 20; // extend grid lines beyond scale range

    var formatNumber = d3.format(",.3s"),
    formatDate = d3.timeFormat("%Y-%m-%d");

    var countries = {
        // countryCode: [axisGroup, countryName]
        us:[0,"United States"],
        ru:[1,"Russia"],
        uk:[2,"United Kindom"],
        fr:[3,"France"],
        cn:[4,"China"],
        in:[5,"India"],
        pk:[5,"Pakistan"],
        nk:[5,"North Korea"]
    }
    var minGroup = d3.min(Object.values(countries), d=>d[0])
    var maxGroup = d3.max(Object.values(countries), d=>d[0])
    var axisGroups = d3.range(minGroup,maxGroup+1)

    var countries_merged = ["in","pk","nk"]


    let data = []
    d3.csv("./data/china.csv").then(function(dataChina) {
        d3.csv("./data/france.csv").then(function(dataFrance) {
            d3.csv("./data/russia.csv").then(function(dataRussia) {
                d3.csv("./data/uk.csv").then(function(dataUK) {
                    d3.csv("./data/us.csv").then(function(dataUS) {
                        d3.csv("./data/others.csv").then(function(dataOthers) {

    data.push(createResources(dataChina, 'cn'))
    data.push(createResources(dataFrance, 'fr'))
    data.push(createResources(dataRussia, 'ru'))
    data.push(createResources(dataUK, 'uk'))
    data.push(createResources(dataUS, 'us'))
    data.push(createResources(dataOthers.filter(d=>
            d["ID#"][0]==="1"
            ), 'in'))

        data.push(createResources(dataOthers.filter(d=>
            d["ID#"][0]==="2"
            ), 'pk'))

        data.push(createResources(dataOthers.filter(d=>
            d["ID#"][0]==="4"
            ), 'nk'))
    
    initializeData(data)


    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xFocus = d3.scaleTime()
    .rangeRound([0, width - 60]);

    var xContext = d3.scaleTime()
    .rangeRound([0, width - 60]);


    var y0 = 150;


    var r = d3.scaleSqrt()
    .range([3, 40]);

    domainX(xFocus, xContext ,data)
    var y = domainY(axisGroups)
    domainR(r, data)
    domainColor(color, countries)

    var xAxisFocus = d3.axisBottom(xFocus)//.tickFormat(localization.getFormattedDate);
    //var yAxisFocus = d3.axisLeft(yFocus);
  
    var xAxisContext = d3.axisBottom(xContext).tickFormat(localization.getFormattedDate);

    // Add view switch button
    //window.currentView = "overall";
    
    var svg = d3.select(".g-graphic").append("svg")
        .attr("height", height.context + height.overall + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)

    var graph = svg.append("g")
        .classed("graph",true)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    var focus =graph.append("g")
        .classed("focus",true)
        .attr("transform", "translate(0," + height.overall/2 + ")");
        

    var context =graph.append("g")
        .classed("context",true)
        .attr("transform", "translate(0," + height.overall  + ")");

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]);

    let allData = []
    data.forEach(d=>allData=allData.concat(d.tests))


    // Create progress bar
    let positionX = 200;
    let positionY = 200;
    let pBar1 = createProgressBar(svg, positionX, positionY, width, "#1f77b450")
    let pBar2 = createProgressBar(svg, positionX, positionY, width, "#1f77b4ff")

    initialBubbleChart(allData, xFocus, y, r, "country", countries, pBar1,()=>{
        allData.forEach(d=>{
            d.x1 = d.x
            d.y1 = d.y
        })
        initialBubbleChart(allData, xFocus, y, r, "overall", countries, pBar2,()=>{
            allData.forEach(d=>{
                d.x0 = d.x
                d.y0 = d.y
            })

            pBar1.remove()
            pBar2.remove()

            createBubbleChart(focus, allData, xFocus, y, r, color, tip)

    
            createHorizontalLines(xFocus,y,countries)
            createCountryNameLabel(xFocus,y,color,countries)

            // Add two switch buttons
            var buttons = d3.select("div.g-graphic")
            .insert("div", ":first-child")
            .classed("g-buttons",true)
            buttons.append("button")
            .classed("g-button",true)
            .attr("data-view","overall")
            .text("The Overall Picture")
            buttons.append("button")
            .classed("g-button",true)
            .attr("data-view","country")
            .text("The View by Country")
            
            d3.selectAll(".g-content button[data-view]")
            .datum(function(d) {
                return this.getAttribute("data-view");
            })
            .on("click", function () {
                transitionView(d3.select(this), height, margin, y);
              });

            transitionView(d3.select(".g-buttons button[data-view='overall']"),height,margin,y)

            context.append("g")
            .attr("class", "x axis")
            .call(xAxisContext);

            tip.html(function(d) {
                return getToolTipText.call(this, d, formatNumber, formatDate, countries)
            });
            focus.call(tip);
        })
    })
})
})
})
})
})
})

})(d3, localization);