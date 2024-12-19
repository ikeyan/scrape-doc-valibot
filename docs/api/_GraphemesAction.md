GraphemesAction
---------------

Graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<GraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `GraphemesAction` `extends BaseValidation<TInput, TInput, GraphemesIssue<TInput, TRequirement>>`
    *   `type` `'graphemes'`
    *   `reference` `typeof graphemes`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`