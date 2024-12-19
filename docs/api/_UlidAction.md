UlidAction
----------

ULID action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UlidIssue<TInput>> | undefined`

### Definition

*   `UlidAction` `extends BaseValidation<TInput, TInput, UlidIssue<TInput>>`
    *   `type` `'ulid'`
    *   `reference` `typeof ulid`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`