import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	// TODO: your translations go here
	HI: "Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n",
	LOADING: "Loading...",
	HOME: {
		TITLE: "Home",
		WELCOME: "Welcome to",
		TEAM: {
			TITLE: "Team",
			TEXT: "Our multidisciplinary team is committed to your health."
		},
		FOOTER: {
			WIP: "Website under construction. Contact the developer:"
		}
	},
	CONTACT: {
		TITLE: "Contact",
		CALL_US: "Call us"
	},
	SITES: {
		TITLE: "Sites"
	},
	SEARCH: "Search",
	ADDRESSBOOK: {
		A11Y: {
			PROFILE_PIC_OF: "Profile picture of"
		},
		TITLE: "Address book",
		OCCUPATIONS: {
			PLACEHOLDER: "Select by profession..."
		},
		FACILITIES: {
            PLACEHOLDER: "Select by facility..."
		},
		SEARCH: {
			LABEL: "Search",
			PLACEHOLDER: "last name or first name"
		},
		GOTOADDRESSBOOK: "Go back to addressbook",
		APPOINTMENT: {
			LABEL: "Book an appointment"
		},
		LOCATION: "Practice location",
		SPECIALTY: "specialty"
	},
	NAVBAR: {
		ADDRESSBOOK: "Addressbook",
		LOGIN: "Login",
		HI: "Hi,",
		REGISTER: "Register",
		LOGOUT: "Logout",
		ABOUT: "About us",
		TIMELINE: "Timeline",
		HEALTH_PROJECT: "Health project",
		LANGUAGE: "Language",
		NAVIGATE: "Navigate",
		GO_HOME: "Go to Homepage",
		THEME: "Theme"
	},
	LOGIN: {
		LOGIN: "Login",
		TOLOGIN: "Login",
		NOACCOUNT: "No account yet?",
		SIGNINGIN: "Signing in...",
		CREATEACCOUNT: "Create an account",
		SUCCESSFUL: "Login successful...",
		LOGOUT: "You have successfully logged out..."
	},
	ERROR404: {
		OOPS: "Oops!",
		PAGENOTFOUND: "Page not found.",
		DOESNOTEXIST: "The page you're looking for doesn't exist.",
		HOME: "Go Home",
		BACK: "Go back",
	},
	EMAILADDRESS: "Email address",
	PASSWORD: "Password",
	TIMELINE: {
        TITLE: "Timeline"
	},
	USER: {
		PROFILE: "{userName:string} profile",
		ROLE: "Role"
	},
	FACILITY: {
		OUTPATIENT_CLINIC: 'Outpatient clinic'
	},
	BLOG: {
		READMORE: 'Read more'
	},
	OUTPATIENT_CLINIC: {
		MDT_MEETING: 'multi-disciplinary team meeting',
		TPE: 'therapeutic patient education'
	},
	DISEASE: {
		DIABETES: 'diabetes'
	},
	WEBSITE: 'website',
	LEARN_MORE: 'Learn more',
	LEXICON: 'lexicon',
	HEALTH_RECORD: 'health record',
	HEALTH_EDUCATION: 'health education',
	PREVENTION: 'prevention',
	PREVENTIVE_HEALTHCARE: 'preventive healthcare'
}

export default en
