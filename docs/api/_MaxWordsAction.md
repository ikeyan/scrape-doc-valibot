MaxWordsAction
--------------

Max words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxWordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxWordsAction` `extends BaseValidation<TInput, TInput, MaxWordsIssue<TInput, TRequirement>>`
    *   `type` `'max_words'`
    *   `reference` `typeof maxWords`
    *   `expects` `` `<=${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`