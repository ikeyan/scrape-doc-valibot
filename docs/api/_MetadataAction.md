MetadataAction
--------------

Metadata action type.

### Generics

*   `TInput` `extends any`
*   `TMetadata` `extends Record<string, unknown>`

### Definition

*   `MetadataAction` `extends BaseMetadata<TInput>`
    *   `type` `'metadata'`
    *   `reference` `typeof metadata`
    *   `metadata_` `TMetadata`