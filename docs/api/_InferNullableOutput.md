InferNullableOutput
-------------------

Infer nullable output type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null>`

### Definition

*   `InferNullableOutput` `[TDefault] extends [never] ? InferOutput<TWrapped> | null : NonNullable<InferOutput<TWrapped>> | Extract<DefaultValue<TDefault>, null>`