import { Search as MDSearch } from '../modules/vtex/masterdata/index.js';
import dateTime from '../lib/dateTime.js'
import { removeCoupon } from '../modules/vtex/rates and benefits/coupon.js'

export const removeCoupons = async (cupomPrazoDias) => {
    //arquiva todos os cupons que estiverem no masterdata com a data de criação maior que cupomPrazoDias atrás.
    let dateFinish = dateTime.formatDate(dateTime.addDays(new Date(), (-1) * cupomPrazoDias), "yyyy-mm-dd");
    let result = await MDSearch('PD', 'giftcards', `createdIn between 2023-03-01 AND ${dateFinish}`);
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            removeCoupon(result[i].giftcards);
        }
    }
    console.log(`Foram encontrados ${result.length} cupons para serem arquivados com prazo de expiração até ${dateFinish}.`);
}