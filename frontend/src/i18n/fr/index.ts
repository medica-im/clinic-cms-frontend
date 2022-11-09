import type { Translation } from '../i18n-types';


const fr: Translation = {
  log: `Ce log a été appelé part '{fileName:string}'`,
  HI: "Salut {name}! Merci de laisser une étoile si vous aimez ce project: https://github.com/ivanhofer/typesafe-i18n",
  LOADING: "Chargement...",
  HOME: {
    TITLE: "Accueil",
    WELCOME: "Bienvenue dans",
    TEAM: {
      TITLE: "Équipe",
      TEXT: "Notre équipe pluriprofessionnelle s'engage pour votre santé et celle de vos proches."
    },
    FOOTER: {
      WIP: "Site en construction. Contacter le développeur:"
    }
  },
  CONTACT: {
    TITLE: "Contact"
  },
  SEARCH: "Recherche",
  ADDRESSBOOK: {
    TITLE: "Annuaire",
    OCCUPATIONS: {
      PLACEHOLDER: "Sélectionner par profession..."
    },
		FACILITIES: {
            PLACEHOLDER: "Sélectionner par établissement..."
		},
    SEARCH: {
      LABEL: "Recherche",
      PLACEHOLDER: "nom ou prénom"
    },
    GOTOADDRESSBOOK: "Retourner vers l'annuaire",
    APPOINTMENT: {
      LABEL: "Prendre rendez-vous"
    },
    LOCATION: "Lieu d'exercice",
    SPECIALTY: "Spécialité"
  },
  NAVBAR: {
    ADDRESSBOOK: "Annuaire",
    LOGIN: "Se connecter",
    HI: "Salut",
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
  ERROR404: {
		OOPS: "Oups!",
		PAGENOTFOUND: "Page non trouvée.",
		DOESNOTEXIST: "La page que vous cherchez n'existe pas.",
		HOME: "Retourner à l'accueil",
		BACK: "Revenir en arrière",
	},
  EMAILADDRESS: "Adresse e-mail",
  PASSWORD: "Mot de passe"
}

export default fr