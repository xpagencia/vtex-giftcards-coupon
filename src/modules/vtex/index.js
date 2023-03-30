import axios from 'axios';
import { config } from "dotenv";
import { lojaSelecionada } from "../../lib/selecao-loja.js";

const configEnv = new config({
    path: process.env.NODE_ENV === "test" ? "/env/.env.testing" : ".env",
    debug: process.env.DEBUG,
});


const getHeaders = () => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-vtex-API-appKey": lojaSelecionada.VTEX.appKey,
        "x-vtex-API-appToken": lojaSelecionada.VTEX.appToken,
        "REST-Range": "resources=0-99"
    }
}

export const post = async (endpoint, body, params) => {
    let qsParams = params ? `?${params}` : "";
    const url = `${lojaSelecionada.VTEX.api}${endpoint}${qsParams}`;

    const requestBody = body;
    const headers = getHeaders();

    //console.log(requestBody);
    let retorno;
    try {
        const response = await axios.post(url, requestBody, { headers });
        //console.log(response);
        retorno = response.data;
    } catch (error) {
        //console.log(error);
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
            
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
             */
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             
            console.log(error.request);
            */
        } else {
            // Something happened in setting up the request and triggered an Error
            //console.log('Error', error.message);
        }
        //console.log(error);
        retorno = {
            error: error
        }
    }
    //console.log(`retorno post:${retorno}`);
    return retorno;
}

export const put = async (endpoint, body, params) => {
    let qsParams = params ? `?${params}` : "";
    const url = `${lojaSelecionada.VTEX.api}${endpoint}${qsParams}`;
    let retorno;

    const requestBody = body;
    const headers = getHeaders();

    try {
        const response = await axios.put(url, requestBody, { headers });
        retorno = response.data;
    } catch (error) {
        retorno = {
            error: error
        }
    }
    return retorno;
}

export const patch = async (endpoint, body, params) => {
    const url = `${lojaSelecionada.VTEX.api}${endpoint}?${params}`;
    let retorno;

    const requestBody = body;
    const headers = getHeaders();

    try {
        const response = await axios.patch(url, requestBody, { headers });
        retorno = response.data;
    } catch (error) {
        retorno = {
            error: error
        }
    }
    return retorno;
}

export const get = async (endpoint, params, urlAbsolut, headersOpcionais) => {
    let url = "";
    if (params == undefined) params = "";
    if (urlAbsolut) {
        url = `${endpoint}?${params}`;
    } else {
        url = `${lojaSelecionada.VTEX.api}${endpoint}?${params}`;
    }
    //console.log("get-url", url);
    let retorno;
    const headers = getHeaders();
    const headersEnviar = { ...headers, ...headersOpcionais };
    //console.log(url, headersEnviar);
    try {
        const response = await axios.get(url, { headers });
        //console.log("success get", response.request);
        retorno = response.data;
    } catch (error) {
        //console.log("error get");
        retorno = {
            error: error
        }
    }
    return retorno;
}

export default { get }