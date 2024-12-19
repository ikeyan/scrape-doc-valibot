HexadecimalAction
-----------------

Hexadecimal action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexadecimalIssue<TInput>> | undefined`

### Definition

*   `HexadecimalAction` `extends BaseValidation<TInput, TInput, HexadecimalIssue<TInput>>`
    *   `type` `'hexadecimal'`
    *   `reference` `typeof hexadecimal`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`