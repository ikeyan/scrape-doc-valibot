partialCheck
------------

Creates a partial check validation action.

    const Action = v.partialCheck<TInput, TPathList, TSelection, TMessage>(
      pathList,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends Record<string, unknown> | ArrayLike<unknown>`
*   `TPathList` `extends readonly PathKeys<TInput>[]`
*   `TSelection` `extends DeepPickN<TInput, TPathList>`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Parameters

*   `pathList` `TPathList`
*   `requirement` `(input: TSelection) => boolean`
*   `message` `TMessage`

#### Explanation

With `partialCheck` you can freely validate the selected input and return `true` if it is valid or `false` otherwise. If the input does not match your `requirement`, you can use `message` to customize the error message.

> The difference to [`check`](check.md) is that `partialCheck` can be executed whenever the selected part of the data is valid, while [`check`](check.md) is executed only when the entire dataset is typed. This can be an important advantage when working with forms.

### Returns

*   `Action` `PartialCheckAction<TInput, TSelection, TMessage>`

### Examples

The following examples show how `partialCheck` can be used.

#### Register schema

Schema that ensures that the two passwords match.

    const RegisterSchema = v.pipe(
      v.object({
        email: v.pipe(
          v.string(),
          v.nonEmpty('Please enter your email.'),
          v.email('The email address is badly formatted.')
        ),
        password1: v.pipe(
          v.string(),
          v.nonEmpty('Please enter your password.'),
          v.minLength(8, 'Your password must have 8 characters or more.')
        ),
        password2: v.string(),
      }),
      v.forward(
        v.partialCheck(
          [['password1'], ['password2']],
          (input) => input.password1 === input.password2,
          'The two passwords do not match.'
        ),
        ['password2']
      )
    );
    

### Related

The following APIs can be combined with `partialCheck`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`union`](union.md),
*   [`variant`](variant.md)

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)