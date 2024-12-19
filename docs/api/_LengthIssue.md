LengthIssue
-----------

Length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `LengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'length'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`