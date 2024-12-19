parseAsync
----------

Parses an unknown input based on a schema.

    const output = v.parseAsync<TSchema>(schema, input, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`
*   `config` `Config<InferIssue<TSchema>> | undefined`

#### Explanation

`parseAsync` will throw a [`ValiError`](ValiError.md) if the `input` does not match the `schema`. Therefore you should use a try/catch block to catch errors. If the input matches the schema, it is valid and the `output` of the schema will be returned typed.

> If an asynchronous operation associated with the passed schema throws an error, the promise returned by `parseAsync` is rejected and the error thrown may not be a [`ValiError`](ValiError.md).

### Returns

*   `output` `Promise<InferOutput<TSchema>>`

### Examples

The following examples show how `parseAsync` can be used.

    import { isEmailPresent } from '~/api';
    
    try {
      const StoredEmailSchema = v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      );
      const storedEmail = await v.parseAsync(StoredEmailSchema, 'jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.error(error);
    }
    

### Related

The following APIs can be combined with `parseAsync`.

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
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md),
*   [`isValiError`](isValiError.md),
*   [`ValiError`](ValiError.md)

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