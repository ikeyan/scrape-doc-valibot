NotGraphemesIssue
-----------------

Not graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `NotGraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_graphemes'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`