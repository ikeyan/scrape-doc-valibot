ImeiAction
----------

Imei action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<ImeiIssue<TInput>> | undefined`

### Definition

*   `ImeiAction` `extends BaseValidation<TInput, TInput, ImeiIssue<TInput>>`
    *   `type` `'imei'`
    *   `reference` `typeof imei`
    *   `expects` `null`
    *   `requirement` `(input: string) => boolean`
    *   `message` `TMessage`