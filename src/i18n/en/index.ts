import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	// TODO: your translations go here
	ACCESS: {
		SUMMARY: {
		    PUBLIC: "Website visitors, team members and administrators.",
		    TEAM: "Team members & administrators.",
		    ADMIN: "Administrators only."
		},
		CHOICES: {
		    PUBLIC: "Public",
		    TEAM: "Team",
		    ADMIN: "Administrator"
		},
		ACCESS_CONTROL: "Access control"
	},
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
			LABEL: "Name",
			PLACEHOLDER: "Name...",
			ARIA_LABEL: "Search by name"
		},
		GOTOADDRESSBOOK: "Go back to addressbook",
		APPOINTMENT: {
			LABEL: "Book an appointment"
		},
		LOCATION: "Practice location",
		SPECIALTY: "specialty",
		CLEAR: "Clear",
		PAYMENT_METHODS: "Payment methods",
		PAYMENT_METHOD: "Payment method",
		COSTS_AND_REIMBURSEMENTS: "Costs and reimbursements",
		THIRD_PARTY_PAYER: "Third-party payer",
		SOMED: "Social media",
		SPOKEN_LANGUAGE: "spoken language",
		SPOKEN_LANGUAGES: "spoken languages",
		INFORMATIONS: "informations"
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
		LOGOUT: "You have successfully logged out...",
		RESET_PASSWORD: "Reset your password",
		RESET: "Reset",
		RESET_SUCCESSFUL: "Password reset e-mail has been sent.",
		CHANGE_PASSWORD: "Change password",
		CONFIRM_PASSWORD: "Confirm password",
		ENTER_PASSWORD: "Enter password",
		SET_NEW_PASSWORD: "Set new password",
		CHANGE_PASSWORD_SUCCESS: "Password successfully changed!",
		PASSWORD_FORGOTTEN: "Forgot your password?",
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
		ROLE: "Role",
		PAGE: "Personal page",
		ACCOUNT_SETTINGS: "Account settings",
		FULL_NAME: "full name",
		USERNAME: "username"
	},
	FACILITY: {
		OUTPATIENT_CLINIC: 'Outpatient clinic'
	},
	BLOG: {
		READMORE: 'Read more'
	},
	OUTPATIENT_CLINIC: {
		MDT_MEETING: 'multi-disciplinary team meeting',
		TPE: 'therapeutic patient education',
		PROGRAMS: 'programs',
		OUR_PROGRAM: 'our program',
		OUR_PROGRAMS: 'our programs',
		OUR_OTHER_PROGRAM: 'our other program',
		OUR_OTHER_PROGRAMS: 'our other programs'
	},
	DISEASE: {
		DIABETES: 'diabetes',
		CANCER: 'cancer'
	},
	WEBSITE: 'website',
	LEARN_MORE: 'Learn more',
	LEXICON: 'lexicon',
	HEALTH_RECORD: 'health record',
	HEALTH_EDUCATION: 'health education',
	PREVENTION: 'prevention',
	PREVENTIVE_HEALTHCARE: 'preventive healthcare',
	BURNOUT: 'occupational burnout',
	EATING: 'Eating',
	PRIVACY_POLICY: 'privacy policy',
	LEGAL_NOTICES: 'legal notices',
	RESOURCES: 'resources',
	LEGAL: 'legal',
	PHONE: 'phone',
	DIRECTION: 'direction',
	YES: 'yes',
	NO: 'no',
	AND: 'and',
	CHARACTER: {
		SINGULAR: "character",
		PLURAL: "characters"
	},
	BIOGRAPHY: "biography",
	PREVIEW: "preview",
	CLOSE: "close",
	CLOSE_NO_SAVE: "close without saving",
	SAVE: "save",
	DESTROY: "destroy",
	DELETE: "delete",
	CREATE: "create",
	EDIT: "edit",
	PROFILE: "profile",
	UPDATE: "update",
	DOB: "date of birth",
	ADAPTED_PHYSICAL_EDUCATION: "adapted physical education"
}

export default en
