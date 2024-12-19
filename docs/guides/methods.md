Methods
-------

Apart from [`parse`](../api/parse.md) and [`safeParse`](../api/safeParse.md), Valibot offers some more methods to make working with your schemas easier. In the following we distinguish between schema, object and pipeline methods.

### Schema methods

Schema methods add functionality, simplify ergonomics, and help you use schemas for validation and data extraction.

Schema methods:*   [`assert`](../api/assert.md),
*   [`config`](../api/config.md),
*   [`fallback`](../api/fallback.md),
*   [`flatten`](../api/flatten.md),
*   [`getDefault`](../api/getDefault.md),
*   [`getDefaults`](../api/getDefaults.md),
*   [`getFallback`](../api/getFallback.md),
*   [`getFallbacks`](../api/getFallbacks.md),
*   [`is`](../api/is.md),
*   [`parse`](../api/parse.md),
*   [`safeParse`](../api/safeParse.md),
*   [`pipe`](../api/pipe.md),
*   [`unwrap`](../api/unwrap.md)

> For more information on [`pipe`](../api/pipe.md), see the [pipelines](pipelines.md) guide. For more information on validation methods, see the [parse data](parse-data.md) guide. For more information on [`flatten`](../api/flatten.md), see the [issues](issues.md) guide.

#### Fallback

If an issue occurs while validating your schema, you can catch it with [`fallback`](../api/fallback.md) to return a predefined value instead.

    import * as v from 'valibot';
    
    const StringSchema = v.fallback(v.string(), 'hello');
    const stringOutput = v.parse(StringSchema, 123); // 'hello'
    

### Object methods

Object methods make it easier for you to work with object schemas. They are strongly oriented towards TypeScript's utility types.

Object methods:*   [`keyof`](../api/keyof.md),
*   [`omit`](../api/omit.md),
*   [`partial`](../api/partial.md),
*   [`pick`](../api/pick.md),
*   [`required`](../api/required.md)

#### TypeScript similarities

Like in TypeScript, you can make the values of an object optional with [`partial`](../api/partial.md), make them required with [`required`](../api/required.md), and even include/exclude certain values from an existing schema with [`pick`](../api/pick.md) and [`omit`](../api/omit.md).

    import * as v from 'valibot';
    
    // TypeScript
    type Object1 = Partial<{ key1: string; key2: number }>;
    
    // Valibot
    const object1 = v.partial(v.object({ key1: v.string(), key2: v.number() }));
    
    // TypeScript
    type Object2 = Pick<Object1, 'key1'>;
    
    // Valibot
    const object2 = v.pick(object1, ['key1']);
    

### Pipeline methods

Pipeline methods modify the results of validations and transformations within a pipeline.

Pipeline methods:*   [`forward`](../api/forward.md)

> For more info about our pipeline feature, see the [pipelines](pipelines.md) guide.

#### Forward

‎[`forward`](../api/forward.md) allows you to associate an issue with a nested schema. For example, if you want to check that both password entries in a registration form match, you can use it to forward the issue to the second password field in case of an error. This allows you to display the error message in the correct place.

    import * as v from 'valibot';
    
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