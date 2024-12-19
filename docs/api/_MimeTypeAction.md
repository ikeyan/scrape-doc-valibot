MimeTypeAction
--------------

MIME type action type.

### Generics

*   `TInput` `extends Blob`
*   `TRequirement` `extends string[]`
*   `TMessage` `extends ErrorMessage<MimeTypeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MimeTypeAction` `extends BaseValidation<TInput, TInput, MimeTypeIssue<TInput, TRequirement>>`
    *   `type` `'mime_type'`
    *   `reference` `typeof mimeType`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`