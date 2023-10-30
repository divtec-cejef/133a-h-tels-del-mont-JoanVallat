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
const divMessage = document.getElementById('message');

//Récupération des éléments dans la div de confirmation
const divConfirmation = document.getElementById("reservation")
const imageConfirmation = document.getElementById("photo");
const h2NomHotel = document.querySelector("h2");
const nbChambreConfirmation = document.getElementById("chambre_nombre");
const typeChambreConfirmation = document.getElementById("chambre_type");
const optionConfirmation = document.getElementById("options");


console.log(formulaire,listeHotel,nbChambre,divMessage)
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
        erreur += "<li>Veuillez choisir un hotel</li>";
    }

    //Test le nombre de chambre
    let nbChambre = getNbChambre()
    if (isNaN(nbChambre) || nbChambre < 1 || nbChambre > 12){
        erreur += "<li>Veuillez choisir un nombre de chambre entre 1 et 12</li>";
    }

    //Test le type de chambre
    if (getChambre() === "") {
        erreur += "<li>Veuillez choisir un type de chambre</li>";
    }

    //Renvoie les erreurs
    return erreur;
}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {

    //Affiche l'image de l'hotel
    imageConfirmation.src = "images/" + getHotel().toLowerCase() + ".jpg";

    //Affiche le nom de l'hotêl
    h2NomHotel.innerText = getHotel();

    //Affiche le nombre de chambre
    nbChambreConfirmation.innerText = getNbChambre().toString();

    //Affiche le type de chambre
    typeChambreConfirmation.innerText = getChambre();

    //Liste les options choisies et les affiche (vide au départ)
    optionConfirmation.innerHTML = "";

    for (let option of getOptions()) {
        optionConfirmation.innerHTML += "<li>" +option.value+ "</li>";
    }

    //Affiche la div de confirmation
    divConfirmation.style.display = "block"
}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation ou le message d'erreur
 * @param event Objet représentant l'événement
 */
function reserver(event) {
    //Stop l'envoie du formulaire
    event.preventDefault();

    //Vide la div des message d'erreur et la cache
    divMessage.innerHTML = "";
    divMessage.style.display = "none";

    //Contrôle de saisie et affichage d'erreur
    let erreurs = valideSaisie()
    if (erreurs) {
        divMessage.innerHTML = "<ul>" + erreurs + "</ul>";
        divMessage.style.display = "block";
        divConfirmation.display = "none"
        return
    }

    //Affiche la confirmation si tout est ok
    afficheConfirmation()
}

//Affecte la fonction "réserver" à l'envoi du formulaire
formulaire.addEventListener('submit', reserver);

//En cas de reset, cache les div de confirmation et d'erreur
formulaire.addEventListener("reset",function(){
    divMessage.style.display = "none";
    divConfirmation.style.display = "none";
})
