import type { Translation } from '../i18n-types';


const fr: Translation = {
  HI: "Salut {name}! Merci de laisser une étoile si vous aimez ce project: https://github.com/ivanhofer/typesafe-i18n",
  HOME: {
    WELCOME: "Bienvenue dans"
  },
  SEARCH: "Recherche",
  ADDRESSBOOK: {
    TITLE: "Annuaire",
    OCCUPATIONS: {
      PLACEHOLDER: "Selectionner par profession..."
    },
    SEARCH: {
      LABEL: "Recherche",
      PLACEHOLDER: "nom ou prénom"
    },
    GOTOADDRESSBOOK: "Retourner vers l'annuaire",
    APPOINTMENT: {
      LABEL: "Prendre rendez-vous"
    },
    LOCATION: "Lieu d'exercice"
  },
  NAVBAR: {
    ADDRESSBOOK: "Annuaire",
		LOGIN: "Se connecter",
		REGISTER: "S'enregistrer",
    LOGOUT: "Se déconnecter"
	},
	LOGIN: {
	    LOGIN: "Connexion",
      TOLOGIN: "Se connecter",
      NOACCOUNT: "Pas encore de compte?",
      SIGNINGIN: "Connexion en cours...",
      CREATEACCOUNT: "Créer un compte"
	},
	EMAILADDRESS: "Adresse e-mail",
  PASSWORD: "Mot de passe"
}

export default fr