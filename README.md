[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# healthcenter

Website framework for health centers, outpatient clinics and private medical practices.

The idea behind this framework is to put the biggest amount of data in the database and automate the rendering. For instance, if you add a new healthcare professional in the database, all related components (addressbook, healthcare workers count, list of medical specialties available) will be automatically updated. Likewise if you add a new facility to your organization or if you modify an existing one. Thanks to our Svelte components and reactive store variables, all the pages of your website are always up-to-date.

The framework can run one or multiple website(s).

It is divided into a single backend server (which can host the data for one or more websites) and one frontend node server for each website.

Backend and frontend servers communicate through REST API calls only.

We are using nginx to dispatch requests to the gunicorn server (backend) or node server (frontend).

The frontend is a SvelteKit SSR rendered app / website. It gives you the best of the classic multi-page website world (immediate rendering on first page visit, search engine referencement) and the best of the pure JavaScript app world (advanced, fast web apps). We plan to add PWA support.

## Backend
* Django
* Django Rest Framework
* gunicorn
* Wagtail (used only to store data for Timeline.js, may be discontinued later)

The main database is Postgres.

We are also making use of django-postgresql-dag (Django & Postgresql-based Directed Acyclic Graphs) to build the workforce graph. Each member of the workforce (healthcare professionals, management, administrative and support staff) is included in a graph based on MeSH with metadata such as location, specialty, organization membership. This graph is used to power the addressbook. It may be replaced in the future by a fully fledged graph database such as neo4j.

## Frontend
* SvelteKit
* [Skeleton UI](https://skeleton.dev): a Svelte UI toolkit based on Tailwind CSS

## Languages
* Code, comments and variables: English only.
* All i18n variables have corresponding English and French strings.

There is some static content inside +page.svelte files using the French language, as this repository is currently used to power the first website in production. This will eventually be cleared and replaced by sample English demonstrating components usage.

We plan to put frontend and backend code into separate repositories ASAP.

## License
GPL v.3

You can use this code to create and sell your own websites but please share bug fixes and improvements with us, as required by the license. This will benefit everyone.



