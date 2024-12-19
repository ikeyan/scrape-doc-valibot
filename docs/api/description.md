description
-----------

Creates a description metadata action.

    const Action = v.description<TInput, TDescription>(description_);
    

### Generics

*   `TInput` `extends any`
*   `TDescription` `extends string`

### Parameters

*   `description_` `TDescription`

#### Explanation

With `description` you can describe the purpose of a schema. This can be useful when working with AI tools or for documentation purposes.

### Returns

*   `Action` `DescriptionAction<TInput, TDescription>`

### Examples

The following examples show how `description` can be used.

#### Username schema

Schema to validate a user name.

    const UsernameSchema = v.pipe(
      v.string(),
      v.regex(/^[a-z0-9_-]{4,16}$/iu),
      v.title('Username'),
      v.description(
        'A username must be between 4 and 16 characters long and can only contain letters, numbers, underscores and hyphens.'
      )
    );
    

### Related

The following APIs can be combined with `description`.

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