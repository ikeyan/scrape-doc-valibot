MaxValueAction
--------------

Max value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<MaxValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxValueAction` `extends BaseValidation<TInput, TInput, MaxValueIssue<TInput, TRequirement>>`
    *   `type` `'max_value'`
    *   `reference` `typeof maxValue`
    *   `expects` `` `<=${string}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`