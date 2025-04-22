import type { ProgramsNavLinks } from './interfaces/variables.interface';

export const programCount = (path: string, programsNavLinks: ProgramsNavLinks
) => {
	const cat = Object.values(programsNavLinks).find(e => e.href == path);
	if (!cat) {
		throw new Error(`Nav link ${path} not found!`);
	}
	const count = cat.list.filter(e => e.active != false && e.category == 'program').length;
	return count
};

export const getIsOther = (url: string, programsNavLinks: ProgramsNavLinks) => {
	const rootPath = "/" + url.split("/")[1]
	const prog = Object.values(programsNavLinks).find(e => e.href === rootPath);
	if (!prog) {
		throw new Error(`Nav link ${rootPath} not found!`);
	}
	const progArray = prog.list.filter((e) => e.href == url && e.category == "program");
	if (typeof progArray != "undefined"
		&& progArray != null
		&& progArray.length != null
		&& progArray.length > 0)
		return true;
	else
		return false;
};

export const getProgram = (url: string, programsNavLinks: ProgramsNavLinks) => {
	const rootPath = "/" + url.split("/")[1]
	const prog = Object.values(programsNavLinks).find(e => e.href === rootPath);
	if (!prog) {
		throw new Error(`Nav link ${rootPath} not found!`);
	}
	const dict = {
		id: prog.id,
		title: prog.title,
		list: prog.list.filter((e) => e.href != url && e.category == "program" && e.active != false)
	}
	return dict;
};

export const getAllPrograms = (programsNavLinks: ProgramsNavLinks) => {
	let programArray = [];
	for (let p of Object.values(programsNavLinks)) {
		programArray.push(getProgram(p.href, programsNavLinks))
	}
	return programArray
};