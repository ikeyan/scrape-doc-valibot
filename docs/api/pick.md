pick
----

Creates a modified copy of an object schema that contains only the selected entries.

    const Schema = v.pick<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema>`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`pick` creates modified copy of the given object `schema` that containing only the selected `keys`. It is similar to TypeScript's [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) utility type.

> Because `pick` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `pick`.

### Returns

*   `Schema` `SchemaWithPick<TSchema, TKeys>`

### Examples

The following examples show how `pick` can be used.

#### Pick specific keys

Schema that contains only the selected keys of an existing schema.

    const PickedSchema = v.pick(
      object({
        key1: string(),
        key2: number(),
        key3: boolean(),
      }),
      ['key1', 'key3']
    ); // { key1: string; key3: boolean }
    

### Related

The following APIs can be combined with `pick`.

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
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
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