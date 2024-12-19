NumberSchema
------------

Number schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NumberIssue> | undefined`

### Definition

*   `NumberSchema` `extends BaseSchema<number, number, NumberIssue>`
    *   `type` `'number'`
    *   `reference` `typeof number`
    *   `expects` `'number'`
    *   `message` `TMessage`