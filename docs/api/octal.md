octal
-----

Creates an [octal](https://en.wikipedia.org/wiki/Octal) validation action.

    const Action = v.octal<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<OctalIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `octal` you can validate the formatting of a string. If the input is not an octal, you can use `message` to customize the error message.

### Returns

*   `Action` `OctalAction<TInput, TMessage>`

### Examples

The following examples show how `octal` can be used.

#### Octal schema

Schema to validate a octal string.

    const OctalSchema = v.pipe(
      v.string(),
      v.octal('The octal is badly formatted.')
    );
    

### Related

The following APIs can be combined with `octal`.

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