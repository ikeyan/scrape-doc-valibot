cuid2
-----

Creates a [Cuid2](https://github.com/paralleldrive/cuid2) validation action.

    const Action = v.cuid2<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Cuid2Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `cuid2` you can validate the formatting of a string. If the input is not an Cuid2, you can use `message` to customize the error message.

> Since Cuid2s are not limited to a fixed length, it is recommended to combine `cuid2` with [`length`](length.md) to ensure the correct length.

### Returns

*   `Action` `Cuid2Action<TInput, TMessage>`

### Examples

The following examples show how `cuid2` can be used.

#### Cuid2 schema

Schema to validate an Cuid2.

    const Cuid2Schema = v.pipe(
      v.string(),
      v.cuid2('The Cuid2 is badly formatted.'),
      v.length(10, 'The Cuid2 must be 10 characters long.')
    );
    

### Related

The following APIs can be combined with `cuid2`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)