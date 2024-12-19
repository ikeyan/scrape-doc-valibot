MacAction
---------

MAC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<MacIssue<TInput>> | undefined`

### Definition

*   `MacAction` `extends BaseValidation<TInput, TInput, MacIssue<TInput>>`
    *   `type` `'mac'`
    *   `reference` `typeof mac`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`