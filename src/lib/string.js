export const soNumeroString = (_numero) => {
    return _numero.replace(/[^0-9]/g, '');
};

export const limpaTelefone = (telefone) => {
    if (telefone == '' || soNumeroString(telefone) == '') {
        telefone = '00000000000';
    } else {
        if (telefone.indexOf('+') == 0) {
            telefone = telefone.substring(3);
        }
        telefone = soNumeroString(telefone);
        if (telefone.length > 11) {
            telefone = telefone.substring(0, 11);
        }
    }
    return telefone;
};
