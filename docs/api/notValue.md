notValue
--------

Creates a not value validation action.

    const Action = v.notValue<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<NotValueIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notValue` you can validate the value of a string, number, boolean or date. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotValueAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notValue` can be used.

#### Number schema

Schema to validate a number that is more or less than 100.

    const NumberSchema = v.pipe(
      v.number(),
      v.notValue(100, 'The number must not be 100.')
    );
    

#### Date schema

Schema to validate a date that is before or after the start of 2000.

    const DateSchema = v.pipe(
      v.date(),
      v.notValue(new Date('2000-01-01'), 'The date must not be the start of 2000.')
    );
    

### Related

The following APIs can be combined with `notValue`.

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