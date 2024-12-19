NotValueIssue
-------------

Not value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `NotValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_value'`
    *   `expected` `` `!${string}` ``
    *   `requirement` `TRequirement`