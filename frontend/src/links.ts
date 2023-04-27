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

export const programsNavLinks: any = [
	{
		id: 'education-therapeutique',
		title: 'Éducation thérapeutique',
		menu: 'Éducation t.',
		href: '/education-therapeutique',
		list: [
			{
				href: '/education-therapeutique',
				label: 'Définition',
				keywords: 'patient, ETP, éducation, thérapeutique',
				icon: null,
				category: 'definition'
			},
			{
				href: '/education-therapeutique/diabete',
				label: 'Diabète',
				keywords: 'patient, ETP, diabète, éducation, thérapeutique',
				icon: null,
				category: 'program'
			},
			{
				href: '/education-therapeutique/cancer',
				label: 'Accompagnement cancer',
				keywords: 'patient, ETP, cancer, éducation, thérapeutique',
				icon: null,
				category: 'program'
			}
		]
	},
	{
		id: 'education-sante',
		title: 'Éducation pour la santé',
		menu: 'Éducation s.',
		href: '/education-sante',
		list: [
			{
				href: '/education-sante',
				label: 'Définition',
				keywords: 'éducation, santé',
				icon: null,
				category: 'definition'
			},
			{
				href: '/education-sante/parentalite-petite-enfance',
				label: 'Parentalité - Petite enfance',
				keywords: 'éducation, santé, parentalité, enfant, enfance',
				icon: null,
				category: 'program'
			}
		]
	},
	{
		id: 'prevention',
		title: 'Prévention en santé',
		menu: 'Prévention',
		href: '/prevention',
		list: [
			{
				href: '/prevention',
				label: 'Définition',
				keywords: 'prévention, santé, maladie, dépistage',
				icon: null,
				category: 'definition'
			},
			{
				href: '/prevention/syndrome-epuisement-professionnel',
				label: 'Épuisement professionnel',
				keywords: 'prévention, santé, maladie, dépistage, burnout, épuisement, professionnel',
				icon: null,
				category: 'program'
			},
			{
				href: '/prevention/alimentation',
				label: 'Alimentation',
				keywords: 'prévention, alimentation, forme, corps, activité, physique, diététique',
				icon: null,
				category: 'program'
			}
		]
	}
];

export const getIsOther = (url) => {
	const rootPath = "/" + url.split("/")[1]
    const prog = programsNavLinks.find(({ href }) => href === rootPath);
	const progArray = prog.list.filter((e) => e.href == url && e.category == "program");
	if (typeof progArray != "undefined"
                    && progArray != null
                    && progArray.length != null
                    && progArray.length > 0)
            return true;
        else
            return false;
}

export const getProgram = (url) => {
	const rootPath = "/" + url.split("/")[1]
    const prog = programsNavLinks.find(({ href }) => href === rootPath);
	const dict = {
		id: prog.id,
		title: prog.title,
		list: prog.list.filter((e) => e.href != url && e.category == "program")
	}
	return dict;
};

export const menuNavLinks: any = [
	// outpatient clinic
	{
		id: 'maison-de-sante',
		title: 'Maison de santé',
		menu: 'MSP',
		href: '/maison-de-sante',
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
	}].concat(programsNavLinks)

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