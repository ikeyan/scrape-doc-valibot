UndefinedableSchema
-------------------

Undefinedable schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, undefined>`

### Definition

*   `UndefinedableSchema` `extends BaseSchema<InferInput<TWrapped> | undefined, InferUndefinedableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'undefinedable'`
    *   `reference` `typeof undefinedable`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`