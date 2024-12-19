MaxSizeAction
-------------

Max size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxSizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxSizeAction` `extends BaseValidation<TInput, TInput, MaxSizeIssue<TInput, TRequirement>>`
    *   `type` `'max_size'`
    *   `reference` `typeof maxSize`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`