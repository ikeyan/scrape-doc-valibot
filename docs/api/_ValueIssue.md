ValueIssue
----------

Value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `ValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'value'`
    *   `expected` `string`
    *   `requirement` `TRequirement`