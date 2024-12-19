file
----

Creates a file schema.

> The `File` class is not available by default in Node.js v18 and below.

    const Schema = v.file<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<FileIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `file` you can validate the data type of the input. If the input is not a file, you can use `message` to customize the error message.

### Returns

*   `Schema` `FileSchema<TMessage>`

### Examples

The following examples show how `file` can be used.

#### Image schema

Schema to validate an image.

    const ImageSchema = v.pipe(
      v.file('Please select an image file.'),
      v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
      v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
    );
    

### Related

The following APIs can be combined with `file`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)