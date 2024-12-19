UnionSchema
-----------

Union schema type.

### Generics

*   `TOptions` `extends UnionOptions`
*   `TMessage` `extends ErrorMessage<UnionIssue<InferIssue[number]>> | undefined`

### Definition

*   `UnionSchema` `extends BaseSchema<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, UnionIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>>`
    *   `type` `'union'`
    *   `reference` `typeof union`
    *   `options` `TOptions`
    *   `message` `TMessage`