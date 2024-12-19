ExcludesAction
--------------

Excludes action type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`
*   `TMessage` `extends ErrorMessage<ExcludesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `ExcludesAction` `extends BaseValidation<TInput, TInput, ExcludesIssue<TInput, TRequirement>>`
    *   `type` `'excludes'`
    *   `referece` `typeof excludes`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`