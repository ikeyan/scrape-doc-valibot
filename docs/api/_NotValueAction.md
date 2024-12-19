NotValueAction
--------------

Not value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<NotValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotValueAction` `extends BaseValidation<TInput, TInput, NotValueIssue<TInput, TRequirement>>`
    *   `type` `'not_value'`
    *   `reference` `typeof notValue`
    *   `expects` `` `!${string}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`