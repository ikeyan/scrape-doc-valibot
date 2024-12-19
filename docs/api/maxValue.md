maxValue
--------

Creates a max value validation action.

    const Action = v.maxValue<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<MaxValueIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxValue` you can validate the value of a string, number, boolean or date. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxValueAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxValue` can be used.

#### Number schema

Schema to validate a number with a maximum value.

    const NumberSchema = v.pipe(
      v.number(),
      v.maxValue(100, 'The number must not exceed 100.')
    );
    

#### Date schema

Schema to validate a date with a maximum year.

    const DateSchema = v.pipe(
      v.date(),
      v.maxValue(new Date('1999-12-31'), 'The date must not exceed the year 1999.')
    );
    

### Related

The following APIs can be combined with `maxValue`.

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