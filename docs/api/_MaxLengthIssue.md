MaxLengthIssue
--------------

Max length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `MaxLengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_length'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`