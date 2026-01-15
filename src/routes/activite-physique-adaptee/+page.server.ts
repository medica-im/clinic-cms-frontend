import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(308, '/maison-de-sante/activite-physique-adaptee');
}
