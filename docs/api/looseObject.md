looseObject
-----------

Creates a loose object schema.

    const Schema = v.looseObject<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `looseObject` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object, you can use `message` to customize the error message.

> The difference to [`object`](object.md) is that this schema includes any unknown entries in the output. In addition, this schema filters certain entries from the unknown entries for security reasons.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `LooseObjectSchema<TEntries, TMessage>`

### Examples

The following examples show how `looseObject` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Simple object schema

Schema to validate a loose object with two specific keys.

    const SimpleObjectSchema = v.looseObject({
      key1: v.string(),
      key2: v.number(),
    });
    

#### Merge several objects

Schema that merges the entries of two object schemas.

    const MergedObjectSchema = v.looseObject({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    });
    

#### Mark keys as optional

Schema to validate an object with partial entries.

    const PartialObjectSchema = v.partial(
      v.looseObject({
        key1: v.string(),
        key2: v.number(),
      })
    );
    

#### Object with selected entries

Schema to validate only selected entries of a loose object.

    const PickObjectSchema = v.pick(
      v.looseObject({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    );
    

### Related

The following APIs can be combined with `looseObject`.

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
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
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