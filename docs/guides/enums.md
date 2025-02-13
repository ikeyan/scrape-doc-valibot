Enums
-----

An enumerated type is a data type that consists of a set of values. They can be represented by either an object, a TypeScript enum or, to keep things simple, an array. You use [`enum`](../api/enum.md) for objects and TypeScript enums and [`picklist`](../api/picklist.md) for arrays.

### Enum schema

Since TypeScript enums are transpiled to JavaScript objects by the TypeScript compiler, you can use the [`enum`](../api/enum.md) schema function for both. Just pass your enumerated data type as the first argument to the schema function. On validation, the schema checks whether the input matches one of the values in the enum.

    import * as v from 'valibot';
    
    // As JavaScript object
    const Direction = {
      Left: 'LEFT',
      Right: 'RIGHT',
    } as const;
    
    // As TypeScript enum
    enum Direction {
      Left = 'LEFT',
      Right = 'RIGHT',
    }
    
    const DirectionSchema = v.enum(Direction);
    

### Picklist schema

For a set of values represented by an array, you can use the [`picklist`](../api/picklist.md) schema function. Just pass your array as the first argument to the schema function. On validation, the schema checks whether the input matches one of the items in the array.

    import * as v from 'valibot';
    
    const Direction = ['LEFT', 'RIGHT'] as const;
    
    const DirectionSchema = v.picklist(Direction);
    

#### Format array

In some cases, the array may not be in the correct format. In this case, simply use the [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method to bring it into the required format.

    import * as v from 'valibot';
    
    const countries = [
      { name: 'Germany', code: 'DE' },
      { name: 'France', code: 'FR' },
      { name: 'United States', code: 'US' },
    ] as const;
    
    const CountrySchema = v.picklist(countries.map((country) => country.code));