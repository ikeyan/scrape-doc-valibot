ParserAsync
-----------

The parser async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `ParserAsync`
    *   `(input: unknown) => Promise<InferOutput<TSchema>>`
    *   `schema` `TSchema`
    *   `config` `TConfig`