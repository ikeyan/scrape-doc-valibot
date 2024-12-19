MaxValueIssue
-------------

Max value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `MaxValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_value'`
    *   `expected` `` `<=${string}` ``
    *   `requirement` `TRequirement`