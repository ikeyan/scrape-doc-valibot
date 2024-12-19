UrlAction
---------

URL action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UrlIssue<TInput>> | undefined`

### Definition

*   `UrlAction` `extends BaseValidation<TInput, TInput, UrlIssue<TInput>>`
    *   `type` `'url'`
    *   `reference` `typeof url`
    *   `expects` `null`
    *   `requirement` `(input: string) => boolean`
    *   `message` `TMessage`