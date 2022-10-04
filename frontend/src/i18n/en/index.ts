import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	// TODO: your translations go here
	HI: "Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n",
	HOME: {
		WELCOME: "Welcome to",
		TEAM: {
			TITLE: "Our team",
			TEXT: "The members of our multidisciplinary team are working together to deliver comprehensive care to you and your relatives."
		}
	},
	SEARCH: "Search",
	ADDRESSBOOK: {
		TITLE: "Address book",
		OCCUPATIONS: {
		PLACEHOLDER: "Select by profession..."
		},
		SEARCH : {
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
