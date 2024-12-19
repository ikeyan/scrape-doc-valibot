StartsWithIssue
---------------

Starts with issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`

### Definition

*   `StartsWithIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'starts_with'`
    *   `expected` `` `"${TRequirement}"` ``
    *   `received` `` `"${string}"` ``
    *   `requirement` `TRequirement`