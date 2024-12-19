NonNullishSchema
----------------

Non nullish schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullishIssue> | undefined`

### Definition

*   `NonNullishSchema` `extends BaseSchema<InferNonNullishInput<TWrapped>, InferNonNullishOutput<TWrapped>, NonNullishIssue | InferNonNullishIssue<TWrapped>>`
    *   `type` `'non_nullish'`
    *   `reference` `typeof nonNullish`
    *   `expects` `'(!null & !undefined)'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`