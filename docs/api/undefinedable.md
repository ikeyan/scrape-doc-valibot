undefinedable
-------------

Creates an undefinedable schema.

    const Schema = v.undefinedable<TWrapped, TDefault>(wrapped, default_);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped> | never`

### Parameters

*   `wrapped` `TWrapped`
*   `default_` `TDefault`

#### Explanation

With `undefinedable` the validation of your schema will pass `undefined` inputs, and if you specify a `default_` input value, the schema will use it if the input is `undefined`. For this reason, the output type may differ from the input type of the schema.

> `undefinedable` behaves exactly the same as [`optional`](optional.md) at runtime. The only difference is the input and output type when used for object entries. While [`optional`](optional.md) adds a question mark to the key, `undefinedable` does not.

> Note that `undefinedable` does not accept `null` as an input. If you want to accept `null` inputs, use [`nullable`](nullable.md), and if you want to accept `null` and `undefined` inputs, use [`nullish`](nullish.md) instead. Also, if you want to set a default output value for any invalid input, you should use [`fallback`](fallback.md) instead.

### Returns

*   `Schema` `UndefinedableSchema<TWrapped, TDefault>`

### Examples

The following examples show how `undefinedable` can be used.

#### Undefinedable string schema

Schema that accepts `string` and `undefined`.

    const UndefinedableStringSchema = v.undefinedable(
      v.string(),
      "I'm the default!"
    );
    

#### Undefinedable date schema

Schema that accepts [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and `undefined`.

> By using a function as the `default_` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input is `undefined`.

    const UndefinedableDateSchema = v.undefinedable(v.date(), () => new Date());
    

#### Undefinedable entry schema

Object schema with an undefinedable entry.

    const UndefinedableEntrySchema = v.object({
      key: v.undefinedable(v.string()),
    });
    

#### Unwrap undefinedable schema

Use [`unwrap`](unwrap.md) to undo the effect of `undefinedable`.

    const UndefinedableNumberSchema = v.undefinedable(v.number());
    const NumberSchema = v.unwrap(UndefinedableNumberSchema);
    

### Related

The following APIs can be combined with `undefinedable`.

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
*   [`nonUndefinedable`](nonUndefinedable.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
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