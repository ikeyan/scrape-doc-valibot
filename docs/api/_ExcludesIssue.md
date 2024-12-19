ExcludesIssue
-------------

Excludes issue type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`

### Definition

*   `ExcludesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'excludes'`
    *   `expected` `string`
    *   `requirement` `TRequirement`