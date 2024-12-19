StartsWithAction
----------------

Starts with action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<StartsWithIssue<TInput, TRequirement>> | undefined`

### Definition

*   `StartsWithAction` `extends BaseValidation<TInput, TInput, StartsWithIssue<TInput, TRequirement>>`
    *   `type` `'starts_with'`
    *   `reference` `typeof startsWith`
    *   `expects` `` `"${TRequirement}"` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`