Mac48Action
-----------

48-bit MAC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac48Issue<TInput>> | undefined`

### Definition

*   `Mac48Action` `extends BaseValidation<TInput, TInput, Mac48Issue<TInput>>`
    *   `type` `'mac48'`
    *   `reference` `typeof mac48`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`