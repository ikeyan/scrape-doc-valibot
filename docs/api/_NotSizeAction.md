NotSizeAction
-------------

Not size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotSizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotSizeAction` `extends BaseValidation<TInput, TInput, NotSizeIssue<TInput, TRequirement>>`
    *   `type` `'not_size'`
    *   `reference` `typeof notSize`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`