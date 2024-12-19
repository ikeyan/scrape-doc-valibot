MinBytesAction
--------------

Min bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinBytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinBytesAction` `extends BaseValidation<TInput, TInput, MinBytesIssue<TInput, TRequirement>>`
    *   `type` `'min_bytes'`
    *   `reference` `typeof minBytes`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`