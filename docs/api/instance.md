instance
--------

Creates an instance schema.

    const Schema = v.instance<TClass, TMessage>(class_, message);
    

### Generics

*   `TClass` `extends Class`
*   `TMessage` `extends ErrorMessage<InstanceIssue> | undefined`

### Parameters

*   `class_` `TClass`
*   `message` `TMessage`

#### Explanation

With `instance` you can validate the data type of the input. If the input is not an instance of the specified `class_`, you can use `message` to customize the error message.

### Returns

*   `Schema` `InstanceSchema<TClass, TMessage>`

### Examples

The following examples show how `instance` can be used.

#### Error schema

Schema to validate an `Error` instance.

    const ErrorSchema = v.instance(Error, 'Error instance required.');
    

#### File schema

Schema to validate an `File` instance.

    const FileSchema = v.pipe(
      v.instance(File),
      v.mimeType(['image/jpeg', 'image/png']),
      v.maxSize(1024 * 1024 * 10)
    );
    

### Related

The following APIs can be combined with `instance`.

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
*   [`maxValue`](maxValue.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)