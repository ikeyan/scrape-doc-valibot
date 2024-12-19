ObjectWithRestSchemaAsync
-------------------------

Object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ObjectWithRestIssue> | undefined`

### Definition

*   `ObjectWithRestSchemaAsync` `extends BaseSchema<InferObjectInput<TEntries> & { [key: string]: InferInput<TRest> }, InferObjectOutput<TEntries> & { [key: string]: InferInput<TRest> }, ObjectWithRestIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object_with_rest'`
    *   `reference` `typeof objectWithRest`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `rest` `TRest`
    *   `message` `TMessage`