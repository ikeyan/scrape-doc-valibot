SchemaWithFallbackAsync
-----------------------

Schema with fallback async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends FallbackAsync<TSchema>`

### Definition

*   `SchemaWithFallbackAsync` `extends Omit<TSchema, 'async' | '~validate'>`
    *   `fallback` `TFallback`
    *   `async` `true`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>>`