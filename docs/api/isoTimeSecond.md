isoTimeSecond
-------------

Creates an [ISO time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `hh:mm:ss`

    const Action = v.isoTimeSecond<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeSecondIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoTimeSecond` you can validate the formatting of a string. If the input is not an ISO time second, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoTimeSecondAction<TInput, TMessage>`

### Examples

The following examples show how `isoTimeSecond` can be used.

#### ISO time second schema

Schema to validate an ISO time second.

    const IsoTimeSecondSchema = v.pipe(
      v.string(),
      v.isoTimeSecond('The time is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoTimeSecond`.

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