import fs from 'fs'
import { resolve } from 'path';

export const saveLogErrors = (file, fileText) => {
    fileText = "\r\n" + fileText;
    try {
        fs.writeFileSync(
            `./errors/${file}`,
            fileText,
            { encoding: 'utf8', flag: 'a', mode: 0o666 }
        );
        return true;
    } catch (ex) {
        console.log('saveLogErrors: ', ex);
        return false;
    }
};

export const saveFile = (path, file, fileText, flag = 'w') => {
    try {
        fs.writeFileSync(
            `${path}/${file}`,
            fileText,
            { encoding: 'utf8', flag, mode: 0o666 }
        );
        return true;
    } catch (ex) {
        console.log('saveFile: ', ex);
        return false;
    }
};

export const readFile = (path, file, flag = 'r') => {
    try {
        return fs.readFileSync(`${path}/${file}`, { encoding: 'utf8', flag });
    } catch (ex) {
        console.log('readFile error: ', ex);
        return null;
    }
}

export const removeFile = (path, file) => {
    try {
        fs.rm(`${path}/${file}`, () => { });

        return true;
    } catch (ex) {
        console.log('removeFile error: ', ex);
        return false;
    }
}

export const readdir = (path, functionEvent) => {
    fs.readdir(path, functionEvent);
}

export const stat = (filepath, functionEvent) => {
    fs.stat(filepath, functionEvent);
}

export const pathResolve = (dir, filename) => {
    return resolve(dir, filename);
}

export const renameFile = (oldPath, newPath, callback) => {
    fs.rename(oldPath, newPath, callback);
}