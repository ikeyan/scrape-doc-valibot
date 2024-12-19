metadata
--------

Creates a custom metadata action.

    const Action = v.metadata<TInput, TMetadata>(metadata_);
    

### Generics

*   `TInput` `extends any`
*   `TMetadata` `extends Record<string, unknown>`

### Parameters

*   `metadata_` `TMetadata`

#### Explanation

With `metadata` you can attach custom metadata to a schema. This can be useful when working with AI tools or for documentation purposes.

### Returns

*   `Action` `MetadataAction<TInput, TMetadata>`

### Examples

The following examples show how `metadata` can be used.

#### Profile table schema

Schema to describe a profile table.

    const ProfileTableSchema = v.pipe(
      v.object({
        username: v.pipe(v.string(), v.nonEmpty()),
        email: v.pipe(v.string(), v.email()),
        avatar: v.pipe(v.string(), v.url()),
        description: v.pipe(v.string(), v.maxLength(500)),
      }),
      v.metadata({
        table: 'profiles',
        primaryKey: 'username',
        indexes: ['email'],
      })
    );
    

### Related

The following APIs can be combined with `metadata`.

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

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)