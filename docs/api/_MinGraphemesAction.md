MinGraphemesAction
------------------

Min graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinGraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinGraphemesAction` `extends BaseValidation<TInput, TInput, MinGraphemesIssue<TInput, TRequirement>>`
    *   `type` `'min_graphemes'`
    *   `reference` `typeof minGraphemes`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`