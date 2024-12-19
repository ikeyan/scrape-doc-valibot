boolean
-------

Creates a boolean schema.

    const Schema = v.boolean<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<BooleanIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `boolean` you can validate the data type of the input. If the input is not a boolean, you can use `message` to customize the error message.

> Instead of using a [`pipe`](pipe.md) to force `true` or `false` as a value, in most cases it makes more sense to use [`literal`](literal.md) for better typing.

### Returns

*   `Schema` `BooleanSchema<TMessage>`

### Examples

The following examples show how `boolean` can be used.

#### Custom message

Boolean schema with a custom error message.

    const BooleanSchema = v.boolean('A boolean is required');
    

### Related

The following APIs can be combined with `boolean`.

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
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`minValue`](minValue.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)