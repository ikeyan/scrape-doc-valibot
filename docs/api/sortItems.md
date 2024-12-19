sortItems
---------

Creates a sort items transformation action.

    const Action = v.sortItems<TInput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`

### Parameters

*   `operation` `((itemA: TInput[number], itemB: TInput[number]) => number) | undefined`

#### Explanation

With `sortItems` you can sort the items of an array based on a custom `operation`. This is a function that takes two items and returns a number. If the number is less than 0, the first item is sorted before the second item. If the number is greater than 0, the second item is sorted before the first. If the number is 0, the order of the items is not changed.

### Returns

*   `Action` `SortItemsAction<TInput>`

### Examples

The following examples show how `sortItems` can be used.

#### Sort numbers

Schema that sorts the numbers in an array in ascending order.

    const SortedArraySchema = v.pipe(v.array(v.number()), v.sortItems());
    

### Related

The following APIs can be combined with `sortItems`.

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