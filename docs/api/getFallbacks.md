getFallbacks
------------

Returns the fallback values of the schema.

> The difference to [`getFallback`](getFallback.md) is that for object and tuple schemas this function recursively returns the fallback values of the subschemas instead of `undefined`.

    const values = v.getFallbacks<TSchema>(schema);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `values` `InferFallbacks<TSchema>`

### Examples

The following examples show how `getFallbacks` can be used.

#### Object fallbacks

Get the fallback values of an object schema.

    const ObjectSchema = v.object({
      key: v.fallback(v.string(), "I'm the fallback!"),
    });
    
    const fallbackValues = v.getFallbacks(ObjectSchema); // { key: "I'm the fallback!" }
    

#### Tuple fallbacks

Get the fallback values of a tuple schema.

    const TupleSchema = v.tuple([v.fallback(v.number(), 100)]);
    const fallbackValues = v.getFallbacks(TupleSchema); // [100]
    

### Related

The following APIs can be combined with `getFallbacks`.

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

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)