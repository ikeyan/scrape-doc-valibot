WordsAction
-----------

Words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<WordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `WordsAction` `extends BaseValidation<TInput, TInput, WordsIssue<TInput, TRequirement>>`
    *   `type` `'words'`
    *   `reference` `typeof words`
    *   `expects` `` `${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`