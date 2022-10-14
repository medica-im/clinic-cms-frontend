import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	// TODO: your translations go here
	HI: "Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n",
	LOADING: "Loading...",
	HOME: {
		TITLE: "Home",
		WELCOME: "Welcome to",
		TEAM: {
			TITLE: "Our team",
			TEXT: "Our multidisciplinary team is committed to your health."
		},
		FOOTER: {
			WIP: "Website under construction. Contact the developer:"
		}
	},
	CONTACT: {
		TITLE: "Contact"
	},
	SEARCH: "Search",
	ADDRESSBOOK: {
		TITLE: "Address book",
		OCCUPATIONS: {
			PLACEHOLDER: "Select by profession..."
		},
		SEARCH: {
			LABEL: "Search",
			PLACEHOLDER: "last name or first name"
		},
		GOTOADDRESSBOOK: "Go back to addressbook",
		APPOINTMENT: {
			LABEL: "Book an appointment"
		},
		LOCATION: "Clinic location",
		SPECIALTY: "specialty"
	},
	NAVBAR: {
		ADDRESSBOOK: "Addressbook",
		LOGIN: "Login",
		HI: "Hi,",
		REGISTER: "Register",
		LOGOUT: "Logout"
	},
	LOGIN: {
		LOGIN: "Login",
		TOLOGIN: "Login",
		NOACCOUNT: "No account yet?",
		SIGNINGIN: "Signing in...",
		CREATEACCOUNT: "Create an account"
	},
	EMAILADDRESS: "Email address",
	PASSWORD: "Password"
}

export default en
