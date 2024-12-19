minSize
-------

Creates a min size validation action.

    const Action = v.minSize<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinSizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minSize` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinSizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minSize` can be used.

#### Blob size schema

Schema to validate a blob with a minimum size of 10 MB.

    const BlobSchema = v.pipe(
      v.blob(),
      v.minSize(10 * 1024 * 1024, 'The blob must be at least 10 MB.')
    );
    

#### Set size schema

Schema to validate a set with a minimum of 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.minSize(8, 'The set must contain at least 8 numbers.')
    );
    

### Related

The following APIs can be combined with `minSize`.

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