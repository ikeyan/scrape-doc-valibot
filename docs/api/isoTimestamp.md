isoTimestamp
------------

Creates an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Formats: `yyyy-mm-ddThh:mm:ss.sssZ`, `yyyy-mm-ddThh:mm:ss.sss±hh:mm`, `yyyy-mm-ddThh:mm:ss.sss±hhmm`

> To support timestamps with lower or higher accuracy, the millisecond specification can be removed or contain up to 9 digits.

> The regex used cannot validate the maximum number of days based on year and month. For example, "2023-06-31T00:00:00.000Z" is valid although June has only 30 days.

    const Action = v.isoTimestamp<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimestampIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoTimestamp` you can validate the formatting of a string. If the input is not an ISO timestamp, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoTimestampAction<TInput, TMessage>`

### Examples

The following examples show how `isoTimestamp` can be used.

#### ISO timestamp schema

Schema to validate an ISO timestamp.

    const IsoTimestampSchema = v.pipe(
      v.string(),
      v.isoTimestamp('The timestamp is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoTimestamp`.

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