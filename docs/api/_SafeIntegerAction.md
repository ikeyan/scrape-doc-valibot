SafeIntegerAction
-----------------

Safe integer action type.

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<SafeIntegerIssue<TInput>> | undefined`

### Definition

*   `SafeIntegerAction` `extends BaseValidation<TInput, TInput, SafeIntegerIssue<TInput>>`
    *   `type` `'safe_integer'`
    *   `reference` `typeof safeInteger`
    *   `expects` `null`
    *   `requirement` `(input: number) => boolean`
    *   `message` `TMessage`