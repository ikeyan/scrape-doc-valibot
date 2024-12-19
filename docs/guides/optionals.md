Optionals
---------

It often happens that `undefined` or `null` should also be accepted instead of the value. To make the API more readable for this and to reduce boilerplate, Valibot offers a shortcut for this functionality with [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md) and [`undefinedable`](../api/undefinedable.md).

### How it works

To accept `undefined` and/or `null` besides your actual value, you just have to wrap the schema in [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md), or [`undefinedable`](../api/undefinedable.md).

    import * as v from 'valibot';
    
    const OptionalStringSchema = v.optional(v.string()); // string | undefined
    const NullableStringSchema = v.nullable(v.string()); // string | null
    const NullishStringSchema = v.nullish(v.string()); // string | null | undefined
    const UndefinedableStringSchema = v.undefinedable(v.string()); // string | undefined
    

#### Use in objects

When used inside of objects, [`optional`](../api/optional.md) and [`nullish`](../api/nullish.md) is a special case, as it also marks the value as optional in TypeScript with a question mark.

    import * as v from 'valibot';
    
    const OptionalKeySchema = v.object({ key: v.optional(v.string()) }); // { key?: string | undefined }
    

### Default values

The special thing about [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md) and [`undefinedable`](../api/undefinedable.md) is that the schema functions accept a default value as the second argument. Depending on the schema function, this default value is always used if the input is `undefined` or `null`.

    import * as v from 'valibot';
    
    const OptionalStringSchema = v.optional(v.string(), "I'm the default!");
    
    type OptionalStringInput = v.InferInput<typeof OptionalStringSchema>; // string | undefined
    type OptionalStringOutput = v.InferOutput<typeof OptionalStringSchema>; // string
    

By providing a default value, the input type of the schema now differs from the output type. The schema in the example now accepts `string` and `undefined` as input, but returns a string as output in both cases.

#### Dynamic default values

In some cases it is necessary to generate the default value dynamically. For this purpose, a function that generates and returns the default value can also be passed as the second argument.

    import * as v from 'valibot';
    
    const NullableDateSchema = v.nullable(v.date(), () => new Date());
    

The previous example thus creates a new instance of the [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class for each validation with `null` as input, which is then used as the default value.

#### Dependent default values

In rare cases, a default value for an optional entry may depend on the values of another entries in the same object. This can be achieved by using [`transform`](../api/transform.md) in the [`pipe`](../api/pipe.md) of the object.

    import * as v from 'valibot';
    
    const CalculationSchema = v.pipe(
      v.object({
        a: v.number(),
        b: v.number(),
        sum: v.optional(v.number()),
      }),
      v.transform((input) => ({
        ...input,
        sum: input.sum === undefined ? input.a + input.b : input.sum,
      }))
    );