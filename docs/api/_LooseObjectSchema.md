LooseObjectSchema
-----------------

Loose object schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Definition

*   `LooseObjectSchema` `extends BaseSchema<InferObjectInput<TEntries> & { [key: string]: unknown }, InferObjectOutput<TEntries> & { [key: string]: unknown }, LooseObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'loose_object'`
    *   `reference` `typeof looseObject`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`