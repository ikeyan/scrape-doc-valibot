forward
-------

Forwards the issues of the passed validation action.

    const Action = v.forward<TInput, TIssue>(action, pathKeys);
    

### Generics

*   `TInput` `extends Record<string, unknown> | ArrayLike<unknown>`
*   `TIssue` `extends BaseIssue<unknown>`

### Parameters

*   `action` `BaseValidation<TInput, TInput, TIssue>`
*   `pathKeys` `PathKeys<TInput>`

#### Explanation

`forward` allows you to forward the issues of the passed validation `action` via `pathKeys` to a nested field of a schema.

### Returns

*   `Action` `BaseValidation<TInput, TInput, TIssue>`

### Examples

The following examples show how `forward` can be used.

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

The following APIs can be combined with `forward`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md)

#### Methods

*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`empty`](empty.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`includes`](includes.md),
*   [`length`](length.md),
*   [`mapItems`](mapItems.md),
*   [`maxLength`](maxLength.md),
*   [`metadata`](metadata.md),
*   [`minLength`](minLength.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notLength`](notLength.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)