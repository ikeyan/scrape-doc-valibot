UndefinedSchema
---------------

Undefined schema type.

### Generics

*   `TMessage` `extends ErrorMessage<UndefinedIssue> | undefined`

### Definition

*   `UndefinedSchema` `extends BaseSchema<undefined, undefined, UndefinedIssue>`
    *   `type` `'undefined'`
    *   `reference` `typeof undefined`
    *   `expects` `'undefined'`
    *   `message` `TMessage`