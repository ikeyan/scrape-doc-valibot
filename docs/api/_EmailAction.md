EmailAction
-----------

Email action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmailIssue<TInput>> | undefined`

### Definition

*   `EmailAction` `extends BaseValidation<TInput, TInput, EmailIssue<TInput>>`
    *   `type` `'email'`
    *   `reference` `typeof email`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`