notSize
-------

Creates a not size validation action.

    const Action = v.notSize<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotSizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notSize` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotSizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notSize` can be used.

#### Blob size schema

Schema to validate a blob with less ore more then 10 MB.

    const BlobSchema = v.pipe(
      v.blob(),
      v.notSize(10 * 1024 * 1024, 'The blob must not be 10 MB in size.')
    );
    

#### Set size schema

Schema to validate a set with less ore more then 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.notSize(8, 'The set must not contain 8 numbers.')
    );
    

### Related

The following APIs can be combined with `notSize`.

#### Schemas

*   [`any`](any.md),
*   [`blob`](blob.md),
*   [`custom`](custom.md),
*   [`file`](file.md),
*   [`instance`](instance.md),
*   [`map`](map.md),
*   [`set`](set.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)