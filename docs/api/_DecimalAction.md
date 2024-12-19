DecimalAction
-------------

Decimal action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DecimalIssue<TInput>> | undefined`

### Definition

*   `DecimalAction` `extends BaseValidation<TInput, TInput, DecimalIssue<TInput>>`
    *   `type` `'decimal'`
    *   `reference` `typeof decimal`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`