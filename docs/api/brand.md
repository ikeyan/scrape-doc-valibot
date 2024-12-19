brand
-----

Creates a brand transformation action.

    const Action = v.brand<TInput, TName>(name);
    

### Generics

*   `TInput` `extends any`
*   `TName` `extends BrandName`

### Parameters

*   `name` `TName`

#### Explanation

`brand` allows you to brand the output type of a schema with a `name`. This ensures that data can only be considered valid if it has been validated by a particular branded schema.

### Returns

*   `Action` `BrandAction<TInput, TName>`

### Examples

The following examples show how `brand` can be used.

#### Branded fruit schema

Schema to ensure that only a validated fruit is accepted.

    // Create schema and infer output type
    const FruitSchema = v.pipe(v.object({ name: v.string() }), v.brand('Fruit'));
    type FruitOutput = v.InferOutput<typeof FruitSchema>;
    
    // This works because output is branded
    const apple: FruitOutput = v.parse(FruitSchema, { name: 'apple' });
    
    // But this will result in a type error
    const banana: FruitOutput = { name: 'banana' };
    

### Related

The following APIs can be combined with `brand`.

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