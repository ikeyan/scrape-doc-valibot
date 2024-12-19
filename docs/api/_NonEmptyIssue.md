NonEmptyIssue
-------------

Non empty issue type.

### Generics

*   `TInput` `extends LengthInput`

### Definition

*   `NonEmptyIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'non_empty'`
    *   `expected` `'!0'`
    *   `received` `'0'`