MinWordsAction
--------------

Min words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinWordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinWordsAction` `extends BaseValidation<TInput, TInput, MinWordsIssue<TInput, TRequirement>>`
    *   `type` `'min_words'`
    *   `reference` `typeof minWords`
    *   `expects` `` `>=${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`