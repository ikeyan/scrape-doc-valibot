findItem
--------

Creates a find item transformation action.

    const Action = v.findItem<TInput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`

### Parameters

*   `operation` `ArrayRequirement<TInput>`

#### Explanation

With `findItem` you can extract the first item of an array that matches the given `operation`.

### Returns

*   `Action` `FindItemAction<TInput>`

### Examples

The following examples show how `findItem` can be used.

#### Find duplicate item

Schema to find the first duplicate item in an array.

    const DuplicateItemSchema = v.pipe(
      v.array(v.string()),
      v.findItem((item, index, array) => array.indexOf(item) !== index)
    );
    

### Related

The following APIs can be combined with `findItem`.

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