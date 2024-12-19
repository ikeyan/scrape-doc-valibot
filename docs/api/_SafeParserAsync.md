SafeParserAsync
---------------

The safe parser async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `SafeParserAsync`
    *   `(input: unknown) => Promise<SafeParseResult<TSchema>>`
    *   `schema` `TSchema`
    *   `config` `TConfig`