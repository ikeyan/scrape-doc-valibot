NotBytesAction
--------------

Not bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotBytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotBytesAction` `extends BaseValidation<TInput, TInput, NotBytesIssue<TInput, TRequirement>>`
    *   `type` `'not_bytes'`
    *   `reference` `typeof notBytes`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`