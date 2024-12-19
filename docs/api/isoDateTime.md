isoDateTime
-----------

Creates an [ISO date time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `yyyy-mm-ddThh:mm`

> The regex used cannot validate the maximum number of days based on year and month. For example, "2023-06-31T00:00" is valid although June has only 30 days.

    const Action = v.isoDateTime<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoDateTime` you can validate the formatting of a string. If the input is not an ISO date time, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoDateTimeAction<TInput, TMessage>`

### Examples

The following examples show how `isoDateTime` can be used.

#### ISO date time schema

Schema to validate an ISO date time.

    const IsoDateTimeSchema = v.pipe(
      v.string(),
      v.isoDateTime('The date is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoDateTime`.

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