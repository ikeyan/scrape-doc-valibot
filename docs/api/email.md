email
-----

Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation action.

    const Action = v.email<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmailIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `email` you can validate the formatting of a string. If the input is not an email, you can use `message` to customize the error message.

> This validation action intentionally only validates common email addresses. If you are interested in an action that covers the entire specification, please see issue [#204](https://github.com/fabian-hiller/valibot/issues/204).

### Returns

*   `Action` `EmailAction<TInput, TMessage>`

### Examples

The following examples show how `email` can be used.

#### Email schema

Schema to validate an email.

    const EmailSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your email.'),
      v.email('The email is badly formatted.'),
      v.maxLength(30, 'Your email is too long.')
    );
    

### Related

The following APIs can be combined with `email`.

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