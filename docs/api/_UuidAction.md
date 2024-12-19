UuidAction
----------

UUID action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UuidIssue<TInput>> | undefined`

### Definition

*   `UuidAction` `extends BaseValidation<TInput, TInput, UuidIssue<TInput>>`
    *   `type` `'uuid'`
    *   `reference` `typeof uuid`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`