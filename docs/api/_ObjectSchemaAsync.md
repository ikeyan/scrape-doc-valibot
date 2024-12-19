ObjectSchemaAsync
-----------------

Object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<ObjectIssue> | undefined`

### Definition

*   `ObjectSchemaAsync` `extends BaseSchemaAsync<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, ObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object'`
    *   `reference` `typeof objectAsync`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`