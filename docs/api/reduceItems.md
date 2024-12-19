reduceItems
-----------

Creates a reduce items transformation action.

    const Action = v.reduceItems<TInput, TOutput>(operation, initial);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Parameters

*   `operation` `(output: TOutput, item: TInput[number], index: number, array: TInput) => TOutput`
*   `initial` `TOutput`

#### Explanation

With `reduceItems` you can apply an `operation` to each item in an array to reduce it to a single value.

### Returns

*   `Action` `ReduceItemsAction<TInput, TOutput>`

### Examples

The following examples show how `reduceItems` can be used.

#### Sum all numbers

Schema that sums all the numbers in an array.

    const SumArraySchema = v.pipe(
      v.array(v.number()),
      v.reduceItems((sum, item) => sum + item, 0)
    );
    

### Related

The following APIs can be combined with `reduceItems`.

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