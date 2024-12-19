Quick start
-----------

A Valibot schema can be compared to a type definition in TypeScript. The big difference is that TypeScript types are "not executed" and are more or less a DX feature. A schema on the other hand, apart from the inferred type definition, can also be executed at runtime to truly guarantee type safety of unknown data.

> Until Valibot reaches v1, feedback on the API, naming, and implementation is very welcome and much appreciated. Please create or reply to an [issue](https://github.com/fabian-hiller/valibot/issues) and help Valibot be the best schema library for JavaScript and TypeScript.

### Basic concept

Similar to how types can be defined in TypeScript, Valibot allows you to define a schema with various small functions. This applies to primitive values like strings as well as more complex data sets like objects.

    import * as v from 'valibot';
    
    // TypeScript
    type LoginData = {
      email: string;
      password: string;
    };
    
    // Valibot
    const LoginSchema = v.object({
      email: v.string(),
      password: v.string(),
    });
    

### Pipelines

In addition, pipelines enable you to perform more detailed validations and transformations with the [`pipe`](../api/pipe.md) method. Thus, for example, it can be ensured that a string is an email that ends with a certain domain.

    import * as v from 'valibot';
    
    const EmailSchema = v.pipe(v.string(), v.email(), v.endsWith('@example.com'));
    

A pipeline must always start with a schema, followed by up to 19 validation or transformation actions. They are executed in sequence, and the result of the previous action is passed to the next. More details about pipelines can be found in [this guide](pipelines.md).

### Error messages

If an issue is detected during validation, the library emits a specific issue object that includes various details and an error message. This error message can be overridden via the first optional argument of a schema or validation action.

    import * as v from 'valibot';
    
    const LoginSchema = v.object({
      email: v.pipe(
        v.string('Your email must be a string.'),
        v.nonEmpty('Please enter your email.'),
        v.email('The email address is badly formatted.')
      ),
      password: v.pipe(
        v.string('Your password must be a string.'),
        v.nonEmpty('Please enter your password.'),
        v.minLength(8, 'Your password must have 8 characters or more.')
      ),
    });
    

Custom error messages allow you to improve the usability of your software by providing specific troubleshooting information and returning error messages in a language other than English. See the [i18n guide](internationalization.md) for more information.

### Usage

Finally, you can use your schema to infer its input and output types and to parse unknown data. This way, your schema is the single source of truth. This concept simplifies your development process and makes your code more robust in the long run.

    import * as v from 'valibot';
    
    const LoginSchema = v.object({…});
    
    type LoginData = v.InferOutput<typeof LoginSchema>;
    
    function getLoginData(data: unknown): LoginData {
      return v.parse(LoginSchema, data);
    }