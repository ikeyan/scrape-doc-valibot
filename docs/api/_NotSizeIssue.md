NotSizeIssue
------------

Not size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `NotSizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_size'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`