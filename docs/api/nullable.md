nullable
--------

Creates a nullable schema.

    const Schema = v.nullable<TWrapped, TDefault>(wrapped, default_);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped> | never`

### Parameters

*   `wrapped` `TWrapped`
*   `default_` `TDefault`

#### Explanation

With `nullable` the validation of your schema will pass `null` inputs, and if you specify a `default_` input value, the schema will use it if the input is `null`. For this reason, the output type may differ from the input type of the schema.

> Note that `nullable` does not accept `undefined` as an input. If you want to accept `undefined` inputs, use [`optional`](optional.md), and if you want to accept `null` and `undefined` inputs, use [`nullish`](nullish.md) instead. Also, if you want to set a default output value for any invalid input, you should use [`fallback`](fallback.md) instead.

### Returns

*   `Schema` `NullableSchema<TWrapped, TDefault>`

### Examples

The following examples show how `nullable` can be used.

#### Nullable string schema

Schema that accepts `string` and `null`.

    const NullableStringSchema = v.nullable(v.string(), "I'm the default!");
    

#### Nullable date schema

Schema that accepts [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and `null`.

> By using a function as the `default_` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input is `null`.

    const NullableDateSchema = v.nullable(v.date(), () => new Date());
    

#### Nullable entry schema

Object schema with a nullable entry.

    const NullableEntrySchema = v.object({
      key: v.nullable(v.string()),
    });
    

#### Unwrap nullable schema

Use [`unwrap`](unwrap.md) to undo the effect of `nullable`.

    const NullableNumberSchema = v.nullable(v.number());
    const NumberSchema = v.unwrap(NullableNumberSchema);
    

### Related

The following APIs can be combined with `nullable`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

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
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)