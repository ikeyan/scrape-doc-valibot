filterItems
-----------

Creates a filter items transformation action.

    const Action = v.filterItems<TInput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`

### Parameters

*   `operation` `ArrayRequirement<TInput>`

#### Explanation

With `filterItems` you can filter the items of an array. Returning `true` for an item will keep it in the array and returning `false` will remove it.

### Returns

*   `Action` `FilterItemsAction<TInput>`

### Examples

The following examples show how `filterItems` can be used.

#### Filter duplicate items

Schema to filter duplicate items from an array.

    const FilteredArraySchema = v.pipe(
      v.array(v.string()),
      v.filterItems((item, index, array) => array.indexOf(item) === index)
    );
    

### Related

The following APIs can be combined with `filterItems`.

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