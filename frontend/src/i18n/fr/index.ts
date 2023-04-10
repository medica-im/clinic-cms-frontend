import type { Translation } from '../i18n-types';


const fr: Translation = {
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
    TITLE: "Contact",
		CALL_US: "Appelez-nous"
  },
	SITES: {
		TITLE: "Sites"
	},
  SEARCH: "Recherche",
  ADDRESSBOOK: {
    A11Y: {
			PROFILE_PIC_OF: "Photo de profil de"
		},
    TITLE: "Annuaire",
    OCCUPATIONS: {
      PLACEHOLDER: "Sélectionner par profession..."
    },
    FACILITIES: {
      PLACEHOLDER: "Sélectionner par établissement..."
    },
    SEARCH: {
      LABEL: "Nom ou prénom",
      PLACEHOLDER: "Nom ou prénom...",
      ARIA_LABEL: "Recherche par nom ou prénom"
    },
    GOTOADDRESSBOOK: "Retourner vers l'annuaire",
    APPOINTMENT: {
      LABEL: "Prendre rendez-vous"
    },
    LOCATION: "Lieu d'exercice",
    SPECIALTY: "Spécialité",
		CLEAR: "Effacer"
  },
  NAVBAR: {
    ADDRESSBOOK: "Annuaire",
    LOGIN: "Se connecter",
    HI: "Salut",
    REGISTER: "S'enregistrer",
    LOGOUT: "Se déconnecter",
    ABOUT: "À propos",
    TIMELINE: "Chronologie",
    HEALTH_PROJECT: "Projet de santé",
    LANGUAGE: "Langue",
    NAVIGATE: "Naviguer",
		GO_HOME: "Aller à l'Accueil",
    THEME: "Thème"
  },
  LOGIN: {
    LOGIN: "Connexion",
    TOLOGIN: "Se connecter",
    NOACCOUNT: "Pas encore de compte?",
    SIGNINGIN: "Connexion en cours...",
    CREATEACCOUNT: "Créer un compte",
    SUCCESSFUL: "Connexion réussie...",
    LOGOUT: "Déconnexion réussie..."
  },
  ERROR404: {
    OOPS: "Oups!",
    PAGENOTFOUND: "Page non trouvée.",
    DOESNOTEXIST: "La page que vous cherchez n'existe pas.",
    HOME: "Retourner à l'accueil",
    BACK: "Revenir en arrière",
  },
  EMAILADDRESS: "Adresse e-mail",
  TIMELINE: {
    TITLE: "Chronologie"
  },
  PASSWORD: "Mot de passe",
  USER: {
    PROFILE: "Profil de {userName:string}",
    ROLE: 'Rôle'
  },
  FACILITY: {
		OUTPATIENT_CLINIC: 'Maison de santé'
	},
  BLOG: {
		READMORE: 'Lire la suite'
	},
	OUTPATIENT_CLINIC: {
		MDT_MEETING: 'réunion de concertation pluriprofessionnelle',
    TPE: 'éducation thérapeutique du patient'
	},
	DISEASE: {
		DIABETES: 'diabète',
    CANCER: 'cancer'
	},
	WEBSITE: 'site web',
  LEARN_MORE: 'En savoir plus',
  LEXICON: 'lexique',
  HEALTH_RECORD: 'dossier patient',
	HEALTH_EDUCATION: 'éducation pour la santé',
  PREVENTION: 'prévention',
	PREVENTIVE_HEALTHCARE: 'prévention en santé',
  BURNOUT: 'syndrôme d\'épuisement professionnel'
}

export default fr