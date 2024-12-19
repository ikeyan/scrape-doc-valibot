mimeType
--------

Creates a [MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) validation action.

    const Action = v.mimeType<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends Blob`
*   `TRequirement` `extends string[]`
*   `TMessage` `extends ErrorMessage<MimeTypeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `mimeType` you can validate the MIME type of a blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MimeTypeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `mimeType` can be used.

#### Image schema

Schema to validate an image file.

    const ImageSchema = v.pipe(
      v.blob(),
      v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.')
    );
    

### Related

The following APIs can be combined with `mimeType`.

#### Schemas

*   [`any`](any.md),
*   [`blob`](blob.md),
*   [`custom`](custom.md),
*   [`file`](file.md),
*   [`instance`](instance.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)