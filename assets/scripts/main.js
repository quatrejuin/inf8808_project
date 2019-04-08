(function(d3, localization) {
    "use strict";

    var margin = {
        top: 50,
        right: 95,
        bottom: 20,
        left: 125
    },
    height = {
        overall: 550,
        country: 1200,
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
        uk:[2,"United Kingdom"],
        fr:[3,"France"],
        cn:[4,"China"],
        in:[5,"India"],
        pk:[6,"Pakistan"],
        nk:[7,"North Korea"]
    }

    var types = {"A":"atmospheric",
    "AH":"atmospheric, high altitude",
    "AS":"atmospheric, surface",
    "AW":"atmospheric, water surface",
    "AX":"space",
    "CR":"cratering burst",
    "UG":"underground",
    "UW":"underwater"
    }

    var purposes = {
        "C":"combat use, strategic warfare",
        "PR":"peaceful research",
        "SE":"safety experiment",
        "ST":"safety/transport experiment",
        "VU":"Vela uniform test",
        "WE":"weapons effects",
        "WR":"nuclear weapons related",
        "I":"industrial application",
        "JV":"joint verification",
        "ME":"military exercise",
        "FS":"fundamental science",
        "UNKNOWN":"Unknown"
    }

    var purposes_categories = {
         "C":"Military",
         "WE":"Military",
         "WR":"Military",
         "ME":"Military",
        "PR":"Scientific Research",
        "I" :"Scientific Research",
        "FS":"Scientific Research",
        "SE":"Safety Research",
        "ST":"Safety Research",
        "VU":"Safety Research",
        "JV":"Safety Research",
        "":"Unknown"
    }

    var purp_cat_des = {
        "Military" : "Military",
        "Scientific Research": "Scientific Research",
        "Safety Research": "Safety Research",
        "Unknown":"Unknown"
    }
    
    var explosion_list = [{gid:"us1",name:"Trinity",note:"World first nuclear test",dx:-25,dy:50},
    {gid:"us2",name:"Little boy",note:"Hiroshima",dx:5,dy:-80},
    {gid:"us3",name:"Fatman",note:"Nagasaki",dx:-20,dy:-30},
    {gid:"us46",name:"Castle bravo",note:"First H-Bomb",dx:-40,dy:60},
    {gid:"ru1",name:"RDS-1",note:"First Russian nuclear test",dx:-20,dy:-30},
    {gid:"ru135",name:"Tsarbomba",note:"Strongest nuclear device ever detonated",dx:-50,dy:-60},]
    
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
    
    initializeData(data, purposes_categories)


    var colors = ['#0D77CC', '#21CFAC', '#EC326C', '#8F3A90', '#47409D', '#999999', '#FF5500', '#157A88'];
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color = d3.scaleOrdinal()
    .range(colors);



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
  
    var xAxisContext = d3.axisTop(xContext).tickFormat(localization.getFormattedDate)
    
    var svg = d3.select(".g-graphic").append("svg")
        .attr("height", height.context + height.overall + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .attr("class", "axisYears")

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


    d3.json("./data/positions.json").then(function(positions){

        allData.forEach((d,i)=>{
                        d.x0 = positions[i].x0
                        d.y0 = positions[i].y0
                        d.x1 = positions[i].x1
                        d.y1 = positions[i].y1
        })


            pBar1.remove()
            pBar2.remove()


            let panelFilterPurpose = d3.select("div.g-filters").insert("div").attr("id","filter-purpose")
            panelFilterPurpose = panelFilterPurpose.append("div")
            .attr("class","filter-category col-12")
            .attr("id","1-filters")
            createCheckbox(panelFilterPurpose,0,30, purp_cat_des)


            let panelFilterType = d3.select("div.g-filters").insert("div").attr("id","filter-type")
            panelFilterType = panelFilterType.append("div")
            .attr("class","filter-category col-12")
            .attr("id","2-filters")
            createCheckbox(panelFilterType,0,0, types)


            createHorizontalLines(focus,xFocus,y,countries)
            createCountryNameLabel(focus,xFocus,y,color,countries)

            createBubbleChart(focus, data, xFocus, y, r, color, tip)


            // Add two switch buttons
            // var buttons = d3.select("div.g-graphic")
            // .insert("div", ":first-child")
            // .classed("g-buttons",true)
            // buttons.append("button")
            // .classed("g-button",true)
            // .attr("data-view","overall")
            // .text("The Overall Picture")
            // buttons.append("button")
            // .classed("g-button",true)
            // .attr("data-view","country")
            // .text("The View by Country")
            
            d3.selectAll(".g-content div[data-view]")
            .datum(function(d) {
                return this.getAttribute("data-view");
            })
            .on("click", function () {
                transitionView(d3.select(this), height, margin, y);
              });

            context.append("g")
            .attr("class", "x axis")
            .call(xAxisContext);

            context.selectAll(".tick line").attr("stroke", "#999999").attr("stroke-dasharray", "1,1");

            tip.html(function(d) {
                return getToolTipText.call(this, d, formatNumber, formatDate, countries)
            });
            focus.call(tip);

            transitionView(d3.select("div[data-view='overall']"),height,margin,y)

            createAnnotationExplosion(explosion_list)
        })
    // })
})
})
})
})
})
})

})(d3, localization);