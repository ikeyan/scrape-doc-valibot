IsoTimestampAction
------------------

ISO timestamp action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimestampIssue<TInput>> | undefined`

### Definition

*   `IsoTimestampAction` `extends BaseValidation<TInput, TInput, IsoTimestampIssue<TInput>>`
    *   `type` `'iso_timestamp'`
    *   `reference` `typeof isoTimestamp`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`