BicAction
---------

BIC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<BicIssue<TInput>> | undefined`

### Definition

*   `BicAction` `extends BaseValidation<TInput, TInput, BicIssue<TInput>>`
    *   `type` `'bic'`
    *   `reference` `typeof bic`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`