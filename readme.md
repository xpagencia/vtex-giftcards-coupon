# VTEX - Cartão Presente

Cria um cupom único na VTEX quando o pedido é faturado.

A partir de uma promoção já existente, esse cupom é associado e fica disponível para uso.

Para que o cupom seja criado numa promoção especifica, o produto do cartão presente precisa ter a especificação "promotionId" preenchida com o ID da promoção que o cupom será associado.

## Pré configurações

1. No cadastro do produto é necessário criar 2 especificações:

    * GiftCard (checkbox): Precisa ter o valor "Sim" de forma opcional. Se marcado, participará do app para gerar o cupom.

    * promotionId (text): ID da promoção que irá receber o cupom para dar o desconto na próxima compra.

2. Configurar o arquivo .env na raiz desse app.

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

## Configurações de ambiente

O arquivo .env é responsável por manter os dados de conexão com a plataforma e configurações pertinentes a aplicação.

**Parâmetros:**

* VTX_ACCOUNTNAME: Accoutname da loja onde a API irá rodar. Ex: meuAccountName

* VTX_API: Url que será acessada para consultar as informações da VTEX. Ex: <https://meuAccountName.vtexcommercestable.com.br/api>

* VTX_APPKEY: AppKey criada na loja VTEX exclusiva para a aplicação.

* VTX_APPTOKEN: Token da appKey criada na VTEX.

* CUPOM_PRAZO_DIAS: Número de dias padrão para arquivar um cupom.

* TEMPO_EXECUCAO_MINUTOS: Tempo em minutos de descanso de um job.
