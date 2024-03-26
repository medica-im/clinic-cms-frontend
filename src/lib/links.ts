// Navigation Links & Sitemap
import { variables } from '$lib/utils/constants';

const isMSP: boolean = variables.ORGANIZATION_CATEGORY == "msp"

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
	faPersonChalkboard,
	faPills,
	faShieldHeart
} from '@fortawesome/free-solid-svg-icons';

export const programsNavLinks: any = [
	/*{
		id: 'education-therapeutique',
		title: {
			en: 'Therapeutic education',
			fr: 'Éducation thérapeutique'
		},
		menu: 'Éducation t.',
		href: '/education-therapeutique',
		icon: faPills,
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
		title: {
			en: 'Health education',
			fr: 'Éducation pour la santé'
		},
		menu: 'Éducation s.',
		href: '/education-sante',
		icon: faPersonChalkboard,
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
	},*/
	{
		id: 'prevention',
		title: {
			en: 'Health prevention',
			fr: 'Prévention en santé'
		},
		menu: 'Prévention',
		href: '/prevention',
	    icon: faShieldHeart,
		list: [
			{
				href: '/prevention',
				label: 'Définition',
				keywords: 'prévention, santé, maladie, dépistage',
				icon: null,
				category: 'definition'
			},
			{
				href: '/prevention/depistage-hypertension-arterielle',
				label: 'Dépistage hypertension artérielle',
				keywords: 'prévention, santé, maladie, dépistage, hypertension',
				icon: null,
				category: 'program'
			},
			{
				href: '/prevention/depistage-apnee-sommeil',
				label: 'Dépistage apnée du sommeil',
				keywords: 'prévention, alimentation, forme, corps, activité, physique, diététique',
				icon: null,
				category: 'program'
			},
			{
				href: '/prevention/obesite-infantile',
				label: 'Obésité infantile',
				keywords: 'prévention, alimentation, forme, corps, activité, physique, diététique, surpoids, obésité',
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

export const getProgram = (url: string) => {
	const rootPath = "/" + url.split("/")[1]
    const prog = programsNavLinks.find(({ href }) => href === rootPath);
	const dict = {
		id: prog.id,
		title: prog.title,
		list: prog.list.filter((e) => e.href != url && e.category == "program")
	}
	return dict;
};

export const getAllPrograms = () => {
	let programArray = [];
	for (let p of programsNavLinks) {
		programArray.push(getProgram(p.href))
	  }
	return programArray
}

export const menuNavLinks: any = isMSP ? [
	// outpatient clinic
	{
		id: 'maison-de-sante',
		title: {
			en: 'Outpatient clinic',
			fr: 'Maison de santé'
		},
		menu: 'MSP',
		href: '/maison-de-sante',
		list: [
			{
				href: '/maison-de-sante/a-propos',
				label: 'À propos',
				keywords: 'santé, msp, pluripro',
				icon: faInfo
			},
			/*{
				href: '/maison-de-sante/chronologie',
				label: 'Chronologie',
				keywords: 'chronologie, historique, histoire, chronologique',
				icon: faTimeline
			},*/
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
	}].concat(programsNavLinks) : []

export const menuNavCats: any = isMSP ? [
	// outpatient clinic
	{
		id: 'msp',
		title: {
			en: 'Outpatient clinic',
			fr: 'Maison de santé'
		},
		list: ['maison-de-sante']
	},
	/*{
		id: 'education',
		title: {
			en: 'Education',
			fr: 'Éducation'
		},
		list: ['education-therapeutique', 'education-sante']
	},*/
	{
		id: 'prevention',
		title: {
			en: 'Prevention',
			fr: 'Prévention'
		},
		list: ['prevention']
	}
] : []