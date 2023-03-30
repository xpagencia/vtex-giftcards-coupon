export const lojaSelecionada = {
    VTEX: {
        accountName: "",
        api: "",
        appKey: "",
        appToken: ""
    }
}

export const selecionarLoja = () => {
    lojaSelecionada.VTEX = {
        accountName: process.env.VTX_ACCOUNTNAME,
        api: process.env.VTX_API,
        appKey: process.env.VTX_APPKEY,
        appToken: process.env.VTX_APPTOKEN
    };
    return true;
}

export default lojaSelecionada;