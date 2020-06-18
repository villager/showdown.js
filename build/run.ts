/**
 * Command Runner
 */
import * as child_process from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';

export const Builder = new class {
    run(cmd: string) : Promise<void> {
        return new Promise((resolve, reject) => {
            let child = child_process.spawn(cmd, {stdio: 'inherit', cwd: __dirname});
            child.on('close', (code: number) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`command failed "${cmd}"`));
                }
            })
        });
    }
    async copyPath(origin: string, dest: string) {
        let data = await fs.readFile(origin);
        return await fs.writeFile(dest, data);
    }
    async readdir(file) {
        return await fs.readdir(file);
    }
    async copyDir(origin: string, dest: string, exept?: string[]) {
        let exeptionList = new Set(exept || []);
        fs.lstat(origin).then(stats => {
            if (stats.isSymbolicLink()) return;
            if (stats.isFile()) {
                if (!exeptionList.has(path.extname(origin))) this.copyPath(origin, dest);
            } else if (stats.isDirectory()) {
                this.readdir(origin).then(files => {
                    for (const file of files) {
                        this.copyDir(path.join(origin, file), path.join(dest, file));
                    }               
                }).catch(e => {
                    throw e;
                });
            }
        }).catch(error => {
            throw error;
        });
    }   
}