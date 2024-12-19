FileSchema
----------

File schema type.

### Generics

*   `TMessage` `extends ErrorMessage<FileIssue> | undefined`

### Definition

*   `FileSchema` `extends BaseSchema<File, File, FileIssue>`
    *   `type` `'file'`
    *   `reference` `typeof file`
    *   `expects` `'File'`
    *   `message` `TMessage`