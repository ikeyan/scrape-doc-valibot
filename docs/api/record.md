record
------

Creates a record schema.

    const Schema = v.record<TKey, TValue, TMessage>(key, value, message);
    

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `record` you can validate the data type of the input and whether the entries matches `key` and `value`. If the input is not an object, you can use `message` to customize the error message.

> This schema filters certain entries from the record for security reasons.

> This schema marks an entry as optional if it detects that its key is a literal type. The reason for this is that it is not technically possible to detect missing literal keys without restricting the `key` schema to [`string`](string.md), [`enum`](enum.md) and [`picklist`](picklist.md). However, if [`enum`](enum.md) and [`picklist`](picklist.md) are used, it is better to use [`object`](object.md) with [`entriesFromList`](entriesFromList.md) because it already covers the needed functionality. This decision also reduces the bundle size of `record`, because it only needs to check the entries of the input and not any missing keys.

### Returns

*   `Schema` `RecordSchema<TKey, TValue, TMessage>`

### Examples

The following examples show how `record` can be used.

#### String record schema

Schema to validate a record with strings.

    const StringRecordSchema = v.record(
      v.string(),
      v.string(),
      'An object is required.'
    );
    

#### Object record schema

Schema to validate a record of objects.

    const ObjectRecordSchema = v.record(v.string(), v.object({ key: v.string() }));
    

#### Picklist as key

Schema to validate a record with specific optional keys.

    const ProductRecordSchema = v.record(
      v.picklist(['product_a', 'product_b', 'product_c']),
      v.optional(v.number())
    );
    

#### Enum as key

Schema to validate a record with specific optional keys.

    enum Products {
      PRODUCT_A = 'product_a',
      PRODUCT_B = 'product_b',
      PRODUCT_C = 'product_c',
    }
    
    const ProductRecordSchema = v.record(v.enum(Products), v.optional(v.number()));
    

### Related

The following APIs can be combined with `record`.

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
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
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
*   [`safeParser`](safeParser.md)

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