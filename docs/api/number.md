number
------

Creates a number schema.

    const Schema = v.number<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<NumberIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `number` you can validate the data type of the input. If the input is not a number, you can use `message` to customize the error message.

### Returns

*   `Schema` `NumberSchema<TMessage>`

### Examples

The following examples show how `number` can be used.

#### Integer schema

Schema to validate an integer.

    const IntegerSchema = v.pipe(v.number(), v.integer());
    

#### Force minimum

Schema that forces a minimum number of 10.

    const MinNumberSchema = v.pipe(v.number(), v.toMinValue(10));
    

#### Validate range

Schema that validates a number in a range.

    const NumberRangeSchema = v.pipe(v.number(), v.minValue(10), v.maxValue(20));
    

### Related

The following APIs can be combined with `number`.

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
*   [`finite`](finite.md),
*   [`integer`](integer.md),
*   [`maxValue`](maxValue.md),
*   [`metadata`](metadata.md),
*   [`minValue`](minValue.md),
*   [`multipleOf`](multipleOf.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`safeInteger`](safeInteger.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)