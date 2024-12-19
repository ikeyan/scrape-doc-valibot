Issues
------

When validating unknown data against a schema, Valibot collects information about each issue. If there is at least one issue, these are returned in an array. Each issue provides detailed information for you or your users to fix the problem.

### Issue info

A single issue conforms to the TypeScript type definition below.

    type BaseIssue = {
      // Required info
      kind: 'schema' | 'validation' | 'transformation';
      type: string;
      input: unknown;
      expected: string | null;
      received: string;
      message: string;
    
      // Optional info
      requirement?: unknown;
      path?: IssuePath;
      issues?: Issues;
      lang?: string;
      abortEarly?: boolean;
      abortPipeEarly?: boolean;
      skipPipe?: boolean;
    };
    

#### Required info

Each issue contains the following required information.

##### Kind

`kind` describes the kind of the problem. If an input does not match the data type, for example a number was passed instead of a string, `kind` has the value `'schema'`. In all other cases, the reason is not the data type but the actual content of the data. For example, if a string is invalid because it does not match a regex, `kind` has the value `'validation'`.

##### Type

`type` describes which function did the validation. If the schema function [`array`](../api/array.md) detects that the input is not an array, `type` has the value `'array'`. If the [`minLength`](../api/minLength.md) validation function detects that an array is too short, `type` has the value `'min_length'`.

##### Input

`input` contains the input data where the issue was found. For complex data, for example objects, `input` contains the value of the respective key that does not match the schema.

##### Expected

`expected` is a language-neutral string that describes the data property that was expected. It can be used to create useful error messages. If your users aren't developers, you can replace the language-neutral symbols with language-specific words.

##### Received

`received` is a language-neutral string that describes the data property that was received. It can be used to create useful error messages. If your users aren't developers, you can replace the language-neutral symbols with language-specific words.

##### Message

`message` contains a human-understandable error message that can be fully customized as described in our [quick start](quick-start.md) and [internationalization](internationalization.md) guide.

#### Optional info

Some issues contain further optional information.

##### Requirement

`requirement` can contain further validation information. For example, if the [`minLength`](../api/minLength.md) validation function detects that a string is too short, `requirement` contains the minimum length that the string should have.

##### Path

`path` is an array of objects that describes where an issue is located within complex data. Each path item contains the following information.

> The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.

    type PathItem = {
      type: string;
      origin: 'key' | 'value';
      input: unknown;
      key?: unknown;
      value: unknown;
    };
    

For example, you can use the following code to create a dot path.

    import * as v from 'valibot';
    
    const dotPath = v.getDotPath(issue);
    

##### Issues

`issues` currently only occur when using [`union`](../api/union.md) and contains all issues of the schemas of an union type.

##### Config

`lang` can be used as part of our [i18n feature](internationalization.md) to define the required language. `abortEarly` and `abortPipeEarly` gives you an info that the validation was aborted prematurely. You can find more info about this in the [parse data](parse-data.md) guide. These are all configurations that you can control yourself.

### Formatting

For common use cases such as form validation, Valibot includes small built-in functions for formatting issues. However, once you understand how they work, you can easily format them yourself and put them in the right form for your use case.

#### Flatten errors

If you are only interested in the error messages of each issue to show them to your users, you can convert an array of issues to a flat object with [`flatten`](../api/flatten.md). Below is an example.

    import * as v from 'valibot';
    
    const ObjectSchema = v.object({
      foo: v.string('Value of "foo" is missing.'),
      bar: v.object({
        baz: v.string('Value of "bar.baz" is missing.'),
      }),
    });
    
    const result = v.safeParse(ObjectSchema, { bar: {} });
    
    if (result.issues) {
      console.log(v.flatten<typeof ObjectSchema>(result.issues));
    }
    

The `result` returned in the code sample above this text contains the following issues.

    [
      {
        kind: 'schema',
        type: 'string',
        input: undefined,
        expected: 'string',
        received: 'undefined',
        message: 'Value of "foo" is missing.',
        path: [
          {
            type: 'object',
            origin: 'value',
            input: {
              bar: {},
            },
            key: 'foo',
            value: undefined,
          },
        ],
      },
      {
        kind: 'schema',
        type: 'string',
        input: undefined,
        expected: 'string',
        received: 'undefined',
        message: 'Value of "bar.baz" is missing.',
        path: [
          {
            type: 'object',
            origin: 'value',
            input: {
              bar: {},
            },
            key: 'bar',
            value: {},
          },
          {
            type: 'object',
            origin: 'value',
            input: {},
            key: 'baz',
            value: undefined,
          },
        ],
      },
    ];
    

However, with the help of [`flatten`](../api/flatten.md) the issues were converted to the following object.

    {
      nested: {
        foo: ['Value of "foo" is missing.'],
        'bar.baz': ['Value of "bar.baz" is missing.'],
      },
    };