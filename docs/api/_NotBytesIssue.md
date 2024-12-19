NotBytesIssue
-------------

Not bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `NotBytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_bytes'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`