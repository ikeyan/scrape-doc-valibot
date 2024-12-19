isoWeek
-------

Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `yyyy-Www`

> The regex used cannot validate the maximum number of weeks based on the year. For example, "2021W53" is valid although 2021 has only 52 weeks.

    const Action = v.isoWeek<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoWeekIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoWeek` you can validate the formatting of a string. If the input is not an ISO week, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoWeekAction<TInput, TMessage>`

### Examples

The following examples show how `isoWeek` can be used.

#### ISO week schema

Schema to validate an ISO week.

    const IsoWeekSchema = v.pipe(
      v.string(),
      v.isoWeek('The week is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoWeek`.

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