Migrate from Zod
----------------

Migrating from [Zod](https://zod.dev/) to Valibot is very easy in most cases since both APIs have a lot of similarities. The following guide will help you migrate step by step and also point out important differences.

> If anything is unclear or missing, please create an [issue](https://github.com/fabian-hiller/valibot/issues/new) on GitHub. We are very interested in making this guide as good as possible.

### Replace imports

The first thing to do after [installing](installation.md) Valibot is to update your imports. Just change your Zod imports to Valibot's and replace all occurrences of `z.` with `v.`.

    // Change this
    import { z } from 'zod';
    const Schema = z.object({ key: z.string() });
    
    // To this
    import * as v from 'valibot';
    const Schema = v.object({ key: v.string() });
    

### Restructure code

One of the biggest differences between Zod and Valibot is the way you further validate a given type. In Zod, you chain methods like `.email` and `.endsWith`. In Valibot you use [pipelines](pipelines.md) to do the same thing. This is a function that starts with a schema and is followed by up to 19 validation or transformation actions.

    // Change this
    const Schema = z.string().email().endsWith('@example.com');
    
    // To this
    const Schema = v.pipe(v.string(), v.email(), v.endsWith('@example.com'));
    

Due to the modular design of Valibot, also all other methods like `.parse` or `.safeParse` have to be used a little bit differently. Instead of chaining them, you usually pass the schema as the first argument and move any existing arguments one position to the right.

    // Change this
    const value = z.string().parse('foo');
    
    // To this
    const value = v.parse(v.string(), 'foo');
    

We recommend that you read our [mental model](mental-model.md) guide to understand how the individual functions of Valibot's modular API work together.

### Change names

Most of the names are the same as in Zod. However, there are some exceptions. The following table shows all names that have changed.

Zod

Valibot

`and`

[`intersect`](../api/intersect.md)

`catch`

[`fallback`](../api/fallback.md)

`catchall`

[`objectWithRest`](../api/objectWithRest.md)

`coerce`

[`pipe`](../api/pipe.md), [`unknown`](../api/unknown.md) and [`transform`](../api/transform.md)

`datetime`

[`isoDate`](../api/isoDate.md), [`isoDateTime`](../api/isoDateTime.md)

`default`

[`optional`](../api/optional.md)

`discriminatedUnion`

[`variant`](../api/variant.md)

`element`

`item`

`enum`

[`picklist`](../api/picklist.md)

`extend`

[Object merging](intersections.md)

`gt`, `gte`

[`minValue`](../api/minValue.md)

`infer`

[`InferOutput`](../api/InferOutput.md)

`int`

[`integer`](../api/integer.md)

`input`

[`InferInput`](../api/InferInput.md)

`instanceof`

[`instance`](../api/instance.md)

`intersection`

[`intersect`](../api/intersect.md)

`lt`, `lte`

[`maxValue`](../api/maxValue.md)

`max`

[`maxLength`](../api/maxLength.md), [`maxSize`](../api/maxSize.md), [`maxValue`](../api/maxValue.md)

`min`

[`minLength`](../api/minLength.md), [`minSize`](../api/minSize.md), [`minValue`](../api/minValue.md)

`nativeEnum`

[`enum`](../api/enum.md)

`negative`

[`maxValue`](../api/maxValue.md)

`nonnegative`

[`minValue`](../api/minValue.md)

`nonpositive`

[`maxValue`](../api/maxValue.md)

`or`

[`union`](../api/union.md)

`output`

[`InferOutput`](../api/InferOutput.md)

`passthrough`

[`looseObject`](../api/looseObject.md)

`positive`

[`minValue`](../api/minValue.md)

`refine`

[`check`](../api/check.md)

`rest`

[`tuple`](../api/tuple.md)

`safe`

[`safeInteger`](../api/safeInteger.md)

`shape`

`entries`

`strict`

[`strictObject`](../api/strictObject.md)

`strip`

[`object`](../api/object.md)

`superRefine`

[`rawCheck`](../api/rawCheck.md), [`rawTransform`](../api/rawTransform.md)

### Other details

Below are some more details that may be helpful when migrating from Zod to Valibot.

#### Object and tuple

To specify whether objects or tuples should allow or prevent unknown values, Valibot uses different schema functions. Zod uses the methods `.passthrough`, `.strict`, `.strip`, `.catchall` and `.rest` instead. See the [objects](objects.md) and [arrays](arrays.md) guide for more details.

    // Change this
    const ObjectSchema = z.object({ key: z.string() }).strict();
    
    // To this
    const ObjectSchema = v.strictObject({ key: v.string() });
    

#### Error messages

For individual error messages, you can pass a string or an object to Zod. It also allows you to differentiate between an error message for "required" and "invalid\_type". With Valibot you just pass a single string instead.

    // Change this
    const SchemaSchema = z
      .string({ invalid_type_error: 'Not a string' })
      .min(5, { message: 'Too short' });
    
    // To this
    const StringSchema = v.pipe(
      v.string('Not a string'),
      v.minLength(5, 'Too short')
    );
    

#### Coerce type

To enforce primitive values, you can use a method of the `coerce` object in Zod. There is no such object or function in Valibot. Instead, you use a pipeline with a [`transform`](../api/transform.md) action as the second argument. This forces you to explicitly define the input, resulting in safer code.

    // Change this
    const NumberSchema = z.coerce.number();
    
    // To this
    const NumberSchema = v.pipe(v.unknown(), v.transform(Number));
    

Instead of [`unknown`](../api/unknown.md) as in the previous example, we usually recommend using a specific schema such as [`string`](../api/string.md) to improve type safety. This allows you, for example, to validate the formatting of the string with [`decimal`](../api/decimal.md) before transforming it to a number.

    const NumberSchema = v.pipe(v.string(), v.decimal(), v.transform(Number));
    

#### Async validation

Similar to Zod, Valibot supports synchronous and asynchronous validation. However, the API is a little bit different. See the [async guide](async-validation.md) for more details.