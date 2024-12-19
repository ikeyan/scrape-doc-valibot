GraphemesIssue
--------------

Graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `GraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'graphemes'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`