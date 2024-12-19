Mac64Action
-----------

64-bit MAC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac64Issue<TInput>> | undefined`

### Definition

*   `Mac64Action` `extends BaseValidation<TInput, TInput, Mac64Issue<TInput>>`
    *   `type` `'mac64'`
    *   `reference` `typeof mac64`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`