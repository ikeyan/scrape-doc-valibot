RegexAction
-----------

Regex action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<RegexIssue<TInput>> | undefined`

### Definition

*   `RegexAction` `extends BaseValidation<TInput, TInput, RegexIssue<TInput>>`
    *   `type` `'regex'`
    *   `reference` `typeof regex`
    *   `expects` `string`
    *   `requirement` `RegExp`
    *   `message` `TMessage`