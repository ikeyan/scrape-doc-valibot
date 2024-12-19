IncludesAction
--------------

Includes action type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`
*   `TMessage` `extends ErrorMessage<IncludesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `IncludesAction` `extends BaseValidation<TInput, TInput, IncludesIssue<TInput, TRequirement>>`
    *   `type` `'includes'`
    *   `reference` `typeof includes`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`