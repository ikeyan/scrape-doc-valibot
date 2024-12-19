BlobSchema
----------

Blob schema type.

### Generics

*   `TMessage` `extends ErrorMessage<BlobIssue> | undefined`

### Definition

*   `BlobSchema` `extends BaseSchema<Blob, Blob, BlobIssue>`
    *   `type` `'blob'`
    *   `reference` `typeof blob`
    *   `expects` `'Blob'`
    *   `message` `BlobIssue`