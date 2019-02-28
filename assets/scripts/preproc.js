"use strict";


/**
 * Précise le domaine de l'échelle utilisée pour l'axe X du nuage de points.
 *
 * @param x     Échelle X à utiliser.
 */
function domainX(x) {
    x.domain([1945,2009])
  }
  
  /**
   * Précise le domaine de l'échelle utilisée pour l'axe Y du nuage de points.
   *
   * @param y     Échelle Y à utiliser.
   */
  function domainY(y) {
    // y.domain([0,140000])
  }

/**
   * Précise le domaine de l'échelle utilisée pour l'axe Y du nuage de points.
   *
   * @param r     Échelle Y à utiliser.
   */
  function domainR(r) {
    r.domain()
  }
  
  /**
   * Précise le domaine de l'échelle de couleurs qui est utilisée pour distinguer chacune des régions du monde.
   *
   * @param color   Échelle de couleurs.
   * @param data    Données provenant d'un fichier CSV.
   */
  function domainColor(color, data) {

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