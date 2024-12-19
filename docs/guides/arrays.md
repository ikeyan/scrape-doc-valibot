Arrays
------

To validate arrays with a schema you can use [`array`](../api/array.md) or [`tuple`](../api/tuple.md). You use [`tuple`](../api/tuple.md) if your array has a specific shape and [`array`](../api/array.md) if it has any number of uniform items.

### Array schema

The first argument you pass to [`array`](../api/array.md) is a schema, which is used to validate the items of the array.

    import * as v from 'valibot';
    
    const ArraySchema = v.array(v.number()); // number[]
    

#### Pipeline validation

To validate the length or contents of the array, you can use a pipeline.

    import * as v from 'valibot';
    
    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.minLength(1),
      v.maxLength(5),
      v.includes('foo'),
      v.excludes('bar')
    );
    

### Tuple schema

A [`tuple`](../api/tuple.md) is an array with a specific shape. The first argument that you pass to the function is a tuple of schemas that defines its shape.

    import * as v from 'valibot';
    
    const TupleSchema = v.tuple([v.string(), v.number()]); // [string, number]
    

#### Loose and strict tuples

The [`tuple`](../api/tuple.md) schema removes unknown items. This means that items that you have not defined in the first argument are not validated and added to the output. You can change this behavior by using the [`looseTuple`](../api/looseTuple.md) or [`strictTuple`](../api/strictTuple.md) schema instead.

The [`looseTuple`](../api/looseTuple.md) schema allows unknown items and adds them to the output. The [`strictTuple`](../api/strictTuple.md) schema forbids unknown items and returns an issue for the first unknown item found.

#### Tuple with specific rest

Alternatively, you can also use the [`tupleWithRest`](../api/tupleWithRest.md) schema to define a specific schema for unknown items. Any items not defined in the first argument are then validated against the schema of the second argument.

    import * as v from 'valibot';
    
    const TupleSchema = v.tupleWithRest([v.string(), v.number()], v.null());
    

#### Pipeline validation

Similar to arrays, you can use a pipeline to validate the length and contents of a tuple.

    import * as v from 'valibot';
    
    const TupleSchema = v.pipe(
      v.tupleWithRest([v.string()], v.string()),
      v.maxLength(5),
      v.includes('foo'),
      v.excludes('bar')
    );