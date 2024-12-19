mapItems
--------

Creates a map items transformation action.

    const Action = v.mapItems<TInput, TOutput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Parameters

*   `operation` `(item: TInput[number], index: number, array: TInput) => TOutput`

#### Explanation

With `mapItems` you can apply an `operation` to each item in an array to transform it.

### Returns

*   `Action` `MapItemsAction<TInput, TOutput>`

### Examples

The following examples show how `mapItems` can be used.

#### Mark duplicates

    const MarkedArraySchema = v.pipe(
      v.array(v.string()),
      v.mapItems((item, index, array) => {
        const isDuplicate = array.indexOf(item) !== index;
        return { item, isDuplicate };
      })
    );
    

### Related

The following APIs can be combined with `mapItems`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)