MinLengthIssue
--------------

Min length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `MinLengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_length'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`