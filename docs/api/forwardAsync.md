forwardAsync
------------

Forwards the issues of the passed validation action.

    const Action = v.forwardAsync<TInput, TIssue>(action, pathKeys);
    

### Generics

*   `TInput` `extends Record<string, unknown> | ArrayLike<unknown>`
*   `TIssue` `extends BaseIssue<unknown>`

### Parameters

*   `action` `BaseValidation<TInput, TInput, TIssue> | BaseValidationAsync<TInput, TInput, TIssue>`
*   `pathKeys` `PathKeys<TInput>`

#### Explanation

`forwardAsync` allows you to forward the issues of the passed validation `action` via `pathKeys` to a nested field of a schema.

### Returns

*   `Action` `BaseValidationAsync<TInput, TInput, TIssue>`

### Examples

The following examples show how `forwardAsync` can be used.

#### Allowed action schema

Schema that checks if the user is allowed to complete an action.

    import { isAllowedAction, isUsernamePresent } from '~/api';
    
    const AllowedActionSchema = v.pipeAsync(
      v.objectAsync({
        username: v.pipeAsync(
          v.string(),
          v.minLength(3),
          v.checkAsync(isUsernamePresent, 'The username is not in the database.')
        ),
        action: v.picklist(['view', 'edit', 'delete']),
      }),
      v.forwardAsync(
        v.checkAsync(
          isAllowedAction,
          'The user is not allowed to complete the action.'
        ),
        ['action']
      )
    );
    

### Related

The following APIs can be combined with `forwardAsync`.

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
*   [`pick`](pick.md)

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

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)