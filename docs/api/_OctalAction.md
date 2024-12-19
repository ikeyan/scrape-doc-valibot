OctalAction
-----------

Octal action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<OctalIssue<TInput>> | undefined`

### Definition

*   `OctalAction` `extends BaseValidation<TInput, TInput, OctalIssue<TInput>>`
    *   `type` `'octal'`
    *   `reference` `typeof octal`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`