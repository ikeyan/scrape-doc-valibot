MaxGraphemesAction
------------------

Max graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxGraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxGraphemesAction` `extends BaseValidation<TInput, TInput, MaxGraphemesIssue<TInput, TRequirement>>`
    *   `type` `'max_graphemes'`
    *   `reference` `typeof maxGraphemes`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`