size
----

Creates a size validation action.

    const Action = v.size<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<SizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `size` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `SizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `size` can be used.

#### Blob size schema

Schema to validate a blob with a size of 256 bytes.

    const BlobSchema = v.pipe(
      v.blob(),
      v.size(256, 'The blob must be 256 bytes in size.')
    );
    

#### Set size schema

Schema to validate a set of 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.size(8, 'The set must contain 8 numbers.')
    );
    

### Related

The following APIs can be combined with `size`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)