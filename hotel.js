/**
* @author      Steve Fallet <steve.fallet@divtec.ch>
* @version     1.0
* @since       2023-10-09
*
* http://usejsdoc.org/
*/

"use strict";
//console.log("Coucou"); Controle de liaison OK

/*Récuperation des éléments*/
const formulaire = document.getElementById('formulaire');
const listeHotel = document.getElementById('lis_hotel');
const nbChambre = document.getElementById('txt_nbrChambre');

console.log(formulaire,listeHotel,nbChambre)
/**
 * Retourne le nom de l'hotel sélectionné par le visiteur
 * @returns {String} Nom de l'hotêl ou "0" si pas de sélection
 */
function getHotel() {
    if (listeHotel.value === "0") {
        return "0";
    }
    return listeHotel.value;
}

/**
 * Retourne le nombre de chambres saisi par le visiteur
 * @returns {Number} Nombre de chambres ou NaN (Not A Number)
 */
function getNbChambre() {
    return isNaN(nbChambre.value) ? NaN : parseInt(nbChambre.value)
}

/**
 * Retourne le type de chambre sélectionné ou ""
 * @returns {String} Type de chambre ou ""
 */
function getChambre() {
    return  formulaire.querySelector('[name="opt_type_chambre"]:checked').value;
}

/**
 * Retourne les options choisies par le visiteur
 * @returns {Array} tableau des éléments checkbox cochés
 */
function getOptions() {
    let tableau = []
    let coche = formulaire.querySelectorAll('input[type=checkbox]:checked');

    coche.forEach(function(coche) {
        tableau.push(coche.value);
    });
    return tableau;
}

/**
 * Valide la saisie utilisateur
 * Retourne un message d'erreur au format HTML "<ul><li>erreur 1</li>...</ul>"
 * ou chaine vide si tout est OK.
 *
 * @returns {String}    Chaine vide si pas d'erreur ou <ul> d'erreurs
 */
function valideSaisie() {

}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {

}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation ou le message d'erreur
 * @param event Objet représentant l'événement
 */
function reserver(event) {
    event.preventDefault();
    alert(getHotel());
    alert(getNbChambre());
    alert(getChambre());

    let tableau = getOptions();
    for (let i = 0; i < tableau.length; i++) {
        console.log(tableau[i]);
    }
}

//Affecte la fonction "réserver" à l'envoi du formulaire
formulaire.addEventListener('submit', reserver);