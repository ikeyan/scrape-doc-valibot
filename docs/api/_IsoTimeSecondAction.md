IsoTimeSecondAction
-------------------

ISO time second action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeSecondIssue<TInput>> | undefined`

### Definition

*   `IsoTimeSecondAction` `extends BaseValidation<TInput, TInput, IsoTimeSecondIssue<TInput>>`
    *   `type` `'iso_time_second'`
    *   `reference` `typeof isoTimeSecond`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`