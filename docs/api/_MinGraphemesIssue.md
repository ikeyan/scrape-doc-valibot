MinGraphemesIssue
-----------------

Min graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MinGraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_graphemes'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`