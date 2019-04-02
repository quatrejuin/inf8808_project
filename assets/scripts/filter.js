"use strict";




function createCheckbox(g,x,y,alist)
{
    let filterItems = g.selectAll("g.filter-input")
    .data(Object.keys(alist))
    .enter()
    .append("g",":first-child")
    .classed("filter-input",true)
    .on("change",filtered)

    filterItems.append("input")
    .attr("type","checkbox")
    .attr("id",d=>d)

    filterItems.append("label")
    .attr('for',d=>d)
    .text(d=>alist[d])

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
            if (!choices.includes(d.TYPE))
            {
                d3.select(this).classed("fade",true)
            }
            else {
                d3.select(this).classed("fade",false)
            }
        }
    )
}
