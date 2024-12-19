partial
-------

Creates a modified copy of an object schema that marks all or only the selected entries as optional.

    const Schema = v.partial<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`partial` creates a modified copy of the given object `schema` where all entries or only the selected `keys` are optional. It is similar to TypeScript's [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility type.

> Because `partial` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `partial`.

### Returns

*   `Schema` `SchemaWithPartial<TSchema, TKeys>`

### Examples

The following examples show how `partial` can be used.

#### Partial object schema

Schema to validate an object with partial entries.

    const PartialSchema = v.partial(
      v.object({
        key1: v.string(),
        key2: v.number(),
      })
    ); // { key1?: string; key2?: number }
    

#### With only specific keys

Schema to validate an object with only specific entries marked as optional.

    const PartialSchema = v.partial(
      v.object({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    ); // { key1?: string; key2: number; key3?: boolean }
    

### Related

The following APIs can be combined with `partial`.

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
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`omit`](omit.md),
*   [`keyof`](keyof.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
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

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)