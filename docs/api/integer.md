integer
-------

Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.

    const Action = v.integer<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<IntegerIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `integer` you can validate the value of a number. If the input is not an integer, you can use `message` to customize the error message.

### Returns

*   `Action` `IntegerAction<TInput, TMessage>`

### Examples

The following examples show how `integer` can be used.

#### Integer schema

Schema to validate an integer.

    const IntegerSchema = v.pipe(
      v.number(),
      v.integer('The number must be an integer.')
    );
    

### Related

The following APIs can be combined with `integer`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`number`](number.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)