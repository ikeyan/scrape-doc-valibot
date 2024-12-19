OptionalSchema
--------------

Optional schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, undefined>`

### Definition

*   `OptionalSchema` `extends BaseSchema<InferInput<TWrapped> | undefined, InferOptionalOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'optional'`
    *   `reference` `typeof optional`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`