isoTime
-------

Creates an [ISO time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `hh:mm`

    const Action = v.isoTime<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoTime` you can validate the formatting of a string. If the input is not an ISO time, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoTimeAction<TInput, TMessage>`

### Examples

The following examples show how `isoTime` can be used.

#### ISO time schema

Schema to validate an ISO time.

    const IsoTimeSchema = v.pipe(
      v.string(),
      v.isoTime('The time is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoTime`.

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