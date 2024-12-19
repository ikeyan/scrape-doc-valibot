MaxBytesIssue
-------------

Max bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MaxBytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_bytes'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`