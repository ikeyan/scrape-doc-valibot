CheckAction
-----------

Check action type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CheckIssue<TInput>> | undefined`

### Definition

*   `CheckAction` `extends BaseValidation<TInput, TInput, CheckIssue<TInput>>`
    *   `type` `'check'`
    *   `reference` `typeof check`
    *   `expects` `null`
    *   `requirement` `(input: TInput) => boolean`
    *   `message` `TMessage`