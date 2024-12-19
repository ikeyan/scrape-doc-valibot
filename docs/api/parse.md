parse
-----

Parses an unknown input based on a schema.

    const output = v.parse<TSchema>(schema, input, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`
*   `config` `Config<InferIssue<TSchema>> | undefined`

#### Explanation

`parse` will throw a [`ValiError`](ValiError.md) if the `input` does not match the `schema`. Therefore you should use a try/catch block to catch errors. If the input matches the schema, it is valid and the `output` of the schema will be returned typed.

### Returns

*   `output` `InferOutput<TSchema>`

### Example

The following example show how `parse` can be used.

    try {
      const EmailSchema = v.pipe(v.string(), v.email());
      const email = v.parse(EmailSchema, 'jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.log(error);
    }
    

### Related

The following APIs can be combined with `parse`.

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