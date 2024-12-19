IsoTimeAction
-------------

ISO time action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeIssue<TInput>> | undefined`

### Definition

*   `IsoTimeAction` `extends BaseValidation<TInput, TInput, IsoTimeIssue<TInput>>`
    *   `type` `'iso_time'`
    *   `reference` `typeof isoTime`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`