toMinValue
----------

Creates a to min value transformation action.

    const Action = v.toMinValue<TInput, TRequirement>(requirement);
    

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Parameters

*   `requirement` `TRequirement`

#### Explanation

With `toMinValue` you can enforce a minimum value for a number, date or string. If the input does not meet the `requirement`, it will be changed to its value.

### Returns

*   `Action` `ToMinValueAction<TInput, TRequirement>`

### Examples

The following examples show how `toMinValue` can be used.

#### Number schema

Schema to enforce a minimum value for a number.

    const NumberSchema = v.pipe(v.number(), v.toMinValue(100));
    

#### Date schema

Schema to enforce a minimum value for a date.

    const DateSchema = v.pipe(v.date(), v.toMinValue(new Date('1999-12-31')));
    

### Related

The following APIs can be combined with `toMinValue`.

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