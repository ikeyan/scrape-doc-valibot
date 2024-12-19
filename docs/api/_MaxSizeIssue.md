MaxSizeIssue
------------

Max size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `MaxSizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_size'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`