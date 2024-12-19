InferNullishOutput
------------------

Infer nullish output type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null | undefined>`

### Definition

*   `InferNullishOutput` `[TDefault] extends [never] ? InferOutput<TWrapped> | null | undefined : NonNullish<InferOutput<TWrapped>> | Extract<DefaultValue<TDefault>, null | undefined>`