EmojiAction
-----------

Emoji action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmojiIssue<TInput>> | undefined`

### Definition

*   `EmojiAction` `extends BaseValidation<TInput, TInput, EmojiIssue<TInput>>`
    *   `type` `'emoji'`
    *   `reference` `typeof emoji`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`