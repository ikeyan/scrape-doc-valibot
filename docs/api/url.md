url
---

Creates an [URL](https://en.wikipedia.org/wiki/URL) validation action.

    const Action = v.url<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UrlIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `url` you can validate the formatting of a string. If the input is not an URL, you can use `message` to customize the error message.

### Returns

*   `Action` `UrlAction<TInput, TMessage>`

### Examples

The following examples show how `url` can be used.

#### URL schema

Schema to validate an URL.

    const UrlSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your url.'),
      v.url('The url is badly formatted.'),
      v.endsWith('.com', 'Only ".com" domains are allowed.')
    );
    

### Related

The following APIs can be combined with `url`.

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