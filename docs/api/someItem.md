someItem
--------

Creates a some item validation action.

    const Action = v.someItem<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<SomeItemIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirement<TInput>`
*   `message` `TMessage`

#### Explanation

With `someItem` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If not some item matches your `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `SomeItemAction<TInput, TMessage>`

### Examples

The following examples show how `someItem` can be used.

#### Unsorted array schema

Schema to validate that an array is not sorted.

    const UnsortedArraySchema = v.pipe(
      v.array(v.number()),
      v.someItem(
        (item, index, array) => array.length === 1 || item < array[index - 1],
        'The numbers must not be sorted in ascending order.'
      )
    );
    

### Related

The following APIs can be combined with `someItem`.

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