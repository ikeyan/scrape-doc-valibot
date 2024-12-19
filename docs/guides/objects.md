Objects
-------

To validate objects with a schema, you can use [`object`](../api/object.md) or [`record`](../api/record.md). You use [`object`](../api/object.md) for an object with a specific shape and [`record`](../api/record.md) for objects with any number of uniform entries.

### Object schema

The first argument is used to define the specific structure of the object. Each entry consists of a key and a schema as the value. The entries of the input are then validated against these schemas.

    import * as v from 'valibot';
    
    const ObjectSchema = v.object({
      key1: v.string(),
      key2: v.number(),
    });
    

#### Loose and strict objects

The [`object`](../api/object.md) schema removes unknown entries. This means that entries that you have not defined in the first argument are not validated and added to the output. You can change this behavior by using the [`looseObject`](../api/looseObject.md) or [`strictObject`](../api/strictObject.md) schema instead.

The [`looseObject`](../api/looseObject.md) schema allows unknown entries and adds them to the output. The [`strictObject`](../api/strictObject.md) schema forbids unknown entries and returns an issue for the first unknown entry found.

#### Object with specific rest

Alternatively, you can also use the [`objectWithRest`](../api/objectWithRest.md) schema to define a specific schema for unknown entries. Any entries not defined in the first argument are then validated against the schema of the second argument.

    import * as v from 'valibot';
    
    const ObjectSchema = v.objectWithRest(
      {
        key1: v.string(),
        key2: v.number(),
      },
      v.null()
    );
    

#### Pipeline validation

To validate the value of an entry based on another entry, you can wrap you schema with the [`check`](../api/check.md) validation action in a pipeline. You can also use [`forward`](../api/forward.md) to assign the issue to a specific object key in the event of an error.

> If you only want to validate specific entries, we recommend using [`partialCheck`](../api/partialCheck.md) instead as [`check`](../api/check.md) can only be executed if the input is fully typed.

    import * as v from 'valibot';
    
    const CalculationSchema = v.pipe(
      v.object({
        a: v.number(),
        b: v.number(),
        sum: v.number(),
      }),
      v.forward(
        v.check(({ a, b, sum }) => a + b === sum, 'The calculation is incorrect.'),
        ['sum']
      )
    );
    

### Record schema

For an object with any number of uniform entries, [`record`](../api/record.md) is the right choice. The schema passed as the first argument validates the keys of your record, and the schema passed as the second argument validates the values.

    import * as v from 'valibot';
    
    const RecordSchema = v.record(v.string(), v.number()); // Record<string, number>
    

#### Specific record keys

Instead of [`string`](../api/string.md), you can also use [`custom`](../api/custom.md), [`enum`](../api/enum.md), [`literal`](../api/literal.md), [`picklist`](../api/picklist.md) or [`union`](../api/union.md) to validate the keys.

    import * as v from 'valibot';
    
    const RecordSchema = v.record(v.picklist(['key1', 'key2']), v.number()); // { key1?: number; key2?: number }
    

Note that [`record`](../api/record.md) marks all literal keys as optional in this case. If you want to make them required, you can use the [`object`](../api/object.md) schema with the [`entriesFromList`](../api/entriesFromList.md) util instead.

    import * as v from 'valibot';
    
    const RecordSchema = v.object(v.entriesFromList(['key1', 'key2'], v.number())); // { key1: number; key2: number }
    

#### Pipeline validation

To validate the value of an entry based on another entry, you can wrap you schema with the [`check`](../api/check.md) validation action in a pipeline. You can also use [`forward`](../api/forward.md) to assign the issue to a specific record key in the event of an error.

    import * as v from 'valibot';
    
    const CalculationSchema = v.pipe(
      v.record(v.picklist(['a', 'b', 'sum']), v.number()),
      v.forward(
        v.check(
          ({ a, b, sum }) => (a || 0) + (b || 0) === (sum || 0),
          'The calculation is incorrect.'
        ),
        ['sum']
      )
    );