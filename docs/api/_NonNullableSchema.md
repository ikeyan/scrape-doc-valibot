NonNullableSchema
-----------------

Non nullable schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullableIssue> | undefined`

### Definition

*   `NonNullableSchema` `extends BaseSchema<InferNonNullableInput<TWrapped>, InferNonNullableOutput<TWrapped>, NonNullableIssue | InferNonNullableIssue<TWrapped>>`
    *   `type` `'non_nullable'`
    *   `reference` `typeof nonNullable`
    *   `expects` `'!null'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`