NullishSchema
-------------

Nullish schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, null | undefined>`

### Definition

*   `Nullish` `extends BaseSchema<InferInput<TWrapped> | null | undefined, InferNullishOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullish'`
    *   `reference` `typeof nullish`
    *   `expects` `` `(${TWrapped['expects']} | null | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`