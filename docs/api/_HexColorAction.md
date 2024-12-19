HexColorAction
--------------

Hex color action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexColorIssue<TInput>> | undefined`

### Definition

*   `HexColorAction` `extends BaseValidation<TInput, TInput, HexColorIssue<TInput>>`
    *   `type` `'hex_color'`
    *   `reference` `typeof hexColor`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`