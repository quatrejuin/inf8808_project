"use strict";

/**
 * Fichier permettant de définir le texte à afficher dans l'infobulle.
 */


/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées au cercle survollé par la souris.
 * @param formatNumber    Fonction permettant de formater correctement des nombres.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, formatNumber, formatDate, countries) {
  // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
  //       Assurez-vous d'utiliser la fonction "formatNumber" pour formater les nombres correctement.
  return ""
  +"ID: "+d["ID#"]+"<br>"
  +"Shot: "+d.SHOT+"<br>"
  +"Type: "+d.TYPE+"<br>"
  +"Purpose: "+d.PUR+"<br>"
  +"Country: "+countries[d.country][1]+"<br>"
  +"Date: "+formatDate(d.date)+"<br>"
  +"Yield: "+d.YIELD+" kt";
}