CheckActionAsync
----------------

Check action async type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CheckIssue<TInput>> | undefined`

### Definition

*   `CheckActionAsync` `extends BaseValidationAsync<TInput, TInput, CheckIssue<TInput>>`
    *   `type` `'check'`
    *   `reference` `typeof checkAsync`
    *   `expects` `null`
    *   `requirement` `(input: TInput) => MaybePromise<boolean>`
    *   `message` `TMessage`