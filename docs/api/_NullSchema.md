NullSchema
----------

Null schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NullIssue> | undefined`

### Definition

*   `NullSchema` `extends BaseSchema<null, null, NullIssue>`
    *   `type` `'null'`
    *   `reference` `typeof null`
    *   `expects` `'null'`
    *   `message` `TMessage`