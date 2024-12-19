VoidSchema
----------

Void schema type.

### Generics

*   `TMessage` `extends ErrorMessage<VoidIssue> | undefined`

### Definition

*   `VoidSchema` `extends BaseSchema<void, void, VoidIssue>`
    *   `type` `'void'`
    *   `reference` `typeof void`
    *   `expects` `'void'`
    *   `message` `TMessage`