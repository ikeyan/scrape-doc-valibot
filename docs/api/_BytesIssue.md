BytesIssue
----------

Bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `BytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'bytes'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`