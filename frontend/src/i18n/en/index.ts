import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	// TODO: your translations go here
	HI: "Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n",
	HOME: {
		WELCOME: "Welcome to"
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
		LOCATION: "Clinic location"
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
