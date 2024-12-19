ObjectSchema
------------

Object schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<ObjectIssue> | undefined`

### Definition

*   `ObjectSchema` `extends BaseSchema<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, ObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object'`
    *   `reference` `typeof object`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`