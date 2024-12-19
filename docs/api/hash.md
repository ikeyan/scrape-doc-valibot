hash
----

Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.

    const Action = v.hash<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HashIssue<TInput>> | undefined`

### Parameters

*   `types` `[HashType, ...HashType[]]`
*   `message` `TMessage`

#### Explanation

With `hash` you can validate the formatting of a string. If the input is not a hash, you can use `message` to customize the error message.

### Returns

*   `Action` `HashAction<TInput, TMessage>`

### Examples

The following examples show how `hash` can be used.

#### Hash schema

Schema to validate a hash.

    const HashSchema = v.pipe(
      v.string(),
      v.hash(['md5', 'sha1'], 'The specified hash is invalid.')
    );
    

### Related

The following APIs can be combined with `hash`.

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