checkItems
----------

Creates a check items validation action.

    const Action = v.checkItems<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirement<TInput>`
*   `message` `TMessage`

#### Explanation

With `checkItems` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If an item does not match your `requirement`, you can use `message` to customize the error message.

> The special thing about `checkItems` is that it automatically forwards each issue to the appropriate item.

### Returns

*   `Action` `CheckItemsAction<TInput, TMessage>`

### Examples

The following examples show how `checkItems` can be used.

#### No duplicate items

Schema to validate that an array has no duplicate items.

    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.checkItems(
        (item, index, array) => array.indexOf(item) === index,
        'Duplicate items are not allowed.'
      )
    );
    

### Related

The following APIs can be combined with `checkItems`.

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