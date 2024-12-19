NonOptionalSchema
-----------------

Non optional schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Definition

*   `NonOptionalSchema` `extends BaseSchema<InferNonOptionalInput<TWrapped>, InferNonOptionalOutput<TWrapped>, NonOptionalIssue | InferNonOptionalIssue<TWrapped>>`
    *   `type` `'non_optional'`
    *   `reference` `typeof nonOptional`
    *   `expects` `'!undefined'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`