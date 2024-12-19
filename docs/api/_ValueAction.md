ValueAction
-----------

Value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<ValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `ValueAction` `extends BaseValidation<TInput, TInput, ValueIssue<TInput, TRequirement>>`
    *   `type` `'value'`
    *   `reference` `typeof value`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`