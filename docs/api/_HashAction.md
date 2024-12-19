HashAction
----------

Hash action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HashIssue<TInput>> | undefined`

### Definition

*   `HashAction` `extends BaseValidation<TInput, TInput, HashIssue<TInput>>`
    *   `type` `'hash'`
    *   `reference` `typeof hash`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`