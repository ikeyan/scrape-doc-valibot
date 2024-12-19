isoDate
-------

Creates an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `yyyy-mm-dd`

> The regex used cannot validate the maximum number of days based on year and month. For example, "2023-06-31" is valid although June has only 30 days.

    const Action = v.isoDate<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoDate` you can validate the formatting of a string. If the input is not an ISO date, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoDateAction<TInput, TMessage>`

### Examples

The following examples show how `isoDate` can be used.

#### ISO date schema

Schema to validate an ISO date.

    const IsoDateSchema = v.pipe(
      v.string(),
      v.isoDate('The date is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoDate`.

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