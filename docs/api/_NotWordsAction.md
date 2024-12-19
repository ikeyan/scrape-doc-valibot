NotWordsAction
--------------

Not words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotWordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotWordsAction` `extends BaseValidation<TInput, TInput, NotWordsIssue<TInput, TRequirement>>`
    *   `type` `'not_words'`
    *   `reference` `typeof notWords`
    *   `expects` `` `!${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`