BigintSchema
------------

Bigint schema type.

### Generics

*   `TMessage` `extends ErrorMessage<BigintIssue> | undefined`

### Definition

*   `BigintSchema` `extends BaseSchema<bigint, bigint, BigintIssue>`
    *   `type` `'bigint'`
    *   `reference` `typeof bigint`
    *   `expects` `'bigint'`
    *   `message` `TMessage`