InferOptionalOutput
-------------------

Infer optional output type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, undefined>`

### Definition

*   `InferOptionalOutput` `[TDefault] extends [never] ? InferOutput<TWrapped> | undefined : NonOptional<InferOutput<TWrapped>> | Extract<DefaultValue<TDefault>, undefined>`