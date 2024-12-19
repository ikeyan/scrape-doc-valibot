BooleanSchema
-------------

Boolean schema type.

### Generics

*   `TMessage` `extends ErrorMessage<BooleanIssue> | undefined`

### Definition

*   `BooleanSchema` `extends BaseSchema<boolean, boolean, BooleanIssue>`
    *   `type` `'boolean'`
    *   `reference` `typeof boolean`
    *   `expects` `'boolean'`
    *   `message` `TMessage`