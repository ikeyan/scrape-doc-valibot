NotLengthIssue
--------------

Not length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `NotLengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_length'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`