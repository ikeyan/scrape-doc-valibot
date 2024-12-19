date
----

Creates a date schema.

    const Schema = v.date<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<DateIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `date` you can validate the data type of the input. If the input is not a date, you can use `message` to customize the error message.

### Returns

*   `Schema` `DateSchema<TMessage>`

### Examples

The following examples show how `date` can be used.

#### Force minimum

Schema that forces a minimum date of today.

    const MinDateSchema = v.pipe(v.date(), v.toMinValue(new Date()));
    

#### Validate range

Schema that validates a date in a range.

    const DateRangeSchema = v.pipe(
      v.date(),
      v.minValue(new Date(2019, 0, 1)),
      v.maxValue(new Date(2020, 0, 1))
    );
    

### Related

The following APIs can be combined with `date`.

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