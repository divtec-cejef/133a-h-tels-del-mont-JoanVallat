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
    let typeChambre = formulaire.querySelector('[name="opt_type_chambre"]:checked');

    if (typeChambre === null) {
        return ""
    }
    return  typeChambre.value
}

/**
 * Retourne les options choisies par le visiteur
 * @returns {Array} tableau des éléments checkbox cochés
 */
function getOptions() {
 return formulaire.querySelectorAll('input[name="check_option"]:checked');
}

/**
 * Valide la saisie utilisateur
 * Retourne un message d'erreur au format HTML "<ul><li>erreur 1</li>...</ul>"
 * ou chaine vide si tout est OK.
 *
 * @returns {String}    Chaine vide si pas d'erreur ou <ul> d'erreurs
 */
function valideSaisie() {

    let erreur = "";
    //Test l'hôtel
    if (getHotel() === "0") {
        erreur += "Veuillez choisir un hotel\n";
    }

    //Test le nombre de chambre
    let nbChambre = getNbChambre()
    if (isNaN(nbChambre) || nbChambre < 1 || nbChambre > 12){
        erreur += "Veuillez choisir un nombre de chambre entre 1 et 12\n";
    }

    //Test le type de chambre
    if (getChambre() === "") {
        erreur += "Veuillez choisir un type de chambre\n";
    }

    //Renvoie les erreurs
    return erreur;
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
    let erreurs = valideSaisie()
    if (erreurs !== "") {
        alert(erreurs)
        return
    }

    for (let option of getOptions()) {
       alert(option.value)
    }
}

//Affecte la fonction "réserver" à l'envoi du formulaire
formulaire.addEventListener('submit', reserver);