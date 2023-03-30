# VTEX - Cartão Presente

Cria um cupom único na VTEX quando o pedido é faturado.
A partir de uma promoção já existente, esse cupom é associado e fica disponível para uso.

## Opções de job

```yarn start <minutes>```

**Definição:**

Cria os cupons a partir de pedidos faturados a cada x minutos.

**Parâmetros:**

* minutes = Tempo em que o job hiberna para executar novamente. Se 0, irá rodar apenas uma vez.

```yarn start:remove <dias>```

**Definição:**

Arquiva todos os cupons que tiverem sido criados a x dias para trás.

**Parâmetros:**

* dias = número de dias para considerar arquivar o cupom. Se não informar o campo, usará o valor padrão configurado no arquivo .env . Ex: 90 dias, irá arquivar todos os cupons que forem criados até 90 dias atrás.

```yarn start:order <orderId>```

**Definição:**

Executa, independente do status do pedido o registro do cupom na promoção respectiva.

**Parâmetros:**

* orderId = Código do pedido na VTEX. Campo obrigatório.

## Configurações de conexão

O arquivo .env é responsável por manter os dados de conexão com a plataforma e configurações pertinentes a aplicação.

**Parâmetros:**

* VTX_ACCOUNTNAME: Accoutname da loja onde a API irá rodar. Ex: meuAccountName

* VTX_API: Url que será acessada para consultar as informações da VTEX. Ex: <https://meuAccountName.vtexcommercestable.com.br/api>

* VTX_APPKEY: AppKey criada na loja VTEX exclusiva para a aplicação.

* VTX_APPTOKEN: Token da appKey criada na VTEX.

* CUPOM_PRAZO_DIAS: Número de dias padrão para arquivar um cupom.

* TEMPO_EXECUCAO_MINUTOS: Tempo em minutos de descanso de um job.
