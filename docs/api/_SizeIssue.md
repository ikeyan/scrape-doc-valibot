SizeIssue
---------

Size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `SizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'size'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`