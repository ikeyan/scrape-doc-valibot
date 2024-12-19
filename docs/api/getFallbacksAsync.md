getFallbacksAsync
-----------------

Returns the fallback values of the schema.

> The difference to [`getFallback`](getFallback.md) is that for object and tuple schemas this function recursively returns the fallback values of the subschemas instead of `undefined`.

    const values = v.getFallbacksAsync<TSchema>(schema);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `values` `Promise<InferFallbacks<TSchema>>`

### Examples

The following examples show how `getFallbacksAsync` can be used.

#### New user fallbacks

Get the fallback values of a new user schema.

    import { getAnyUniqueUsername, isUsernameUnique } from '~/api';
    
    const NewUserSchema = v.objectAsync({
      username: v.fallbackAsync(
        v.pipeAsync(v.string(), v.minLength(3), v.checkAsync(isUsernameUnique)),
        getAnyUniqueUsername
      ),
      password: v.pipe(v.string(), v.minLength(8)),
    });
    
    const fallbackValues = await v.getFallbacksAsync(NewUserSchema);
    /*
      {
        username: "cookieMonster07",
        password: undefined
      }
    */
    

### Related

The following APIs can be combined with `getFallbacksAsync`.

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

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)