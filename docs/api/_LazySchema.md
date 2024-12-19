LazySchema
----------

Lazy schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `LazySchema` `extends BaseSchema<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>>`
    *   `type` `'lazy'`
    *   `reference` `typeof lazy`
    *   `expects` `'unknown'`
    *   `getter` `(input: unknown) => TWrapped`