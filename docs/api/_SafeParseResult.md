SafeParseResult
---------------

Safe parse result type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `SafeParseResult`
    *   `typed` `boolean`
    *   `success` `boolean`
    *   `output` `InferOutput<TSchema> | unknown`
    *   `issues` `[InferIssue<TSchema>, ...InferIssue<TSchema>[]] | undefined`