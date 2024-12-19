imei
----

Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.

    const Action = v.imei<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<ImeiIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `imei` you can validate the formatting of a string. If the input is not an imei, you can use `message` to customize the error message.

### Returns

*   `Action` `ImeiAction<TInput, TMessage>`

### Examples

The following examples show how `imei` can be used.

#### IMEI schema

Schema to validate an IMEI.

    const ImeiSchema = v.pipe(v.string(), v.imei('The imei is badly formatted.'));
    

### Related

The following APIs can be combined with `imei`.

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