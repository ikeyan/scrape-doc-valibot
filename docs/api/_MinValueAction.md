MinValueAction
--------------

Min value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<MinValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinValueAction` `extends BaseValidation<TInput, TInput, MinValueIssue<TInput, TRequirement>>`
    *   `type` `'min_value'`
    *   `reference` `typeof minValue`
    *   `expects` `` `>=${string}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`