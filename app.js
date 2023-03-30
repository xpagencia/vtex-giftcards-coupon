import { jobFeed, jobOrders, jobRemoveCupon } from "./src/job.js";
import { selecionarLoja } from "./src/lib/selecao-loja.js";
import { config } from "dotenv"
import { soNumeroString } from './src/lib/string.js'

const configEnv = new config({
    path: process.env.NODE_ENV === "test" ? "/env/.env.testing" : ".env",
    debug: process.env.DEBUG,
});

async function execJobFeed(minutes) {
    minutes = minutes || 5;
    console.info(`Start app Feed: With the time of ${minutes} minutes between tasks.`);
    await jobFeed();
    if (minutes > 0) {
        setInterval(async () => {
            await jobFeed();
        }, 1000 * 60 * minutes);
    }
}

async function execJobOrders(minutes, orderId) {
    minutes = minutes || 5;
    console.info(`Start app Orders: With the time of ${minutes} minutes between tasks.`);
    await jobOrders(orderId);
    if (minutes > 0) {
        setInterval(async () => {
            await jobOrders(orderId);
        }, 1000 * 60 * minutes);
    }
}

async function execJobRemoveCoupon(minutes, cupomPrazoDias) {
    minutes = minutes || 5;
    console.info(`Start app Remove: With the time of ${minutes} minutes between tasks.`);
    await jobRemoveCupon(cupomPrazoDias);
    if (minutes > 0) {
        setInterval(async () => {
            await jobRemoveCupon(cupomPrazoDias);
        }, 1000 * 60 * minutes);
    }
}

//console.log(process.argv);
let minutesExecJob = parseInt(process.env.TEMPO_EXECUCAO_MINUTOS);
let cupomPrazoDias = parseInt(process.env.CUPOM_PRAZO_DIAS);
if (process.argv.length >= 3 && soNumeroString(process.argv[2]) != "") {
    minutesExecJob = process.argv[2];
}
selecionarLoja();

let orderId = process.argv.find(x => x.indexOf("-01") > -1);

let processos = false;
if (process.argv.find(x => x == "feed") != undefined) {
    execJobFeed(minutesExecJob);
    processos = true;
}
if (process.argv.find(x => x == "orders") != undefined) {
    execJobOrders(minutesExecJob, orderId);
    processos = true;
}

if (process.argv.find(x => x == "remove") != undefined) {
    if (process.argv.length == 5) {
        cupomPrazoDias = parseInt(process.argv[4]);
    }

    execJobRemoveCoupon(minutesExecJob, cupomPrazoDias);
    processos = true;
}

if (!processos) {
    await execJobFeed(minutesExecJob);
    await execJobOrders(minutesExecJob);
}