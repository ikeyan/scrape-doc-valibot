LooseObjectSchemaAsync
----------------------

Loose object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Definition

*   `LooseObjectSchemaAsync` `extends BaseSchemaAsync<InferObjectInput<TEntries> & { [key: string]: unknown }, InferObjectOutput<TEntries> & { [key: string]: unknown }, LooseObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'loose_object'`
    *   `reference` `typeof looseObjectAsync`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`