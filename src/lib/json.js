/*
r	Abra o arquivo para leitura.Ocorrerá uma exceção se o arquivo não existir.
r+	Arquivo aberto para leitura e escrita. Ocorrerá uma exceção se o arquivo não existir.
rs	Arquivo aberto para leitura em modo síncrono.
rs+	Abra o arquivo para leitura e gravação, solicitando ao sistema operacional que o abra de forma síncrona. Veja as notas para 'rs' sobre como usar isso com cuidado.
w	Abra o arquivo para gravação. O arquivo é criado (se não existir) ou truncado (se existir).
wx	Como 'w', mas falha se o caminho existir.
w+	Arquivo aberto para leitura e escrita. O arquivo é criado (se não existir) ou truncado (se existir).
wx+	Como 'w+', mas falha se o caminho existir.
a	Abra o arquivo para anexar. O arquivo é criado se não existir.
ax	Como 'a', mas falha se o caminho existir.
a+	Abra o arquivo para leitura e anexação. O arquivo é criado se não existir.
ax+	Como 'a+', mas falha se o caminho existir.
*/
import { saveFile, readFile, removeFile } from "./files.js"

export const saveJson = (path, file, body) => {
    try {
        saveFile(path, file, JSON.stringify(body), 'w');
        return true;
    } catch (ex) {
        console.log('saveJson error: ', ex);
        return false;
    }
};

export const openJson = (path, file, flag = 'r') => {
    try {
        const conteudoStr = readFile(path, file, flag);
        const conteudo = JSON.parse(conteudoStr);
        return conteudo;
    } catch (ex) {
        console.log('openJSON error: ', ex);
        return null;
    }
};

export const removeJson = (path, file) => {
    try {
        return removeFile(path, file);
    } catch (ex) {
        console.log('openJSON error: ', ex);
        return false;
    }
}
