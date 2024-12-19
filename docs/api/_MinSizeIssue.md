MinSizeIssue
------------

Min size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `MinSizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_size'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`