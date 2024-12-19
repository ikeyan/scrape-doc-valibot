CheckIssue
----------

Check issue type.

### Generics

*   `TInput` `extends any`

### Definition

*   `CheckIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'check'`
    *   `expected` `null`
    *   `requirement` `(input: TInput) => MaybePromise<boolean>`