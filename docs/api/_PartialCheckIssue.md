PartialCheckIssue
-----------------

Partial check issue type.

### Generics

*   `TInput` `extends PartialInput`

### Definition

*   `PartialCheckIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'partial_check'`
    *   `expected` `null`
    *   `requirement` `(input: TInput) => MaybePromise<boolean>`