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
    GEOCODER: {
			PLACEHOLDER: "Entrer l'adresse de la personne...",
      ARIA_LABEL: "Recherche de l'adresse de la personne"
		},
    OCCUPATIONS: {
      PLACEHOLDER: "Sélectionner par profession..."
    },
    COMMUNES: {
			PLACEHOLDER: "Sélectionner par commune..."
		},
    FACILITIES: {
      PLACEHOLDER: "Sélectionner par établissement..."
    },
    CATEGORIES: {
      PLACEHOLDER: "Sélectionner par catégorie....",
			ALL: "Toutes catégories"
    },
    SITUATIONS: {
      PLACEHOLDER: "Sélectionner par situation..."
    },
    SEARCH: {
      LABEL: "Nom ou prénom",
      PLACEHOLDER: "Nom ou prénom...",
      ARIA_LABEL: "Recherche par nom ou prénom"
    },
    GOTOADDRESSBOOK: "Retourner vers l'annuaire",
		GOTOSEARCH: "Retourner aux résultats de recherche",
    APPOINTMENT: {
      LABEL: "Prendre rendez-vous"
    },
    LOCATION: "Lieu d'exercice",
    SPECIALTY: "Spécialité",
		CLEAR: "Effacer",
    PAYMENT_METHODS: "Moyens de paiement",
    PAYMENT_METHOD: "Moyen de paiement",
		COSTS_AND_REIMBURSEMENTS: "Tarifs et remboursements",
		THIRD_PARTY_PAYER: "Tiers payant",
		SOMED: "Réseaux sociaux",
		SPOKEN_LANGUAGE: "langue parlée",
		SPOKEN_LANGUAGES: "langues parlées",
		INFORMATIONS: "informations"
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
    TPE: 'éducation thérapeutique du patient',
    PROGRAMS: 'programmes',
    OUR_PROGRAM: 'notre programme',
    OUR_PROGRAMS: 'nos programmes',
		OUR_OTHER_PROGRAM: 'notre autre programme',
		OUR_OTHER_PROGRAMS: 'nos autres programmes'
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
  BURNOUT: 'syndrôme d\'épuisement professionnel',
  EATING: 'Alimentation',
  PRIVACY_POLICY: 'politique de confidentialité',
  LEGAL_NOTICES: 'mentions légales',
	RESOURCES: 'ressources',
	LEGAL: 'légal',
	PHONE: 'téléphone',
	DIRECTION: 'itinéraire',
	YES: 'oui',
	NO: 'non',
  AND: 'et',
  SKELETON: {
		AUTOCOMPLETE: {
			EMPTY_STATE: 'Aucun résultat trouvé'
		}
	}
}

export default fr