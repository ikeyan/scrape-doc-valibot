FiniteAction
------------

Finite action type.

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<FiniteIssue<TInput>> | undefined`

### Definition

*   `FiniteAction` `extends BaseValidation<TInput, TInput, FiniteIssue<TInput>>`
    *   `type` `'finite'`
    *   `reference` `typeof finite`
    *   `expects` `null`
    *   `requirement` `(input: number) => boolean`
    *   `message` `TMessage`