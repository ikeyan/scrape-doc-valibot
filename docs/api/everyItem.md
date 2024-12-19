everyItem
---------

Creates an every item validation action.

    const Action = v.everyItem<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<EveryItemIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirement<TInput>`
*   `message` `TMessage`

#### Explanation

With `everyItem` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If not every item matches your `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `EveryItemAction<TInput, TMessage>`

### Examples

The following examples show how `everyItem` can be used.

#### Sorted array schema

Schema to validate that an array is sorted.

    const SortedArraySchema = v.pipe(
      v.array(v.number()),
      v.everyItem(
        (item, index, array) => index === 0 || item >= array[index - 1],
        'The numbers must be sorted in ascending order.'
      )
    );
    

### Related

The following APIs can be combined with `everyItem`.

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