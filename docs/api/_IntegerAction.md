IntegerAction
-------------

Integer action type.

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<IntegerIssue<TInput>> | undefined`

### Definition

*   `IntegerAction` `extends BaseValidation<TInput, TInput, IntegerIssue<TInput>>`
    *   `type` `'integer'`
    *   `reference` `typeof integer`
    *   `expects` `null`
    *   `requirement` `(input: number) => boolean`
    *   `message` `TMessage`