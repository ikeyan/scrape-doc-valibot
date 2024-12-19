StrictObjectSchemaAsync
-----------------------

Strict object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<StrictObjectIssue> | undefined`

### Definition

*   `StrictObjectSchemaAsync` `extends BaseSchemaAsync<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, StrictObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'strict_object'`
    *   `reference` `typeof strictObjectAsync`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`