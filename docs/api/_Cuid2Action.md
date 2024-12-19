Cuid2Action
-----------

Cuid2 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Cuid2Issue<TInput>> | undefined`

### Definition

*   `Cuid2Action` `extends BaseValidation<TInput, TInput, Cuid2Issue<TInput>>`
    *   `type` `'cuid2'`
    *   `reference` `typeof cuid2`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`