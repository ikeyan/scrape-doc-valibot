CreditCardAction
----------------

Credit card action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<CreditCardIssue<TInput>> | undefined`

### Definition

*   `CreditCardAction` `extends BaseValidation<TInput, TInput, CreditCardIssue<TInput>>`
    *   `type` `'credit_card'`
    *   `reference` `typeof creditCard`
    *   `expects` `null`
    *   `requirement` `(input: string) => boolean`
    *   `message` `TMessage`