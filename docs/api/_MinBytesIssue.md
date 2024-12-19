MinBytesIssue
-------------

Min bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MinBytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_bytes'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`