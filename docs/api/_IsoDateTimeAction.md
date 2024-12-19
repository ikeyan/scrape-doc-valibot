IsoDateTimeAction
-----------------

ISO date time action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined`

### Definition

*   `IsoDateTimeAction` `extends BaseValidation<TInput, TInput, IsoDateTimeIssue<TInput>>`
    *   `type` `'iso_date_time'`
    *   `reference` `typeof isoDateTime`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`