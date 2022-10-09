// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'fr'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * H​i​ ​{​n​a​m​e​}​!​ ​P​l​e​a​s​e​ ​l​e​a​v​e​ ​a​ ​s​t​a​r​ ​i​f​ ​y​o​u​ ​l​i​k​e​ ​t​h​i​s​ ​p​r​o​j​e​c​t​:​ ​h​t​t​p​s​:​/​/​g​i​t​h​u​b​.​c​o​m​/​i​v​a​n​h​o​f​e​r​/​t​y​p​e​s​a​f​e​-​i​1​8​n
	 * @param {string} name
	 */
	HI: RequiredParams<'name'>
	HOME: {
		/**
		 * W​e​l​c​o​m​e​ ​t​o
		 */
		WELCOME: string
		TEAM: {
			/**
			 * O​u​r​ ​t​e​a​m
			 */
			TITLE: string
			/**
			 * O​u​r​ ​m​u​l​t​i​d​i​s​c​i​p​l​i​n​a​r​y​ ​t​e​a​m​ ​i​s​ ​c​o​m​m​i​t​t​e​d​ ​t​o​ ​y​o​u​r​ ​h​e​a​l​t​h​.
			 */
			TEXT: string
		}
		FOOTER: {
			/**
			 * W​e​b​s​i​t​e​ ​u​n​d​e​r​ ​c​o​n​s​t​r​u​c​t​i​o​n​.​ ​C​o​n​t​a​c​ ​t​h​e​ ​d​e​v​e​l​o​p​e​r​:
			 */
			WIP: string
		}
	}
	/**
	 * S​e​a​r​c​h
	 */
	SEARCH: string
	ADDRESSBOOK: {
		/**
		 * A​d​d​r​e​s​s​ ​b​o​o​k
		 */
		TITLE: string
		OCCUPATIONS: {
			/**
			 * S​e​l​e​c​t​ ​b​y​ ​p​r​o​f​e​s​s​i​o​n​.​.​.
			 */
			PLACEHOLDER: string
		}
		SEARCH: {
			/**
			 * S​e​a​r​c​h
			 */
			LABEL: string
			/**
			 * l​a​s​t​ ​n​a​m​e​ ​o​r​ ​f​i​r​s​t​ ​n​a​m​e
			 */
			PLACEHOLDER: string
		}
		/**
		 * G​o​ ​b​a​c​k​ ​t​o​ ​a​d​d​r​e​s​s​b​o​o​k
		 */
		GOTOADDRESSBOOK: string
		APPOINTMENT: {
			/**
			 * B​o​o​k​ ​a​n​ ​a​p​p​o​i​n​t​m​e​n​t
			 */
			LABEL: string
		}
		/**
		 * C​l​i​n​i​c​ ​l​o​c​a​t​i​o​n
		 */
		LOCATION: string
		/**
		 * s​p​e​c​i​a​l​t​y
		 */
		SPECIALTY: string
	}
	NAVBAR: {
		/**
		 * A​d​d​r​e​s​s​b​o​o​k
		 */
		ADDRESSBOOK: string
		/**
		 * L​o​g​i​n
		 */
		LOGIN: string
		/**
		 * H​i​,
		 */
		HI: string
		/**
		 * R​e​g​i​s​t​e​r
		 */
		REGISTER: string
		/**
		 * L​o​g​o​u​t
		 */
		LOGOUT: string
	}
	LOGIN: {
		/**
		 * L​o​g​i​n
		 */
		LOGIN: string
		/**
		 * L​o​g​i​n
		 */
		TOLOGIN: string
		/**
		 * N​o​ ​a​c​c​o​u​n​t​ ​y​e​t​?
		 */
		NOACCOUNT: string
		/**
		 * S​i​g​n​i​n​g​ ​i​n​.​.​.
		 */
		SIGNINGIN: string
		/**
		 * C​r​e​a​t​e​ ​a​n​ ​a​c​c​o​u​n​t
		 */
		CREATEACCOUNT: string
	}
	/**
	 * E​m​a​i​l​ ​a​d​d​r​e​s​s
	 */
	EMAILADDRESS: string
	/**
	 * P​a​s​s​w​o​r​d
	 */
	PASSWORD: string
}

export type TranslationFunctions = {
	/**
	 * Hi {name}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n
	 */
	HI: (arg: { name: string }) => LocalizedString
	HOME: {
		/**
		 * Welcome to
		 */
		WELCOME: () => LocalizedString
		TEAM: {
			/**
			 * Our team
			 */
			TITLE: () => LocalizedString
			/**
			 * Our multidisciplinary team is committed to your health.
			 */
			TEXT: () => LocalizedString
		}
		FOOTER: {
			/**
			 * Website under construction. Contac the developer:
			 */
			WIP: () => LocalizedString
		}
	}
	/**
	 * Search
	 */
	SEARCH: () => LocalizedString
	ADDRESSBOOK: {
		/**
		 * Address book
		 */
		TITLE: () => LocalizedString
		OCCUPATIONS: {
			/**
			 * Select by profession...
			 */
			PLACEHOLDER: () => LocalizedString
		}
		SEARCH: {
			/**
			 * Search
			 */
			LABEL: () => LocalizedString
			/**
			 * last name or first name
			 */
			PLACEHOLDER: () => LocalizedString
		}
		/**
		 * Go back to addressbook
		 */
		GOTOADDRESSBOOK: () => LocalizedString
		APPOINTMENT: {
			/**
			 * Book an appointment
			 */
			LABEL: () => LocalizedString
		}
		/**
		 * Clinic location
		 */
		LOCATION: () => LocalizedString
		/**
		 * specialty
		 */
		SPECIALTY: () => LocalizedString
	}
	NAVBAR: {
		/**
		 * Addressbook
		 */
		ADDRESSBOOK: () => LocalizedString
		/**
		 * Login
		 */
		LOGIN: () => LocalizedString
		/**
		 * Hi,
		 */
		HI: () => LocalizedString
		/**
		 * Register
		 */
		REGISTER: () => LocalizedString
		/**
		 * Logout
		 */
		LOGOUT: () => LocalizedString
	}
	LOGIN: {
		/**
		 * Login
		 */
		LOGIN: () => LocalizedString
		/**
		 * Login
		 */
		TOLOGIN: () => LocalizedString
		/**
		 * No account yet?
		 */
		NOACCOUNT: () => LocalizedString
		/**
		 * Signing in...
		 */
		SIGNINGIN: () => LocalizedString
		/**
		 * Create an account
		 */
		CREATEACCOUNT: () => LocalizedString
	}
	/**
	 * Email address
	 */
	EMAILADDRESS: () => LocalizedString
	/**
	 * Password
	 */
	PASSWORD: () => LocalizedString
}

export type Formatters = {}
