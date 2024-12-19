DigitsAction
------------

Digits action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DecimalIssue<TInput>> | undefined`

### Definition

*   `DigitsAction` `extends BaseValidation<TInput, TInput, DigitsIssue<TInput>>`
    *   `type` `'digits'`
    *   `reference` `typeof digits`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`