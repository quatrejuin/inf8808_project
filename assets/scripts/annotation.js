
function createAnnotationExplosion(explosions)
{
    d3.selectAll("g.annotation-explosions").remove()

    const type = d3.annotationCallout
    let circles = d3.selectAll("circle.dot")
    let circles_annotaed = circles.filter(d=>explosions.findIndex(e=>e.gid==d.gid)!=-1)  // Select all the circles in explosions list
    explosions.forEach(function(d,i){
            circles_annotaed.filter(dd=>d.gid==dd.gid).call(node=>{
                d.x = node.datum().x1
                d.y = node.datum().y1
            })
        })

    const annotations = explosions.map((exp,i) => {
        return {
            note: {
                label: exp.note,
                bgPadding: {"top":15,"left":10,"right":10,"bottom":10},
                title: exp.name
            },
            //can use x, y directly instead of data
            x: explosions[i].x,
            y: explosions[i].y,
            dx: explosions[i].dx,
            dy: explosions[i].dy,
            }  
    });

    const makeAnnotations = d3.annotation()
    //also can set and override in the note.padding property
    //of the annotation object
    .notePadding(15)
    .type(type)
    .annotations(annotations)

    d3.select("g.focus")
    .append("g")
    .attr("class", "annotation-explosions")
    .call(makeAnnotations)

    d3.selectAll("g.annotation-explosions")
    .attr("opacity",0)
}