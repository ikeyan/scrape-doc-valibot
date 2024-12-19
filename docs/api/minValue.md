minValue
--------

Creates a min value validation action.

    const Action = v.minValue<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<MaxValueIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minValue` you can validate the value of a string, number, boolean or date. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinValueAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minValue` can be used.

#### Number schema

Schema to validate a number with a minimum value.

    const NumberSchema = v.pipe(
      v.number(),
      v.minValue(100, 'The number must be at least 100.')
    );
    

#### Date schema

Schema to validate a date with a minimum year.

    const DateSchema = v.pipe(
      v.date(),
      v.minValue(new Date('2000-01-01'), 'The date must be after the year 1999.')
    );
    

### Related

The following APIs can be combined with `minValue`.

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