LiteralSchema
-------------

Literal schema type.

### Generics

*   `TLiteral` `extends Literal`
*   `TMessage` `extends ErrorMessage<LiteralIssue> | undefined`

### Definition

*   `LiteralSchema` `extends BaseSchema<TLiteral, TLiteral, LiteralIssue>`
    *   `type` `'literal'`
    *   `reference` `typeof literal`
    *   `literal` `TLiteral`
    *   `message` `TMessage`