Migrate to v0.31.0
------------------

Migrating Valibot from an older version to v0.31.0 isn't complicated. Except for the new [`pipe`](../api/pipe.md) method, most things remain the same. The following guide will help you to migrate automatically or manually step by step and also point out important differences.

### Automatic upgrade

We worked together with [Codemod](https://codemod.com/registry/valibot-migrate-to-v0-31-0) and [Grit](https://docs.grit.io/registry/github.com/fabian-hiller/valibot/migrate_to_v0_31_0) to automatically upgrade your schemas to the new version with a single CLI command. Both codemods are similar. You can use one or the other. Simply run the command in the directory of your project.

> We recommend using a version control system like [Git](https://git-scm.com/) so that you can revert changes if the codemod screws something up.

    # Codemod
    npx codemod valibot/migrate-to-v0.31.0
    
    # Grit
    npx @getgrit/cli apply github.com/fabian-hiller/valibot#migrate_to_v0_31_0
    

Please create an [issue](https://github.com/fabian-hiller/valibot/issues/new) if you encounter any problems or unexpected behavior with the provided codemods.

### Restructure code

As mentioned above, one of the biggest differences is the new [`pipe`](../api/pipe.md) method. Previously, you passed the pipeline as an array to a schema function. Now you pass the schema with various actions to the new [`pipe`](../api/pipe.md) method to extend a schema.

    // Change this
    const Schema = v.string([v.email()]);
    
    // To this
    const Schema = v.pipe(v.string(), v.email());
    

We will be publishing a [blog post](../blog/valibot-v0.31.0-is-finally-available.md) soon explaining all the benefits of this change. In the meantime, you can read the description of discussion [#463](https://github.com/fabian-hiller/valibot/discussions/463) and PR [#502](https://github.com/fabian-hiller/valibot/pull/502), which introduced this change.

### Change names

Most of the names are the same as before. However, there are some exceptions. The following table shows all names that have changed.

v0.30.0

v0.31.0

`anyAsync`

[`any`](../api/any.md)

`BaseSchema`

[`GenericSchema`](../api/GenericSchema.md)

`bigintAsync`

[`bigint`](../api/bigint.md)

`blobAsync`

[`blob`](../api/blob.md)

`booleanAsync`

[`boolean`](../api/boolean.md)

`custom`

[`check`](../api/check.md)

`customAsync`

[`checkAsync`](../api/checkAsync.md)

`coerce`

[`pipe`](../api/pipe.md), [`unknown`](../api/unknown.md) and [`transform`](../api/transform.md)

`dateAsync`

[`date`](../api/date.md)

`enumAsync`

[`enum_`](../api/enum.md)

`Input`

[`InferInput`](../api/InferInput.md)

`instanceAsync`

[`instance`](../api/instance.md)

`literalAsync`

[`literal`](../api/literal.md)

`nanAsync`

[`nan`](../api/nan.md)

`neverAsync`

[`never`](../api/never.md)

`nullAsync`

[`null_`](../api/null.md)

`numberAsync`

[`number`](../api/number.md)

`Output`

[`InferOutput`](../api/InferOutput.md)

`picklistAsync`

[`picklist`](../api/picklist.md)

`SchemaConfig`

[`Config`](../api/Config.md)

`special`

[`custom`](../api/custom.md)

`specialAsync`

[`customAsync`](../api/customAsync.md)

`SchemaConfig`

[`Config`](../api/string.md)

`stringAsync`

[`string`](../api/string.md)

`symbolAsync`

[`symbol`](../api/symbol.md)

`undefinedAsync`

[`undefined_`](../api/undefined.md)

`unknownAsync`

[`unknown`](../api/unknown.md)

`toCustom`

[`transform`](../api/transform.md)

`toTrimmed`

[`trim`](../api/trim.md)

`toTrimmedEnd`

[`trimEnd`](../api/trimEnd.md)

`toTrimmedStart`

[`trimStart`](../api/trimStart.md)

`voidAsync`

[`void_`](../api/void.md)

### Special cases

More complex schemas may require a bit more restructuring. This section provides more details on how to migrate specific functions.

#### Objects and tuples

Previously, you could pass a `rest` argument to the [`object`](../api/object.md) and [`tuple`](../api/tuple.md) schemas to define the behavior for unknown entries and items. We have removed the `rest` argument to simplify the implementation and reduce the bundle size if this functionality is not needed. If you do need this functionality, there is now a new [`objectWithRest`](../api/objectWithRest.md) and [`tupleWithRest`](../api/tupleWithRest.md) schema.

    // Change this
    const ObjectSchema = v.object({ key: v.string() }, v.null_());
    const TupleSchema = v.tuple([v.string()], v.null_());
    
    // To this
    const ObjectSchema = v.objectWithRest({ key: v.string() }, v.null_());
    const TupleSchema = v.tupleWithRest([v.string()], v.null_());
    

To further improve the developer experience, we have also added a [`looseObject`](../api/looseObject.md), [`looseTuple`](../api/looseTuple.md), [`strictObject`](../api/strictObject.md) and [`strictTuple`](../api/strictTuple.md) schema. These schemas allow or disallow unknown entries or items.

    // Change this
    const LooseObjectSchema = v.object({ key: v.string() }, v.unknown());
    const LooseTupleSchema = v.tuple([v.string()], v.unknown());
    const StrictObjectSchema = v.object({ key: v.string() }, v.never());
    const StrictTupleSchema = v.tuple([v.string()], v.never());
    
    // To this
    const LooseObjectSchema = v.looseObject({ key: v.string() });
    const LooseTupleSchema = v.looseTuple([v.string()]);
    const StrictObjectSchema = v.strictObject({ key: v.string() });
    const StrictTupleSchema = v.strictTuple([v.string()]);
    

#### Object merging

Since there are now 4 different object schemas, we could no longer provide a simple `merge` function that works in all cases, as we never know which schema you want to merge the other objects into. But there is a simple workaround with a similar developer experience.

    const ObjectSchema1 = v.object({ foo: v.string() });
    const ObjectSchema2 = v.object({ bar: v.number() });
    
    // Change this
    const MergedObject = v.merge([ObjectSchema1, ObjectSchema2]);
    
    // To this
    const MergedObject = v.object({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    });
    

#### Brand and transform

Previously, [`brand`](../api/brand.md) and [`transform`](../api/transform.md) were methods that could be wrapped around a schema to modify it. With our new [`pipe`](../api/pipe.md) method, this is no longer necessary. Instead, [`brand`](../api/brand.md) and [`transform`](../api/transform.md) are now transformation actions that can be placed directly in a pipeline, resulting in better readability, especially for complex schemas.

    // Change this
    const BrandedSchema = v.brand(v.string(), 'foo');
    const TransformedSchema = v.transform(v.string(), (input) => input.length);
    
    // To this
    const BrandedSchema = v.pipe(v.string(), v.brand('foo'));
    const TransformedSchema = v.pipe(
      v.string(),
      v.transform((input) => input.length)
    );
    

#### Coerce method

The `coerce` method has been removed because we felt it was an insecure API. In most cases, you don't want to coerce an unknown input into a specific data type. Instead, you want to transform a specific data type into another specific data type. For example, a string or a number into a date. To explicitly define the input type, we recommend using the new [`pipe`](../api/pipe.md) method together with the [`transform`](../api/transform.md) action to achieve the same functionality.

    // Change this
    const DateSchema = v.coerce(v.date(), (input) => new Date(input));
    
    // To this
    const DateSchema = v.pipe(
      v.union([v.string(), v.number()]),
      v.transform((input) => new Date(input))
    );
    

#### Flatten issues

Previously, the [`flatten`](../api/flatten.md) function accepted a [`ValiError`](../api/ValiError.md) or an array of issues. We have simplified the implementation by only allowing an array of issues to be passed.

    // Change this
    const flatErrors = v.flatten(error);
    
    // To this
    const flatErrors = v.flatten(error.issues);