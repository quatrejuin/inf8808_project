"use strict";


/**
 * Initialise les données provenant des fichiers CSV en convertissant
 * les nombres au format "string" au format "number".
 *
 * @param data    Données provenant d'un fichier CSV.
 */
function initializeData(data, purposes_categories) {
  var monthList = ["null","JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  data.map(
    d => {
      d.tests.map(dd=> {
        var regex = /([a-zA-Z]*)([a-zA-Z-]*)/;
        var m = regex.exec(dd.TYPE)
        dd.TYPE = m[1]
        dd.YIELD = parseFloat(dd.YIELD)
        if (isNaN(dd.YIELD))
        {
          dd.YIELD = 0
        }
        dd.date = d3.timeParse("%Y-%m-%d")(dd.YEAR+"-"+monthList.indexOf(dd.MON)+"-"+dd.DAY)
        dd.country = d.country
        m = regex.exec(dd.PUR)
        dd.PUR = purposes_categories[m[1]]
        dd.gid = dd.country+dd["ID#"]

    })
    d.tests = d.tests.filter(d=>d.YIELD!=0)
  }
  )
}


/**
 * Précise le domaine de l'échelle utilisée pour l'axe X du nuage de points.
 *
 * @param x     Échelle X à utiliser.
 */
function domainX(xFocus, xContext, data) {
    let startDate = d3.timeParse("%Y-%m-%d")("1944-01-01")
    let endDate = d3.timeParse("%Y-%m-%d")("2010-12-31")

      xFocus.domain([startDate,endDate])
      xContext.domain([startDate,endDate])
  }
  
  /**
   * Précise le domaine de l'échelle utilisée pour l'axe Y du nuage de points.
   *
   * @param y     Échelle Y à utiliser.
   */
  function domainY(axisGroups) {
    var y = function(pos)
    {
        let spaceBig = 350, spaceSmall = 100;
        let spaceList = [50,spaceBig,spaceBig*0.5,spaceSmall,spaceSmall,spaceSmall,spaceSmall, spaceSmall]
        let posList = spaceList.map((s,i)=>i>1?d3.sum(spaceList.slice(0,i+1)):s )
        
        return posList[pos]
    }
    y.domain = d=> axisGroups
    y.step = d=>100
    return y
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
    let countryCodes = Object.keys(countries);
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
  function createResources(dataCSV, countryCode) {
      let myJSON = {
          country:countryCode,
          tests: dataCSV
      }

      return myJSON
  }

  /**
   * 
   * @param groupID     AxisGroup ID
   * Return an array of country code
   */
  function getCountriesByAxisGroup(countries,groupID) {
    var cKeys = Object.keys(countries)
    var cValues = Object.values(countries)

    return cKeys.filter((d,i)=>cValues[i][0]==groupID)
  }