EndsWithAction
--------------

Ends with action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<EndsWithIssue<TInput, TRequirement>> | undefined`

### Definition

*   `EndsWithAction` `extends BaseValidation<TInput, TInput, EndsWithIssue<TInput, TRequirement>>`
    *   `type` `'ends_with'`
    *   `reference` `typeof endsWith`
    *   `expects` `` `"${TRequirement}"` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`