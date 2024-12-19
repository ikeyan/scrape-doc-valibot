SizeAction
----------

Size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<SizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `SizeAction` `extends BaseValidation<TInput, TInput, SizeIssue<TInput, TRequirement>>`
    *   `type` `'size'`
    *   `reference` `typeof size`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`