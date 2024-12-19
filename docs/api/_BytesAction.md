BytesAction
-----------

Bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<BytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `BytesAction` `extends BaseValidation<TInput, TInput, BytesIssue<TInput, TRequirement>>`
    *   `type` `'bytes'`
    *   `reference` `typeof bytes`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`