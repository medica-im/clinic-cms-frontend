const espK = 'Équipe de soins primaires';
	const espV0 = `Une équipe de soins primaires est un ensemble de professionnels de santé constitué autour de médecins généralistes de premier recours, choisissant d'assurer leurs activités de soins de premier recours sur la base d'un projet de santé qu'ils élaborent. Elle peut prendre la forme d'un centre de santé ou d'une maison de santé.`;
	const espV1 = `L'équipe de soins primaires contribue à la structuration des parcours de santé. Son projet de santé a pour objet, par une meilleure coordination des acteurs, la prévention, l'amélioration et la protection de l'état de santé de la population, ainsi que la réduction des inégalités sociales et territoriales de santé.`;
	const mspV0=`Les maisons de santé pluriprofessionnelles sont des structures pluridisciplinaires où travaillent de manière coordonnée médecins et auxiliaires médicaux.`
	const mspV1=`L’idée est de créer un espace dédié à la coordination des soins au plus près de la population grâce au partage de compétences.`

	const dict = {
		MSP: ['Maison de santé pluriprofessionnelle'],
		ESP: ['Équipe de soins primaires'],
		[espK]: [espV0, espV1],
		'Maison de santé pluriprofessionnelle': [mspV0, mspV1]
	};
	export default dict;