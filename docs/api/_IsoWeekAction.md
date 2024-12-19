IsoWeekAction
-------------

ISO week action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoWeekIssue<TInput>> | undefined`

### Definition

*   `IsoWeekAction` `extends BaseValidation<TInput, TInput, IsoWeekIssue<TInput>>`
    *   `type` `'iso_week'`
    *   `reference` `typeof isoWeek`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`