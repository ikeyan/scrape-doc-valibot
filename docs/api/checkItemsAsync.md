checkItemsAsync
---------------

Creates a check items validation action.

    const Action = v.checkItemsAsync<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirementAsync<TInput>`
*   `message` `TMessage`

#### Explanation

With `checkItemsAsync` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If an item does not match your `requirement`, you can use `message` to customize the error message.

> The special thing about `checkItemsAsync` is that it automatically forwards each issue to the appropriate item.

### Returns

*   `Action` `CheckItemsActionAsync<TInput, TMessage>`

### Examples

The following examples show how `checkItemsAsync` can be used.

#### Cart items schema

Schema to check an array of cart item objects.

    import { getProductItem } from '~/api';
    
    const CartItemsSchema = v.pipeAsync(
      v.array(
        v.object({
          itemId: v.pipe(v.string(), v.uuid()),
          quantity: v.pipe(v.number(), v.minValue(1)),
        })
      ),
      v.checkItemsAsync(async (input) => {
        const productItem = await getProductItem(input.itemId);
        return (productItem?.quantity ?? 0) >= input.quantity;
      }, 'The required quantity is greater than available.')
    );
    

### Related

The following APIs can be combined with `checkItemsAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`tupleAsync`](tupleAsync.md)