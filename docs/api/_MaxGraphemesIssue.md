MaxGraphemesIssue
-----------------

Max graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MaxGraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_graphemes'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`