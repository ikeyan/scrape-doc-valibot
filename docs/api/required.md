required
--------

Creates a modified copy of an object schema that marks all or only the selected entries as required.

    const AllKeysSchema = v.required<TSchema, TMessage>(schema, message);
    const SelectedKeysSchema = v.required<TSchema, TKeys, TMessage>(
      schema,
      keys,
      message
    );
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`
*   `message` `TMessage`

#### Explanation

`required` creates a modified copy of the given object `schema` where all or only the selected `keys` are required. It is similar to TypeScript's [`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) utility type.

> Because `required` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `required`.

### Returns

*   `AllKeysSchema` `SchemaWithRequired<TSchema, undefined, TMessage>`
*   `SelectedKeysSchema` `SchemaWithRequired<TSchema, Tkeys, TMessage>`

### Examples

The following examples show how `required` can be used.

#### Required object schema

Schema to validate an object with required entries.

    const RequiredSchema = v.required(
      v.object({
        key1: v.optional(v.string()),
        key2: v.optional(v.number()),
      })
    ); // { key1: string; key2: number }
    

#### With only specific keys

Schema to validate an object with only specific entries marked as required.

    const RequiredSchema = v.required(
      v.object({
        key1: v.optional(v.string()),
        key2: v.optional(v.number()),
        key3: v.optional(v.boolean()),
      }),
      ['key1', 'key3']
    ); // { key1: string; key2?: number; key3: boolean }
    

### Related

The following APIs can be combined with `required`.

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
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
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