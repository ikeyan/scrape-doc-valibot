transform
---------

Creates a custom transformation action.

    const Action = v.transform<TInput, TOutput>(action);
    

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Parameters

*   `action` `(input: TInput) => TOutput`

#### Explanation

`transform` can be used to freely transform the input. The `action` parameter is a function that takes the input and returns the transformed output.

### Returns

*   `Action` `TransformAction<TInput, TOutput>`

### Examples

The following examples show how `transform` can be used.

#### Transform to length

Schema that transforms a string to its length.

    const StringLengthSchema = v.pipe(
      v.string(),
      v.transform((input) => input.length)
    );
    

#### Add object entry

Schema that transforms an object to add an entry.

    const UserSchema = v.pipe(
      v.object({ name: v.string(), age: v.number() }),
      v.transform((input) => ({
        ...input,
        created: new Date().toISOString(),
      }))
    );
    

### Related

The following APIs can be combined with `transform`.

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