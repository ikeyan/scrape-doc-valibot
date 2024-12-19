Base64Action
------------

Base64 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Base64Issue<TInput>> | undefined`

### Definition

*   `Base64Action` `extends BaseValidation<TInput, TInput, Base64Issue<TInput>>`
    *   `type` `'base64'`
    *   `reference` `typeof base64`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`