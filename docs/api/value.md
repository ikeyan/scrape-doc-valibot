value
-----

Creates a value validation action.

    const Action = v.value<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<ValueIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `value` you can validate the value of a string, number, boolean or date. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `ValueAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `value` can be used.

#### Number schema

Schema to validate a number with a specific value.

    const NumberSchema = v.pipe(
      v.number(),
      v.value(100, 'The number must be 100.')
    );
    

#### Date schema

Schema to validate a date with a specific value.

    const DateSchema = v.pipe(
      v.date(),
      v.value(new Date('2000-01-01'), 'The date must be the first day of 2000.')
    );
    

### Related

The following APIs can be combined with `value`.

#### Schemas

*   [`any`](any.md),
*   [`bigint`](bigint.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`number`](number.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)