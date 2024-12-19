nanoid
------

Creates a [Nano ID](https://github.com/ai/nanoid) validation action.

    const Action = v.nanoid<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<NanoIDIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `nanoid` you can validate the formatting of a string. If the input is not an Nano ID, you can use `message` to customize the error message.

### Returns

*   `Action` `NanoIDAction<TInput, TMessage>`

### Examples

The following examples show how `nanoid` can be used.

> Since Nano IDs are not limited to a fixed length, it is recommended to combine `nanoid` with [`length`](length.md) to ensure the correct length.

#### Nano ID schema

Schema to validate a Nano ID.

    const NanoIDSchema = v.pipe(
      v.string(),
      v.nanoid('The Nano ID is badly formatted.'),
      v.length(21, 'The Nano ID must be 21 characters long.')
    );
    

### Related

The following APIs can be combined with `nanoid`.

#### Schemas

*   [`any`](any.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)