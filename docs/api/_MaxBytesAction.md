MaxBytesAction
--------------

Max bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxBytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxBytesAction` `extends BaseValidation<TInput, TInput, MaxBytesIssue<TInput, TRequirement>>`
    *   `type` `'max_bytes'`
    *   `reference` `typeof maxBytes`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`