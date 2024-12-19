StringSchema
------------

String schema type.

### Generics

*   `TMessage` `extends ErrorMessage | undefined`

### Definition

*   `StringSchema` `extends BaseSchema<string, string, StringIssue>`
    *   `type` `'string'`
    *   `reference` `typeof string`
    *   `expects` `'string'`
    *   `message` `TMessage`