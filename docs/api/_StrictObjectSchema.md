StrictObjectSchema
------------------

Strict object schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<StrictObjectIssue> | undefined`

### Definition

*   `StrictObjectSchema` `extends BaseSchema<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, StrictObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'strict_object'`
    *   `reference` `typeof strictObject`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`