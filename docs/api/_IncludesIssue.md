IncludesIssue
-------------

Includes issue type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`

### Definition

*   `IncludesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'includes'`
    *   `expected` `string`
    *   `requirement` `TRequirement`