// Navigation Links & Sitemap
import {
	faBars,
	faCaretDown,
	faInfo,
	faTimeline,
	faBookMedical,
	faHouse,
	faMapLocationDot,
	faAddressBook,
	faEnvelope,
	faBlog,
	faRightToBracket,
	faRightFromBracket,
	faUserPlus,
	faUser,
	faPersonChalkboard
} from '@fortawesome/free-solid-svg-icons';

export const menuNavLinks: any = [
	// outpatient clinic
	{
		id: 'maison-de-sante',
		title: 'Maison de santé',
		menu: 'MSP',
		list: [
			{
				href: '/maison-de-sante/a-propos',
				label: 'À propos',
				keywords: 'santé, msp, pluripro',
				icon: faInfo
			},
			{
				href: '/maison-de-sante/chronologie',
				label: 'Chronologie',
				keywords: 'chronologie, historique, histoire, chronologique',
				icon: faTimeline
			},
			{
				href: '/maison-de-sante/projet-de-sante',
				label: 'Projet de santé',
				keywords: 'santé, projet',
				icon: faBookMedical
			},
			{
				href: '/maison-de-sante/reunion-concertation-pluriprofessionnelle',
				label: 'RCP',
				keywords: 'réunion, pluripro, concertation, RCP',
				icon: null
			},
			{
				href: '/maison-de-sante/dossier-patient',
				label: 'Dossier patient',
				keywords: 'dossier, secret, partage, information, logiciel',
				icon: null
			},
			{
				href: '/maison-de-sante/lexique',
				label: 'Lexique',
				keywords: 'lexique, dictionaire, définition',
				icon: null
			}
		]
	},
	{
		id: 'education-therapeutique',
		title: 'Éducation thérapeutique',
		menu: 'Éducation t.',
		list: [
			{
				href: '/education-therapeutique/definition',
				label: 'Définition',
				keywords: 'patient, ETP, éducation, thérapeutique',
				icon: null
			},
			{
				href: '/education-therapeutique/diabete',
				label: 'Diabète',
				keywords: 'patient, ETP, diabète, éducation, thérapeutique',
				icon: null
			},
			{
				href: '/education-therapeutique/cancer',
				label: 'Accompagnement cancer',
				keywords: 'patient, ETP, cancer, éducation, thérapeutique',
				icon: null
			}
		]
	},
	{
		id: 'education-sante',
		title: 'Éducation pour la santé',
		menu: 'Éducation s.',
		list: [
			{
				href: '/education-sante/definition',
				label: 'Définition',
				keywords: 'éducation, santé',
				icon: null
			},
			{
				href: '/education-sante/parentalite-petite-enfance',
				label: 'Parentalité - Petite enfance',
				keywords: 'éducation, santé, parentalité, enfant, enfance',
				icon: null
			}
		]
	},
	{
		id: 'prevention',
		title: 'Prévention en santé',
		menu: 'Prévention',
		list: [
			{
				href: '/prevention/definition',
				label: 'Définition',
				keywords: 'prévention, santé, maladie, dépistage',
				icon: null
			},
			{
				href: '/prevention/syndrome-epuisement-professionnel',
				label: 'Épuisement professionnel',
				keywords: 'prévention, santé, maladie, dépistage, burnout, épuisement, professionnel',
				icon: null
			},
			{
				href: '/prevention/alimentation',
				label: 'Alimentation',
				keywords: 'prévention, alimentation, forme, corps, activité, physique, diététique',
				icon: null
			}
		]
	}
];

export const menuNavCats: any = [
	// outpatient clinic
	{
		id: 'msp',
		title: 'Maison de santé',
		list: ['maison-de-sante']
	},
	{
		id: 'education',
		title: 'Éducation',
		list: ['education-therapeutique', 'education-sante']
	},
	{
		id: 'prevention',
		title: 'Prévention',
		list: ['prevention']
	}
]