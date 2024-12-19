MaxLengthAction
---------------

Max length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxLengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxLengthAction` `extends BaseValidation<TInput, TInput, MaxLengthIssue<TInput, TRequirement>>`
    *   `type` `'max_length'`
    *   `reference` `typeof maxLength`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`