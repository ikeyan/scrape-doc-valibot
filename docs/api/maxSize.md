maxSize
-------

Creates a max size validation action.

    const Action = v.maxSize<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxSizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxSize` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxSizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxSize` can be used.

#### Blob size schema

Schema to validate a blob with a maximum size of 10 MB.

    const BlobSchema = v.pipe(
      v.blob(),
      v.maxSize(10 * 1024 * 1024, 'The blob must not exceed 10 MB.')
    );
    

#### Set size schema

Schema to validate a set with a maximum of 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.maxSize(8, 'The set must not exceed 8 numbers.')
    );
    

### Related

The following APIs can be combined with `maxSize`.

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