NotGraphemesAction
------------------

Not graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotGraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotGraphemesAction` `extends BaseValidation<TInput, TInput, NotGraphemesIssue<TInput, TRequirement>>`
    *   `type` `'not_graphemes'`
    *   `reference` `typeof notGraphemes`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`