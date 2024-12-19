SymbolSchema
------------

Symbol schema type.

### Generics

*   `TMessage` `extends ErrorMessage | undefined`

### Definition

*   `SymbolSchema` `extends BaseSchema<symbol, symbol, SymbolIssue>`
    *   `type` `'symbol'`
    *   `reference` `typeof symbol`
    *   `expects` `'symbol'`
    *   `message` `TMessage`