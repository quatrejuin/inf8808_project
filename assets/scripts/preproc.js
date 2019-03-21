"use strict";


/**
 * Initialise les données provenant des fichiers CSV en convertissant
 * les nombres au format "string" au format "number".
 *
 * @param data    Données provenant d'un fichier CSV.
 */
function initializeData(data) {
  var monthList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  data.map(
    d => d.tests.map(dd=> {
        dd.YIELD = parseFloat(dd.YIELD)
        if (isNaN(dd.YIELD))
        {
          dd.YIELD = 0
        }
        dd.Date = d3.timeParse("%Y-%m-%d")(dd.YEAR+"-"+monthList.indexOf(dd.MON)+"-"+dd.DAY)
        dd.country = d.country
    })
    )
}


// function parseDate(data) {
//   // TODO: Convertir les dates du fichier CSV en objet de type Date.
//   var monthList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
//   monthList.indexOf()
//   d3.map(data, function(d) {
//     d.Date = d3.timeParse("%d/%m/%y")()
//   })
// }


/**
 * Précise le domaine de l'échelle utilisée pour l'axe X du nuage de points.
 *
 * @param x     Échelle X à utiliser.
 */
function domainX(xFocus, xContext, data) {
    let startDate = d3.timeParse("%Y-%m-%d")("1945-01-01")
    let endDate = d3.timeParse("%Y-%m-%d")("2010-12-31")

      xFocus.domain([startDate,endDate])
      xContext.domain([startDate,endDate])
  }
  
  /**
   * Précise le domaine de l'échelle utilisée pour l'axe Y du nuage de points.
   *
   * @param y     Échelle Y à utiliser.
   */
  function domainY(y, countries, countries_merged, height) {
    y.domain(countries.map(function(d) {
        return d.code;
    }))
    .range([10, height]);

    y.domain(y.domain().filter(d=>!(countries_merged.includes(d))).concat("others"))
  }

/**
   * Précise le domaine de l'échelle utilisée pour l'axe Y du nuage de points.
   *
   * @param r     Échelle Y à utiliser.
   */
  function domainR(r, data) {
    let min = d3.min(data, d => d3.min(d.tests,dd=>dd.YIELD))
    let max = d3.max(data, d => d3.max(d.tests,dd=>dd.YIELD))
    r.domain([min,max])
  }
  
  /**
   * Précise le domaine de l'échelle de couleurs qui est utilisée pour distinguer chacune des régions du monde.
   *
   * @param color   Échelle de couleurs.
   * @param data    Données provenant d'un fichier CSV.
   */
  function domainColor(color, countries) {
    let countryCodes = []
    countries.forEach(element => {
      countryCodes.push(element.code)
    });
    color.domain(countryCodes)
  }

//   e.g.: dataJSONArray = {
//                         country:"us", 
//                         tests:{
//                             "ID#":"1",
//                             "SITE":"xxxx",
//                             "LAT":"xxxx",
//                             ...
//                         }}
  function createResources(dataCSV, countryCode, countries) {
      let myJSON = {
          country:countryCode,
          tests: dataCSV
      }

      return myJSON
  }