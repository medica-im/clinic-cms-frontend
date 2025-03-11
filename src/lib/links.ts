// Navigation Links & Sitemap
import { variables } from '$lib/utils/constants.ts';

const isMSP: boolean = variables.ORGANIZATION_CATEGORY == "msp"

import {
	faUsers,
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
	faShieldHeart,
	faHandHoldingMedical,
} from '@fortawesome/free-solid-svg-icons';

export const programCount = (path: string) => {
	const cat = Object.values(programsNavLinks).find(e=>e.href==path);
	const count = cat.list.filter(e=>e.active!=false && e.category=='program').length;
	return count
}

export const programsNavLinks: any = {
	'soins': {
		id: 'soins',
		title: {
			en: 'Health services',
			fr: 'Soins'
		},
		menu: 'Soins',
		href: '/soins',
		icon: faHandHoldingMedical,
		list: [
			{
				href: '/soins',
				label: 'Présentation',
				keywords: 'soins, soigner',
				icon: null,
				category: 'definition'
			},
			{
				href: '/soins/permanence-infirmiere',
				label: 'Permanence infirmière',
				keywords: 'infirmière, infirmier, IDE, nursing, prévention',
				icon: null,
				category: 'program',
				active: false
			},
			{
				href: '/soins/parcours',
				label: 'Parcours de soins',
				keywords: 'soins, médecin, accès, parcours',
				icon: null,
				category: 'program',
				active: true
			}
		]
	},
	'education-therapeutique': {
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
				href: '/education-therapeutique/polypathologie',
				label: 'Polypathologie',
				keywords: 'patient, ETP, diabète, éducation, thérapeutique,bronchite chronique, HTA, maladie cardio-vasculaire',
				icon: null,
				category: 'program',
				active: true,
			},
			{
				href: '/education-therapeutique/diabete',
				label: 'Diabète',
				keywords: 'patient, ETP, diabète, éducation, thérapeutique',
				icon: null,
				category: 'program',
				active: false,
			},
			{
				href: '/education-therapeutique/cancer',
				label: 'Accompagnement cancer',
				keywords: 'patient, ETP, cancer, éducation, thérapeutique',
				icon: null,
				category: 'program',
				active: false,
			}
		]
	},
    /*'education-sante': {
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
	'prevention': {
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
				href: '/prevention/vaccins',
				label: 'Vaccins',
				keywords: 'prévention, santé, maladie, vaccin',
				icon: null,
				category: 'program',
				active: true,
				preload: 'off'
			},
			{
				href: '/prevention/depistage-hypertension-arterielle',
				label: 'Hypertension artérielle',
				keywords: 'prévention, santé, maladie, dépistage, hypertension',
				icon: null,
				category: 'program',
				active: false
			},
			{
				href: '/prevention/depistage-syndrome-apnees-sommeil',
				label: 'Apnées du sommeil',
				keywords: 'prévention, apnées, sommeil, somnolence',
				icon: null,
				category: 'program',
				active: false
			},
			{
				href: '/prevention/obesite-infantile',
				label: 'Obésité infantile',
				keywords: 'prévention, alimentation, forme, corps, activité, physique, diététique, surpoids, obésité',
				icon: null,
				category: 'program',
				active: false
			},
			{
				href: '/prevention/depistage-cancer-colorectal',
				label: 'Cancer colorectal',
				keywords: 'prévention, cancer, colon, rectum, activité, physique, diététique, surpoids, obésité, alcool, tabac, sédentarité',
				icon: null,
				category: 'program',
				active: true
			},
			{
				href: '/prevention/depistage-cancer-col-uterus',
				label: "Cancer du col de l'utérus",
				keywords: 'femme, dépistage, prévention, cancer, uterus, HPV, frottis',
				icon: null,
				category: 'program',
				active: false
			},
			{
				href: '/prevention/bilan-prevention',
				label: "Bilan prévention",
				keywords: 'prévention, dépistage',
				icon: null,
				category: 'program',
				active: false
			}
		]
	}
};

export const getIsOther = (url: string) => {
	const rootPath = "/" + url.split("/")[1]
    const prog = Object.values(programsNavLinks).find(e => e.href === rootPath);
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
    const prog = Object.values(programsNavLinks).find(e => e.href === rootPath);
	const dict = {
		id: prog.id,
		title: prog.title,
		list: prog.list.filter((e) => e.href != url && e.category == "program" && e.active != false)
	}
	return dict;
};

export const getAllPrograms = () => {
	let programArray = [];
	for (let p of Object.values(programsNavLinks)) {
		programArray.push(getProgram(p.href))
	  }
	return programArray
}

const outpatientClinicLinks: any = {
	// outpatient clinic
	'msp': {
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
			{
				href: '/maison-de-sante/usagers',
				label: 'Usagers',
				keywords: 'usagers, patients',
				icon: faUsers
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
	}
}

export const menuNavLinks: any = {
	...outpatientClinicLinks,
	...programsNavLinks
};

export const menuNavCats: any[] = [
	// outpatient clinic
	{
		id: 'msp',
		title: {
			en: 'Outpatient clinic',
			fr: 'Maison de santé'
		},
		list: ['maison-de-sante']
	},
	// programs
	{
		id: 'education',
		title: {
			en: 'Education',
			fr: 'Éducation'
		},
		list: ['education-therapeutique', 'education-sante']
	},
	{
		id: 'prevention',
		title: {
			en: 'Prevention',
			fr: 'Prévention'
		},
		list: ['prevention']
	},
	{
		id: 'soins',
		title: {
			en: 'Health services',
			fr: 'Soins'
		},
		list: ['soins']
	}
];