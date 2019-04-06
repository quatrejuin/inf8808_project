"use strict";




// function createCheckbox(g,x,y,alist)
// {
//     let filterItems = g.selectAll("g.filter-input")
//     .data(Object.keys(alist))
//     .enter()
//     .append("g",":first-child")
//     .classed("filter-input",true)
//     .on("change",filtered)

//     filterItems.append("input")
//     .attr("type","checkbox")
//     .attr("id",d=>d)
//     .property("checked",true)

//     filterItems.append("label")
//     .attr('for',d=>d)
//     .text(d=>cleanItUp(alist[d]))
// }

function createCheckboxes(g,x,y,alist)
{
    var filtersection = document.getElementById("1-filters");
    console.log(alist);
    for(var index in alist) { 
        var attr = alist[index]; 
        console.log(attr);
        filtersection.appendChild(createCheckboxEl(attr));
    }
}

function createCheckboxes2(g,x,y,alist)
{
    var filtersection = document.getElementById("2-filters");
    console.log(alist);
    for(var index in alist) { 
        var attr = alist[index]; 
        console.log(attr);
        filtersection.appendChild(createCheckboxEl(attr));
    }
}


function createCheckboxEl(d){
    var el = document.createElement("label");
    el.className = "el-checkbox is-checked";
    var check = document.createElement("span");
    check.className = "el-checkbox__input is-checked";
    var inner = document.createElement("span");
    inner.className = "el-checkbox__inner";
    var input = document.createElement("input")
    input.setAttribute("type", "checkbox");
    input.className = "el-checkbox__original";


    var lbl = document.createElement("label");
    lbl.className = "el-checkbox__label";
    lbl.innerHTML = cleanItUp(d);

    check.appendChild(inner);
    check.appendChild(input);
    el.appendChild(check);
    el.appendChild(lbl);

    return el;
}


function filtered()
{
    var choices = [];
    d3.selectAll("g.filter-input").each(
        function(d)
        {        
            let cb = d3.select(this).select("input");
            if(cb.property("checked")){
                choices.push(cb.attr("id"));
            }
        }
    )

    d3.selectAll("circle.dot")
    .each(
        function(d) {
            if (! (choices.includes(d.TYPE) && choices.includes(d.PUR)))
            {
                d3.select(this).classed("fade",true)
            }
            else {
                d3.select(this).classed("fade",false)
            }
        }
    )
}

function cleanItUp(str){
    var s = str.toLowerCase();
    if (s.includes('atmospheric,')) {
        s = s.replace('atmospheric,', '');
        return s = s.charAt(1).toUpperCase() + s.slice(2);
    } else {
        return s = s.charAt(0).toUpperCase() + s.slice(1);
    }
}
