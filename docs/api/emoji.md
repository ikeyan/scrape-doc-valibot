emoji
-----

Creates an [emoji](https://en.wikipedia.org/wiki/Emoji) validation action.

    const Action = v.emoji<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmojiIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `emoji` you can validate the formatting of a string. If the input is not an emoji, you can use `message` to customize the error message.

### Returns

*   `Action` `EmojiAction<TInput, TMessage>`

### Examples

The following examples show how `emoji` can be used.

#### Emoji schema

Schema to validate an emoji.

    const EmojiSchema = v.pipe(
      v.string(),
      v.emoji('Please provide a valid emoji.')
    );
    

### Related

The following APIs can be combined with `emoji`.

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