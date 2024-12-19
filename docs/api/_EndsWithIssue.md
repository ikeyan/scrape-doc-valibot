EndsWithIssue
-------------

Ends with issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`

### Definition

*   `EndsWithIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'ends_with'`
    *   `expected` `` `"${TRequirement}"` ``
    *   `received` `` `"${string}"` ``
    *   `requirement` `TRequirement`