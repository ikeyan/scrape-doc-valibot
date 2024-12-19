NotLengthAction
---------------

Not length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotLengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotLengthAction` `extends BaseValidation<TInput, TInput, NotLengthIssue<TInput, TRequirement>>`
    *   `type` `'not_length'`
    *   `reference` `typeof notLength`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`