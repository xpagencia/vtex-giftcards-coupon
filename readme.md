# VTEX - Cartão Presente

Com esse app, o usuário poderá comprar um produto de "cartão presente" na loja e receber no seu e-mail um cupom com um código aleatório no valor referente a promoção que o cartão presente comprado será associado.

A partir de uma promoção já existente, esse cupom é associado e fica disponível para uso.

Para que o cupom seja criado numa promoção especifica, o produto do cartão presente precisa ter a especificação "promotionId" preenchida com o ID da promoção que o cupom será associado.

## Funcionalidades

* Criar cupons a partir de uma venda de um produto Cartão Presente.
* Remover cupons não utilizados em até x dias de vendas feitas pelos produtos de Cartão Presente.

## Pré configurações

1. Criar na VTEX as promoções que ficarão disponíveis para utilização dos cupons a serem criados pelo app.

2. Criar na VTEX os produtos que serão as opções de "Cartão Presente".

3. No cadastro do produto é necessário criar 2 especificações:

    * GiftCard (checkbox): Precisa ter o valor "Sim" de forma opcional. Se marcado, participará do app para gerar o cupom.

    * promotionId (text): ID da promoção que irá receber o cupom para dar o desconto na próxima compra.

4. Configurar o arquivo .env na raiz desse app.

5. Criar no Master Data da VTEX a entidade PD para receber os pedidos que fazem parte da execução do APP.
    * Entidade: PD
        * cartaoPresente: Boolean
        * email: varchar(750)
        * firstName: varchar(50)
        * lastName: varchar(750)
        * giftcards: varchar(50)
        * couponValue: Currency
        * orderId: varchar(50)
        * orderStatus: varchar(50)
        * subtotal: Currency
        * total: Currency

## Configurações de ambiente

O arquivo .env é responsável por manter os dados de conexão com a plataforma e configurações pertinentes a aplicação.

**Parâmetros:**

* VTX_ACCOUNTNAME: Accoutname da loja onde a API irá rodar. Ex: meuAccountName

* VTX_API: Url que será acessada para consultar as informações da VTEX. Ex: <https://meuAccountName.vtexcommercestable.com.br/api>

* VTX_APPKEY: AppKey criada na loja VTEX exclusiva para a aplicação.

* VTX_APPTOKEN: Token da appKey criada na VTEX.

* CUPOM_PRAZO_DIAS: Número de dias padrão para arquivar um cupom.

* TEMPO_EXECUCAO_MINUTOS: Tempo em minutos de descanso de um job.

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

## FAQ - Perguntas frequentes

1. **Como eu crio promoções na VTEX?**

    Veja no help <https://help.vtex.com/pt/tracks/promotions--6asfF1vFYiZgTQtOzwJchR/7FjbeZdE2KMwk5L1t98pZI>

    A promoção que vai receber os cupons, ela terá uma utm_source a seu critério. O resto da configuração você decide como fará.

2. **O usuário pagará frete para comprar o Cartão Presente?**

    O mais óbvio é que não pague, visto que você não usará nenhuma transportadora para entregar o cartão presente para ele. Mas, o critério é seu. 

    Se não quiser cobrar frete, basta criar uma promoção de frete grátis e associar todos os produtos que serão "Cartão Presente".

3. **Eu preciso gerar nota fiscal na venda de um Cartão Presente?**

    Todo pedido na VTEX para ser concluído precisa ter NF e faturado. Sendo assim, o melhor é verificar com a sua contabilidade como deverá ser passada a NF para esse tipo de venda que não terá entrega.

4. **Se eu gero NF para a venda do Cartão Presente e também para a venda com o cupom, eu estou pagando 2 impostos?**

    O melhor é verificar com a sua contabilidade. Mas, o que eu posso dizer é: *Bem vindo ao Brasil*.

5. **Como eu crio uma especificação de produto?**

    Veja no help <https://help.vtex.com/pt/tutorial/cadastrar-especificacoes-ou-campos-de-produto--tutorials_106>

6. **Qual a linguagem do APP?**

    O APP foi desenvolvido em NODE. Pode rodar em qualquer plataforma, porém foi testada apenas no Windows 10.

7. **O APP roda em qual versão da VTEX?**

    O APP é independente de versão VTEX Legacy ou VTEX.IO porque ele roda em back-end.

8. **Como o cliente saberá o código do cupom que ele ganhou na Compra do Cartão presente?**

    A minha recomendação é que crie uma trigger no Master Data para ser disparada quando o app criar o registro na entidade PD.

    Para isso, disponilibizamos na entidade os campos necessários para o envio do e-mail como: email, firstname, giftcards e couponValue. Mas, com criatividade, todos os campos podem ser aproveitados no e-mail para o cliente.
