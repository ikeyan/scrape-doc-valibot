Intersections
-------------

An intersection represents a logical AND relationship. You can apply this concept to your schemas with [`intersect`](../api/intersect.md) and partially by merging multiple object schemas into a new one. We recommend this approach for simple object schemas, and [`intersect`](../api/intersect.md) for all other cases.

### Intersect schema

The schema function [`intersect`](../api/intersect.md) creates an AND relationship between any number of schemas that you pass as the first argument in the form of an array. To pass the validation, the validation of each schema passed must be successful. If this is the case, the schema merges the output of the individual schemas and returns the result. If the validation fails, the schema returns any issues that occurred.

    import * as v from 'valibot';
    
    // TypeScript
    type Intersect = { foo: string } & { bar: number };
    
    // Valibot
    const IntersectSchema = v.intersect([
      v.object({ foo: v.string() }),
      v.object({ bar: v.number() }),
    ]);
    

### Merge objects

Technically, there is a big difference between [`intersect`](../api/intersect.md) and object merging. [`intersect`](../api/intersect.md) is a schema function that executes the passed schemas during validation. In contrast, object merging is done during initialization to create a new object schema.

As a result, object merging usually has much better performance than [`intersect`](../api/intersect.md) when validating unknown data. Also, subsequent object properties overwrite the previous ones. This is not the case with [`intersect`](../api/intersect.md), since the validation would fail if two properties with the same name are fundamentally different.

    import * as v from 'valibot';
    
    const ObjectSchema1 = v.object({ foo: v.string(), baz: v.number() });
    const ObjectSchema2 = v.object({ bar: v.string(), baz: v.boolean() });
    
    const MergedSchema = v.object({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    }); // { foo: string; bar: string; baz: boolean }
    

In the previous code example, the `baz` property of the first object schema is overwritten by the `baz` property of the second object schema.