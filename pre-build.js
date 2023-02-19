"use strict";

const fs = require("fs");
const esbuild = require('esbuild');


const shouldBeCompiled = file => {
	if (file.includes('node_modules/')) return false;
	if (file.endsWith('.tsx')) return true;
	if (file.endsWith('.ts')) return !(file.endsWith('.d.ts') || file.includes('global'));
	return false;
};

const findFilesForPath = path => {
	const out = [];
	const files = fs.readdirSync(path);
	for (const file of files) {
		const cur = `${path}/${file}`;
		// HACK: Logs and databases exclusions are a hack. Logs is too big to
		// traverse, databases adds/removes files which can lead to a filesystem
		// race between readdirSync and statSync. Please, at some point someone
		// fix this function to be more robust.
		if (cur.includes('node_modules')) continue;
		if (fs.statSync(cur).isDirectory()) {
			out.push(...findFilesForPath(cur));
		} else if (shouldBeCompiled(cur)) {
			out.push(cur);
		}
	}
	return out;
};

exports.transpile = (decl) => {
	esbuild.buildSync({
		entryPoints: findFilesForPath('./'),
		outdir: './dist',
		outbase: '.',
		format: 'cjs',
		tsconfig: './tsconfig.json',
		sourcemap: true,
	});
};
