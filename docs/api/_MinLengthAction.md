MinLengthAction
---------------

Min length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinLengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinLengthAction` `extends BaseValidation<TInput, TInput, MinLengthIssue<TInput, TRequirement>>`
    *   `type` `'min_length'`
    *   `reference` `typeof minLength`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`