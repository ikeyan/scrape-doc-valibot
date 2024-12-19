IsoDateAction
-------------

ISO date action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateIssue<TInput>> | undefined`

### Definition

*   `IsoDateAction` `extends BaseValidation<TInput, TInput, IsoDateIssue<TInput>>`
    *   `type` `'iso_date'`
    *   `reference` `typeof isoDate`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`