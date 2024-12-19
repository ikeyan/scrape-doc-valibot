MinSizeAction
-------------

Min size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinSizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinSizeAction` `extends BaseValidation<TInput, TInput, MinSizeIssue<TInput, TRequirement>>`
    *   `type` `'min_size'`
    *   `referece` `typeof minSize`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`