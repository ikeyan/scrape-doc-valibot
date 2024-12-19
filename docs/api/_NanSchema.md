NanSchema
---------

NaN schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NanIssue> | undefined`

### Definition

*   `NanSchema` `extends BaseSchema<number, number, NanIssue>`
    *   `type` `'nan'`
    *   `reference` `readonly nan`
    *   `expects` `'NaN'`
    *   `message` `TMessage`