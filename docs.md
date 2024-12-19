# Valibot Guides and API Reference
Introduction
------------

Hello, I am Valibot and I would like to help you validate data easily using a schema. No matter if it is incoming data on a server, a form or even configuration files. I have no dependencies and can run in any JavaScript environment.

> I highly recommend you read the [announcement post](https://www.builder.io/blog/introducing-valibot), and if you are a nerd like me, the [bachelor's thesis](../thesis.pdf.md) I am based on.

### Highlights

*   Fully type safe with static type inference
*   Small bundle size starting at less than 600 bytes
*   Validate everything from strings to complex objects
*   Open source and fully tested with 100 % coverage
*   Many transformation and validation actions included
*   Well structured source code without dependencies
*   Minimal, readable and well thought out API

### Example

First you create a schema that describes a structured data set. A schema can be compared to a type definition in TypeScript. The big difference is that TypeScript types are "not executed" and are more or less a DX feature. A schema on the other hand, apart from the inferred type definition, can also be executed at runtime to guarantee type safety of unknown data.

    import * as v from 'valibot'; // 1.24 kB
    
    // Create login schema with email and password
    const LoginSchema = v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(8)),
    });
    
    // Infer output TypeScript type of login schema
    type LoginData = v.InferOutput<typeof LoginSchema>; // { email: string; password: string }
    
    // Throws error for `email` and `password`
    v.parse(LoginSchema, { email: '', password: '' });
    
    // Returns data as { email: string; password: string }
    v.parse(LoginSchema, { email: 'jane@example.com', password: '12345678' });
    

Apart from [`parse`](../api/parse.md) I also offer a non-exception-based API with [`safeParse`](../api/safeParse.md) and a type guard function with [`is`](../api/is.md). You can read more about it [here](parse-data.md).

### Comparison

Instead of relying on a few large functions with many methods, my API design and source code is based on many small and independent functions, each with just a single task. This modular design has several advantages.

For example, this allows a bundler to use the import statements to remove code that is not needed. This way, only the code that is actually used gets into your production build. This can reduce the bundle size by up to 95 % compared to [Zod](https://zod.dev/).

In addition, it allows you to easily extend my functionality with external code and makes my source code more robust and secure because the functionality of the individual functions can be tested much more easily through unit tests.

### Credits

My friend [Fabian](https://twitter.com/FabianHiller) created me as part of his bachelor thesis at [Stuttgart Media University](https://www.hdm-stuttgart.de/en/), supervised by Walter Kriha, [Miško Hevery](https://twitter.com/mhevery) and [Ryan Carniato](https://twitter.com/RyanCarniato). My role models also include [Colin McDonnell](https://twitter.com/colinhacks), who had a big influence on my API design with [Zod](https://zod.dev/).

### Feedback

Find a bug or have an idea how to improve my code? Please fill out an [issue](https://github.com/fabian-hiller/valibot/issues/new). Together we can make the library even better!

### License

I am completely free and licensed under the [MIT license](https://github.com/fabian-hiller/valibot/blob/main/LICENSE.md). But if you like, you can feed me with a star on [GitHub](https://github.com/fabian-hiller/valibot).

Installation
------------

Valibot is currently available for Node, Bun and Deno. Below you will learn how to add the library to your project.

### General

Except for this guide, the rest of this documentation assumes that you are using npm for the import statements in the code examples.

It should make no difference whether you use individual imports or a wildcard import. Tree shaking and code splitting should work in both cases.

If you are using TypeScript, we recommend that you enable strict mode in your `tsconfig.json` so that all types are calculated correctly.

> The minimum required TypeScript version is v5.0.2.

    {
      "compilerOptions": {
        "strict": true,
        // ...
      }
    }
    

### From npm

For Node and Bun, you can add the library to your project with a single command using your favorite package manager.

    npm install valibot     # npm
    yarn add valibot        # yarn
    pnpm add valibot        # pnpm
    bun add valibot         # bun
    

Then you can import it into any JavaScript or TypeScript file.

    // With individual imports
    import { … } from 'valibot';
    
    // With a wildcard import
    import * as v from 'valibot';
    

### From JSR

For Node, Deno and Bun, you can add the library to your project with a single command using your favorite package manager.

    deno add jsr:@valibot/valibot      # deno
    npx jsr add @valibot/valibot       # npm
    yarn dlx jsr add @valibot/valibot  # yarn
    pnpm dlx jsr add @valibot/valibot  # pnpm
    bunx jsr add @valibot/valibot      # bun
    

Then you can import it into any JavaScript or TypeScript file.

    // With individual imports
    import { … } from '@valibot/valibot';
    
    // With a wildcard import
    import * as v from '@valibot/valibot';
    

In Deno, you can also directly reference me using `jsr:` specifiers.

    // With individual imports
    import { … } from 'jsr:@valibot/valibot';
    
    // With a wildcard import
    import * as v from 'jsr:@valibot/valibot';
    

### From Deno

With Deno, you can reference the library directly through our deno.land/x URL.

    // With individual imports
    import { … } from 'https://deno.land/x/valibot/mod.ts';
    
    // With a wildcard import
    import * as v from 'https://deno.land/x/valibot/mod.ts';

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

Use cases
---------

Next, we would like to point out some use cases for which Valibot is particularly well suited. We welcome [ideas](https://github.com/fabian-hiller/valibot/issues/new) for other use cases that we may not have thought of yet.

### Server requests

Since most API endpoints can be reached via the Internet, basically anyone can send a request and transmit data. It is therefore important to apply zero trust security and to check request data thoroughly before processing it further.

This works particularly well with a schema, compared to if/else conditions, as even complex structures can be easily mapped. In addition, the library automatically type the parsed data according to the schema, which improves type safety and thus makes your code more secure.

### Form validation

A schema can also be used for form validation. Due to Valibot's small bundle size and the possibility to individualize the error messages, the library is particularly well suited for this. Also, fullstack frameworks like Next.js, Remix, and Nuxt allow the same schema to be used for validation in the browser as well as on the server, which reduces your code to the minimum.

[Modular Forms](https://modularforms.dev/react/guides/validate-your-fields#schema-validation), for example, offers validation based on a schema at form and field level. In addition, the form can be made type-safe using the schema, which also enables autocompletion during development. In combination with the right framework, a fully type-safe and progressively enhanced form can be created with few lines of code and a great experience for developers and end-users.

### Browser state

The browser state, which is stored using cookies, search parameters or the local storage, can be accidentally or intentionally manipulated by the user. To ensure the functionality of an application, it can help to validate this data before processing. Valibot can be used for this, which also improves type safety.

### Config files

Library authors can also make use of Valibot, for example, to match configuration files with a schema and, in the event of an error, provide clear indications of the cause and how to fix the problem. The same applies to environment variables to quickly detect configuration errors.

Comparison
----------

Even though Valibot's API resembles other solutions at first glance, the implementation and structure of the source code is very different. In the following, we would like to highlight the differences that can be beneficial for both you and your users.

### Modular design

Instead of relying on a few large functions with many methods, Valibot's API design and source code is based on many small and independent functions, each with just a single task. This modular design has several advantages.

On one hand, the functionality of Valibot can be easily extended with external code. On the other, it makes the source code more robust and secure because the functionality of the individual functions as well as special edge cases can be tested much easier through unit tests.

However, perhaps the biggest advantage is that a bundler can use the static import statements to remove any code that is not needed. Thus, only the code that is actually used ends up in the production build. This allows us to extend the functionality of the library with additional functions without increasing the bundle size for all users.

This can make a big difference, especially for client-side validation, as it reduces the bundle size and, depending on the framework, speeds up the startup time.

    import * as v from 'valibot'; // 1.19 kB
    
    const LoginSchema = v.object({
      email: v.pipe(
        v.string(),
        v.nonEmpty('Please enter your email.'),
        v.email('The email address is badly formatted.')
      ),
      password: v.pipe(
        v.string(),
        v.nonEmpty('Please enter your password.'),
        v.minLength(8, 'Your password must have 8 characters or more.')
      ),
    });
    

#### Comparison with Zod

For example, to validate a simple login form, [Zod](https://zod.dev/) requires [12.9 kB](https://bundlejs.com/?q=zod&treeshake=%5B%7B+object%2Cstring+%7D%5D) whereas Valibot require only [1.19 kB](https://bundlejs.com/?q=valibot&treeshake=%5B%7B+email%2CminLength%2CnonEmpty%2Cobject%2Cstring%2Cpipe+%7D%5D). That's a 92 % reduction in bundle size. This is due to the fact that Zod's functions have several methods with additional functionalities, that cannot be easily removed by current bundlers when they are not executed in your source code.

    import { object, string } from 'zod'; // 12.9 kB
    
    const LoginSchema = object({
      email: string()
        .min(1, 'Please enter your email.')
        .email('The email address is badly formatted.'),
      password: string()
        .min(1, 'Please enter your password.')
        .min(8, 'Your password must have 8 characters or more.'),
    });
    

### Performance

With a schema library, a distinction must be made between startup performance and runtime performance. Startup performance describes the time required to load and initialize the library. This benchmark is mainly influenced by the bundle size and the amount of work required to create a schema. Runtime performance describes the time required to validate unknown data using a schema.

Since Valibot's implementation is optimized to minimize the bundle size and the effort of initialization, there is hardly any library that performs better in a [TTI](https://web.dev/articles/tti) benchmark. In terms of runtime performance, Valibot is in the midfield. Roughly speaking, the library is about twice as fast as [Zod](https://zod.dev/), but much slower than [Typia](https://typia.io/) and [TypeBox](https://github.com/sinclairzx81/typebox), because we don't yet use a compiler that can generate highly optimized runtime code, and my implementation doesn't allow the use of the [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function) constructor.

> Further details on performance can be found in the [bachelor's thesis](../thesis.pdf.md) Valibot is based on.

Ecosystem
---------

This page is for you if you are looking for frameworks or libraries that support Valibot.

> Use the button at the bottom left of this page to add your project to this ecosystem page. Please make sure to add your project to an appropriate existing category in alphabetical order or create a new category if necessary.

### Frameworks

*   [NestJS](https://docs.nestjs.com/): A progressive Node.js framework for building efficient, reliable and scalable server-side applications
*   [Qwik](https://qwik.dev/): A web framework which helps you build instantly-interactive web apps at any scale without effort.

### API libraries

*   [Drizzle ORM](https://orm.drizzle.team/): TypeScript ORM that feels like writing SQL
*   [GQLoom](https://gqloom.dev/): Weave GraphQL schema and resolvers using Valibot
*   [Hono](https://hono.dev/): Ultrafast web framework for the Edges
*   [next-safe-action](https://next-safe-action.dev/) Type safe and validated Server Actions for Next.js
*   [tRPC](https://trpc.io/): Move Fast and Break Nothing. End-to-end typesafe APIs made easy

### Form libraries

*   [@rvf/valibot](https://github.com/airjp73/rvf/tree/main/packages/valibot): Valibot schema parser for [RVF](https://rvf-js.io/)
*   [conform-to-valibot](https://github.com/chimame/conform-to-valibot): Valibot schema parser for [conform](https://conform.guide/)
*   [mantine-form-valibot-resolver](https://github.com/Songkeys/mantine-form-valibot-resolver): Valibot schema resolver for [@mantine/form](https://mantine.dev/form/use-form/)
*   [maz-ui](https://maz-ui.com/composables/use-form-validator): Vue3 flexible and typed composable to manage forms simply with multiple modes and advanced features
*   [Modular Forms](https://modularforms.dev/): Modular and type-safe form library for SolidJS, Qwik, Preact and React
*   [React Hook Form](https://react-hook-form.com/): React Hooks for form state management and validation
*   [Superforms](https://superforms.rocks/): A comprehensive SvelteKit form library for server and client validation
*   [TanStack Form](https://tanstack.com/form): Powerful and type-safe form state management for the web
*   [VeeValidate](https://vee-validate.logaretm.com/v4/): Painless Vue.js forms
*   [vue-valibot-form](https://github.com/IlyaSemenov/vue-valibot-form): Minimalistic Vue3 composable for handling form submit

### Component libraries

*   [Nuxt UI](https://ui.nuxt.com/): Fully styled and customizable components for Nuxt

### Valibot to X

*   [@valibot/to-json-schema](https://github.com/fabian-hiller/valibot/tree/main/packages/to-json-schema): The official JSON schema converter for Valibot
*   [@gcornut/cli-valibot-to-json-schema](https://github.com/gcornut/cli-valibot-to-json-schema): CLI wrapper for @valibot/to-json-schema
*   [TypeSchema](https://typeschema.com/): Universal adapter for schema validation

### X to Valibot

*   [graphql-codegen-typescript-validation-schema](https://github.com/Code-Hex/graphql-codegen-typescript-validation-schema): GraphQL Code Generator plugin to generate form validation schema from your GraphQL schema.
*   [TypeBox-Codegen](https://sinclairzx81.github.io/typebox-workbench/): Code generation for schema libraries

### Utilities

*   [@camflan/valibot-openapi-generator](https://github.com/camflan/valibot-openapi-generator): Functions to help build OpenAPI documentation using Valibot schemas
*   [@nest-lab/typeschema](https://github.com/jmcdo29/nest-lab/tree/main/packages/typeschema): A ValidationPipe that handles many schema validators in a class-based fashion for NestJS's input validation
*   [@valibot/i18n](https://github.com/fabian-hiller/valibot/tree/main/packages/i18n): The official i18n translations for Valibot
*   [fastify-type-provider-valibot](https://github.com/qlaffont/fastify-type-provider-valibot): Fastify Type Provider with Valibot
*   [valibot-env](https://y-hiraoka.github.io/valibot-env): Environment variables validator with Valibot
*   [valibotx](https://github.com/IlyaSemenov/valibotx): A collection of extensions and shortcuts to core Valibot functions
*   [valiload](https://github.com/JuerGenie/valiload): A simple and lightweight library for overloading functions in TypeScript
*   [valimock](https://github.com/saeris/valimock): Generate mock data using your Valibot schemas using [Faker](https://github.com/faker-js/faker)

Mental model
------------

Valibot's mental model is mainly divided between **schemas**, **methods**, and **actions**. Since each functionality is imported as its own function, it is crucial to understand this concept as it makes working with the modular API design much easier.

 

> The [API reference](../api.md) gives you a great overview of all schemas, methods, and actions. For each one, the corresponding reference page also lists down other related schemas, methods, and actions for better discoverability.

### Schemas

Schemas are the starting point for using Valibot. They allow you to validate **a specific data type**, like a string, object, or date. Each schema is independent. They can be reused or even nested to reflect more complex data structures.

    import * as v from 'valibot';
    
    const BookSchema = v.object({
      title: v.string(),
      numberOfPages: v.number(),
      publication: v.date(),
      tags: v.array(v.string()),
    });
    

Every schema function returns an accesible object that contains all its properties. However, in most cases you don't need to access them directly. Instead, you use methods that help you modify or use a schema.

### Methods

Methods help you either **modify or use a schema**. For example, the [`parse`](../api/parse.md) method helps you parse unknown data based on a schema. When you use a method, you always pass the schema as the first argument.

    import * as v from 'valibot';
    
    const BookSchema = v.object({…});
    
    function createBook(data: unknown) {
      return v.parse(BookSchema, data);
    }
    

> Most methods are used with schemas. However, there are a few exceptions, such as [`forward`](../api/forward.md) and [`flatten`](../api/flatten.md), which are used with actions or issues.

### Actions

Actions help you to **further validate or transform** a specific data type. They are used exclusively in conjunction with the [`pipe`](../api/pipe.md) method, which extends the functionality of a schema by adding additional validation and transformation rules. For example, the following schema can be used to trim a string and check if it is a valid email address.

    import * as v from 'valibot';
    
    const EmailSchema = v.pipe(v.string(), v.trim(), v.email());
    

Actions are very powerful. There are basically no limits to what you can do with them. Besides basic validations and transformations as shown in the example above, they also allow you to modify the output type with actions like [`readonly`](../api/readonly.md) and [`brand`](../api/brand.md).

Schemas
-------

Schemas allow you to validate a specific data type. They are similar to type definitions in TypeScript. Besides primitive values like strings and complex values like objects, Valibot also supports special cases like literals, unions and custom types.

### Primitive values

Valibot supports the creation of schemas for any primitive data type. These are immutable values that are stored directly in the stack, unlike objects where only a reference to the heap is stored.

Primitive schemas:*   [`bigint`](../api/bigint.md),
*   [`boolean`](../api/boolean.md),
*   [`null`](../api/null.md),
*   [`number`](../api/number.md),
*   [`string`](../api/string.md),
*   [`symbol`](../api/symbol.md),
*   [`undefined`](../api/undefined.md)

    import * as v from 'valibot';
    
    const BigintSchema = v.bigint(); // bigint
    const BooleanSchema = v.boolean(); // boolean
    const NullSchema = v.null(); // null
    const NumberSchema = v.number(); // number
    const StringSchema = v.string(); // string
    const SymbolSchema = v.symbol(); // symbol
    const UndefinedSchema = v.undefined(); // undefined
    

### Complex values

Among complex values, Valibot supports objects, records, arrays, tuples, and several other classes.

> There are various methods for objects such as [`pick`](../api/pick.md), [`omit`](../api/omit.md), [`partial`](../api/partial.md) and [`required`](../api/required.md). Learn more about them [here](methods.md).

Complex schemas:*   [`array`](../api/array.md),
*   [`blob`](../api/blob.md),
*   [`date`](../api/date.md),
*   [`file`](../api/file.md),
*   [`function`](../api/function.md),
*   [`looseObject`](../api/looseObject.md),
*   [`looseTuple`](../api/looseTuple.md),
*   [`map`](../api/map.md),
*   [`object`](../api/object.md),
*   [`objectWithRest`](../api/objectWithRest.md),
*   [`promise`](../api/promise.md),
*   [`record`](../api/record.md),
*   [`set`](../api/set.md),
*   [`strictObject`](../api/strictObject.md),
*   [`strictTuple`](../api/strictTuple.md),
*   [`tuple`](../api/tuple.md),
*   [`tupleWithRest`](../api/tupleWithRest.md)

    import * as v from 'valibot';
    
    const ArraySchema = v.array(v.string()); // string[]
    const BlobSchema = v.blob(); // Blob
    const DateSchema = v.date(); // Date
    const FileSchema = v.file(); // File
    const FunctionSchema = v.function(); // (...args: unknown[]) => unknown
    const LooseObjectSchema = v.looseObject({ key: v.string() }); // { key: string }
    const LooseTupleSchema = v.looseTuple([v.string(), v.number()]); // [string, number]
    const MapSchema = v.map(v.string(), v.number()); // Map<string, number>
    const ObjectSchema = v.object({ key: v.string() }); // { key: string }
    const ObjectWithRestSchema = v.objectWithRest({ key: v.string() }, v.null()); // { key: string } & { [key: string]: null }
    const PromiseSchema = v.promise(); // Promise<unknown>
    const RecordSchema = v.record(v.string(), v.number()); // Record<string, number>
    const SetSchema = v.set(v.number()); // Set<number>
    const StrictObjectSchema = v.strictObject({ key: v.string() }); // { key: string }
    const StrictTupleSchema = v.strictTuple([v.string(), v.number()]); // [string, number]
    const TupleSchema = v.tuple([v.string(), v.number()]); // [string, number]
    const TupleWithRestSchema = v.tupleWithRest([v.string(), v.number()], v.null()); // [string, number, ...null[]]
    

### Special cases

Beyond primitive and complex values, there are also schema functions for more special cases.

Special schemas:*   [`any`](../api/any.md),
*   [`custom`](../api/custom.md),
*   [`enum`](../api/enum.md),
*   [`instance`](../api/instance.md),
*   [`intersect`](../api/intersect.md),
*   [`lazy`](../api/lazy.md),
*   [`literal`](../api/literal.md),
*   [`nan`](../api/nan.md),
*   [`never`](../api/never.md),
*   [`nonNullable`](../api/nonNullable.md),
*   [`nonNullish`](../api/nonNullish.md),
*   [`nonOptional`](../api/nonOptional.md),
*   [`nullable`](../api/nullable.md),
*   [`nullish`](../api/nullish.md),
*   [`optional`](../api/optional.md),
*   [`picklist`](../api/picklist.md),
*   [`undefinedable`](../api/undefinedable.md),
*   [`union`](../api/union.md),
*   [`unknown`](../api/unknown.md),
*   [`variant`](../api/variant.md),
*   [`void`](../api/void.md)

    import * as v from 'valibot';
    
    const AnySchema = v.any(); // any
    const CustomSchema = v.custom<`${number}px`>(isPixelString); // `${number}px`
    const EnumSchema = v.enum(Direction); // Direction
    const InstanceSchema = v.instance(Error); // Error
    const LazySchema = v.lazy(() => v.string()); // string
    const IntersectSchema = v.intersect([v.string(), v.literal('a')]); // string & 'a'
    const LiteralSchema = v.literal('foo'); // 'foo'
    const NanSchema = v.nan(); // NaN
    const NeverSchema = v.never(); // never
    const NonNullableSchema = v.nonNullable(v.nullable(v.string())); // string
    const NonNullishSchema = v.nonNullish(v.nullish(v.string())); // string
    const NonOptionalSchema = v.nonOptional(v.optional(v.string())); // string
    const NullableSchema = v.nullable(v.string()); // string | null
    const NullishSchema = v.nullish(v.string()); // string | null | undefined
    const OptionalSchema = v.optional(v.string()); // string | undefined
    const PicklistSchema = v.picklist(['a', 'b']); // 'a' | 'b'
    const UndefinedableSchema = v.undefinedable(v.string()); // string | undefined
    const UnionSchema = v.union([v.string(), v.number()]); // string | number
    const UnknownSchema = v.unknown(); // unknown
    const VariantSchema = v.variant('type', [
      v.object({ type: v.literal('a'), foo: v.string() }),
      v.object({ type: v.literal('b'), bar: v.number() }),
    ]); // { type: 'a'; foo: string } | { type: 'b'; bar: number }
    const VoidSchema = v.void(); // void

Pipelines
---------

For detailed validations and transformations, a schema can be wrapped in a pipeline. Especially for schema functions like [`string`](../api/string.md), [`number`](../api/number.md), [`date`](../api/date.md), [`object`](../api/object.md), and [`array`](../api/array.md), this feature is useful for validating properties beyond the raw data type.

### How it works

In simple words, a pipeline is a list of schemas and actions that synchronously passes through the input data. It must always start with a schema, followed by up to 19 schemas or actions. Each schema and action can examine and modify the input. The pipeline is therefore perfect for detailed validations and transformations.

#### Example

For example, the pipeline feature can be used to trim a string and make sure that it is an email that ends with a specific domain.

    import * as v from 'valibot';
    
    const EmailSchema = v.pipe(
      v.string(),
      v.trim(),
      v.email(),
      v.endsWith('@example.com')
    );
    

### Validations

Pipeline validation actions examine the input and, if the input does not meet a certain condition, return an issue. If the input is valid, it is returned as the output and, if present, picked up by the next action in the pipeline.

> Whenever possible, pipelines are run completely, even if an issue has occurred, to collect all possible issues. If you want to abort the pipeline early after the first issue, you need to set the `abortPipeEarly` option to `true`. Learn more about this [here](parse-data.md).

Validation actions:*   [`base64`](../api/base64.md),
*   [`bic`](../api/bic.md),
*   [`bytes`](../api/bytes.md),
*   [`check`](../api/check.md),
*   [`checkItems`](../api/checkItems.md),
*   [`creditCard`](../api/creditCard.md),
*   [`cuid2`](../api/cuid2.md),
*   [`decimal`](../api/decimal.md),
*   [`digits`](../api/digits.md),
*   [`email`](../api/email.md),
*   [`emoji`](../api/emoji.md),
*   [`empty`](../api/empty.md),
*   [`endsWith`](../api/endsWith.md),
*   [`everyItem`](../api/everyItem.md),
*   [`excludes`](../api/excludes.md),
*   [`finite`](../api/finite.md),
*   [`graphemes`](../api/graphemes.md),
*   [`hash`](../api/hash.md),
*   [`hexadecimal`](../api/hexadecimal.md),
*   [`hexColor`](../api/hexColor.md),
*   [`includes`](../api/includes.md),
*   [`integer`](../api/integer.md),
*   [`ip`](../api/ip.md),
*   [`ipv4`](../api/ipv4.md),
*   [`ipv6`](../api/ipv6.md),
*   [`isoDate`](../api/isoDate.md),
*   [`isoDateTime`](../api/isoDateTime.md),
*   [`isoTime`](../api/isoTime.md),
*   [`isoTimeSecond`](../api/isoTimeSecond.md),
*   [`isoTimestamp`](../api/isoTimestamp.md),
*   [`isoWeek`](../api/isoWeek.md),
*   [`length`](../api/length.md),
*   [`mac`](../api/mac.md),
*   [`mac48`](../api/mac48.md),
*   [`mac64`](../api/mac64.md),
*   [`maxBytes`](../api/maxBytes.md),
*   [`maxGraphemes`](../api/maxGraphemes.md),
*   [`maxLength`](../api/maxLength.md),
*   [`maxSize`](../api/maxSize.md),
*   [`maxValue`](../api/maxValue.md),
*   [`maxWords`](../api/maxWords.md),
*   [`mimeType`](../api/mimeType.md),
*   [`minBytes`](../api/minBytes.md),
*   [`minGraphemes`](../api/minGraphemes.md),
*   [`minLength`](../api/minLength.md),
*   [`minSize`](../api/minSize.md),
*   [`minValue`](../api/minValue.md),
*   [`minWords`](../api/minWords.md),
*   [`multipleOf`](../api/multipleOf.md),
*   [`nanoid`](../api/nanoid.md),
*   [`nonEmpty`](../api/nonEmpty.md),
*   [`notBytes`](../api/notBytes.md),
*   [`notGraphemes`](../api/notGraphemes.md),
*   [`notLength`](../api/notLength.md),
*   [`notSize`](../api/notSize.md),
*   [`notValue`](../api/notValue.md),
*   [`notWords`](../api/notWords.md),
*   [`octal`](../api/octal.md),
*   [`partialCheck`](../api/partialCheck.md),
*   [`rawCheck`](../api/rawCheck.md),
*   [`regex`](../api/regex.md),
*   [`safeInteger`](../api/safeInteger.md),
*   [`size`](../api/size.md),
*   [`someItem`](../api/someItem.md),
*   [`startsWith`](../api/startsWith.md),
*   [`ulid`](../api/ulid.md),
*   [`url`](../api/url.md),
*   [`uuid`](../api/uuid.md),
*   [`value`](../api/value.md),
*   [`words`](../api/words.md)

Some of these actions can be combined with different schemas. For example, [`minValue`](../api/minValue.md) can be used to validate the minimum value of [`string`](../api/string.md), [`number`](../api/number.md), [`bigint`](../api/bigint.md), and [`date`](../api/date.md).

    import * as v from 'valibot';
    
    const StringSchema = v.pipe(v.string(), v.minValue('foo'));
    const NumberSchema = v.pipe(v.number(), v.minValue(1234));
    const BigintSchema = v.pipe(v.bigint(), v.minValue(1234n));
    const DateSchema = v.pipe(v.date(), v.minValue(new Date()));
    

#### Custom validation

For custom validations, [`check`](../api/check.md) can be used. If the function passed as the first argument returns `false`, an issue is returned. Otherwise, the input is considered valid.

    import * as v from 'valibot';
    import { isValidUsername } from '~/utils';
    
    const UsernameSchema = v.pipe(
      v.string(),
      v.check(isValidUsername, 'This username is invalid.')
    );
    

> You can forward the issues of a pipeline validation to a child. See the [methods](methods.md) guide for more information.

### Transformations

Pipeline transformation actions allow to change the value and data type of the input data. This can be useful for example to remove spaces at the beginning or end of a string or to force a minimum or maximum value.

Transformation actions:*   [`brand`](../api/brand.md),
*   [`filterItems`](../api/filterItems.md),
*   [`findItem`](../api/findItem.md),
*   [`mapItems`](../api/mapItems.md),
*   [`rawTransform`](../api/rawTransform.md),
*   [`readonly`](../api/readonly.md),
*   [`reduceItems`](../api/reduceItems.md),
*   [`sortItems`](../api/sortItems.md),
*   [`toLowerCase`](../api/toLowerCase.md),
*   [`toMaxValue`](../api/toMaxValue.md),
*   [`toMinValue`](../api/toMinValue.md),
*   [`toUpperCase`](../api/toUpperCase.md),
*   [`transform`](../api/transform.md),
*   [`trim`](../api/trim.md),
*   [`trimEnd`](../api/trimEnd.md),
*   [`trimStart`](../api/trimStart.md)

For example, the pipeline of the following schema enforces a minimum value of 10. If the input is less than 10, it is replaced with the specified minimum value.

    import * as v from 'valibot';
    
    const NumberSchema = v.pipe(v.number(), v.toMinValue(10));
    

#### Custom transformation

For custom transformations, [`transform`](../api/transform.md) can be used. The function passed as the first argument is called with the input data and the return value defines the output. The following transformation changes the output of the schema to `null` for any number less than 10.

    import * as v from 'valibot';
    
    const NumberSchema = v.pipe(
      v.number(),
      v.transform((input) => (input < 10 ? null : input))
    );
    

### Metadata

In addition to the validation and transformation actions, a pipeline can also be used to add metadata to a schema. This can be useful when working with AI tools or for documentation purposes.

Metadata actions:*   [`description`](../api/description.md),
*   [`metadata`](../api/metadata.md),
*   [`title`](../api/title.md)

    const UsernameSchema = v.pipe(
      v.string(),
      v.regex(/^[a-z0-9_-]{4,16}$/iu),
      v.title('Username'),
      v.description(
        'A username must be between 4 and 16 characters long and can only contain letters, numbers, underscores and hyphens.'
      )
    );

Parse data
----------

Now that you've learned how to create a schema, let's look at how you can use it to validate unknown data and make it type-safe. There are three different ways to do this.

> Each schema has a `~validate` method. However, this is an internal API and should only be used if you know what you are doing.

### Default way

The [`parse`](../api/parse.md) method will throw a [`ValiError`](../api/ValiError.md) if the input does not match the schema. Therefore, you should use a try/catch block to catch errors. If the input matches the schema, it is valid and the output of the schema will be returned with the correct TypeScript type.

    import * as v from 'valibot';
    
    try {
      const EmailSchema = v.pipe(v.string(), v.email());
      const email = v.parse(EmailSchema, 'jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.log(error);
    }
    

### Safe parse

If you want issues to be returned instead of thrown, you can use [`safeParse`](../api/safeParse.md). The returned value then contains the `.success` property, which is `true` if the input is valid or `false` otherwise.

If the input is valid, you can use `.output` to get the output of the schema validation. Otherwise, if the input was invalid, the issues found can be accessed via `.issues`.

    import * as v from 'valibot';
    
    const EmailSchema = v.pipe(v.string(), v.email());
    const result = v.safeParse(EmailSchema, 'jane@example.com');
    
    if (result.success) {
      const email = result.output;
    } else {
      console.log(result.issues);
    }
    

### Type guards

Another way to validate data that can be useful in individual cases is to use a type guard. You can use either a type predicate with the [`is`](../api/is.md) method or an assertion function with the [`assert`](../api/assert.md) method.

If a type guard is used, the issues of the validation cannot be accessed. Also, transformations have no effect and unknown keys of an object are not removed. Therefore, this approach is not as safe and powerful as the two previous ways. Also, due to a TypeScript limitation, it can currently only be used with synchronous schemas.

    import * as v from 'valibot';
    
    const EmailSchema = v.pipe(v.string(), v.email());
    const data: unknown = 'jane@example.com';
    
    if (v.is(EmailSchema, data)) {
      const email = data; // string
    }
    

### Configuration

By default, Valibot exhaustively collects every issue during validation to give you detailed feedback on why the input does not match the schema. If this is not required for your use case, you can control this behavior with `abortEarly` and `abortPipeEarly` to improve the performance of validation.

#### Abort validation

If you set `abortEarly` to `true`, data validation immediately aborts upon finding the first issue. If you just want to know if some data matches a schema, but you don't care about the details, this can improve performance.

    import * as v from 'valibot';
    
    try {
      const ProfileSchema = v.object({
        name: v.string(),
        bio: v.string(),
      });
      const profile = v.parse(
        ProfileSchema,
        { name: 'Jane', bio: '' },
        { abortEarly: true }
      );
    
      // Handle errors if one occurs
    } catch (error) {
      console.log(error);
    }
    

#### Abort pipeline

If you only set `abortPipeEarly` to `true`, the validation within a pipeline will only abort after finding the first issue. For example, if you only want to show the first error of a field when validating a form, you can use this option to improve performance.

    import * as v from 'valibot';
    
    try {
      const EmailSchema = v.pipe(v.string(), v.email(), v.endsWith('@example.com'));
      const email = v.parse(EmailSchema, 'jane@example.com', {
        abortPipeEarly: true,
      });
    
      // Handle errors if one occurs
    } catch (error) {
      console.log(error);
    }

Infer types
-----------

Another cool feature of schemas is the ability to infer input and output types. This makes your work even easier because you don't have to write the type definition yourself.

### Infer input types

The input type of a schema corresponds to the TypeScript type that the incoming data of a schema must match to be valid. To extract this type you use the utility type [`InferInput`](../api/InferInput.md).

> You are probably interested in the input type only in special cases. In most cases, the output type should be sufficient.

    import * as v from 'valibot';
    
    const LoginSchema = v.object({
      email: v.string(),
      password: v.string(),
    });
    
    type LoginInput = v.InferInput<typeof LoginSchema>; // { email: string; password: string }
    

### Infer output types

The output type differs from the input type only if you use [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md) or [`undefinedable`](../api/undefinedable.md) with a default value or [`brand`](../api/brand.md), [`readonly`](../api/readonly.md) or [`transform`](../api/transform.md) to transform the input or data type of a schema after validation. The output type corresponds to the output of [`parse`](../api/parse.md) and [`safeParse`](../api/safeParse.md). To infer it, you use the utility type [`InferOutput`](../api/InferOutput.md).

    import * as v from 'valibot';
    import { hashPassword } from '~/utils';
    
    const LoginSchema = v.pipe(
      v.object({
        email: v.string(),
        password: v.pipe(v.string(), v.transform(hashPassword)),
      }),
      v.transform((input) => {
        return {
          ...input,
          timestamp: new Date().toISOString(),
        };
      })
    );
    
    type LoginOutput = v.InferOutput<typeof LoginSchema>; // { email: string; password: string; timestamp: string }
    

### Infer issue types

You can also infer the possible issues of a schema. This can be useful if you want to handle the issues in a particular way. To extract this information from a schema you use the utility type [`InferIssue`](../api/InferIssue.md).

    import * as v from 'valibot';
    
    const LoginSchema = v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(8)),
    });
    
    type Issue = v.InferIssue<typeof LoginSchema>; // v.ObjectIssue | v.StringIssue | v.EmailIssue<string> | v.MinLengthIssue<string, 8>

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

Objects
-------

To validate objects with a schema, you can use [`object`](../api/object.md) or [`record`](../api/record.md). You use [`object`](../api/object.md) for an object with a specific shape and [`record`](../api/record.md) for objects with any number of uniform entries.

### Object schema

The first argument is used to define the specific structure of the object. Each entry consists of a key and a schema as the value. The entries of the input are then validated against these schemas.

    import * as v from 'valibot';
    
    const ObjectSchema = v.object({
      key1: v.string(),
      key2: v.number(),
    });
    

#### Loose and strict objects

The [`object`](../api/object.md) schema removes unknown entries. This means that entries that you have not defined in the first argument are not validated and added to the output. You can change this behavior by using the [`looseObject`](../api/looseObject.md) or [`strictObject`](../api/strictObject.md) schema instead.

The [`looseObject`](../api/looseObject.md) schema allows unknown entries and adds them to the output. The [`strictObject`](../api/strictObject.md) schema forbids unknown entries and returns an issue for the first unknown entry found.

#### Object with specific rest

Alternatively, you can also use the [`objectWithRest`](../api/objectWithRest.md) schema to define a specific schema for unknown entries. Any entries not defined in the first argument are then validated against the schema of the second argument.

    import * as v from 'valibot';
    
    const ObjectSchema = v.objectWithRest(
      {
        key1: v.string(),
        key2: v.number(),
      },
      v.null()
    );
    

#### Pipeline validation

To validate the value of an entry based on another entry, you can wrap you schema with the [`check`](../api/check.md) validation action in a pipeline. You can also use [`forward`](../api/forward.md) to assign the issue to a specific object key in the event of an error.

> If you only want to validate specific entries, we recommend using [`partialCheck`](../api/partialCheck.md) instead as [`check`](../api/check.md) can only be executed if the input is fully typed.

    import * as v from 'valibot';
    
    const CalculationSchema = v.pipe(
      v.object({
        a: v.number(),
        b: v.number(),
        sum: v.number(),
      }),
      v.forward(
        v.check(({ a, b, sum }) => a + b === sum, 'The calculation is incorrect.'),
        ['sum']
      )
    );
    

### Record schema

For an object with any number of uniform entries, [`record`](../api/record.md) is the right choice. The schema passed as the first argument validates the keys of your record, and the schema passed as the second argument validates the values.

    import * as v from 'valibot';
    
    const RecordSchema = v.record(v.string(), v.number()); // Record<string, number>
    

#### Specific record keys

Instead of [`string`](../api/string.md), you can also use [`custom`](../api/custom.md), [`enum`](../api/enum.md), [`literal`](../api/literal.md), [`picklist`](../api/picklist.md) or [`union`](../api/union.md) to validate the keys.

    import * as v from 'valibot';
    
    const RecordSchema = v.record(v.picklist(['key1', 'key2']), v.number()); // { key1?: number; key2?: number }
    

Note that [`record`](../api/record.md) marks all literal keys as optional in this case. If you want to make them required, you can use the [`object`](../api/object.md) schema with the [`entriesFromList`](../api/entriesFromList.md) util instead.

    import * as v from 'valibot';
    
    const RecordSchema = v.object(v.entriesFromList(['key1', 'key2'], v.number())); // { key1: number; key2: number }
    

#### Pipeline validation

To validate the value of an entry based on another entry, you can wrap you schema with the [`check`](../api/check.md) validation action in a pipeline. You can also use [`forward`](../api/forward.md) to assign the issue to a specific record key in the event of an error.

    import * as v from 'valibot';
    
    const CalculationSchema = v.pipe(
      v.record(v.picklist(['a', 'b', 'sum']), v.number()),
      v.forward(
        v.check(
          ({ a, b, sum }) => (a || 0) + (b || 0) === (sum || 0),
          'The calculation is incorrect.'
        ),
        ['sum']
      )
    );

Arrays
------

To validate arrays with a schema you can use [`array`](../api/array.md) or [`tuple`](../api/tuple.md). You use [`tuple`](../api/tuple.md) if your array has a specific shape and [`array`](../api/array.md) if it has any number of uniform items.

### Array schema

The first argument you pass to [`array`](../api/array.md) is a schema, which is used to validate the items of the array.

    import * as v from 'valibot';
    
    const ArraySchema = v.array(v.number()); // number[]
    

#### Pipeline validation

To validate the length or contents of the array, you can use a pipeline.

    import * as v from 'valibot';
    
    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.minLength(1),
      v.maxLength(5),
      v.includes('foo'),
      v.excludes('bar')
    );
    

### Tuple schema

A [`tuple`](../api/tuple.md) is an array with a specific shape. The first argument that you pass to the function is a tuple of schemas that defines its shape.

    import * as v from 'valibot';
    
    const TupleSchema = v.tuple([v.string(), v.number()]); // [string, number]
    

#### Loose and strict tuples

The [`tuple`](../api/tuple.md) schema removes unknown items. This means that items that you have not defined in the first argument are not validated and added to the output. You can change this behavior by using the [`looseTuple`](../api/looseTuple.md) or [`strictTuple`](../api/strictTuple.md) schema instead.

The [`looseTuple`](../api/looseTuple.md) schema allows unknown items and adds them to the output. The [`strictTuple`](../api/strictTuple.md) schema forbids unknown items and returns an issue for the first unknown item found.

#### Tuple with specific rest

Alternatively, you can also use the [`tupleWithRest`](../api/tupleWithRest.md) schema to define a specific schema for unknown items. Any items not defined in the first argument are then validated against the schema of the second argument.

    import * as v from 'valibot';
    
    const TupleSchema = v.tupleWithRest([v.string(), v.number()], v.null());
    

#### Pipeline validation

Similar to arrays, you can use a pipeline to validate the length and contents of a tuple.

    import * as v from 'valibot';
    
    const TupleSchema = v.pipe(
      v.tupleWithRest([v.string()], v.string()),
      v.maxLength(5),
      v.includes('foo'),
      v.excludes('bar')
    );

Optionals
---------

It often happens that `undefined` or `null` should also be accepted instead of the value. To make the API more readable for this and to reduce boilerplate, Valibot offers a shortcut for this functionality with [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md) and [`undefinedable`](../api/undefinedable.md).

### How it works

To accept `undefined` and/or `null` besides your actual value, you just have to wrap the schema in [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md), or [`undefinedable`](../api/undefinedable.md).

    import * as v from 'valibot';
    
    const OptionalStringSchema = v.optional(v.string()); // string | undefined
    const NullableStringSchema = v.nullable(v.string()); // string | null
    const NullishStringSchema = v.nullish(v.string()); // string | null | undefined
    const UndefinedableStringSchema = v.undefinedable(v.string()); // string | undefined
    

#### Use in objects

When used inside of objects, [`optional`](../api/optional.md) and [`nullish`](../api/nullish.md) is a special case, as it also marks the value as optional in TypeScript with a question mark.

    import * as v from 'valibot';
    
    const OptionalKeySchema = v.object({ key: v.optional(v.string()) }); // { key?: string | undefined }
    

### Default values

The special thing about [`optional`](../api/optional.md), [`nullable`](../api/nullable.md), [`nullish`](../api/nullish.md) and [`undefinedable`](../api/undefinedable.md) is that the schema functions accept a default value as the second argument. Depending on the schema function, this default value is always used if the input is `undefined` or `null`.

    import * as v from 'valibot';
    
    const OptionalStringSchema = v.optional(v.string(), "I'm the default!");
    
    type OptionalStringInput = v.InferInput<typeof OptionalStringSchema>; // string | undefined
    type OptionalStringOutput = v.InferOutput<typeof OptionalStringSchema>; // string
    

By providing a default value, the input type of the schema now differs from the output type. The schema in the example now accepts `string` and `undefined` as input, but returns a string as output in both cases.

#### Dynamic default values

In some cases it is necessary to generate the default value dynamically. For this purpose, a function that generates and returns the default value can also be passed as the second argument.

    import * as v from 'valibot';
    
    const NullableDateSchema = v.nullable(v.date(), () => new Date());
    

The previous example thus creates a new instance of the [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class for each validation with `null` as input, which is then used as the default value.

#### Dependent default values

In rare cases, a default value for an optional entry may depend on the values of another entries in the same object. This can be achieved by using [`transform`](../api/transform.md) in the [`pipe`](../api/pipe.md) of the object.

    import * as v from 'valibot';
    
    const CalculationSchema = v.pipe(
      v.object({
        a: v.number(),
        b: v.number(),
        sum: v.optional(v.number()),
      }),
      v.transform((input) => ({
        ...input,
        sum: input.sum === undefined ? input.a + input.b : input.sum,
      }))
    );

Enums
-----

An enumerated type is a data type that consists of a set of values. They can be represented by either an object, a TypeScript enum or, to keep things simple, an array. You use [`enum`](../api/enum.md) for objects and TypeScript enums and [`picklist`](../api/picklist.md) for arrays.

### Enum schema

Since TypeScript enums are transpiled to JavaScript objects by the TypeScript compiler, you can use the [`enum`](../api/enum.md) schema function for both. Just pass your enumerated data type as the first argument to the schema function. On validation, the schema checks whether the input matches one of the values in the enum.

    import * as v from 'valibot';
    
    // As JavaScript object
    const Direction = {
      Left: 'LEFT',
      Right: 'RIGHT',
    } as const;
    
    // As TypeScript enum
    enum Direction {
      Left = 'LEFT',
      Right = 'RIGHT',
    }
    
    const DirectionSchema = v.enum(Direction);
    

### Picklist schema

For a set of values represented by an array, you can use the [`picklist`](../api/picklist.md) schema function. Just pass your array as the first argument to the schema function. On validation, the schema checks whether the input matches one of the items in the array.

    import * as v from 'valibot';
    
    const Direction = ['LEFT', 'RIGHT'] as const;
    
    const DirectionSchema = v.picklist(Direction);
    

#### Format array

In some cases, the array may not be in the correct format. In this case, simply use the [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method to bring it into the required format.

    import * as v from 'valibot';
    
    const countries = [
      { name: 'Germany', code: 'DE' },
      { name: 'France', code: 'FR' },
      { name: 'United States', code: 'US' },
    ] as const;
    
    const CountrySchema = v.picklist(countries.map((country) => country.code));

Unions
------

An union represents a logical OR relationship. You can apply this concept to your schemas with [`union`](../api/union.md) and [`variant`](../api/variant.md). For [discriminated unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) you use [`variant`](../api/variant.md) and in all other cases you use [`union`](../api/union.md).

### Union schema

The schema function [`union`](../api/union.md) creates an OR relationship between any number of schemas that you pass as the first argument in the form of an array. On validation, the schema returns the result of the first schema that was successfully validated.

    import * as v from 'valibot';
    
    // TypeScript
    type Union = string | number;
    
    // Valibot
    const UnionSchema = v.union([v.string(), v.number()]);
    

If a bad input can be uniquely assigned to one of the schemas based on the data type, the result of that schema is returned. Otherwise, a general issue is returned that contains the issues of each schema as subissues. This is a special case within the library, as the issues of [`union`](../api/union.md) can contradict each other.

The following issues are returned if the input is `null` instead of a string or number. Since the input cannot be associated with a schema in this case, the issues of both schemas are returned as subissues.

    [
      {
        kind: 'schema',
        type: 'union',
        input: null,
        expected: 'string | number',
        received: 'null',
        message: 'Invalid type: Expected string | number but received null',
        issues: [
          {
            kind: 'schema',
            type: 'string',
            input: null,
            expected: 'string',
            received: 'null',
            message: 'Invalid type: Expected string but received null',
          },
          {
            kind: 'schema',
            type: 'number',
            input: null,
            expected: 'number',
            received: 'null',
            message: 'Invalid type: Expected number but received null',
          },
        ],
      },
    ];
    

### Variant schema

For better performance, more type safety, and a more targeted output of issues, you can use [`variant`](../api/variant.md) for discriminated unions. Therefore, we recommend using [`variant`](../api/variant.md) over [`union`](../api/union.md) whenever possible. A discriminated union is an OR relationship between objects that can be distinguished by a specific key.

When you call the schema function, you first specify the discriminator key. This is used to determine the schema to use for validation based on the input. The object schemas, in the form of an array, follow as the second argument.

    import * as v from 'valibot';
    
    const VariantScheme = v.variant('type', [
      v.object({
        type: v.literal('foo'),
        foo: v.string(),
      }),
      v.object({
        type: v.literal('bar'),
        bar: v.number(),
      }),
    ]);
    

For very complex datasets, multiple [`variant`](../api/variant.md) schemas can also be deeply nested within one another.

Intersections
-------------

An intersection represents a logical AND relationship. You can apply this concept to your schemas with [`intersect`](../api/intersect.md) and partially by merging multiple object schemas into a new one. We recommend this approach for simple object schemas, and [`intersect`](../api/intersect.md) for all other cases.

### Intersect schema

The schema function [`intersect`](../api/intersect.md) creates an AND relationship between any number of schemas that you pass as the first argument in the form of an array. To pass the validation, the validation of each schema passed must be successful. If this is the case, the schema merges the output of the individual schemas and returns the result. If the validation fails, the schema returns any issues that occurred.

    import * as v from 'valibot';
    
    // TypeScript
    type Intersect = { foo: string } & { bar: number };
    
    // Valibot
    const IntersectSchema = v.intersect([
      v.object({ foo: v.string() }),
      v.object({ bar: v.number() }),
    ]);
    

### Merge objects

Technically, there is a big difference between [`intersect`](../api/intersect.md) and object merging. [`intersect`](../api/intersect.md) is a schema function that executes the passed schemas during validation. In contrast, object merging is done during initialization to create a new object schema.

As a result, object merging usually has much better performance than [`intersect`](../api/intersect.md) when validating unknown data. Also, subsequent object properties overwrite the previous ones. This is not the case with [`intersect`](../api/intersect.md), since the validation would fail if two properties with the same name are fundamentally different.

    import * as v from 'valibot';
    
    const ObjectSchema1 = v.object({ foo: v.string(), baz: v.number() });
    const ObjectSchema2 = v.object({ bar: v.string(), baz: v.boolean() });
    
    const MergedSchema = v.object({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    }); // { foo: string; bar: string; baz: boolean }
    

In the previous code example, the `baz` property of the first object schema is overwritten by the `baz` property of the second object schema.

Other
-----

This guide explains other special schema functions such as [`literal`](../api/literal.md), [`instance`](../api/instance.md), [`custom`](../api/custom.md) and [`lazy`](../api/lazy.md) that are not covered in the other guides.

### Literal schema

You can use [`literal`](../api/literal.md) to define a schema that matches a specific string, number or boolean value. Therefore, this schema is perfect for representing [literal types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types). Usage is simple, just pass the value you want to match as the first argument.

    import * as v from 'valibot';
    
    const StringLiteralSchema = v.literal('foo'); // 'foo'
    const NumberLiteralSchema = v.literal(12345); // 12345
    const BooleanLiteralSchema = v.literal(true); // true
    

### Instance schema

With schema functions like [`blob`](../api/blob.md), [`date`](../api/date.md), [`map`](../api/map.md) and [`set`](../api/set.md) Valibot already covers the most common JavaScript classes. However, there are many more classes that you may want to validate. For this purpose, you can use the [`instance`](../api/instance.md) schema function. It takes a class as its first argument and returns a schema that matches only instances of that class.

    import * as v from 'valibot';
    
    const ErrorSchema = v.instance(Error); // Error
    const UrlSchema = v.instance(URL); // URL
    

### Custom schema

The [`custom`](../api/custom.md) schema function is a bit more advanced. It allows you to define a schema that matches a value based on a custom function. Use it whenever you need to define a schema that cannot be expressed using any of the other schema functions.

The function receives the value to validate as its first argument and must return a boolean value. If the function returns `true`, the value is considered valid. Otherwise, it is considered invalid.

    import * as v from 'valibot';
    
    const PixelStringSchema = v.custom<`${number}px`>((input) =>
      typeof input === 'string' ? /^\d+px$/.test(input) : false
    );
    

### Lazy schema

The [`lazy`](../api/lazy.md) schema function allows you to define recursive schemas. A recursive schema is a schema that references itself. For example, you can use it to define a schema for a tree-like data structure.

> Due to a TypeScript limitation, the input and output types cannot be inferred automatically in this case. Therefore, you must explicitly specify these types using the [`GenericSchema`](../api/GenericSchema.md) type.

    import * as v from 'valibot';
    
    type BinaryTree = {
      element: string;
      left: BinaryTree | null;
      right: BinaryTree | null;
    };
    
    const BinaryTreeSchema: v.GenericSchema<BinaryTree> = v.object({
      element: v.string(),
      left: v.nullable(v.lazy(() => BinaryTreeSchema)),
      right: v.nullable(v.lazy(() => BinaryTreeSchema)),
    });

Naming convention
-----------------

In many cases a schema is created and exported together with the inferred type. There are two naming conventions for this procedure that we recommend you to use when working with Valibot. In this guide we will explain both of them and share why we think they might make sense.

> You don't have to follow any of these conventions. They are only recommendations.

### Convention 1

The first naming convention exports the schema and type with the same name. The advantage of this is that the names are short and the boilerplate is low, since the schema and type can be imported together.

We also recommend to follow the [PascalCase](https://en.wikipedia.org/wiki/Naming_convention_\$0programming\$0) naming convention. This means that each word starts with an uppercase letter. This is a common convention for TypeScript types, and since schemas basically provide runtime validation of types, it makes sense to use this convention for schemas as well.

#### Example

In the following example, a schema is created for a user object. In order to follow the naming convention, the schema and the type are exported with the same name.

    import * as v from 'valibot';
    
    export const PublicUser = v.object({
      name: v.pipe(v.string(), v.maxLength(30)),
      email: v.pipe(v.string(), v.email()),
      avatar: v.nullable(v.file()),
      bio: v.pipe(v.string(), v.maxLength(1000)),
    });
    
    export type PublicUser = v.InferOutput<typeof PublicUser>;
    

The schema and type can then be imported and used together.

    import * as v from 'valibot';
    import { PublicUser } from './types';
    
    // Use `PublicUser` as a type
    const publicUsers: PublicUser[] = [];
    
    publicUsers.push(
      // Use `PublicUser` as a schema
      v.parse(PublicUser, {
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: null,
        bio: 'Lorem ipsum ...',
      })
    );
    

### Convention 2

The first naming convention can cause naming conflicts with other classes and types. It also causes a problem when you need to export both the input and output types of a schema.

The second naming convention provides a solution. It also follows the [PascalCase](https://en.wikipedia.org/wiki/Naming_convention_\$0programming\$0) naming convention, but adds an appropriate suffix to each export. Schemas get the suffix `Schema`, input types get the suffix `Input` and output types get the suffix `Output`.

> If there is no difference between the input and output type, the suffix `Data` can optionally be used to indicate this.

This requires the schema and types to be imported separately, which increases the overhead. However, the naming convention is more precise, flexible, and works in any use case.

#### Example

In the following example, a schema is created for an image object. In order to follow the naming convention, the schema and the types are exported with different names.

    import * as v from 'valibot';
    
    export const ImageSchema = v.object({
      status: v.optional(v.picklist(['public', 'private']), 'private'),
      created: v.optional(v.date(), () => new Date()),
      title: v.pipe(v.string(), v.maxLength(100)),
      source: v.pipe(v.string(), v.url()),
      size: v.pipe(v.number(), v.minValue(0)),
    });
    
    export type ImageInput = v.InferInput<typeof ImageSchema>;
    export type ImageOutput = v.InferOutput<typeof ImageSchema>;
    

The schema and the input and output types can then be imported and used separately.

    import * as v from 'valibot';
    import { ImageInput, ImageOutput, ImageSchema } from './types';
    
    export function createImage(input: ImageInput): ImageOutput {
      return v.parse(ImageSchema, input);
    }
    

> Do you have ideas for improving these conventions? We welcome your feedback and suggestions. Feel free to create an [issue](https://github.com/fabian-hiller/valibot/issues/new) on GitHub.

Async validation
----------------

By default, Valibot validates each schema synchronously. This is usually the fastest way to validate unknown data, but sometimes you need to validate something asynchronously. For example, you might want to check if a username already exists in your database.

### How it works

To be able to do this, Valibot provides an asynchronous implementation when necessary. The only difference is that the asynchronous implementation is promise-based. Otherwise, the API and functionality is exactly the same.

#### Naming

The asynchronous implementation starts with the same name as the synchronous one, but adds the suffix `Async` to the end. For example, the asynchronous implementation of [`pipe`](../api/pipe.md) is called [`pipeAsync`](../api/pipeAsync.md) and the asynchronous implementation of [`object`](../api/object.md) is called [`objectAsync`](../api/objectAsync.md).

#### Nesting

Asynchronous functions can only be nested inside other asynchronous functions. This means that if you need to validate a string within an object asynchronously, you must also switch the object validation to the asynchronous implementation.

This is not necessary in the other direction. You can nest synchronous functions within asynchronous functions, and we recommend that you do so in most cases to keep complexity and bundle size to a minimum.

##### Rule of thumb

We recommend that you always start with the synchronous implementation, and only move the necessary parts to the asynchronous implementation as needed. If you are using TypeScript, it is not possible to make a mistake here, as our API is completely type-safe and will notify you when you embed an asynchronous function into a synchronous function.

#### Example

Let's say you want to validate a profile object and the username should be checked asynchronously against your database. Only the object and username validation needs to be asynchronous, the rest can stay synchronous.

    import * as v from 'valibot';
    import { isUsernameAvailable } from '~/api';
    
    const ProfileSchema = v.objectAsync({
      username: v.pipeAsync(v.string(), v.checkAsync(isUsernameAvailable)),
      avatar: v.pipe(v.string(), v.url()),
      description: v.pipe(v.string(), v.maxLength(1000)),
    });

JSON Schema
-----------

In favor of a larger feature set and smaller bundle size, Valibot is not implemented with JSON Schema in mind. However, in some use cases, you may still need a JSON Schema. This guide will show you how to convert Valibot schemas to JSON Schema format.

### Valibot to JSON Schema

A large part of my schemas are JSON Schema compatible and can be easily converted to the JSON Schema format using my official `toJsonSchema` function. This function is provided via a separate package called [`@valibot/to-json-schema`](https://github.com/fabian-hiller/valibot/tree/main/packages/to-json-schema).

> See the [README](https://github.com/fabian-hiller/valibot/blob/main/packages/to-json-schema/README.md) of the `@valibot/to-json-schema` package for more details.

    import { toJsonSchema } from '@valibot/to-json-schema';
    import * as v from 'valibot';
    
    const ValibotEmailSchema = v.pipe(v.string(), v.email());
    const JsonEmailSchema = toJsonSchema(ValibotEmailSchema); // { type: 'string', format: 'email' }
    

### Cons of JSON Schema

Valibot schemas intentionally do not output JSON Schema natively. This is because JSON Schema is limited to JSON-compliant data structures. In addition, more advanced features like transformations are not supported. Since we want to leverage the full power of TypeScript, we output a custom format instead.

Another drawback of JSON Schema is that JSON Schema itself does not contain any validation logic. Therefore, an additional function is required that can validate the entire JSON Schema specification. This approach is usually not tree-shakable and results in a large bundle size.

In contrast, my API design and implementation is completely modular. Every schema is independent and contains its own validation logic. This allows my schemas to be plugged together like LEGO bricks, resulting in a much smaller bundle size due to tree shaking.

### Pros of JSON Schema

Despite these drawbacks, JSON Schema is still widely used in the industry because it also has many advantages. For example, JSON Schemas can be used across programming languages and tools. In addition, JSON Schemas are serializable and can be easily stored in a database or transmitted over a network.

Internationalization
--------------------

Providing error messages in the native language of your users can improve the user experience and adoption rate of your software. That is why we offer several flexible ways to easily implement i18n.

### Official translations

The fastest way to get started with i18n is to use Valibot's official translations. They are provided in a separate package called [`@valibot/i18n`](https://github.com/fabian-hiller/valibot/tree/main/packages/i18n).

> If you are missing a translation, feel free to open an [issue](https://github.com/fabian-hiller/valibot/issues/new) or pull request on GitHub.

#### Import translations

Each translation in this package is implemented modularly and exported as a submodule. This allows you to import only the translations you actually need to keep your bundle size small.

    // Import every translation (not recommended)
    import '@valibot/i18n';
    
    // Import every translation for a specific language
    import '@valibot/i18n/de';
    
    // Import only the translation for schema functions
    import '@valibot/i18n/de/schema';
    
    // Import only the translation for a specific pipeline function
    import '@valibot/i18n/de/minLength';
    

The submodules use sideeffects to load the translations into a global storage that the schema and validation functions access when adding the error message to an issue.

#### Select language

The language used is then selected by the `lang` configuration. You can set it globally with [`setGlobalConfig`](../api/setGlobalConfig.md) or locally when parsing unknown data via [`parse`](../api/parse.md) or [`safeParse`](../api/safeParse.md).

    import * as v from 'valibot';
    
    // Set the language configuration globally
    v.setGlobalConfig({ lang: 'de' });
    
    // Set the language configuration locally
    v.parse(Schema, input, { lang: 'de' });
    

### Custom translations

You can use the same APIs as [`@valibot/i18n`](https://github.com/fabian-hiller/valibot/tree/main/packages/i18n) to add your own translations to the global storage. Alternatively, you can also pass them directly to a specific schema or validation function as the first optional argument.

> You can either enter the translations manually or use an i18n library like [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs).

#### Set translations globally

You can add translations with [`setGlobalMessage`](../api/setGlobalMessage.md), [`setSchemaMessage`](../api/setSchemaMessage.md) and [`setSpecificMessage`](../api/setSpecificMessage.md) in three different hierarchy levels. When creating an issue, I first check if a specific translation is available, then the translation for schema functions, and finally the global translation.

    import * as v from 'valibot';
    
    // Set the translation globally (can be used as a fallback)
    v.setGlobalMessage((issue) => `Invalid input: ...`, 'en');
    
    // Set the translation globally for every schema functions
    v.setSchemaMessage((issue) => `Invalid type: ...`, 'en');
    
    // Set the translation globally for a specific function
    v.setSpecificMessage(v.minLength, (issue) => `Invalid length: ...`, 'en');
    

#### Set translations locally

If you prefer to define the translations individually, you can pass them as the first optional argument to schema and validation functions. We recommend using an i18n library like [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) in this case.

    import * as v from 'valibot';
    import * as m from './paraglide/messages.js';
    
    const LoginSchema = v.object({
      email: v.pipe(
        v.string(),
        v.nonEmpty(m.emailRequired),
        v.email(m.emailInvalid)
      ),
      password: v.pipe(
        v.string(),
        v.nonEmpty(m.passwordRequired),
        v.minLength(8, m.passwordInvalid)
      ),
    });

Migrate to v0.31.0
------------------

Migrating Valibot from an older version to v0.31.0 isn't complicated. Except for the new [`pipe`](../api/pipe.md) method, most things remain the same. The following guide will help you to migrate automatically or manually step by step and also point out important differences.

### Automatic upgrade

We worked together with [Codemod](https://codemod.com/registry/valibot-migrate-to-v0-31-0) and [Grit](https://docs.grit.io/registry/github.com/fabian-hiller/valibot/migrate_to_v0_31_0) to automatically upgrade your schemas to the new version with a single CLI command. Both codemods are similar. You can use one or the other. Simply run the command in the directory of your project.

> We recommend using a version control system like [Git](https://git-scm.com/) so that you can revert changes if the codemod screws something up.

    # Codemod
    npx codemod valibot/migrate-to-v0.31.0
    
    # Grit
    npx @getgrit/cli apply github.com/fabian-hiller/valibot#migrate_to_v0_31_0
    

Please create an [issue](https://github.com/fabian-hiller/valibot/issues/new) if you encounter any problems or unexpected behavior with the provided codemods.

### Restructure code

As mentioned above, one of the biggest differences is the new [`pipe`](../api/pipe.md) method. Previously, you passed the pipeline as an array to a schema function. Now you pass the schema with various actions to the new [`pipe`](../api/pipe.md) method to extend a schema.

    // Change this
    const Schema = v.string([v.email()]);
    
    // To this
    const Schema = v.pipe(v.string(), v.email());
    

We will be publishing a [blog post](../blog/valibot-v0.31.0-is-finally-available.md) soon explaining all the benefits of this change. In the meantime, you can read the description of discussion [#463](https://github.com/fabian-hiller/valibot/discussions/463) and PR [#502](https://github.com/fabian-hiller/valibot/pull/502), which introduced this change.

### Change names

Most of the names are the same as before. However, there are some exceptions. The following table shows all names that have changed.

v0.30.0

v0.31.0

`anyAsync`

[`any`](../api/any.md)

`BaseSchema`

[`GenericSchema`](../api/GenericSchema.md)

`bigintAsync`

[`bigint`](../api/bigint.md)

`blobAsync`

[`blob`](../api/blob.md)

`booleanAsync`

[`boolean`](../api/boolean.md)

`custom`

[`check`](../api/check.md)

`customAsync`

[`checkAsync`](../api/checkAsync.md)

`coerce`

[`pipe`](../api/pipe.md), [`unknown`](../api/unknown.md) and [`transform`](../api/transform.md)

`dateAsync`

[`date`](../api/date.md)

`enumAsync`

[`enum_`](../api/enum.md)

`Input`

[`InferInput`](../api/InferInput.md)

`instanceAsync`

[`instance`](../api/instance.md)

`literalAsync`

[`literal`](../api/literal.md)

`nanAsync`

[`nan`](../api/nan.md)

`neverAsync`

[`never`](../api/never.md)

`nullAsync`

[`null_`](../api/null.md)

`numberAsync`

[`number`](../api/number.md)

`Output`

[`InferOutput`](../api/InferOutput.md)

`picklistAsync`

[`picklist`](../api/picklist.md)

`SchemaConfig`

[`Config`](../api/Config.md)

`special`

[`custom`](../api/custom.md)

`specialAsync`

[`customAsync`](../api/customAsync.md)

`SchemaConfig`

[`Config`](../api/string.md)

`stringAsync`

[`string`](../api/string.md)

`symbolAsync`

[`symbol`](../api/symbol.md)

`undefinedAsync`

[`undefined_`](../api/undefined.md)

`unknownAsync`

[`unknown`](../api/unknown.md)

`toCustom`

[`transform`](../api/transform.md)

`toTrimmed`

[`trim`](../api/trim.md)

`toTrimmedEnd`

[`trimEnd`](../api/trimEnd.md)

`toTrimmedStart`

[`trimStart`](../api/trimStart.md)

`voidAsync`

[`void_`](../api/void.md)

### Special cases

More complex schemas may require a bit more restructuring. This section provides more details on how to migrate specific functions.

#### Objects and tuples

Previously, you could pass a `rest` argument to the [`object`](../api/object.md) and [`tuple`](../api/tuple.md) schemas to define the behavior for unknown entries and items. We have removed the `rest` argument to simplify the implementation and reduce the bundle size if this functionality is not needed. If you do need this functionality, there is now a new [`objectWithRest`](../api/objectWithRest.md) and [`tupleWithRest`](../api/tupleWithRest.md) schema.

    // Change this
    const ObjectSchema = v.object({ key: v.string() }, v.null_());
    const TupleSchema = v.tuple([v.string()], v.null_());
    
    // To this
    const ObjectSchema = v.objectWithRest({ key: v.string() }, v.null_());
    const TupleSchema = v.tupleWithRest([v.string()], v.null_());
    

To further improve the developer experience, we have also added a [`looseObject`](../api/looseObject.md), [`looseTuple`](../api/looseTuple.md), [`strictObject`](../api/strictObject.md) and [`strictTuple`](../api/strictTuple.md) schema. These schemas allow or disallow unknown entries or items.

    // Change this
    const LooseObjectSchema = v.object({ key: v.string() }, v.unknown());
    const LooseTupleSchema = v.tuple([v.string()], v.unknown());
    const StrictObjectSchema = v.object({ key: v.string() }, v.never());
    const StrictTupleSchema = v.tuple([v.string()], v.never());
    
    // To this
    const LooseObjectSchema = v.looseObject({ key: v.string() });
    const LooseTupleSchema = v.looseTuple([v.string()]);
    const StrictObjectSchema = v.strictObject({ key: v.string() });
    const StrictTupleSchema = v.strictTuple([v.string()]);
    

#### Object merging

Since there are now 4 different object schemas, we could no longer provide a simple `merge` function that works in all cases, as we never know which schema you want to merge the other objects into. But there is a simple workaround with a similar developer experience.

    const ObjectSchema1 = v.object({ foo: v.string() });
    const ObjectSchema2 = v.object({ bar: v.number() });
    
    // Change this
    const MergedObject = v.merge([ObjectSchema1, ObjectSchema2]);
    
    // To this
    const MergedObject = v.object({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    });
    

#### Brand and transform

Previously, [`brand`](../api/brand.md) and [`transform`](../api/transform.md) were methods that could be wrapped around a schema to modify it. With our new [`pipe`](../api/pipe.md) method, this is no longer necessary. Instead, [`brand`](../api/brand.md) and [`transform`](../api/transform.md) are now transformation actions that can be placed directly in a pipeline, resulting in better readability, especially for complex schemas.

    // Change this
    const BrandedSchema = v.brand(v.string(), 'foo');
    const TransformedSchema = v.transform(v.string(), (input) => input.length);
    
    // To this
    const BrandedSchema = v.pipe(v.string(), v.brand('foo'));
    const TransformedSchema = v.pipe(
      v.string(),
      v.transform((input) => input.length)
    );
    

#### Coerce method

The `coerce` method has been removed because we felt it was an insecure API. In most cases, you don't want to coerce an unknown input into a specific data type. Instead, you want to transform a specific data type into another specific data type. For example, a string or a number into a date. To explicitly define the input type, we recommend using the new [`pipe`](../api/pipe.md) method together with the [`transform`](../api/transform.md) action to achieve the same functionality.

    // Change this
    const DateSchema = v.coerce(v.date(), (input) => new Date(input));
    
    // To this
    const DateSchema = v.pipe(
      v.union([v.string(), v.number()]),
      v.transform((input) => new Date(input))
    );
    

#### Flatten issues

Previously, the [`flatten`](../api/flatten.md) function accepted a [`ValiError`](../api/ValiError.md) or an array of issues. We have simplified the implementation by only allowing an array of issues to be passed.

    // Change this
    const flatErrors = v.flatten(error);
    
    // To this
    const flatErrors = v.flatten(error.issues);

Migrate from Zod
----------------

Migrating from [Zod](https://zod.dev/) to Valibot is very easy in most cases since both APIs have a lot of similarities. The following guide will help you migrate step by step and also point out important differences.

> If anything is unclear or missing, please create an [issue](https://github.com/fabian-hiller/valibot/issues/new) on GitHub. We are very interested in making this guide as good as possible.

### Replace imports

The first thing to do after [installing](installation.md) Valibot is to update your imports. Just change your Zod imports to Valibot's and replace all occurrences of `z.` with `v.`.

    // Change this
    import { z } from 'zod';
    const Schema = z.object({ key: z.string() });
    
    // To this
    import * as v from 'valibot';
    const Schema = v.object({ key: v.string() });
    

### Restructure code

One of the biggest differences between Zod and Valibot is the way you further validate a given type. In Zod, you chain methods like `.email` and `.endsWith`. In Valibot you use [pipelines](pipelines.md) to do the same thing. This is a function that starts with a schema and is followed by up to 19 validation or transformation actions.

    // Change this
    const Schema = z.string().email().endsWith('@example.com');
    
    // To this
    const Schema = v.pipe(v.string(), v.email(), v.endsWith('@example.com'));
    

Due to the modular design of Valibot, also all other methods like `.parse` or `.safeParse` have to be used a little bit differently. Instead of chaining them, you usually pass the schema as the first argument and move any existing arguments one position to the right.

    // Change this
    const value = z.string().parse('foo');
    
    // To this
    const value = v.parse(v.string(), 'foo');
    

We recommend that you read our [mental model](mental-model.md) guide to understand how the individual functions of Valibot's modular API work together.

### Change names

Most of the names are the same as in Zod. However, there are some exceptions. The following table shows all names that have changed.

Zod

Valibot

`and`

[`intersect`](../api/intersect.md)

`catch`

[`fallback`](../api/fallback.md)

`catchall`

[`objectWithRest`](../api/objectWithRest.md)

`coerce`

[`pipe`](../api/pipe.md), [`unknown`](../api/unknown.md) and [`transform`](../api/transform.md)

`datetime`

[`isoDate`](../api/isoDate.md), [`isoDateTime`](../api/isoDateTime.md)

`default`

[`optional`](../api/optional.md)

`discriminatedUnion`

[`variant`](../api/variant.md)

`element`

`item`

`enum`

[`picklist`](../api/picklist.md)

`extend`

[Object merging](intersections.md)

`gt`, `gte`

[`minValue`](../api/minValue.md)

`infer`

[`InferOutput`](../api/InferOutput.md)

`int`

[`integer`](../api/integer.md)

`input`

[`InferInput`](../api/InferInput.md)

`instanceof`

[`instance`](../api/instance.md)

`intersection`

[`intersect`](../api/intersect.md)

`lt`, `lte`

[`maxValue`](../api/maxValue.md)

`max`

[`maxLength`](../api/maxLength.md), [`maxSize`](../api/maxSize.md), [`maxValue`](../api/maxValue.md)

`min`

[`minLength`](../api/minLength.md), [`minSize`](../api/minSize.md), [`minValue`](../api/minValue.md)

`nativeEnum`

[`enum`](../api/enum.md)

`negative`

[`maxValue`](../api/maxValue.md)

`nonnegative`

[`minValue`](../api/minValue.md)

`nonpositive`

[`maxValue`](../api/maxValue.md)

`or`

[`union`](../api/union.md)

`output`

[`InferOutput`](../api/InferOutput.md)

`passthrough`

[`looseObject`](../api/looseObject.md)

`positive`

[`minValue`](../api/minValue.md)

`refine`

[`check`](../api/check.md)

`rest`

[`tuple`](../api/tuple.md)

`safe`

[`safeInteger`](../api/safeInteger.md)

`shape`

`entries`

`strict`

[`strictObject`](../api/strictObject.md)

`strip`

[`object`](../api/object.md)

`superRefine`

[`rawCheck`](../api/rawCheck.md), [`rawTransform`](../api/rawTransform.md)

### Other details

Below are some more details that may be helpful when migrating from Zod to Valibot.

#### Object and tuple

To specify whether objects or tuples should allow or prevent unknown values, Valibot uses different schema functions. Zod uses the methods `.passthrough`, `.strict`, `.strip`, `.catchall` and `.rest` instead. See the [objects](objects.md) and [arrays](arrays.md) guide for more details.

    // Change this
    const ObjectSchema = z.object({ key: z.string() }).strict();
    
    // To this
    const ObjectSchema = v.strictObject({ key: v.string() });
    

#### Error messages

For individual error messages, you can pass a string or an object to Zod. It also allows you to differentiate between an error message for "required" and "invalid\_type". With Valibot you just pass a single string instead.

    // Change this
    const SchemaSchema = z
      .string({ invalid_type_error: 'Not a string' })
      .min(5, { message: 'Too short' });
    
    // To this
    const StringSchema = v.pipe(
      v.string('Not a string'),
      v.minLength(5, 'Too short')
    );
    

#### Coerce type

To enforce primitive values, you can use a method of the `coerce` object in Zod. There is no such object or function in Valibot. Instead, you use a pipeline with a [`transform`](../api/transform.md) action as the second argument. This forces you to explicitly define the input, resulting in safer code.

    // Change this
    const NumberSchema = z.coerce.number();
    
    // To this
    const NumberSchema = v.pipe(v.unknown(), v.transform(Number));
    

Instead of [`unknown`](../api/unknown.md) as in the previous example, we usually recommend using a specific schema such as [`string`](../api/string.md) to improve type safety. This allows you, for example, to validate the formatting of the string with [`decimal`](../api/decimal.md) before transforming it to a number.

    const NumberSchema = v.pipe(v.string(), v.decimal(), v.transform(Number));
    

#### Async validation

Similar to Zod, Valibot supports synchronous and asynchronous validation. However, the API is a little bit different. See the [async guide](async-validation.md) for more details.

Migrate from Ajv
----------------

> The content of this page is not yet ready. Check back in a few weeks.

Migrate from Joi
----------------

> The content of this page is not yet ready. Check back in a few weeks.

Migrate from Yup
----------------

> The content of this page is not yet ready. Check back in a few weeks.

API reference
-------------

This section of our website contains detailed reference documentation for working with Valibot. Please create an [issue](https://github.com/fabian-hiller/valibot/issues/new) if you are missing any information.

### Schemas

*   [`any`](api/any.md),
*   [`array`](api/array.md),
*   [`bigint`](api/bigint.md),
*   [`blob`](api/blob.md),
*   [`boolean`](api/boolean.md),
*   [`custom`](api/custom.md),
*   [`date`](api/date.md),
*   [`enum`](api/enum.md),
*   [`file`](api/file.md),
*   [`function`](api/function.md),
*   [`instance`](api/instance.md),
*   [`intersect`](api/intersect.md),
*   [`lazy`](api/lazy.md),
*   [`literal`](api/literal.md),
*   [`looseObject`](api/looseObject.md),
*   [`looseTuple`](api/looseTuple.md),
*   [`map`](api/map.md),
*   [`nan`](api/nan.md),
*   [`never`](api/never.md),
*   [`nonNullable`](api/nonNullable.md),
*   [`nonNullish`](api/nonNullish.md),
*   [`nonOptional`](api/nonOptional.md),
*   [`null`](api/null.md),
*   [`nullable`](api/nullable.md),
*   [`nullish`](api/nullish.md),
*   [`number`](api/number.md),
*   [`object`](api/object.md),
*   [`objectWithRest`](api/objectWithRest.md),
*   [`optional`](api/optional.md),
*   [`picklist`](api/picklist.md),
*   [`promise`](api/promise.md),
*   [`record`](api/record.md),
*   [`set`](api/set.md),
*   [`strictObject`](api/strictObject.md),
*   [`strictTuple`](api/strictTuple.md),
*   [`string`](api/string.md),
*   [`symbol`](api/symbol.md),
*   [`tuple`](api/tuple.md),
*   [`tupleWithRest`](api/tupleWithRest.md),
*   [`undefined`](api/undefined.md),
*   [`undefinedable`](api/undefinedable.md),
*   [`union`](api/union.md),
*   [`unknown`](api/unknown.md),
*   [`variant`](api/variant.md),
*   [`void`](api/void.md)

### Methods

*   [`assert`](api/assert.md),
*   [`config`](api/config.md),
*   [`fallback`](api/fallback.md),
*   [`flatten`](api/flatten.md),
*   [`forward`](api/forward.md),
*   [`getDefault`](api/getDefault.md),
*   [`getDefaults`](api/getDefaults.md),
*   [`getFallback`](api/getFallback.md),
*   [`getFallbacks`](api/getFallbacks.md),
*   [`is`](api/is.md),
*   [`keyof`](api/keyof.md),
*   [`omit`](api/omit.md),
*   [`parse`](api/parse.md),
*   [`parser`](api/parser.md),
*   [`partial`](api/partial.md),
*   [`pick`](api/pick.md),
*   [`pipe`](api/pipe.md),
*   [`required`](api/required.md),
*   [`safeParse`](api/safeParse.md),
*   [`safeParser`](api/safeParser.md),
*   [`unwrap`](api/unwrap.md)

### Actions

*   [`args`](api/args.md),
*   [`base64`](api/base64.md),
*   [`bic`](api/bic.md),
*   [`brand`](api/brand.md),
*   [`bytes`](api/bytes.md),
*   [`check`](api/check.md),
*   [`checkItems`](api/checkItems.md),
*   [`creditCard`](api/creditCard.md),
*   [`cuid2`](api/cuid2.md),
*   [`decimal`](api/decimal.md),
*   [`description`](api/description.md),
*   [`digits`](api/digits.md),
*   [`email`](api/email.md),
*   [`emoji`](api/emoji.md),
*   [`empty`](api/empty.md),
*   [`endsWith`](api/endsWith.md),
*   [`everyItem`](api/everyItem.md),
*   [`excludes`](api/excludes.md),
*   [`filterItems`](api/filterItems.md),
*   [`findItem`](api/findItem.md),
*   [`finite`](api/finite.md),
*   [`graphemes`](api/graphemes.md),
*   [`hash`](api/hash.md),
*   [`hexadecimal`](api/hexadecimal.md),
*   [`hexColor`](api/hexColor.md),
*   [`imei`](api/imei.md),
*   [`includes`](api/includes.md),
*   [`integer`](api/integer.md),
*   [`ip`](api/ip.md),
*   [`ipv4`](api/ipv4.md),
*   [`ipv6`](api/ipv6.md),
*   [`isoDate`](api/isoDate.md),
*   [`isoDateTime`](api/isoDateTime.md),
*   [`isoTime`](api/isoTime.md),
*   [`isoTimeSecond`](api/isoTimeSecond.md),
*   [`isoTimestamp`](api/isoTimestamp.md),
*   [`isoWeek`](api/isoWeek.md),
*   [`length`](api/length.md),
*   [`mac`](api/mac.md),
*   [`mac48`](api/mac48.md),
*   [`mac64`](api/mac64.md),
*   [`mapItems`](api/mapItems.md),
*   [`maxBytes`](api/maxBytes.md),
*   [`maxGraphemes`](api/maxGraphemes.md),
*   [`maxLength`](api/maxLength.md),
*   [`maxSize`](api/maxSize.md),
*   [`maxValue`](api/maxValue.md),
*   [`maxWords`](api/maxWords.md),
*   [`metadata`](api/metadata.md),
*   [`mimeType`](api/mimeType.md),
*   [`minBytes`](api/minBytes.md),
*   [`minGraphemes`](api/minGraphemes.md),
*   [`minLength`](api/minLength.md),
*   [`minSize`](api/minSize.md),
*   [`minValue`](api/minValue.md),
*   [`minWords`](api/minWords.md),
*   [`multipleOf`](api/multipleOf.md),
*   [`nanoid`](api/nanoid.md),
*   [`nonEmpty`](api/nonEmpty.md),
*   [`normalize`](api/normalize.md),
*   [`notBytes`](api/notBytes.md),
*   [`notGraphemes`](api/notGraphemes.md),
*   [`notLength`](api/notLength.md),
*   [`notSize`](api/notSize.md),
*   [`notValue`](api/notValue.md),
*   [`notWords`](api/notWords.md),
*   [`octal`](api/octal.md),
*   [`partialCheck`](api/partialCheck.md),
*   [`rawCheck`](api/rawCheck.md),
*   [`rawTransform`](api/rawTransform.md),
*   [`readonly`](api/readonly.md),
*   [`reduceItems`](api/reduceItems.md),
*   [`regex`](api/regex.md),
*   [`returns`](api/returns.md),
*   [`safeInteger`](api/safeInteger.md),
*   [`size`](api/size.md),
*   [`someItem`](api/someItem.md),
*   [`sortItems`](api/sortItems.md),
*   [`startsWith`](api/startsWith.md),
*   [`title`](api/title.md),
*   [`toLowerCase`](api/toLowerCase.md),
*   [`toMaxValue`](api/toMaxValue.md),
*   [`toMinValue`](api/toMinValue.md),
*   [`toUpperCase`](api/toUpperCase.md),
*   [`transform`](api/transform.md),
*   [`trim`](api/trim.md),
*   [`trimEnd`](api/trimEnd.md),
*   [`trimStart`](api/trimStart.md),
*   [`ulid`](api/ulid.md),
*   [`url`](api/url.md),
*   [`uuid`](api/uuid.md),
*   [`value`](api/value.md),
*   [`words`](api/words.md)

### Storages

*   [`deleteGlobalConfig`](api/deleteGlobalConfig.md),
*   [`deleteGlobalMessage`](api/deleteGlobalMessage.md),
*   [`deleteSchemaMessage`](api/deleteSchemaMessage.md),
*   [`deleteSpecificMessage`](api/deleteSpecificMessage.md),
*   [`getGlobalConfig`](api/getGlobalConfig.md),
*   [`getGlobalMessage`](api/getGlobalMessage.md),
*   [`getSchemaMessage`](api/getSchemaMessage.md),
*   [`getSpecificMessage`](api/getSpecificMessage.md),
*   [`setGlobalConfig`](api/setGlobalConfig.md),
*   [`setGlobalMessage`](api/setGlobalMessage.md),
*   [`setSchemaMessage`](api/setSchemaMessage.md),
*   [`setSpecificMessage`](api/setSpecificMessage.md)

### Utils

*   [`entriesFromList`](api/entriesFromList.md),
*   [`getDotPath`](api/getDotPath.md),
*   [`isOfKind`](api/isOfKind.md),
*   [`isOfType`](api/isOfType.md),
*   [`isValiError`](api/isValiError.md),
*   [`ValiError`](api/ValiError.md)

### Async

*   [`argsAsync`](api/argsAsync.md),
*   [`arrayAsync`](api/arrayAsync.md),
*   [`awaitAsync`](api/awaitAsync.md),
*   [`checkAsync`](api/checkAsync.md),
*   [`checkItemsAsync`](api/checkItemsAsync.md),
*   [`customAsync`](api/customAsync.md),
*   [`fallbackAsync`](api/fallbackAsync.md),
*   [`forwardAsync`](api/forwardAsync.md),
*   [`getDefaultsAsync`](api/getDefaultsAsync.md),
*   [`getFallbacksAsync`](api/getFallbacksAsync.md),
*   [`intersectAsync`](api/intersectAsync.md),
*   [`lazyAsync`](api/lazyAsync.md),
*   [`looseObjectAsync`](api/looseObjectAsync.md),
*   [`looseTupleAsync`](api/looseTupleAsync.md),
*   [`mapAsync`](api/mapAsync.md),
*   [`nonNullableAsync`](api/nonNullableAsync.md),
*   [`nonNullishAsync`](api/nonNullishAsync.md),
*   [`nonOptionalAsync`](api/nonOptionalAsync.md),
*   [`nullableAsync`](api/nullableAsync.md),
*   [`nullishAsync`](api/nullishAsync.md),
*   [`objectAsync`](api/objectAsync.md),
*   [`objectWithRestAsync`](api/objectWithRestAsync.md),
*   [`optionalAsync`](api/optionalAsync.md),
*   [`parseAsync`](api/parseAsync.md),
*   [`parserAsync`](api/parserAsync.md),
*   [`partialAsync`](api/partialAsync.md),
*   [`partialCheckAsync`](api/partialCheckAsync.md),
*   [`pipeAsync`](api/pipeAsync.md),
*   [`rawCheckAsync`](api/rawCheckAsync.md),
*   [`rawTransformAsync`](api/rawTransformAsync.md),
*   [`recordAsync`](api/recordAsync.md),
*   [`requiredAsync`](api/requiredAsync.md),
*   [`returnsAsync`](api/returnsAsync.md),
*   [`safeParseAsync`](api/safeParseAsync.md),
*   [`safeParserAsync`](api/safeParserAsync.md),
*   [`setAsync`](api/setAsync.md),
*   [`strictObjectAsync`](api/strictObjectAsync.md),
*   [`strictTupleAsync`](api/strictTupleAsync.md),
*   [`transformAsync`](api/transformAsync.md),
*   [`tupleAsync`](api/tupleAsync.md),
*   [`tupleWithRestAsync`](api/tupleWithRestAsync.md),
*   [`undefinedableAsync`](api/undefinedableAsync.md),
*   [`unionAsync`](api/unionAsync.md),
*   [`variantAsync`](api/variantAsync.md)

### Types

*   [`AnySchema`](api/AnySchema.md),
*   [`ArgsAction`](api/ArgsAction.md),
*   [`ArrayInput`](api/ArrayInput.md),
*   [`ArrayIssue`](api/ArrayIssue.md),
*   [`ArrayPathItem`](api/ArrayPathItem.md),
*   [`ArrayRequirement`](api/ArrayRequirement.md),
*   [`ArrayRequirementAsync`](api/ArrayRequirementAsync.md),
*   [`ArraySchema`](api/ArraySchema.md),
*   [`ArraySchemaAsync`](api/ArraySchemaAsync.md),
*   [`AwaitActionAsync`](api/AwaitActionAsync.md),
*   [`Base64Action`](api/Base64Action.md),
*   [`Base64Issue`](api/Base64Issue.md),
*   [`BaseIssue`](api/BaseIssue.md),
*   [`BaseMetadata`](api/BaseMetadata.md),
*   [`BaseSchema`](api/BaseSchema.md),
*   [`BaseSchemaAsync`](api/BaseSchemaAsync.md),
*   [`BaseTransformation`](api/BaseTransformation.md),
*   [`BaseTransformationAsync`](api/BaseTransformationAsync.md),
*   [`BaseValidation`](api/BaseValidation.md),
*   [`BaseValidationAsync`](api/BaseValidationAsync.md),
*   [`BicAction`](api/BicAction.md),
*   [`BicIssue`](api/BicIssue.md),
*   [`BigintIssue`](api/BigintIssue.md),
*   [`BigintSchema`](api/BigintSchema.md),
*   [`BlobIssue`](api/BlobIssue.md),
*   [`BlobSchema`](api/BlobSchema.md),
*   [`BooleanIssue`](api/BooleanIssue.md),
*   [`BooleanSchema`](api/BooleanSchema.md),
*   [`Brand`](api/Brand.md),
*   [`BrandAction`](api/BrandAction.md),
*   [`BrandName`](api/BrandName.md),
*   [`BytesAction`](api/BytesAction.md),
*   [`BytesIssue`](api/BytesIssue.md),
*   [`CheckAction`](api/CheckAction.md),
*   [`CheckActionAsync`](api/CheckActionAsync.md),
*   [`CheckIssue`](api/CheckIssue.md),
*   [`CheckItemsAction`](api/CheckItemsAction.md),
*   [`CheckItemsActionAsync`](api/CheckItemsActionAsync.md),
*   [`CheckItemsIssue`](api/CheckItemsIssue.md),
*   [`Class`](api/Class.md),
*   [`Config`](api/Config.md),
*   [`ContentInput`](api/ContentInput.md),
*   [`ContentRequirement`](api/ContentRequirement.md),
*   [`CreditCardAction`](api/CreditCardAction.md),
*   [`CreditCardIssue`](api/CreditCardIssue.md),
*   [`Cuid2Action`](api/Cuid2Action.md),
*   [`Cuid2Issue`](api/Cuid2Issue.md),
*   [`CustomIssue`](api/CustomIssue.md),
*   [`CustomSchema`](api/CustomSchema.md),
*   [`CustomSchemaAsync`](api/CustomSchemaAsync.md),
*   [`DateIssue`](api/DateIssue.md),
*   [`DateSchema`](api/DateSchema.md),
*   [`DecimalAction`](api/DecimalAction.md),
*   [`DecimalIssue`](api/DecimalIssue.md),
*   [`DeepPickN`](api/DeepPickN.md),
*   [`Default`](api/Default.md),
*   [`DefaultAsync`](api/DefaultAsync.md),
*   [`DefaultValue`](api/DefaultValue.md),
*   [`DescriptionAction`](api/DescriptionAction.md),
*   [`DigitsAction`](api/DigitsAction.md),
*   [`DigitsIssue`](api/DigitsIssue.md),
*   [`EmailAction`](api/EmailAction.md),
*   [`EmailIssue`](api/EmailIssue.md),
*   [`EmojiAction`](api/EmojiAction.md),
*   [`EmojiIssue`](api/EmojiIssue.md),
*   [`EmptyAction`](api/EmptyAction.md),
*   [`EmptyIssue`](api/EmptyIssue.md),
*   [`EndsWithAction`](api/EndsWithAction.md),
*   [`EndsWithIssue`](api/EndsWithIssue.md),
*   [`Enum`](api/Enum.md),
*   [`EnumIssue`](api/EnumIssue.md),
*   [`EnumSchema`](api/EnumSchema.md),
*   [`ErrorMessage`](api/ErrorMessage.md),
*   [`EveryItemAction`](api/EveryItemAction.md),
*   [`EveryItemIssue`](api/EveryItemIssue.md),
*   [`ExcludesAction`](api/ExcludesAction.md),
*   [`ExcludesIssue`](api/ExcludesIssue.md),
*   [`FailureDataset`](api/FailureDataset.md),
*   [`Fallback`](api/Fallback.md),
*   [`FallbackAsync`](api/FallbackAsync.md),
*   [`FileIssue`](api/FileIssue.md),
*   [`FileSchema`](api/FileSchema.md),
*   [`FilterItemsAction`](api/FilterItemsAction.md),
*   [`FindItemAction`](api/FindItemAction.md),
*   [`FiniteAction`](api/FiniteAction.md),
*   [`FiniteIssue`](api/FiniteIssue.md),
*   [`FirstTupleItem`](api/FirstTupleItem.md),
*   [`FlatErrors`](api/FlatErrors.md),
*   [`FunctionIssue`](api/FunctionIssue.md),
*   [`FunctionSchema`](api/FunctionSchema.md),
*   [`GenericIssue`](api/GenericIssue.md),
*   [`GenericMetadata`](api/GenericMetadata.md),
*   [`GenericSchema`](api/GenericSchema.md),
*   [`GenericSchemaAsync`](api/GenericSchemaAsync.md),
*   [`GenericTransformation`](api/GenericTransformation.md),
*   [`GenericTransformationAsync`](api/GenericTransformationAsync.md),
*   [`GenericValidation`](api/GenericValidation.md),
*   [`GenericValidationAsync`](api/GenericValidationAsync.md),
*   [`GlobalConfig`](api/GlobalConfig.md),
*   [`GraphemesAction`](api/GraphemesAction.md),
*   [`GraphemesIssue`](api/GraphemesIssue.md),
*   [`HashAction`](api/HashAction.md),
*   [`HashIssue`](api/HashIssue.md),
*   [`HashType`](api/HashType.md),
*   [`HexadecimalAction`](api/HexadecimalAction.md),
*   [`HexadecimalIssue`](api/HexadecimalIssue.md),
*   [`HexColorAction`](api/HexColorAction.md),
*   [`HexColorIssue`](api/HexColorIssue.md),
*   [`ImeiAction`](api/ImeiAction.md),
*   [`ImeiIssue`](api/ImeiIssue.md),
*   [`IncludesAction`](api/IncludesAction.md),
*   [`IncludesIssue`](api/IncludesIssue.md),
*   [`InferDefault`](api/InferDefault.md),
*   [`InferDefaults`](api/InferDefaults.md),
*   [`InferFallback`](api/InferFallback.md),
*   [`InferFallbacks`](api/InferFallbacks.md),
*   [`InferInput`](api/InferInput.md),
*   [`InferIntersectInput`](api/InferIntersectInput.md),
*   [`InferIntersectOutput`](api/InferIntersectOutput.md),
*   [`InferIssue`](api/InferIssue.md),
*   [`InferMapInput`](api/InferMapInput.md),
*   [`InferMapOutput`](api/InferMapOutput.md),
*   [`InferNonNullableInput`](api/InferNonNullableInput.md),
*   [`InferNonNullableIssue`](api/InferNonNullableIssue.md),
*   [`InferNonNullableOutput`](api/InferNonNullableOutput.md),
*   [`InferNonNullishInput`](api/InferNonNullishInput.md),
*   [`InferNonNullishIssue`](api/InferNonNullishIssue.md),
*   [`InferNonNullishOutput`](api/InferNonNullishOutput.md),
*   [`InferNonOptionalInput`](api/InferNonOptionalInput.md),
*   [`InferNonOptionalIssue`](api/InferNonOptionalIssue.md),
*   [`InferNonOptionalOutput`](api/InferNonOptionalOutput.md),
*   [`InferNullableOutput`](api/InferNullableOutput.md),
*   [`InferNullishOutput`](api/InferNullishOutput.md),
*   [`InferObjectInput`](api/InferObjectInput.md),
*   [`InferObjectIssue`](api/InferObjectIssue.md),
*   [`InferObjectOutput`](api/InferObjectOutput.md),
*   [`InferOptionalOutput`](api/InferOptionalOutput.md),
*   [`InferOutput`](api/InferOutput.md),
*   [`InferRecordInput`](api/InferRecordInput.md),
*   [`InferRecordOutput`](api/InferRecordOutput.md),
*   [`InferSetInput`](api/InferSetInput.md),
*   [`InferSetOutput`](api/InferSetOutput.md),
*   [`InferTupleInput`](api/InferTupleInput.md),
*   [`InferTupleIssue`](api/InferTupleIssue.md),
*   [`InferTupleOutput`](api/InferTupleOutput.md),
*   [`InferVariantIssue`](api/InferVariantIssue.md),
*   [`InstanceIssue`](api/InstanceIssue.md),
*   [`InstanceSchema`](api/InstanceSchema.md),
*   [`IntegerAction`](api/IntegerAction.md),
*   [`IntegerIssue`](api/IntegerIssue.md),
*   [`IntersectIssue`](api/IntersectIssue.md),
*   [`IntersectOptions`](api/IntersectOptions.md),
*   [`IntersectOptionsAsync`](api/IntersectOptionsAsync.md),
*   [`IntersectSchema`](api/IntersectSchema.md),
*   [`IntersectSchemaAsync`](api/IntersectSchemaAsync.md),
*   [`IpAction`](api/IpAction.md),
*   [`IpIssue`](api/IpIssue.md),
*   [`Ipv4Action`](api/Ipv4Action.md),
*   [`Ipv4Issue`](api/Ipv4Issue.md),
*   [`Ipv6Action`](api/Ipv6Action.md),
*   [`Ipv6Issue`](api/Ipv6Issue.md),
*   [`IsoDateAction`](api/IsoDateAction.md),
*   [`IsoDateIssue`](api/IsoDateIssue.md),
*   [`IsoDateTimeAction`](api/IsoDateTimeAction.md),
*   [`IsoDateTimeIssue`](api/IsoDateTimeIssue.md),
*   [`IsoTimeAction`](api/IsoTimeAction.md),
*   [`IsoTimeIssue`](api/IsoTimeIssue.md),
*   [`IsoTimeSecondAction`](api/IsoTimeSecondAction.md),
*   [`IsoTimeSecondIssue`](api/IsoTimeSecondIssue.md),
*   [`IsoTimestampAction`](api/IsoTimestampAction.md),
*   [`IsoTimestampIssue`](api/IsoTimestampIssue.md),
*   [`IsoWeekAction`](api/IsoWeekAction.md),
*   [`IsoWeekIssue`](api/IsoWeekIssue.md),
*   [`IssueDotPath`](api/IssueDotPath.md),
*   [`IssuePathItem`](api/IssuePathItem.md),
*   [`LazySchema`](api/LazySchema.md),
*   [`LazySchemaAsync`](api/LazySchemaAsync.md),
*   [`LengthAction`](api/LengthAction.md),
*   [`LengthInput`](api/LengthInput.md),
*   [`LengthIssue`](api/LengthIssue.md),
*   [`Literal`](api/Literal.md),
*   [`LiteralIssue`](api/LiteralIssue.md),
*   [`LooseObjectIssue`](api/LooseObjectIssue.md),
*   [`LooseObjectSchema`](api/LooseObjectSchema.md),
*   [`LooseObjectSchemaAsync`](api/LooseObjectSchemaAsync.md),
*   [`LooseTupleIssue`](api/LooseTupleIssue.md),
*   [`LooseTupleSchema`](api/LooseTupleSchema.md),
*   [`LooseTupleSchemaAsync`](api/LooseTupleSchemaAsync.md),
*   [`LiteralSchema`](api/LiteralSchema.md),
*   [`Mac48Action`](api/Mac48Action.md),
*   [`Mac48Issue`](api/Mac48Issue.md),
*   [`Mac64Action`](api/Mac64Action.md),
*   [`Mac64Issue`](api/Mac64Issue.md),
*   [`MacAction`](api/MacAction.md),
*   [`MacIssue`](api/MacIssue.md),
*   [`MapIssue`](api/MapIssue.md),
*   [`MapItemsAction`](api/MapItemsAction.md),
*   [`MapPathItem`](api/MapPathItem.md),
*   [`MapSchema`](api/MapSchema.md),
*   [`MapSchemaAsync`](api/MapSchemaAsync.md),
*   [`MaxBytesAction`](api/MaxBytesAction.md),
*   [`MaxBytesIssue`](api/MaxBytesIssue.md),
*   [`MaxGraphemesAction`](api/MaxGraphemesAction.md),
*   [`MaxGraphemesIssue`](api/MaxGraphemesIssue.md),
*   [`MaxLengthAction`](api/MaxLengthAction.md),
*   [`MaxLengthIssue`](api/MaxLengthIssue.md),
*   [`MaxSizeAction`](api/MaxSizeAction.md),
*   [`MaxSizeIssue`](api/MaxSizeIssue.md),
*   [`MaxValueAction`](api/MaxValueAction.md),
*   [`MaxValueIssue`](api/MaxValueIssue.md),
*   [`MaxWordsAction`](api/MaxWordsAction.md),
*   [`MaxWordsIssue`](api/MaxWordsIssue.md),
*   [`MaybePromise`](api/MaybePromise.md),
*   [`MaybeReadonly`](api/MaybeReadonly.md),
*   [`MetadataAction`](api/MetadataAction.md),
*   [`MimeTypeAction`](api/MimeTypeAction.md),
*   [`MimeTypeIssue`](api/MimeTypeIssue.md),
*   [`MinBytesAction`](api/MinBytesAction.md),
*   [`MinBytesIssue`](api/MinBytesIssue.md),
*   [`MinGraphemesAction`](api/MinGraphemesAction.md),
*   [`MinGraphemesIssue`](api/MinGraphemesIssue.md),
*   [`MinLengthAction`](api/MinLengthAction.md),
*   [`MinLengthIssue`](api/MinLengthIssue.md),
*   [`MinSizeAction`](api/MinSizeAction.md),
*   [`MinSizeIssue`](api/MinSizeIssue.md),
*   [`MinValueAction`](api/MinValueAction.md),
*   [`MinValueIssue`](api/MinValueIssue.md),
*   [`MinWordsAction`](api/MinWordsAction.md),
*   [`MinWordsIssue`](api/MinWordsIssue.md),
*   [`MultipleOfAction`](api/MultipleOfAction.md),
*   [`MultipleOfIssue`](api/MultipleOfIssue.md),
*   [`NanIssue`](api/NanIssue.md),
*   [`NanSchema`](api/NanSchema.md),
*   [`NeverIssue`](api/NeverIssue.md),
*   [`NeverSchema`](api/NeverSchema.md),
*   [`NonEmptyAction`](api/NonEmptyAction.md),
*   [`NonEmptyIssue`](api/NonEmptyIssue.md),
*   [`NonNullable`](api/NonNullable.md),
*   [`NonNullableIssue`](api/NonNullableIssue.md),
*   [`NonNullableSchema`](api/NonNullableSchema.md),
*   [`NonNullableSchemaAsync`](api/NonNullableSchemaAsync.md),
*   [`NonNullish`](api/NonNullish.md),
*   [`NonNullishIssue`](api/NonNullishIssue.md),
*   [`NonNullishSchema`](api/NonNullishSchema.md),
*   [`NonNullishSchemaAsync`](api/NonNullishSchemaAsync.md),
*   [`NonOptional`](api/NonOptional.md),
*   [`NonOptionalIssue`](api/NonOptionalIssue.md),
*   [`NonOptionalSchema`](api/NonOptionalSchema.md),
*   [`NonOptionalSchemaAsync`](api/NonOptionalSchemaAsync.md),
*   [`NormalizeAction`](api/NormalizeAction.md),
*   [`NormalizeForm`](api/NormalizeForm.md),
*   [`NotBytesAction`](api/NotBytesAction.md),
*   [`NotBytesIssue`](api/NotBytesIssue.md),
*   [`NotGraphemesAction`](api/NotGraphemesAction.md),
*   [`NotGraphemesIssue`](api/NotGraphemesIssue.md),
*   [`NotLengthAction`](api/NotLengthAction.md),
*   [`NotLengthIssue`](api/NotLengthIssue.md),
*   [`NotSizeAction`](api/NotSizeAction.md),
*   [`NotSizeIssue`](api/NotSizeIssue.md),
*   [`NotValueAction`](api/NotValueAction.md),
*   [`NotValueIssue`](api/NotValueIssue.md),
*   [`NotWordsAction`](api/NotWordsAction.md),
*   [`NotWordsIssue`](api/NotWordsIssue.md),
*   [`NullableSchema`](api/NullableSchema.md),
*   [`NullableSchemaAsync`](api/NullableSchemaAsync.md),
*   [`NullishSchema`](api/NullishSchema.md),
*   [`NullishSchemaAsync`](api/NullishSchemaAsync.md),
*   [`NullIssue`](api/NullIssue.md),
*   [`NullSchema`](api/NullSchema.md),
*   [`NumberIssue`](api/NumberIssue.md),
*   [`NumberSchema`](api/NumberSchema.md),
*   [`ObjectEntries`](api/ObjectEntries.md),
*   [`ObjectEntriesAsync`](api/ObjectEntriesAsync.md),
*   [`ObjectIssue`](api/ObjectIssue.md),
*   [`ObjectKeys`](api/ObjectKeys.md),
*   [`ObjectPathItem`](api/ObjectPathItem.md),
*   [`ObjectSchema`](api/ObjectSchema.md),
*   [`ObjectSchemaAsync`](api/ObjectSchemaAsync.md),
*   [`ObjectWithRestIssue`](api/ObjectWithRestIssue.md),
*   [`ObjectWithRestSchema`](api/ObjectWithRestSchema.md),
*   [`ObjectWithRestSchemaAsync`](api/ObjectWithRestSchemaAsync.md),
*   [`OctalAction`](api/OctalAction.md),
*   [`OctalIssue`](api/OctalIssue.md),
*   [`OptionalSchema`](api/OptionalSchema.md),
*   [`OptionalSchemaAsync`](api/OptionalSchemaAsync.md),
*   [`OutputDataset`](api/OutputDataset.md),
*   [`Parser`](api/Parser.md),
*   [`ParserAsync`](api/ParserAsync.md),
*   [`PartialCheckAction`](api/PartialCheckAction.md),
*   [`PartialCheckActionAsync`](api/PartialCheckActionAsync.md),
*   [`PartialCheckIssue`](api/PartialCheckIssue.md),
*   [`PartialDataset`](api/PartialDataset.md),
*   [`PartialInput`](api/PartialInput.md),
*   [`PathKeys`](api/PathKeys.md),
*   [`PicklistOptions`](api/PicklistOptions.md),
*   [`PicklistIssue`](api/PicklistIssue.md),
*   [`PicklistSchema`](api/PicklistSchema.md),
*   [`PipeAction`](api/PipeAction.md),
*   [`PipeActionAsync`](api/PipeActionAsync.md),
*   [`PipeItem`](api/PipeItem.md),
*   [`PipeItemAsync`](api/PipeItemAsync.md),
*   [`PromiseIssue`](api/PromiseIssue.md),
*   [`PromiseSchema`](api/PromiseSchema.md),
*   [`RawCheckAction`](api/RawCheckAction.md),
*   [`RawCheckActionAsync`](api/RawCheckActionAsync.md),
*   [`RawCheckIssue`](api/RawCheckIssue.md),
*   [`RawTransformAction`](api/RawTransformAction.md),
*   [`RawTransformIssue`](api/RawTransformIssue.md),
*   [`ReadonlyAction`](api/ReadonlyAction.md),
*   [`RecordIssue`](api/RecordIssue.md),
*   [`RecordSchema`](api/RecordSchema.md),
*   [`RecordSchemaAsync`](api/RecordSchemaAsync.md),
*   [`ReduceItemsAction`](api/ReduceItemsAction.md),
*   [`RegexAction`](api/RegexAction.md),
*   [`RegexIssue`](api/RegexIssue.md),
*   [`ReturnsAction`](api/ReturnsAction.md),
*   [`SafeIntegerAction`](api/SafeIntegerAction.md),
*   [`SafeIntegerIssue`](api/SafeIntegerIssue.md),
*   [`SafeParser`](api/SafeParser.md),
*   [`SafeParserAsync`](api/SafeParserAsync.md),
*   [`SafeParseResult`](api/SafeParseResult.md),
*   [`SchemaWithFallback`](api/SchemaWithFallback.md),
*   [`SchemaWithFallbackAsync`](api/SchemaWithFallbackAsync.md),
*   [`SchemaWithoutPipe`](api/SchemaWithoutPipe.md),
*   [`SchemaWithPartial`](api/SchemaWithPartial.md),
*   [`SchemaWithPartialAsync`](api/SchemaWithPartialAsync.md),
*   [`SchemaWithPipe`](api/SchemaWithPipe.md),
*   [`SchemaWithPipeAsync`](api/SchemaWithPipeAsync.md),
*   [`SchemaWithRequired`](api/SchemaWithRequired.md),
*   [`SchemaWithRequiredAsync`](api/SchemaWithRequiredAsync.md),
*   [`SetPathItem`](api/SetPathItem.md),
*   [`SetIssue`](api/SetIssue.md),
*   [`SetSchema`](api/SetSchema.md),
*   [`SetSchemaAsync`](api/SetSchemaAsync.md),
*   [`SizeAction`](api/SizeAction.md),
*   [`SizeInput`](api/SizeInput.md),
*   [`SizeIssue`](api/SizeIssue.md),
*   [`SomeItemAction`](api/SomeItemAction.md),
*   [`SomeItemIssue`](api/SomeItemIssue.md),
*   [`SortItemsAction`](api/SortItemsAction.md),
*   [`StartsWithAction`](api/StartsWithAction.md),
*   [`StartsWithIssue`](api/StartsWithIssue.md),
*   [`StrictObjectIssue`](api/StrictObjectIssue.md),
*   [`StrictObjectSchema`](api/StrictObjectSchema.md),
*   [`StrictObjectSchemaAsync`](api/StrictObjectSchemaAsync.md),
*   [`StrictTupleIssue`](api/StrictTupleIssue.md),
*   [`StrictTupleSchema`](api/StrictTupleSchema.md),
*   [`StrictTupleSchemaAsync`](api/StrictTupleSchemaAsync.md),
*   [`StringIssue`](api/StringIssue.md),
*   [`StringSchema`](api/StringSchema.md),
*   [`SuccessDataset`](api/SuccessDataset.md),
*   [`SymbolIssue`](api/SymbolIssue.md),
*   [`SymbolSchema`](api/SymbolSchema.md),
*   [`TitleAction`](api/TitleAction.md),
*   [`ToLowerCaseAction`](api/ToLowerCaseAction.md),
*   [`ToMaxValueAction`](api/ToMaxValueAction.md),
*   [`ToMinValueAction`](api/ToMinValueAction.md),
*   [`ToUpperCaseAction`](api/ToUpperCaseAction.md),
*   [`TransformAction`](api/TransformAction.md),
*   [`TrimAction`](api/TrimAction.md),
*   [`TrimEndAction`](api/TrimEndAction.md),
*   [`TrimStartAction`](api/TrimStartAction.md),
*   [`TupleIssue`](api/TupleIssue.md),
*   [`TupleItems`](api/TupleItems.md),
*   [`TupleItemsAsync`](api/TupleItemsAsync.md),
*   [`TupleSchema`](api/TupleSchema.md),
*   [`TupleSchemaAsync`](api/TupleSchemaAsync.md),
*   [`TupleWithRestIssue`](api/TupleWithRestIssue.md),
*   [`TupleWithRestSchema`](api/TupleWithRestSchema.md),
*   [`TupleWithRestSchemaAsync`](api/TupleWithRestSchemaAsync.md),
*   [`UlidAction`](api/UlidAction.md),
*   [`UlidIssue`](api/UlidIssue.md),
*   [`UndefinedableSchema`](api/UndefinedableSchema.md),
*   [`UndefinedableSchemaAsync`](api/UndefinedableSchemaAsync.md),
*   [`UndefinedIssue`](api/UndefinedIssue.md),
*   [`UndefinedSchema`](api/UndefinedSchema.md),
*   [`UnionOptions`](api/UnionOptions.md),
*   [`UnionOptionsAsync`](api/UnionOptionsAsync.md),
*   [`UnionIssue`](api/UnionIssue.md),
*   [`UnionSchema`](api/UnionSchema.md),
*   [`UnionSchemaAsync`](api/UnionSchemaAsync.md),
*   [`UnknownPathItem`](api/UnknownPathItem.md),
*   [`UnknownSchema`](api/UnknownSchema.md),
*   [`UrlAction`](api/UrlAction.md),
*   [`UrlIssue`](api/UrlIssue.md),
*   [`UuidAction`](api/UuidAction.md),
*   [`UuidIssue`](api/UuidIssue.md),
*   [`ValueAction`](api/ValueAction.md),
*   [`ValueInput`](api/ValueInput.md),
*   [`ValueIssue`](api/ValueIssue.md),
*   [`VariantIssue`](api/VariantIssue.md),
*   [`VariantOptions`](api/VariantOptions.md),
*   [`VariantOptionsAsync`](api/VariantOptionsAsync.md),
*   [`VariantSchema`](api/VariantSchema.md),
*   [`VariantSchemaAsync`](api/VariantSchemaAsync.md),
*   [`VoidIssue`](api/VoidIssue.md),
*   [`VoidSchema`](api/VoidSchema.md),
*   [`WordsAction`](api/WordsAction.md),
*   [`WordsIssue`](api/WordsIssue.md)

any
---

Creates an any schema.

> This schema function exists only for completeness and is not recommended in practice. Instead, [`unknown`](unknown.md) should be used to accept unknown data.

    const Schema = v.any();
    

### Returns

*   `Schema` `AnySchema`

### Related

The following APIs can be combined with `any`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

array
-----

Creates an array schema.

    const Schema = v.array<TItem, TMessage>(item, message);
    

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ArrayIssue> | undefined`

### Parameters

*   `item` `TItem`
*   `message` `TMessage`

#### Explanation

With `array` you can validate the data type of the input. If the input is not an array, you can use `message` to customize the error message.

> If your array has a fixed length, consider using [`tuple`](tuple.md) for a more precise typing.

### Returns

*   `Schema` `ArraySchema<TItem, TMessage>`

### Examples

The following examples show how `array` can be used.

#### String array schema

Schema to validate an array of strings.

    const StringArraySchema = v.array(v.string(), 'An array is required.');
    

#### Object array schema

Schema to validate an array of objects.

    const ObjectArraySchema = v.array(v.object({ key: v.string() }));
    

#### Validate length

Schema that validates the length of an array.

    const ArrayLengthSchema = v.pipe(
      v.array(v.number()),
      v.minLength(1),
      v.maxLength(3)
    );
    

#### Validate content

Schema that validates the content of an array.

    const ArrayContentSchema = v.pipe(
      v.array(v.string()),
      v.includes('foo'),
      v.excludes('bar')
    );
    

### Related

The following APIs can be combined with `array`.

#### Schemas

*   [`any`](any.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

bigint
------

Creates a bigint schema.

    const Schema = v.bigint<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<BigintIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `bigint` you can validate the data type of the input. If the input is not a bigint, you can use `message` to customize the error message.

### Returns

*   `Schema` `BigintSchema<TMessage>`

### Examples

The following examples show how `bigint` can be used.

#### Force minimum

Schema that forces a minimum bigint value.

    const MinBigintSchema = v.pipe(v.bigint(), v.toMinValue(10n));
    

#### Validate maximum

Schema that validates a maximum bigint value.

    const MaxBigintSchema = v.pipe(v.bigint(), v.maxValue(999n));
    

### Related

The following APIs can be combined with `bigint`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxValue`](maxValue.md),
*   [`metadata`](metadata.md),
*   [`minValue`](minValue.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

blob
----

Creates a blob schema.

> The `Blob` class is not available by default in Node.js v16 and below.

    const Schema = v.blob<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<BlobIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `blob` you can validate the data type of the input. If the input is not a blob, you can use `message` to customize the error message.

### Returns

*   `Schema` `BlobSchema<TMessage>`

### Examples

The following examples show how `blob` can be used.

#### Image schema

Schema to validate an image.

    const ImageSchema = v.pipe(
      v.blob('Please select an image file.'),
      v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
      v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
    );
    

### Related

The following APIs can be combined with `blob`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

boolean
-------

Creates a boolean schema.

    const Schema = v.boolean<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<BooleanIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `boolean` you can validate the data type of the input. If the input is not a boolean, you can use `message` to customize the error message.

> Instead of using a [`pipe`](pipe.md) to force `true` or `false` as a value, in most cases it makes more sense to use [`literal`](literal.md) for better typing.

### Returns

*   `Schema` `BooleanSchema<TMessage>`

### Examples

The following examples show how `boolean` can be used.

#### Custom message

Boolean schema with a custom error message.

    const BooleanSchema = v.boolean('A boolean is required');
    

### Related

The following APIs can be combined with `boolean`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`minValue`](minValue.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

custom
------

Creates a custom schema.

> This schema function allows you to define a schema that matches a value based on a custom function. Use it whenever you need to define a schema that cannot be expressed using any of the other schema functions.

    const Schema = v.custom<TInput, TMessage>(check, message);
    

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CustomIssue> | undefined = ErrorMessage<CustomIssue> | undefined`

### Parameters

*   `check` `(input: unknown) => boolean`
*   `message` `TMessage`

#### Explanation

With `custom` you can validate the data type of the input. If the input does not match the validation of `check`, you can use `message` to customize the error message.

> Make sure that the validation in `check` matches the data type of `TInput`.

### Returns

*   `Schema` `CustomSchema<TInput, TMessage>`

### Examples

The following examples show how `custom` can be used.

#### Pixel string schema

Schema to validate a pixel string.

    const PixelStringSchema = v.custom<`${number}px`>((input) =>
      typeof input === 'string' ? /^\d+px$/.test(input) : false
    );
    

### Related

The following APIs can be combined with `custom`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

date
----

Creates a date schema.

    const Schema = v.date<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<DateIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `date` you can validate the data type of the input. If the input is not a date, you can use `message` to customize the error message.

### Returns

*   `Schema` `DateSchema<TMessage>`

### Examples

The following examples show how `date` can be used.

#### Force minimum

Schema that forces a minimum date of today.

    const MinDateSchema = v.pipe(v.date(), v.toMinValue(new Date()));
    

#### Validate range

Schema that validates a date in a range.

    const DateRangeSchema = v.pipe(
      v.date(),
      v.minValue(new Date(2019, 0, 1)),
      v.maxValue(new Date(2020, 0, 1))
    );
    

### Related

The following APIs can be combined with `date`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxValue`](maxValue.md),
*   [`metadata`](metadata.md),
*   [`minValue`](minValue.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

enum
----

Creates an enum schema.

    const Schema = v.enum<TEnum, TMessage>(enum, message);
    

### Generics

*   `TEnum` `extends Enum`
*   `TMessage` `extends ErrorMessage<EnumIssue> | undefined`

### Parameters

*   `enum` `TEnum`
*   `message` `TMessage`

#### Explanation

With `enum` you can validate that the input corresponds to an enum option. If the input is invalid, you can use `message` to customize the error message.

### Returns

*   `Schema` `EnumSchema<TEnum, TMessage>`

### Examples

The following examples show how `enum` can be used.

#### Direction enum

Schema to validate a direction enum option.

    enum Direction {
      Left,
      Right,
    }
    
    const DirectionSchema = v.enum(Direction, 'Invalid direction');
    

### Related

The following APIs can be combined with `enum`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

file
----

Creates a file schema.

> The `File` class is not available by default in Node.js v18 and below.

    const Schema = v.file<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<FileIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `file` you can validate the data type of the input. If the input is not a file, you can use `message` to customize the error message.

### Returns

*   `Schema` `FileSchema<TMessage>`

### Examples

The following examples show how `file` can be used.

#### Image schema

Schema to validate an image.

    const ImageSchema = v.pipe(
      v.file('Please select an image file.'),
      v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
      v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
    );
    

### Related

The following APIs can be combined with `file`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

function
--------

Creates a function schema.

    const Schema = v.function<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<FunctionIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `function` you can validate the data type of the input. If the input is not a function, you can use `message` to customize the error message.

### Returns

*   `Schema` `FunctionSchema<TMessage>`

### Related

The following APIs can be combined with `function`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

instance
--------

Creates an instance schema.

    const Schema = v.instance<TClass, TMessage>(class_, message);
    

### Generics

*   `TClass` `extends Class`
*   `TMessage` `extends ErrorMessage<InstanceIssue> | undefined`

### Parameters

*   `class_` `TClass`
*   `message` `TMessage`

#### Explanation

With `instance` you can validate the data type of the input. If the input is not an instance of the specified `class_`, you can use `message` to customize the error message.

### Returns

*   `Schema` `InstanceSchema<TClass, TMessage>`

### Examples

The following examples show how `instance` can be used.

#### Error schema

Schema to validate an `Error` instance.

    const ErrorSchema = v.instance(Error, 'Error instance required.');
    

#### File schema

Schema to validate an `File` instance.

    const FileSchema = v.pipe(
      v.instance(File),
      v.mimeType(['image/jpeg', 'image/png']),
      v.maxSize(1024 * 1024 * 10)
    );
    

### Related

The following APIs can be combined with `instance`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

intersect
---------

Creates an intersect schema.

> I recommend to read the [intersections guide](../guides/intersections.md) before using this schema function.

    const Schema = v.intersect<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends IntersectOptions`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `intersect` you can validate if the input matches each of the given `options`. If the output of the intersection cannot be successfully merged, you can use `message` to customize the error message.

### Returns

*   `Schema` `IntersectSchema<TOptions, TMessage>`

### Examples

The following examples show how `intersect` can be used.

#### Object intersection

Schema that combines two object schemas.

    const ObjectSchema = v.intersect([
      v.object({ foo: v.string() }),
      v.object({ bar: v.number() }),
    ]);
    

### Related

The following APIs can be combined with `intersect`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

lazy
----

Creates a lazy schema.

    const Schema = v.lazy<TWrapped>(getter);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `getter` `(input: unknown) => TWrapped`

#### Explanation

The `getter` function is called lazily to retrieve the schema. This is necessary to be able to access the input through the first argument of the `getter` function and to avoid a circular dependency for recursive schemas.

### Returns

*   `Schema` `LazySchema<TWrapped>`

### Examples

The following examples show how `lazy` can be used.

#### Binary tree schema

Recursive schema to validate a binary tree.

> Due to a TypeScript limitation, the input and output types of recursive schemas cannot be inferred automatically. Therefore, you must explicitly specify these types using [`GenericSchema`](GenericSchema.md).

    type BinaryTree = {
      element: string;
      left: BinaryTree | null;
      right: BinaryTree | null;
    };
    
    const BinaryTreeSchema: v.GenericSchema<BinaryTree> = v.object({
      element: v.string(),
      left: v.nullable(v.lazy(() => BinaryTreeSchema)),
      right: v.nullable(v.lazy(() => BinaryTreeSchema)),
    });
    

#### Lazy union schema

Schema to validate a discriminated union of objects.

> In most cases, [`union`](union.md) and [`variant`](variant.md) are the better choices for creating such a schema. I recommend using `lazy` only in special cases.

    const LazyUnionSchema = v.lazy((input) => {
      if (input && typeof input === 'object' && 'type' in input) {
        switch (input.type) {
          case 'email':
            return v.object({
              type: v.literal('email'),
              email: v.pipe(v.string(), v.email()),
            });
          case 'url':
            return v.object({
              type: v.literal('url'),
              url: v.pipe(v.string(), v.url()),
            });
          case 'date':
            return v.object({
              type: v.literal('date'),
              date: v.pipe(v.string(), v.isoDate()),
            });
        }
      }
      return v.never();
    });
    

### Related

The following APIs can be combined with `lazy`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`undefined`](undefined.md),
*   [`union`](union.md),
*   [`unionWithRest`](unionWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

literal
-------

Creates a literal schema.

    const Schema = v.literal<TLiteral, TMessage>(literal, message);
    

### Generics

*   `TLiteral` `extends Literal`
*   `TMessage` `extends ErrorMessage<LiteralIssue> | undefined`

### Parameters

*   `literal` `TLiteral`
*   `message` `TMessage`

#### Explanation

With `literal` you can validate that the input matches a specified value. If the input is invalid, you can use `message` to customize the error message.

### Returns

*   `Schema` `LiteralSchema<TLiteral, TMessage>`

### Examples

The following examples show how `literal` can be used.

#### String literal

Schema to validate a string literal.

    const StringLiteralSchema = v.literal('foo');
    

#### Number literal

Schema to validate a number literal.

    const NumberLiteralSchema = v.literal(26);
    

#### Boolean literal

Schema to validate a boolean literal.

    const BooleanLiteralSchema = v.literal(true);
    

### Related

The following APIs can be combined with `literal`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

looseObject
-----------

Creates a loose object schema.

    const Schema = v.looseObject<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `looseObject` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object, you can use `message` to customize the error message.

> The difference to [`object`](object.md) is that this schema includes any unknown entries in the output. In addition, this schema filters certain entries from the unknown entries for security reasons.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `LooseObjectSchema<TEntries, TMessage>`

### Examples

The following examples show how `looseObject` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Simple object schema

Schema to validate a loose object with two specific keys.

    const SimpleObjectSchema = v.looseObject({
      key1: v.string(),
      key2: v.number(),
    });
    

#### Merge several objects

Schema that merges the entries of two object schemas.

    const MergedObjectSchema = v.looseObject({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    });
    

#### Mark keys as optional

Schema to validate an object with partial entries.

    const PartialObjectSchema = v.partial(
      v.looseObject({
        key1: v.string(),
        key2: v.number(),
      })
    );
    

#### Object with selected entries

Schema to validate only selected entries of a loose object.

    const PickObjectSchema = v.pick(
      v.looseObject({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    );
    

### Related

The following APIs can be combined with `looseObject`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

looseTuple
----------

Creates a loose tuple schema.

    const Schema = v.looseTuple<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<LooseTupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `looseTuple` you can validate the data type of the input and whether the content matches `items`. If the input is not an array, you can use `message` to customize the error message.

> The difference to [`tuple`](tuple.md) is that this schema does include unknown items into the output.

### Returns

*   `Schema` `LooseTupleSchema<TItems, TMessage>`

### Examples

The following examples show how `looseTuple` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Simple tuple schema

Schema to validate a loose tuple with two specific items.

    const SimpleTupleSchema = v.looseTuple([v.string(), v.number()]);
    

### Related

The following APIs can be combined with `looseTuple`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

map
---

Creates a map schema.

    const Schema = v.map<TKey, TValue, TMessage>(key, value, message);
    

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<MapIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `map` you can validate the data type of the input and whether the entries matches `key` and `value`. If the input is not a map, you can use `message` to customize the error message.

### Returns

*   `Schema` `MapSchema<TKey, TValue, TMessage>`

### Examples

The following examples show how `map` can be used.

#### String map schema

Schema to validate a map with string values.

    const StringMapSchema = v.map(v.string(), v.string());
    

#### Object map schema

Schema to validate a map with object values.

    const ObjectMapSchema = v.map(v.string(), v.object({ key: v.string() }));
    

### Related

The following APIs can be combined with `map`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nan
---

Creates a NaN schema.

    const Schema = v.nan<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<NanIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `nan` you can validate the data type of the input and if it is not `NaN`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NanSchema<TMessage>`

### Related

The following APIs can be combined with `nan`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

never
-----

Creates a never schema.

    const Schema = v.never<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<NeverIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

When validated, `never` always returns an issue. You can use `message` to customize the error message.

### Returns

*   `Schema` `NeverSchema<TMessage>`

### Related

The following APIs can be combined with `never`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nonNullable
-----------

Creates a non nullable schema.

> This schema function can be used to override the behavior of [`nullable`](nullable.md).

    const Schema = v.nonNullable<TWrapped, TMessage>(wrapped, message);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullableIssue> | undefined`

### Parameters

*   `wrapped` `TWrapped`
*   `message` `TMessage`

#### Explanation

With `nonNullable` the validation of your schema will not pass `null` inputs. If the input is `null`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NonNullableSchema<TWrapped, TMessage>`

### Examples

The following examples show how `nonNullable` can be used.

#### Non nullable string

Schema that does not accept `null`.

    const NonNullableStringSchema = v.nonNullable(v.nullable(v.string()));
    

#### Unwrap non nullable

Use [`unwrap`](unwrap.md) to undo the effect of `nonNullable`.

    const NonNullableNumberSchema = v.nonNullable(v.nullable(v.number()));
    const NullableNumberSchema = v.unwrap(NonNullableNumberSchema);
    

### Related

The following APIs can be combined with `nonNullable`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nonNullish
----------

Creates a non nullish schema.

> This schema function can be used to override the behavior of [`nullish`](nullish.md).

    const Schema = v.nonNullish<TWrapped, TMessage>(wrapped, message);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullishIssue> | undefined`

### Parameters

*   `wrapped` `TWrapped`
*   `message` `TMessage`

#### Explanation

With `nonNullish` the validation of your schema will not pass `null` and `undefined` inputs. If the input is `null` or `undefined`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NonNullishSchema<TWrapped, TMessage>`

### Examples

The following examples show how `nonNullish` can be used.

#### Non nullish string

Schema that does not accept `null` and `undefined`.

    const NonNullishStringSchema = v.nonNullish(v.nullish(v.string()));
    

#### Unwrap non nullish

Use [`unwrap`](unwrap.md) to undo the effect of `nonNullish`.

    const NonNullishNumberSchema = v.nonNullish(v.nullish(v.number()));
    const NullishNumberSchema = v.unwrap(NonNullishNumberSchema);
    

### Related

The following APIs can be combined with `nonNullish`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nonOptional
-----------

Creates a non optional schema.

> This schema function can be used to override the behavior of [`optional`](optional.md).

    const Schema = v.nonOptional<TWrapped, TMessage>(wrapped, message);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Parameters

*   `wrapped` `TWrapped`
*   `message` `TMessage`

#### Explanation

With `nonOptional` the validation of your schema will not pass `undefined` inputs. If the input is `undefined`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NonOptionalSchema<TWrapped, TMessage>`

### Examples

The following examples show how `nonOptional` can be used.

#### Non optional string

Schema that does not accept `undefined`.

    const NonOptionalStringSchema = v.nonOptional(v.optional(v.string()));
    

#### Unwrap non optional

Use [`unwrap`](unwrap.md) to undo the effect of `nonOptional`.

    const NonOptionalNumberSchema = v.nonOptional(v.optional(v.number()));
    const OptionalNumberSchema = v.unwrap(NonOptionalNumberSchema);
    

### Related

The following APIs can be combined with `nonOptional`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

null
----

Creates a null schema.

    const Schema = v.null<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<NullIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `null` you can validate the data type of the input and if it is not `null`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NullSchema<TMessage>`

### Related

The following APIs can be combined with `null`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nullable
--------

Creates a nullable schema.

    const Schema = v.nullable<TWrapped, TDefault>(wrapped, default_);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped> | never`

### Parameters

*   `wrapped` `TWrapped`
*   `default_` `TDefault`

#### Explanation

With `nullable` the validation of your schema will pass `null` inputs, and if you specify a `default_` input value, the schema will use it if the input is `null`. For this reason, the output type may differ from the input type of the schema.

> Note that `nullable` does not accept `undefined` as an input. If you want to accept `undefined` inputs, use [`optional`](optional.md), and if you want to accept `null` and `undefined` inputs, use [`nullish`](nullish.md) instead. Also, if you want to set a default output value for any invalid input, you should use [`fallback`](fallback.md) instead.

### Returns

*   `Schema` `NullableSchema<TWrapped, TDefault>`

### Examples

The following examples show how `nullable` can be used.

#### Nullable string schema

Schema that accepts `string` and `null`.

    const NullableStringSchema = v.nullable(v.string(), "I'm the default!");
    

#### Nullable date schema

Schema that accepts [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and `null`.

> By using a function as the `default_` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input is `null`.

    const NullableDateSchema = v.nullable(v.date(), () => new Date());
    

#### Nullable entry schema

Object schema with a nullable entry.

    const NullableEntrySchema = v.object({
      key: v.nullable(v.string()),
    });
    

#### Unwrap nullable schema

Use [`unwrap`](unwrap.md) to undo the effect of `nullable`.

    const NullableNumberSchema = v.nullable(v.number());
    const NumberSchema = v.unwrap(NullableNumberSchema);
    

### Related

The following APIs can be combined with `nullable`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nullish
-------

Creates a nullish schema.

    const Schema = v.nullish<TWrapped, TDefault>(wrapped, default_);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped> | never`

### Parameters

*   `wrapped` `TWrapped`
*   `default_` `TDefault`

#### Explanation

With `nullish` the validation of your schema will pass `undefined` and `null` inputs, and if you specify a `default_` input value, the schema will use it if the input is `undefined` or `null`. For this reason, the output type may differ from the input type of the schema.

> Note that `nullish` accepts `undefined` and `null` as an input. If you want to accept only `null` inputs, use [`nullable`](nullable.md), and if you want to accept only `undefined` inputs, use [`optional`](optional.md) instead. Also, if you want to set a default output value for any invalid input, you should use [`fallback`](fallback.md) instead.

### Returns

*   `Schema` `NullishSchema<TWrapped, TDefault>`

### Examples

The following examples show how `nullish` can be used.

#### Nullish string schema

Schema that accepts `string`, `undefined` and `null`.

    const NullishStringSchema = v.nullish(v.string(), "I'm the default!");
    

#### Nullish date schema

Schema that accepts [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), `undefined` and `null`.

> By using a function as the `default_` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input is `undefined` or `null`.

    const NullishDateSchema = v.nullish(v.date(), () => new Date());
    

#### Nullish entry schema

Object schema with a nullish entry.

    const NullishEntrySchema = v.object({
      key: v.nullish(v.string()),
    });
    

#### Unwrap nullish schema

Use [`unwrap`](unwrap.md) to undo the effect of `nullish`.

    const NullishNumberSchema = v.nullish(v.number());
    const NumberSchema = v.unwrap(NullishNumberSchema);
    

### Related

The following APIs can be combined with `nullish`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

number
------

Creates a number schema.

    const Schema = v.number<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<NumberIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `number` you can validate the data type of the input. If the input is not a number, you can use `message` to customize the error message.

### Returns

*   `Schema` `NumberSchema<TMessage>`

### Examples

The following examples show how `number` can be used.

#### Integer schema

Schema to validate an integer.

    const IntegerSchema = v.pipe(v.number(), v.integer());
    

#### Force minimum

Schema that forces a minimum number of 10.

    const MinNumberSchema = v.pipe(v.number(), v.toMinValue(10));
    

#### Validate range

Schema that validates a number in a range.

    const NumberRangeSchema = v.pipe(v.number(), v.minValue(10), v.maxValue(20));
    

### Related

The following APIs can be combined with `number`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`finite`](finite.md),
*   [`integer`](integer.md),
*   [`maxValue`](maxValue.md),
*   [`metadata`](metadata.md),
*   [`minValue`](minValue.md),
*   [`multipleOf`](multipleOf.md),
*   [`notValue`](notValue.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`safeInteger`](safeInteger.md),
*   [`title`](title.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`transform`](transform.md),
*   [`value`](value.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

object
------

Creates an object schema.

    const Schema = v.object<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<ObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `object` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object, you can use `message` to customize the error message.

> This schema removes unknown entries. The output will only include the entries you specify. To include unknown entries, use [`looseObject`](looseObject.md). To return an issue for unknown entries, use [`strictObject`](strictObject.md). To include and validate unknown entries, use [`objectWithRest`](objectWithRest.md).

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `ObjectSchema<TEntries, TMessage>`

### Examples

The following examples show how `object` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Simple object schema

Schema to validate an object with two keys.

    const SimpleObjectSchema = v.object({
      key1: v.string(),
      key2: v.number(),
    });
    

#### Merge several objects

Schema that merges the entries of two object schemas.

    const MergedObjectSchema = v.object({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    });
    

#### Mark keys as optional

Schema to validate an object with partial entries.

    const PartialObjectSchema = v.partial(
      v.object({
        key1: v.string(),
        key2: v.number(),
      })
    );
    

#### Object with selected entries

Schema to validate only selected entries of an object.

    const PickObjectSchema = v.pick(
      v.object({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    );
    

### Related

The following APIs can be combined with `object`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

objectWithRest
--------------

Creates an object with rest schema.

    const Schema = v.objectWithRest<TEntries, TRest, TMessage>(
      entries,
      rest,
      message
    );
    

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ObjectWithRestIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `objectWithRest` you can validate the data type of the input and whether the content matches `entries` and `rest`. If the input is not an object, you can use `message` to customize the error message.

> The difference to [`object`](object.md) is that this schema includes unknown entries in the output. In addition, this schema filters certain entries from the unknown entries for security reasons.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `ObjectWithRestSchema<TEntries, TRest, TMessage>`

### Examples

The following examples show how `objectWithRest` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Object schema with rest

Schema to validate an object with generic rest entries.

    const ObjectSchemaWithRest = v.objectWithRest(
      {
        key1: v.string(),
        key2: v.number(),
      },
      v.boolean()
    );
    

#### Merge several objects

Schema that merges the entries of two object schemas.

    const MergedObjectSchema = v.objectWithRest(
      {
        ...ObjectSchema1.entries,
        ...ObjectSchema2.entries,
      },
      v.null()
    );
    

#### Mark keys as optional

Schema to validate an object with partial entries.

    const PartialObjectSchema = partial(
      objectWithRest(
        {
          key1: string(),
          key2: number(),
        },
        v.undefined()
      )
    );
    

#### Object with selected entries

Schema to validate only selected entries of an object.

    const PickObjectSchema = v.pick(
      v.objectWithRest(
        {
          key1: v.string(),
          key2: v.number(),
          key3: v.boolean(),
        },
        v.null()
      ),
      ['key1', 'key3']
    );
    

### Related

The following APIs can be combined with `objectWithRest`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

optional
--------

Creates an optional schema.

    const Schema = v.optional<TWrapped, TDefault>(wrapped, default_);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped> | never`

### Parameters

*   `wrapped` `TWrapped`
*   `default_` `TDefault`

#### Explanation

With `optional` the validation of your schema will pass `undefined` inputs, and if you specify a `default_` input value, the schema will use it if the input is `undefined`. For this reason, the output type may differ from the input type of the schema.

> Note that `optional` does not accept `null` as an input. If you want to accept `null` inputs, use [`nullable`](nullable.md), and if you want to accept `null` and `undefined` inputs, use [`nullish`](nullish.md) instead. Also, if you want to set a default output value for any invalid input, you should use [`fallback`](fallback.md) instead.

### Returns

*   `Schema` `OptionalSchema<TWrapped, TDefault>`

### Examples

The following examples show how `optional` can be used.

#### Optional string schema

Schema that accepts `string` and `undefined`.

    const OptionalStringSchema = v.optional(v.string(), "I'm the default!");
    

#### Optional date schema

Schema that accepts [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and `undefined`.

> By using a function as the `default_` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input is `undefined`.

    const OptionalDateSchema = v.optional(v.date(), () => new Date());
    

#### Optional entry schema

Object schema with an optional entry.

    const OptionalEntrySchema = v.object({
      key: v.optional(v.string()),
    });
    

#### Unwrap optional schema

Use [`unwrap`](unwrap.md) to undo the effect of `optional`.

    const OptionalNumberSchema = v.optional(v.number());
    const NumberSchema = v.unwrap(OptionalNumberSchema);
    

### Related

The following APIs can be combined with `optional`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

picklist
--------

Creates a picklist schema.

    const Schema = v.picklist<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends PicklistOptions`
*   `TMessage` `extends ErrorMessage<PicklistIssue> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `picklist` you can validate that the input corresponds to a picklist option. If the input is invalid, you can use `message` to customize the error message.

> `picklist` works in a similar way to [`enum`](enum.md). However, in many cases it is easier to use because you can pass an array of values instead of an enum.

### Returns

*   `Schema` `PicklistSchema<TOptions, TMessage>`

### Examples

The following examples show how `picklist` can be used.

#### Language schema

Schema to validate programming languages.

    const LanguageSchema = v.picklist(['JavaScript', 'TypeScript']);
    

#### Country schema

Schema to validate country codes.

    const countries = [
      { name: 'Germany', code: 'DE' },
      { name: 'France', code: 'FR' },
      { name: 'United States', code: 'US' },
    ] as const;
    
    const CountrySchema = v.picklist(
      countries.map((country) => country.code),
      'Please select your country.'
    );
    

### Related

The following APIs can be combined with `picklist`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

promise
-------

Creates a promise schema.

    const Schema = v.promise<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<PromiseIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `promise` you can validate the data type of the input. If the input is not a promise, you can use `message` to customize the error message.

### Returns

*   `Schema` `PromiseSchema<TMessage>`

### Examples

The following examples show how `promise` can be used.

#### Number promise

Schema to validate a promise that resolves to a number.

    const NumberPromiseSchema = v.pipeAsync(
      v.promise(),
      v.awaitAsync(),
      v.number()
    );
    

### Related

The following APIs can be combined with `promise`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

record
------

Creates a record schema.

    const Schema = v.record<TKey, TValue, TMessage>(key, value, message);
    

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `record` you can validate the data type of the input and whether the entries matches `key` and `value`. If the input is not an object, you can use `message` to customize the error message.

> This schema filters certain entries from the record for security reasons.

> This schema marks an entry as optional if it detects that its key is a literal type. The reason for this is that it is not technically possible to detect missing literal keys without restricting the `key` schema to [`string`](string.md), [`enum`](enum.md) and [`picklist`](picklist.md). However, if [`enum`](enum.md) and [`picklist`](picklist.md) are used, it is better to use [`object`](object.md) with [`entriesFromList`](entriesFromList.md) because it already covers the needed functionality. This decision also reduces the bundle size of `record`, because it only needs to check the entries of the input and not any missing keys.

### Returns

*   `Schema` `RecordSchema<TKey, TValue, TMessage>`

### Examples

The following examples show how `record` can be used.

#### String record schema

Schema to validate a record with strings.

    const StringRecordSchema = v.record(
      v.string(),
      v.string(),
      'An object is required.'
    );
    

#### Object record schema

Schema to validate a record of objects.

    const ObjectRecordSchema = v.record(v.string(), v.object({ key: v.string() }));
    

#### Picklist as key

Schema to validate a record with specific optional keys.

    const ProductRecordSchema = v.record(
      v.picklist(['product_a', 'product_b', 'product_c']),
      v.optional(v.number())
    );
    

#### Enum as key

Schema to validate a record with specific optional keys.

    enum Products {
      PRODUCT_A = 'product_a',
      PRODUCT_B = 'product_b',
      PRODUCT_C = 'product_c',
    }
    
    const ProductRecordSchema = v.record(v.enum(Products), v.optional(v.number()));
    

### Related

The following APIs can be combined with `record`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

set
---

Creates a set schema.

    const Schema = v.set<TValue, TMessage>(value, message);
    

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<SetIssue> | undefined`

### Parameters

*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `set` you can validate the data type of the input and whether the content matches `value`. If the input is not a set, you can use `message` to customize the error message.

### Returns

*   `Schema` `SetSchema<TValue, TMessage>`

### Examples

The following examples show how `set` can be used.

#### String set schema

Schema to validate a set with string values.

    const StringSetSchema = v.set(v.string());
    

#### Object set schema

Schema to validate a set with object values.

    const ObjectSetSchema = v.set(v.object({ key: v.string() }));
    

### Related

The following APIs can be combined with `set`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

strictObject
------------

Creates a strict object schema.

    const Schema = v.strictObject<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<StrictObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `strictObject` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object or does include unknown entries, you can use `message` to customize the error message.

> The difference to [`object`](object.md) is that this schema returns an issue for unknown entries. It intentionally returns only one issue. Otherwise, attackers could send large objects to exhaust device resources. If you want an issue for every unknown key, use the [`objectWithRest`](objectWithRest.md) schema with [`never`](never.md) for the `rest` argument.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `StrictObjectSchema<TEntries, TMessage>`

### Examples

The following examples show how `strictObject` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Simple object schema

Schema to validate a strict object with two keys.

    const SimpleObjectSchema = v.strictObject({
      key1: v.string(),
      key2: v.number(),
    });
    

#### Merge several objects

Schema that merges the entries of two object schemas.

    const MergedObjectSchema = v.strictObject({
      ...ObjectSchema1.entries,
      ...ObjectSchema2.entries,
    });
    

#### Mark keys as optional

Schema to validate an object with partial entries.

    const PartialObjectSchema = v.partial(
      v.strictObject({
        key1: v.string(),
        key2: v.number(),
      })
    );
    

#### Object with selected entries

Schema to validate only selected entries of a strict object.

    const PickObjectSchema = v.pick(
      v.strictObject({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    );
    

### Related

The following APIs can be combined with `strictObject`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

strictTuple
-----------

Creates a strict tuple schema.

    const Schema = v.strictTuple<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `strictTuple` you can validate the data type of the input and whether the content matches `items`. If the input is not an array or does include unknown items, you can use `message` to customize the error message.

> The difference to [`tuple`](tuple.md) is that this schema returns an issue for unknown items. It intentionally returns only one issue. Otherwise, attackers could send large arrays to exhaust device resources. If you want an issue for every unknown item, use the [`tupleWithRest`](tupleWithRest.md) schema with [`never`](never.md) for the `rest` argument.

### Returns

*   `Schema` `StrictTupleSchema<TItems, TMessage>`

### Examples

The following examples show how `strictTuple` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Simple tuple schema

Schema to validate a strict tuple with two items.

    const SimpleTupleSchema = v.strictTuple([v.string(), v.number()]);
    

### Related

The following APIs can be combined with `strictTuple`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

string
------

Creates a string schema.

    const Schema = v.string<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<StringIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `string` you can validate the data type of the input. If the input is not a string, you can use `message` to customize the error message.

### Returns

*   `Schema` `StringSchema<TMessage>`

### Examples

The following examples show how `string` can be used.

#### Email schema

Schema to validate an email.

    const EmailSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your email.'),
      v.email('The email is badly formatted.'),
      v.maxLength(30, 'Your email is too long.')
    );
    

#### Password schema

Schema to validate a password.

    const PasswordSchema = v.pipe(
      v.string(),
      v.minLength(8, 'Your password is too short.'),
      v.maxLength(30, 'Your password is too long.'),
      v.regex(/[a-z]/, 'Your password must contain a lowercase letter.'),
      v.regex(/[A-Z]/, 'Your password must contain a uppercase letter.'),
      v.regex(/[0-9]/, 'Your password must contain a number.')
    );
    

#### URL schema

Schema to validate a URL.

    const UrlSchema = v.pipe(
      v.string('A URL must be string.'),
      v.url('The URL is badly formatted.')
    );
    

### Related

The following APIs can be combined with `string`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`check`](check.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`excludes`](excludes.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`regex`](regex.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

symbol
------

Creates a symbol schema.

    const Schema = v.symbol<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<SymbolIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `symbol` you can validate the data type of the input. If it is not a symbol, you can use `message` to customize the error message.

### Returns

*   `Schema` `SymbolSchema<TMessage>`

### Examples

The following examples show how `symbol` can be used.

#### Custom message

Symbol schema with a custom error message.

    const schema = v.symbol('A symbol is required');
    

### Related

The following APIs can be combined with `symbol`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

tuple
-----

Creates a tuple schema.

    const Schema = v.tuple<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<TupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `tuple` you can validate the data type of the input and whether the content matches `items`. If the input is not an array, you can use `message` to customize the error message.

> This schema removes unknown items. The output will only include the items you specify. To include unknown items, use [`looseTuple`](looseTuple.md). To return an issue for unknown items, use [`strictTuple`](strictTuple.md). To include and validate unknown items, use [`tupleWithRest`](tupleWithRest.md).

### Returns

*   `Schema` `TupleSchema<TItems, TMessage>`

### Examples

The following examples show how `tuple` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Simple tuple schema

Schema to validate a tuple with two items.

    const SimpleTupleSchema = v.tuple([v.string(), v.number()]);
    

### Related

The following APIs can be combined with `tuple`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

tupleWithRest
-------------

Creates a tuple with rest schema.

    const Schema = v.tupleWithRest<TItems, TRest, TMessage>(items, rest, message);
    

### Generics

*   `TItems` `extends TupleItems`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `tupleWithRest` you can validate the data type of the input and whether the content matches `items` and `rest`. If the input is not an array, you can use `message` to customize the error message.

### Returns

*   `Schema` `TupleWithRestSchema<TItems, TRest, TMessage>`

### Examples

The following examples show how `tupleWithRest` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Tuple schema with rest

Schema to validate a tuple with generic rest items.

    const TupleSchemaWithRest = v.tupleWithRest(
      [v.string(), v.number()],
      v.boolean()
    );
    

### Related

The following APIs can be combined with `tupleWithRest`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

undefined
---------

Creates an undefined schema.

    const Schema = v.undefined<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<UndefinedIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `undefined` you can validate the data type of the input and if it is not `undefined`, you can use `message` to customize the error message.

### Returns

*   `Schema` `UndefinedSchema<TMessage>`

### Related

The following APIs can be combined with `undefined`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

undefinedable
-------------

Creates an undefinedable schema.

    const Schema = v.undefinedable<TWrapped, TDefault>(wrapped, default_);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped> | never`

### Parameters

*   `wrapped` `TWrapped`
*   `default_` `TDefault`

#### Explanation

With `undefinedable` the validation of your schema will pass `undefined` inputs, and if you specify a `default_` input value, the schema will use it if the input is `undefined`. For this reason, the output type may differ from the input type of the schema.

> `undefinedable` behaves exactly the same as [`optional`](optional.md) at runtime. The only difference is the input and output type when used for object entries. While [`optional`](optional.md) adds a question mark to the key, `undefinedable` does not.

> Note that `undefinedable` does not accept `null` as an input. If you want to accept `null` inputs, use [`nullable`](nullable.md), and if you want to accept `null` and `undefined` inputs, use [`nullish`](nullish.md) instead. Also, if you want to set a default output value for any invalid input, you should use [`fallback`](fallback.md) instead.

### Returns

*   `Schema` `UndefinedableSchema<TWrapped, TDefault>`

### Examples

The following examples show how `undefinedable` can be used.

#### Undefinedable string schema

Schema that accepts `string` and `undefined`.

    const UndefinedableStringSchema = v.undefinedable(
      v.string(),
      "I'm the default!"
    );
    

#### Undefinedable date schema

Schema that accepts [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and `undefined`.

> By using a function as the `default_` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input is `undefined`.

    const UndefinedableDateSchema = v.undefinedable(v.date(), () => new Date());
    

#### Undefinedable entry schema

Object schema with an undefinedable entry.

    const UndefinedableEntrySchema = v.object({
      key: v.undefinedable(v.string()),
    });
    

#### Unwrap undefinedable schema

Use [`unwrap`](unwrap.md) to undo the effect of `undefinedable`.

    const UndefinedableNumberSchema = v.undefinedable(v.number());
    const NumberSchema = v.unwrap(UndefinedableNumberSchema);
    

### Related

The following APIs can be combined with `undefinedable`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonUndefinedable`](nonUndefinedable.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

union
-----

Creates an union schema.

> I recommend that you read the [unions guide](../guides/unions.md) before using this schema function.

    const Schema = v.union<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends UnionOptions`
*   `TMessage` `extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `union` you can validate if the input matches one of the given `options`. If the input does not match a schema and cannot be clearly assigned to one of the options, you can use `message` to customize the error message.

If a bad input can be uniquely assigned to one of the schemas based on the data type, the result of that schema is returned. Otherwise, a general issue is returned that contains the issues of each schema as subissues. This is a special case within the library, as the issues of `union` can contradict each other.

### Returns

*   `Schema` `UnionSchema<TOptions, TMessage>`

### Examples

The following examples show how `union` can be used.

#### URL schema

Schema to validate an URL or empty string.

    const UrlSchema = v.union([v.pipe(v.string(), v.url()), v.literal('')]);
    

#### Number schema

Schema to validate a number or decimal string.

    const NumberSchema = v.union([v.number(), v.pipe(v.string(), v.decimal())]);
    

#### Date schema

Schema to validate a `Date` or ISO timestamp.

    const DateSchema = v.union([v.date(), v.pipe(v.string(), v.isoTimestamp())]);
    

### Related

The following APIs can be combined with `union`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

unknown
-------

Creates an unknown schema.

> Use this schema function only if the data is truly unknown. Otherwise, use the other more specific schema functions that describe the data exactly.

    const Schema = v.unknown();
    

### Returns

*   `Schema` `UnknownSchema`

### Related

The following APIs can be combined with `unknown`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

variant
-------

Creates a variant schema.

    const Schema = v.variant<TKey, TOptions, TMessage>(key, options, message);
    

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptions<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `variant` you can validate if the input matches one of the given object `options`. The object schema to be used for the validation is determined by the discriminator `key`. If the input does not match a schema and cannot be clearly assigned to one of the options, you can use `message` to customize the error message.

> It is allowed to specify the exact same or a similar discriminator multiple times. However, in such cases `variant` will only return the output of the first untyped or typed variant option result. Typed results take precedence over untyped ones.

> For deeply nested `variant` schemas with several different discriminator keys, `variant` will return an issue for the first most likely object schemas on invalid input. The order of the discriminator keys and the presence of a discriminator in the input are taken into account.

### Returns

*   `Schema` `VariantSchema<TKey, TOptions, TMessage>`

### Examples

The following examples show how `variant` can be used.

#### Variant schema

Schema to validate an email, URL or date variant.

    const VariantSchema = v.variant('type', [
      v.object({
        type: v.literal('email'),
        email: v.pipe(v.string(), v.email()),
      }),
      v.object({
        type: v.literal('url'),
        url: v.pipe(v.string(), v.url()),
      }),
      v.object({
        type: v.literal('date'),
        date: v.pipe(v.string(), v.isoDate()),
      }),
    ]);
    

#### Nested variant schema

You can also nest `variant` schemas.

    const NestedVariantSchema = v.variant('type', [
      VariantSchema,
      v.object({
        type: v.literal('color'),
        date: v.pipe(v.string(), v.hexColor()),
      }),
    ]);
    

#### Complex variant schema

You can also use `variant` to validate complex objects with multiple different discriminator keys.

    const ComplexVariantSchema = v.variant('kind', [
      v.variant('type', [
        v.object({
          kind: v.literal('fruit'),
          type: v.literal('apple'),
          item: v.object({ … }),
        }),
        v.object({
          kind: v.literal('fruit'),
          type: v.literal('banana'),
          item: v.object({ … }),
        }),
      ]),
      v.variant('type', [
        v.object({
          kind: v.literal('vegetable'),
          type: v.literal('carrot'),
          item: v.object({ … }),
        }),
        v.object({
          kind: v.literal('vegetable'),
          type: v.literal('tomato'),
          item: v.object({ … }),
        }),
      ]),
    ]);
    

### Related

The following APIs can be combined with `variant`.

#### Schemas

*   [`object`](object.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

void
----

Creates a void schema.

    const Schema = v.void<TMessage>(message);
    

### Generics

*   `TMessage` `extends ErrorMessage<VoidIssue> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `void` you can validate the data type of the input and if it is not `undefined`, you can use `message` to customize the error message.

### Returns

*   `Schema` `VoidSchema<TMessage>`

### Related

The following APIs can be combined with `void`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

assert
------

Checks if the input matches the scheme.

> As this is an assertion function, it can be used as a type guard.

    v.assert<TSchema>(schema, input);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`

### Example

The following example show how `assert` can be used.

    const EmailSchema = v.pipe(v.string(), v.email());
    const data: unknown = 'jane@example.com';
    
    v.assert(EmailSchema, data);
    const email = data; // string
    

### Related

The following APIs can be combined with `assert`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

config
------

Changes the local configuration of a schema.

    const Schema = v.config<TSchema>(schema, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `config` `Config<InferIssue<TSchema>>`

#### Explanation

This method overwrites the selected configuration properties by merging the previous configuration of the `schema` with the provided `config`.

### Returns

*   `Schema` `TSchema`

### Examples

The following examples show how `config` can be used.

#### Same error message

Schema that uses the same error message for the entire pipeline.

    const Schema = v.object({
      email: v.config(
        v.pipe(v.string(), v.trim(), v.email(), v.endsWith('@example.com')),
        { message: 'The email does not conform to the required format.' }
      ),
      // ...
    });
    

#### Abort pipeline early

Schema that aborts only a specific pipeline early.

    const Schema = v.object({
      url: v.config(
        v.pipe(v.string(), v.trim(), v.url(), v.endsWith('@example.com')),
        { abortPipeEarly: true }
      ),
      // ...
    });
    

### Related

The following APIs can be combined with `config`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

fallback
--------

Returns a fallback value as output if the input does not match the schema.

    const Schema = v.fallback<TSchema, TFallback>(schema, fallback);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends Fallback<TSchema>`

### Parameters

*   `schema` `TSchema`
*   `fallback` `TFallback`

#### Explanation

`fallback` allows you to define a fallback value for the output that will be used if the validation of the input fails. This means that no issues will be returned when using `fallback` and the schema will always return an output.

> If you only want to set a default value for `null` or `undefined` inputs, you should use [`optional`](optional.md), [`nullable`](nullable.md) or [`nullish`](nullish.md) instead.

> The fallback value is not validated. Make sure that the fallback value matches your schema.

### Returns

*   `Schema` `SchemaWithFallback<TSchema, TFallback>`

### Examples

The following examples show how `fallback` can be used.

#### Fallback string schema

Schema that will always return a string output.

    const FallbackStringSchema = v.fallback(v.string(), "I'm the fallback!");
    

#### Fallback date schema

Schema that will always return a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) output.

> By using a function as the `fallback` parameter, the schema will return a new [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instance each time the input does not match the schema.

    const FallbackDateSchema = v.fallback(v.date(), () => new Date());
    

### Related

The following APIs can be combined with `fallback`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

flatten
-------

Flatten the error messages of issues.

    const errors = v.flatten<TSchema>(issues);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `issues` `[InferIssue<TSchema>, ...InferIssue<TSchema>[]]`

#### Explanation

The error messages of issues without a path that belong to the root of the schema are added to the `.root` key.

The error messages of Issues with a path that belong to the nested parts of the schema and can be converted to a dot path are added to the `.nested` key.

Some issue paths, for example for complex data types like `Set` and `Map`, have no key or a key that cannot be converted to a dot path. These error messages are added to the `.other` key.

### Returns

*   `errors` `FlatErrors<TSchema>`

### Examples

The following example show how `flatten` can be used.

    const Schema = v.object({
      nested: v.object({
        key: v.string('Value of "nested.key" is missing.'),
      }),
    });
    
    const result = v.safeParse(Schema, { nested: {} });
    
    if (result.issues) {
      const flatErrors = v.flatten<typeof Schema>(result.issues);
    
      // ...
    }
    

### Related

The following APIs can be combined with `flatten`.

#### Methods

*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`safeParse`](safeParse.md)

forward
-------

Forwards the issues of the passed validation action.

    const Action = v.forward<TInput, TIssue>(action, pathKeys);
    

### Generics

*   `TInput` `extends Record<string, unknown> | ArrayLike<unknown>`
*   `TIssue` `extends BaseIssue<unknown>`

### Parameters

*   `action` `BaseValidation<TInput, TInput, TIssue>`
*   `pathKeys` `PathKeys<TInput>`

#### Explanation

`forward` allows you to forward the issues of the passed validation `action` via `pathKeys` to a nested field of a schema.

### Returns

*   `Action` `BaseValidation<TInput, TInput, TIssue>`

### Examples

The following examples show how `forward` can be used.

#### Register schema

Schema that ensures that the two passwords match.

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
    

### Related

The following APIs can be combined with `forward`.

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
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md)

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

getDefault
----------

Returns the default value of the schema.

    const value = v.getDefault<TSchema>(schema, dataset, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `dataset` `UnknownDataset | undefined`
*   `config` `Config<InferIssue<TSchema>> | undefined`

### Returns

*   `value` `InferDefault<TSchema>`

### Examples

The following examples show how `getDefault` can be used.

#### Optional string schema

Get the default value of an optional string schema.

    const OptionalStringSchema = v.optional(v.string(), "I'm the default!");
    const defaultValue = v.getDefault(OptionalStringSchema); // "I'm the default!"
    

### Related

The following APIs can be combined with `getDefault`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

getDefaults
-----------

Returns the default values of the schema.

> The difference to [`getDefault`](getDefault.md) is that for object and tuple schemas this function recursively returns the default values of the subschemas instead of `undefined`.

    const values = v.getDefaults<TSchema>(schema);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `values` `InferDefaults<TSchema>`

### Examples

The following examples show how `getDefaults` can be used.

#### Object defaults

Get the default values of an object schema.

    const ObjectSchema = v.object({
      key: v.optional(v.string(), "I'm the default!"),
    });
    
    const defaultValues = v.getDefaults(ObjectSchema); // { key: "I'm the default!" }
    

#### Tuple defaults

Get the default values of a tuple schema.

    const TupleSchema = v.tuple([v.nullable(v.number(), 100)]);
    const defaultValues = v.getDefaults(TupleSchema); // [100]
    

### Related

The following APIs can be combined with `getDefaults`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

getFallback
-----------

Returns the fallback value of the schema.

    const value = v.getFallback<TSchema>(schema, dataset, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `dataset` `OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>> | undefined`
*   `config` `Config<InferIssue<TSchema>> | undefined`

### Returns

*   `value` `InferFallback<TSchema>`

### Examples

The following examples show how `getFallback` can be used.

#### Fallback string schema

Get the fallback value of a string schema.

    const FallbackStringSchema = v.fallback(v.string(), "I'm the fallback!");
    const fallbackValue = v.getFallback(FallbackStringSchema); // "I'm the fallback!"
    

### Related

The following APIs can be combined with `getFallback`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

getFallbacks
------------

Returns the fallback values of the schema.

> The difference to [`getFallback`](getFallback.md) is that for object and tuple schemas this function recursively returns the fallback values of the subschemas instead of `undefined`.

    const values = v.getFallbacks<TSchema>(schema);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `values` `InferFallbacks<TSchema>`

### Examples

The following examples show how `getFallbacks` can be used.

#### Object fallbacks

Get the fallback values of an object schema.

    const ObjectSchema = v.object({
      key: v.fallback(v.string(), "I'm the fallback!"),
    });
    
    const fallbackValues = v.getFallbacks(ObjectSchema); // { key: "I'm the fallback!" }
    

#### Tuple fallbacks

Get the fallback values of a tuple schema.

    const TupleSchema = v.tuple([v.fallback(v.number(), 100)]);
    const fallbackValues = v.getFallbacks(TupleSchema); // [100]
    

### Related

The following APIs can be combined with `getFallbacks`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

is
--

Checks if the input matches the scheme.

> By using a type predicate, this function can be used as a type guard.

    const result = v.is<TSchema>(schema, input);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`

### Returns

*   `result` `boolean`

### Example

The following example show how `is` can be used.

    const EmailSchema = v.pipe(v.string(), v.email());
    const data: unknown = 'jane@example.com';
    
    if (v.is(EmailSchema, data)) {
      const email = data; // string
    }
    

### Related

The following APIs can be combined with `is`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

keyof
-----

Creates a picklist schema of object keys.

    const Schema = v.keyof<TSchema, TMessage>(schema, message);
    

### Generics

*   `TSchema` `extends LooseObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined>`
*   `TMessage` `ErrorMessage<PicklistIssue> | undefined`

### Parameters

*   `schema` `TSchema`
*   `message` `TMessage`

### Returns

*   `Schema` `PicklistSchema<ObjectKeys<TSchema, TMessage>>`

### Examples

The following examples show how `keyof` can be used.

#### Object key schema

Schema to validate the keys of an object.

    const ObjectSchema = v.object({ key1: v.string(), key2: v.number() });
    const ObjectKeySchema = v.keyof(ObjectSchema); // 'key1' | 'key2'
    

### Related

The following APIs can be combined with `keyof`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

omit
----

Creates a modified copy of an object schema that does not contain the selected entries.

    const Schema = v.omit<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema>`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`omit` creates a modified copy of the given object `schema` that does not contain the selected `keys`. It is similar to TypeScript's [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) utility type.

> Because `omit` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `omit`.

### Returns

*   `Schema` `SchemaWithOmit<TSchema, TKeys>`

### Examples

The following examples show how `omit` can be used.

#### Omit specific keys

Schema that does not contain the selected keys of an existing schema.

    const OmittedSchema = v.omit(
      v.object({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    ); // { key2: number }
    

### Related

The following APIs can be combined with `omit`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

parse
-----

Parses an unknown input based on a schema.

    const output = v.parse<TSchema>(schema, input, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`
*   `config` `Config<InferIssue<TSchema>> | undefined`

#### Explanation

`parse` will throw a [`ValiError`](ValiError.md) if the `input` does not match the `schema`. Therefore you should use a try/catch block to catch errors. If the input matches the schema, it is valid and the `output` of the schema will be returned typed.

### Returns

*   `output` `InferOutput<TSchema>`

### Example

The following example show how `parse` can be used.

    try {
      const EmailSchema = v.pipe(v.string(), v.email());
      const email = v.parse(EmailSchema, 'jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.log(error);
    }
    

### Related

The following APIs can be combined with `parse`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md),
*   [`isValiError`](isValiError.md),
*   [`ValiError`](ValiError.md)

parser
------

Returns a function that parses an unknown input based on a schema.

    const parser = v.parser<TSchema, TConfig>(schema, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Parameters

*   `schema` `TSchema`
*   `config` `TConfig`

### Returns

*   `parser` `Parser<TSchema, TConfig>`

### Example

The following example show how `parser` can be used.

    try {
      const EmailSchema = v.pipe(v.string(), v.email());
      const emailParser = v.parser(EmailSchema);
      const email = emailParser('jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.log(error);
    }
    

### Related

The following APIs can be combined with `parser`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md),
*   [`isValiError`](isValiError.md),
*   [`ValiError`](ValiError.md)

partial
-------

Creates a modified copy of an object schema that marks all or only the selected entries as optional.

    const Schema = v.partial<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`partial` creates a modified copy of the given object `schema` where all entries or only the selected `keys` are optional. It is similar to TypeScript's [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility type.

> Because `partial` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `partial`.

### Returns

*   `Schema` `SchemaWithPartial<TSchema, TKeys>`

### Examples

The following examples show how `partial` can be used.

#### Partial object schema

Schema to validate an object with partial entries.

    const PartialSchema = v.partial(
      v.object({
        key1: v.string(),
        key2: v.number(),
      })
    ); // { key1?: string; key2?: number }
    

#### With only specific keys

Schema to validate an object with only specific entries marked as optional.

    const PartialSchema = v.partial(
      v.object({
        key1: v.string(),
        key2: v.number(),
        key3: v.boolean(),
      }),
      ['key1', 'key3']
    ); // { key1?: string; key2: number; key3?: boolean }
    

### Related

The following APIs can be combined with `partial`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`omit`](omit.md),
*   [`keyof`](keyof.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

pick
----

Creates a modified copy of an object schema that contains only the selected entries.

    const Schema = v.pick<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema>`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`pick` creates modified copy of the given object `schema` that containing only the selected `keys`. It is similar to TypeScript's [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) utility type.

> Because `pick` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `pick`.

### Returns

*   `Schema` `SchemaWithPick<TSchema, TKeys>`

### Examples

The following examples show how `pick` can be used.

#### Pick specific keys

Schema that contains only the selected keys of an existing schema.

    const PickedSchema = v.pick(
      object({
        key1: string(),
        key2: number(),
        key3: boolean(),
      }),
      ['key1', 'key3']
    ); // { key1: string; key3: boolean }
    

### Related

The following APIs can be combined with `pick`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

pipe
----

Adds a pipeline to a schema, that can validate and transform its input.

    const Schema = v.pipe<TSchema, TItems>(schema, ...items);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TItems` `extends PipeItem<any, unknown, BaseIssue<unknown>>[]`

### Parameters

*   `schema` `TSchema`
*   `items` `TItems`

#### Explanation

`pipe` creates a modified copy of the given `schema`, containing a pipeline for detailed validations and transformations. It passes the input data synchronously through the `items` in the order they are provided and each item can examine and modify it.

> Since `pipe` returns a schema that can be used as the first argument of another pipeline, it is possible to nest multiple `pipe` calls to extend the validation and transformation further.

The `pipe` aborts early and marks the output as untyped if issues were collected before attempting to execute a schema or transformation action as the next item in the pipeline, to prevent unexpected behavior.

### Returns

*   `Schema` `SchemaWithPipe<[TSchema, ...TItems]>`

### Examples

The following examples show how `pipe` can be used. Please see the [pipeline guide](../guides/pipelines.md) for more examples and explanations.

#### Email schema

Schema to validate an email.

    const EmailSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your email.'),
      v.email('The email is badly formatted.'),
      v.maxLength(30, 'Your email is too long.')
    );
    

#### String to number

Schema to convert a string to a number.

    const NumberSchema = v.pipe(v.string(), v.transform(Number), v.number());
    

### Related

The following APIs can be combined with `pipe`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

required
--------

Creates a modified copy of an object schema that marks all or only the selected entries as required.

    const AllKeysSchema = v.required<TSchema, TMessage>(schema, message);
    const SelectedKeysSchema = v.required<TSchema, TKeys, TMessage>(
      schema,
      keys,
      message
    );
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`
*   `message` `TMessage`

#### Explanation

`required` creates a modified copy of the given object `schema` where all or only the selected `keys` are required. It is similar to TypeScript's [`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) utility type.

> Because `required` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipe`](pipe.md) method, as this may cause runtime errors. Please use the [`pipe`](pipe.md) method after you have modified the schema with `required`.

### Returns

*   `AllKeysSchema` `SchemaWithRequired<TSchema, undefined, TMessage>`
*   `SelectedKeysSchema` `SchemaWithRequired<TSchema, Tkeys, TMessage>`

### Examples

The following examples show how `required` can be used.

#### Required object schema

Schema to validate an object with required entries.

    const RequiredSchema = v.required(
      v.object({
        key1: v.optional(v.string()),
        key2: v.optional(v.number()),
      })
    ); // { key1: string; key2: number }
    

#### With only specific keys

Schema to validate an object with only specific entries marked as required.

    const RequiredSchema = v.required(
      v.object({
        key1: v.optional(v.string()),
        key2: v.optional(v.number()),
        key3: v.optional(v.boolean()),
      }),
      ['key1', 'key3']
    ); // { key1: string; key2?: number; key3: boolean }
    

### Related

The following APIs can be combined with `required`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`omit`](omit.md),
*   [`keyof`](keyof.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

safeParse
---------

Parses an unknown input based on a schema.

    const result = v.safeParse<TSchema>(schema, input, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`
*   `config` `Config<InferIssue<TSchema>> | undefined`

### Returns

*   `result` `SafeParseResult<TSchema>`

### Example

The following example show how `safeParse` can be used.

    const EmailSchema = v.pipe(v.string(), v.email());
    const result = v.safeParse(EmailSchema, 'jane@example.com');
    
    if (result.success) {
      const email = result.output;
    } else {
      console.log(result.issues);
    }
    

### Related

The following APIs can be combined with `safeParse`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md)

safeParser
----------

Returns a function that parses an unknown input based on a schema.

    const safeParser = v.safeParser<TSchema, TConfig>(schema, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Parameters

*   `schema` `TSchema`
*   `config` `TConfig`

### Returns

*   `safeParser` `SafeParser<TSchema, TConfig>`

### Example

The following example show how `safeParser` can be used.

    const EmailSchema = v.pipe(v.string(), v.email());
    const safeEmailParser = v.safeParser(EmailSchema);
    const result = safeEmailParser('jane@example.com');
    
    if (result.success) {
      const email = result.output;
    } else {
      console.log(result.issues);
    }
    

### Related

The following APIs can be combined with `safeParser`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md)

unwrap
------

Unwraps the wrapped schema.

    const Schema = v.unwrap<TSchema>(schema);
    

### Generics

*   `TSchema` `extends NonNullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullableIssue> | undefined> | NonNullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullableIssue> | undefined> | NonNullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullishIssue> | undefined> | NonNullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonNullishIssue> | undefined> | NonOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonOptionalIssue> | undefined> | NonOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<NonOptionalIssue> | undefined> | NullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullableSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `Schema` `TSchema['wrapped']`

### Examples

The following examples show how `unwrap` can be used.

#### Unwrap string schema

Unwraps the wrapped string schema.

    const OptionalStringSchema = v.optional(v.string());
    const StringSchema = v.unwrap(OptionalStringSchema);
    

### Related

The following APIs can be combined with `unwrap`.

#### Schemas

*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`optional`](optional.md),
*   [`undefinedable`](undefinedable.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`is`](is.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`pipe`](pipe.md),
*   [`safeParse`](safeParse.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

args
----

Creates a function arguments transformation action.

    const Action = v.args<TInput, TSchema>(schema);
    

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>`

### Parameters

*   `schema` `TSchema`

#### Explanation

With `args` you can force the arguments of a function to match the given `schema`.

### Returns

*   `Action` `ArgsAction<TInput, TSchema>`

### Examples

The following examples show how `args` can be used.

#### Function schema

Schema of a function that transforms a string to a number.

    const FunctionSchema = v.pipe(
      v.function(),
      v.args(v.tuple([v.pipe(v.string(), v.decimal())])),
      v.returns(v.number())
    );
    

### Related

The following APIs can be combined with `args`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`looseTuple`](looseTuple.md),
*   [`function`](function.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

base64
------

Creates a [Base64](https://en.wikipedia.org/wiki/Base64) validation action.

    const Action = v.base64<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Base64Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `base64` you can validate the formatting of a string. If the input is not a Base64 string, you can use `message` to customize the error message.

### Returns

*   `Action` `Base64Action<TInput, TMessage>`

### Examples

The following examples show how `base64` can be used.

#### Base64 schema

Schema to validate a Base64 string.

    const Base64Schema = v.pipe(v.string(), v.base64('The data is badly encoded.'));
    

### Related

The following APIs can be combined with `base64`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

bic
---

Creates a [BIC](https://en.wikipedia.org/wiki/ISO_9362) validation action.

    const Action = v.bic<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<BicIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `bic` you can validate the formatting of a string. If the input is not a BIC, you can use `message` to customize the error message.

### Returns

*   `Action` `BicAction<TInput, TMessage>`

### Examples

The following examples show how `bic` can be used.

#### BIC schema

Schema to validate a BIC.

    const BicSchema = v.pipe(
      v.string(),
      v.toUpperCase(),
      v.bic('The BIC is badly formatted.')
    );
    

### Related

The following APIs can be combined with `bic`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

brand
-----

Creates a brand transformation action.

    const Action = v.brand<TInput, TName>(name);
    

### Generics

*   `TInput` `extends any`
*   `TName` `extends BrandName`

### Parameters

*   `name` `TName`

#### Explanation

`brand` allows you to brand the output type of a schema with a `name`. This ensures that data can only be considered valid if it has been validated by a particular branded schema.

### Returns

*   `Action` `BrandAction<TInput, TName>`

### Examples

The following examples show how `brand` can be used.

#### Branded fruit schema

Schema to ensure that only a validated fruit is accepted.

    // Create schema and infer output type
    const FruitSchema = v.pipe(v.object({ name: v.string() }), v.brand('Fruit'));
    type FruitOutput = v.InferOutput<typeof FruitSchema>;
    
    // This works because output is branded
    const apple: FruitOutput = v.parse(FruitSchema, { name: 'apple' });
    
    // But this will result in a type error
    const banana: FruitOutput = { name: 'banana' };
    

### Related

The following APIs can be combined with `brand`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

bytes
-----

Creates a [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.bytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<BytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `bytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `BytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `bytes` can be used.

#### Bytes schema

Schema to validate a string with 8 bytes.

    const BytesSchema = v.pipe(
      v.string(),
      v.bytes(8, 'Exactly 8 bytes are required.')
    );
    

### Related

The following APIs can be combined with `bytes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

check
-----

Creates a check validation action.

    const Action = v.check<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CheckIssue<TInput>> | undefined`

### Parameters

*   `requirement` `(input: TInput) => boolean`
*   `message` `TMessage`

#### Explanation

With `check` you can freely validate the input and return `true` if it is valid or `false` otherwise. If the input does not match your `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `CheckAction<TInput, TMessage>`

### Examples

The following examples show how `check` can be used.

#### Check object properties

Schema to check the properties of an object.

    const CustomObjectSchema = v.pipe(
      v.object({
        list: v.array(v.string()),
        length: v.number(),
      }),
      v.check(
        (input) => input.list.length === input.length,
        'The list does not match the length.'
      )
    );
    

### Related

The following APIs can be combined with `check`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

checkItems
----------

Creates a check items validation action.

    const Action = v.checkItems<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirement<TInput>`
*   `message` `TMessage`

#### Explanation

With `checkItems` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If an item does not match your `requirement`, you can use `message` to customize the error message.

> The special thing about `checkItems` is that it automatically forwards each issue to the appropriate item.

### Returns

*   `Action` `CheckItemsAction<TInput, TMessage>`

### Examples

The following examples show how `checkItems` can be used.

#### No duplicate items

Schema to validate that an array has no duplicate items.

    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.checkItems(
        (item, index, array) => array.indexOf(item) === index,
        'Duplicate items are not allowed.'
      )
    );
    

### Related

The following APIs can be combined with `checkItems`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

creditCard
----------

Creates a [credit card](https://en.wikipedia.org/wiki/Payment_card_number) validation action.

    const Action = v.creditCard<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `ErrorMessage<CreditCardIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `creditCard` you can validate the formatting of a string. If the input is not a credit card, you can use `message` to customize the error message.

> The following credit card providers are currently supported: American Express, Diners Card, Discover, JCB, Union Pay, Master Card, and Visa.

### Returns

*   `Action` `CreditCardAction<TInput, TMessage>`

### Examples

The following examples show how `creditCard` can be used.

#### Credit Card schema

Schema to validate a credit card.

    const CreditCardSchema = v.pipe(
      v.string(),
      v.creditCard('The credit card is badly formatted.')
    );
    

### Related

The following APIs can be combined with `creditCard`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

cuid2
-----

Creates a [Cuid2](https://github.com/paralleldrive/cuid2) validation action.

    const Action = v.cuid2<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Cuid2Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `cuid2` you can validate the formatting of a string. If the input is not an Cuid2, you can use `message` to customize the error message.

> Since Cuid2s are not limited to a fixed length, it is recommended to combine `cuid2` with [`length`](length.md) to ensure the correct length.

### Returns

*   `Action` `Cuid2Action<TInput, TMessage>`

### Examples

The following examples show how `cuid2` can be used.

#### Cuid2 schema

Schema to validate an Cuid2.

    const Cuid2Schema = v.pipe(
      v.string(),
      v.cuid2('The Cuid2 is badly formatted.'),
      v.length(10, 'The Cuid2 must be 10 characters long.')
    );
    

### Related

The following APIs can be combined with `cuid2`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

decimal
-------

Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.

    const Action = v.decimal<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DecimalIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `decimal` you can validate the formatting of a string. If the input is not a decimal, you can use `message` to customize the error message.

### Returns

*   `Action` `DecimalAction<TInput, TMessage>`

### Examples

The following examples show how `decimal` can be used.

#### Decimal schema

Schema to validate a decimal.

    const DecimalSchema = v.pipe(
      v.string(),
      v.decimal('The decimal is badly formatted.')
    );
    

### Related

The following APIs can be combined with `decimal`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

description
-----------

Creates a description metadata action.

    const Action = v.description<TInput, TDescription>(description_);
    

### Generics

*   `TInput` `extends any`
*   `TDescription` `extends string`

### Parameters

*   `description_` `TDescription`

#### Explanation

With `description` you can describe the purpose of a schema. This can be useful when working with AI tools or for documentation purposes.

### Returns

*   `Action` `DescriptionAction<TInput, TDescription>`

### Examples

The following examples show how `description` can be used.

#### Username schema

Schema to validate a user name.

    const UsernameSchema = v.pipe(
      v.string(),
      v.regex(/^[a-z0-9_-]{4,16}$/iu),
      v.title('Username'),
      v.description(
        'A username must be between 4 and 16 characters long and can only contain letters, numbers, underscores and hyphens.'
      )
    );
    

### Related

The following APIs can be combined with `description`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

digits
------

Creates a [digits](https://en.wikipedia.org/wiki/Numerical_digit) validation action.

    const Action = v.digits<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DigitsIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `digits` you can validate the formatting of a string. If the input does not soley consist of numerical digits, you can use `message` to customize the error message.

### Returns

*   `Action` `DigitsAction<TInput, TMessage>`

### Examples

The following examples show how `digits` can be used.

#### Digits schema

Schema to validate a digits.

    const DigitsSchema = v.pipe(
      v.string(),
      v.digits('The string contains something other than digits.')
    );
    

### Related

The following APIs can be combined with `digits`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

email
-----

Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation action.

    const Action = v.email<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmailIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `email` you can validate the formatting of a string. If the input is not an email, you can use `message` to customize the error message.

> This validation action intentionally only validates common email addresses. If you are interested in an action that covers the entire specification, please see issue [#204](https://github.com/fabian-hiller/valibot/issues/204).

### Returns

*   `Action` `EmailAction<TInput, TMessage>`

### Examples

The following examples show how `email` can be used.

#### Email schema

Schema to validate an email.

    const EmailSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your email.'),
      v.email('The email is badly formatted.'),
      v.maxLength(30, 'Your email is too long.')
    );
    

### Related

The following APIs can be combined with `email`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

emoji
-----

Creates an [emoji](https://en.wikipedia.org/wiki/Emoji) validation action.

    const Action = v.emoji<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmojiIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `emoji` you can validate the formatting of a string. If the input is not an emoji, you can use `message` to customize the error message.

### Returns

*   `Action` `EmojiAction<TInput, TMessage>`

### Examples

The following examples show how `emoji` can be used.

#### Emoji schema

Schema to validate an emoji.

    const EmojiSchema = v.pipe(
      v.string(),
      v.emoji('Please provide a valid emoji.')
    );
    

### Related

The following APIs can be combined with `emoji`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

empty
-----

Creates an empty validation action.

    const Action = v.empty<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<EmptyIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `empty` you can validate that a string or array is empty. If the input is not empty, you can use `message` to customize the error message.

### Returns

*   `Action` `EmptyAction<TInput, TMessage>`

### Examples

The following examples show how `empty` can be used.

#### String schema

Schema to validate that a string is empty.

    const StringSchema = v.pipe(v.string(), v.empty('The string must be empty.'));
    

#### Array schema

Schema to validate that an array is empty.

    const ArraySchema = v.pipe(
      v.array(v.number()),
      v.empty('The array must be empty.')
    );
    

### Related

The following APIs can be combined with `empty`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

endsWith
--------

Creates an ends with validation action.

    const Action = v.endsWith<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<EndsWithIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `endsWith` you can validate the end of a string. If the end does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `EndsWithAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `endsWith` can be used.

#### Email schema

Schema to validate an email with a specific domain.

    const EmailSchema = v.pipe(v.string(), v.email(), v.endsWith('@example.com'));
    

### Related

The following APIs can be combined with `endsWith`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

everyItem
---------

Creates an every item validation action.

    const Action = v.everyItem<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<EveryItemIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirement<TInput>`
*   `message` `TMessage`

#### Explanation

With `everyItem` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If not every item matches your `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `EveryItemAction<TInput, TMessage>`

### Examples

The following examples show how `everyItem` can be used.

#### Sorted array schema

Schema to validate that an array is sorted.

    const SortedArraySchema = v.pipe(
      v.array(v.number()),
      v.everyItem(
        (item, index, array) => index === 0 || item >= array[index - 1],
        'The numbers must be sorted in ascending order.'
      )
    );
    

### Related

The following APIs can be combined with `everyItem`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

excludes
--------

Creates an excludes validation action.

    const Action = v.excludes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<ContentInput>`
*   `TMessage` `extends ErrorMessage<ExcludesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `excludes` you can validate the content of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `ExcludesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `excludes` can be used.

#### String schema

Schema to validate that a string does not contain a specific substring.

    const StringSchema = v.pipe(
      v.string(),
      v.excludes('foo', 'The string must not contain "foo".')
    );
    

#### Array schema

Schema to validate that an array does not contain a specific string.

    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.excludes('foo', 'The array must not contain "foo".')
    );
    

### Related

The following APIs can be combined with `excludes`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

filterItems
-----------

Creates a filter items transformation action.

    const Action = v.filterItems<TInput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`

### Parameters

*   `operation` `ArrayRequirement<TInput>`

#### Explanation

With `filterItems` you can filter the items of an array. Returning `true` for an item will keep it in the array and returning `false` will remove it.

### Returns

*   `Action` `FilterItemsAction<TInput>`

### Examples

The following examples show how `filterItems` can be used.

#### Filter duplicate items

Schema to filter duplicate items from an array.

    const FilteredArraySchema = v.pipe(
      v.array(v.string()),
      v.filterItems((item, index, array) => array.indexOf(item) === index)
    );
    

### Related

The following APIs can be combined with `filterItems`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

findItem
--------

Creates a find item transformation action.

    const Action = v.findItem<TInput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`

### Parameters

*   `operation` `ArrayRequirement<TInput>`

#### Explanation

With `findItem` you can extract the first item of an array that matches the given `operation`.

### Returns

*   `Action` `FindItemAction<TInput>`

### Examples

The following examples show how `findItem` can be used.

#### Find duplicate item

Schema to find the first duplicate item in an array.

    const DuplicateItemSchema = v.pipe(
      v.array(v.string()),
      v.findItem((item, index, array) => array.indexOf(item) !== index)
    );
    

### Related

The following APIs can be combined with `findItem`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

finite
------

Creates a [finite](https://en.wikipedia.org/wiki/Finite) validation action.

    const Action = v.finite<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<FiniteIssue<TInput>> | unknown`

### Parameters

*   `message` `TMessage`

#### Explanation

With `finite` you can validate the value of a number. If the input is not a finite number, you can use `message` to customize the error message.

### Returns

*   `Action` `FiniteAction<TInput, TMessage>`

### Examples

The following examples show how `finite` can be used.

#### Finite number schema

Schema to validate a finite number.

    const FiniteNumberSchema = v.pipe(
      v.number(),
      v.finite('The number must be finite.')
    );
    

### Related

The following APIs can be combined with `finite`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`number`](number.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

graphemes
---------

Creates a [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.graphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<GraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `graphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `GraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `graphemes` can be used.

#### Graphemes schema

Schema to validate a string with 8 graphemes.

    const GraphemesSchema = v.pipe(
      v.string(),
      v.graphemes(8, 'Exactly 8 graphemes are required.')
    );
    

### Related

The following APIs can be combined with `graphemes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

hash
----

Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.

    const Action = v.hash<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HashIssue<TInput>> | undefined`

### Parameters

*   `types` `[HashType, ...HashType[]]`
*   `message` `TMessage`

#### Explanation

With `hash` you can validate the formatting of a string. If the input is not a hash, you can use `message` to customize the error message.

### Returns

*   `Action` `HashAction<TInput, TMessage>`

### Examples

The following examples show how `hash` can be used.

#### Hash schema

Schema to validate a hash.

    const HashSchema = v.pipe(
      v.string(),
      v.hash(['md5', 'sha1'], 'The specified hash is invalid.')
    );
    

### Related

The following APIs can be combined with `hash`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

hexadecimal
-----------

Creates a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) validation action.

    const Action = v.hexadecimal<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexadecimalIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `hexadecimal` you can validate the formatting of a string. If the input is not a hexadecimal, you can use `message` to customize the error message.

### Returns

*   `Action` `HexadecimalAction<TInput, TMessage>`

### Examples

The following examples show how `hexadecimal` can be used.

#### Hexadecimal schema

Schema to validate a Hexadecimal string.

    const HexadecimalSchema = v.pipe(
      v.string(),
      v.hexadecimal('The hexadecimal is badly formatted.')
    );
    

### Related

The following APIs can be combined with `hexadecimal`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

hexColor
--------

Creates a [hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) validation action.

    const Action = v.hexColor<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexColorIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `hexColor` you can validate the formatting of a string. If the input is not a hex color, you can use `message` to customize the error message.

### Returns

*   `Action` `HexColorAction<TInput, TMessage>`

### Examples

The following examples show how `hexColor` can be used.

#### Hex color schema

Schema to validate a hex color.

    const HexColorSchema = v.pipe(
      v.string(),
      v.hexColor('The hex color is badly formatted.')
    );
    

### Related

The following APIs can be combined with `hexColor`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

imei
----

Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.

    const Action = v.imei<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<ImeiIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `imei` you can validate the formatting of a string. If the input is not an imei, you can use `message` to customize the error message.

### Returns

*   `Action` `ImeiAction<TInput, TMessage>`

### Examples

The following examples show how `imei` can be used.

#### IMEI schema

Schema to validate an IMEI.

    const ImeiSchema = v.pipe(v.string(), v.imei('The imei is badly formatted.'));
    

### Related

The following APIs can be combined with `imei`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

includes
--------

Creates an includes validation action.

    const Action = v.includes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<ContentInput>`
*   `TMessage` `extends ErrorMessage<IncludesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `includes` you can validate the content of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `IncludesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `includes` can be used.

#### String schema

Schema to validate that a string contains a specific substring.

    const StringSchema = v.pipe(
      v.string(),
      v.includes('foo', 'The string must contain "foo".')
    );
    

#### Array schema

Schema to validate that an array contains a specific string.

    const ArraySchema = v.pipe(
      v.array(v.string()),
      v.includes('foo', 'The array must contain "foo".')
    );
    

### Related

The following APIs can be combined with `includes`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

integer
-------

Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.

    const Action = v.integer<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<IntegerIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `integer` you can validate the value of a number. If the input is not an integer, you can use `message` to customize the error message.

### Returns

*   `Action` `IntegerAction<TInput, TMessage>`

### Examples

The following examples show how `integer` can be used.

#### Integer schema

Schema to validate an integer.

    const IntegerSchema = v.pipe(
      v.number(),
      v.integer('The number must be an integer.')
    );
    

### Related

The following APIs can be combined with `integer`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`number`](number.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

ip
--

Creates an [IP address](https://en.wikipedia.org/wiki/IP_address) validation action.

> This validation action accepts IPv4 and IPv6 addresses. For a more specific validation, you can also use [`ipv4`](ipv4.md) or [`ipv6`](ipv6.md).

    const Action = v.ip<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IpIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ip` you can validate the formatting of a string. If the input is not an IP address, you can use `message` to customize the error message.

### Returns

*   `Action` `IpAction<TInput, TMessage>`

### Examples

The following examples show how `ip` can be used.

#### IP address schema

Schema to validate an IP address.

    const IpAddressSchema = v.pipe(
      v.string(),
      v.ip('The IP address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `ip`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

ipv4
----

Creates an [IPv4](https://en.wikipedia.org/wiki/IPv4) address validation action.

    const Action = v.ipv4<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv4Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ipv4` you can validate the formatting of a string. If the input is not an IPv4 address, you can use `message` to customize the error message.

### Returns

*   `Action` `Ipv4Action<TInput, TMessage>`

### Examples

The following examples show how `ipv4` can be used.

#### IPv4 schema

Schema to validate an IPv4 address.

    const Ipv4Schema = v.pipe(
      v.string(),
      v.ipv4('The IP address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `ipv4`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

ipv6
----

Creates an [IPv6](https://en.wikipedia.org/wiki/IPv6) address validation action.

    const Action = v.ipv6<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv6Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ipv6` you can validate the formatting of a string. If the input is not an IPv6 address, you can use `message` to customize the error message.

### Returns

*   `Action` `Ipv6Action<TInput, TMessage>`

### Examples

The following examples show how `ipv6` can be used.

#### IPv6 schema

Schema to validate an IPv6 address.

    const Ipv6Schema = v.pipe(
      v.string(),
      v.ipv6('The IP address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `ipv6`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

isoDate
-------

Creates an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `yyyy-mm-dd`

> The regex used cannot validate the maximum number of days based on year and month. For example, "2023-06-31" is valid although June has only 30 days.

    const Action = v.isoDate<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoDate` you can validate the formatting of a string. If the input is not an ISO date, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoDateAction<TInput, TMessage>`

### Examples

The following examples show how `isoDate` can be used.

#### ISO date schema

Schema to validate an ISO date.

    const IsoDateSchema = v.pipe(
      v.string(),
      v.isoDate('The date is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoDate`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

isoDateTime
-----------

Creates an [ISO date time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `yyyy-mm-ddThh:mm`

> The regex used cannot validate the maximum number of days based on year and month. For example, "2023-06-31T00:00" is valid although June has only 30 days.

    const Action = v.isoDateTime<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoDateTime` you can validate the formatting of a string. If the input is not an ISO date time, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoDateTimeAction<TInput, TMessage>`

### Examples

The following examples show how `isoDateTime` can be used.

#### ISO date time schema

Schema to validate an ISO date time.

    const IsoDateTimeSchema = v.pipe(
      v.string(),
      v.isoDateTime('The date is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoDateTime`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

isoTime
-------

Creates an [ISO time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `hh:mm`

    const Action = v.isoTime<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoTime` you can validate the formatting of a string. If the input is not an ISO time, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoTimeAction<TInput, TMessage>`

### Examples

The following examples show how `isoTime` can be used.

#### ISO time schema

Schema to validate an ISO time.

    const IsoTimeSchema = v.pipe(
      v.string(),
      v.isoTime('The time is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoTime`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

isoTimeSecond
-------------

Creates an [ISO time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `hh:mm:ss`

    const Action = v.isoTimeSecond<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeSecondIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoTimeSecond` you can validate the formatting of a string. If the input is not an ISO time second, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoTimeSecondAction<TInput, TMessage>`

### Examples

The following examples show how `isoTimeSecond` can be used.

#### ISO time second schema

Schema to validate an ISO time second.

    const IsoTimeSecondSchema = v.pipe(
      v.string(),
      v.isoTimeSecond('The time is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoTimeSecond`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

isoTimestamp
------------

Creates an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Formats: `yyyy-mm-ddThh:mm:ss.sssZ`, `yyyy-mm-ddThh:mm:ss.sss±hh:mm`, `yyyy-mm-ddThh:mm:ss.sss±hhmm`

> To support timestamps with lower or higher accuracy, the millisecond specification can be removed or contain up to 9 digits.

> The regex used cannot validate the maximum number of days based on year and month. For example, "2023-06-31T00:00:00.000Z" is valid although June has only 30 days.

    const Action = v.isoTimestamp<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimestampIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoTimestamp` you can validate the formatting of a string. If the input is not an ISO timestamp, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoTimestampAction<TInput, TMessage>`

### Examples

The following examples show how `isoTimestamp` can be used.

#### ISO timestamp schema

Schema to validate an ISO timestamp.

    const IsoTimestampSchema = v.pipe(
      v.string(),
      v.isoTimestamp('The timestamp is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoTimestamp`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

isoWeek
-------

Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: `yyyy-Www`

> The regex used cannot validate the maximum number of weeks based on the year. For example, "2021W53" is valid although 2021 has only 52 weeks.

    const Action = v.isoWeek<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoWeekIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `isoWeek` you can validate the formatting of a string. If the input is not an ISO week, you can use `message` to customize the error message.

### Returns

*   `Action` `IsoWeekAction<TInput, TMessage>`

### Examples

The following examples show how `isoWeek` can be used.

#### ISO week schema

Schema to validate an ISO week.

    const IsoWeekSchema = v.pipe(
      v.string(),
      v.isoWeek('The week is badly formatted.')
    );
    

### Related

The following APIs can be combined with `isoWeek`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

length
------

Creates a length validation action.

    const Action = v.length<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<LengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `length` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `LengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `length` can be used.

#### String schema

Schema to validate the length of a string.

    const StringSchema = v.pipe(
      v.string(),
      v.length(8, 'The string must be 8 characters long.')
    );
    

#### Array schema

Schema to validate the length of an array.

    const ArraySchema = v.pipe(
      v.array(v.number()),
      v.length(100, 'The array must contain 100 numbers.')
    );
    

### Related

The following APIs can be combined with `length`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

mac
---

Creates a [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

> This validation action accepts 48-bit and 64-bit MAC addresses. For a more specific validation, you can also use [`mac48`](mac48.md) or [`mac64`](mac64.md).

    const Action = v.mac<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<MacIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `mac` you can validate the formatting of a string. If the input is not a MAC address, you can use `message` to customize the error message.

### Returns

*   `Action` `MacAction<TInput, TMessage>`

### Examples

The following examples show how `mac` can be used.

#### MAC schema

Schema to validate a MAC address.

    const MacSchema = v.pipe(
      v.string(),
      v.mac('The MAC address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `mac`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

mac48
-----

Creates a 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

    const Action = v.mac48<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac48Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `mac48` you can validate the formatting of a string. If the input is not a 48-bit MAC address, you can use `message` to customize the error message.

### Returns

*   `Action` `Mac48Action<TInput, TMessage>`

### Examples

The following examples show how `mac48` can be used.

#### 48-bit MAC schema

Schema to validate a 48-bit MAC address.

    const Mac48Schema = v.pipe(
      v.string(),
      v.mac48('The MAC address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `mac48`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

mac64
-----

Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

    const Action = v.mac64<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac64Issue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `mac64` you can validate the formatting of a string. If the input is not a 64-bit MAC address, you can use `message` to customize the error message.

### Returns

*   `Action` `Mac64Action<TInput, TMessage>`

### Examples

The following examples show how `mac64` can be used.

#### 64-bit MAC schema

Schema to validate a 64-bit MAC address.

    const Mac64Schema = v.pipe(
      v.string(),
      v.mac64('The MAC address is badly formatted.')
    );
    

### Related

The following APIs can be combined with `mac64`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

mapItems
--------

Creates a map items transformation action.

    const Action = v.mapItems<TInput, TOutput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Parameters

*   `operation` `(item: TInput[number], index: number, array: TInput) => TOutput`

#### Explanation

With `mapItems` you can apply an `operation` to each item in an array to transform it.

### Returns

*   `Action` `MapItemsAction<TInput, TOutput>`

### Examples

The following examples show how `mapItems` can be used.

#### Mark duplicates

    const MarkedArraySchema = v.pipe(
      v.array(v.string()),
      v.mapItems((item, index, array) => {
        const isDuplicate = array.indexOf(item) !== index;
        return { item, isDuplicate };
      })
    );
    

### Related

The following APIs can be combined with `mapItems`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

maxBytes
--------

Creates a max [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.maxBytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxBytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxBytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxBytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxBytes` can be used.

#### Max bytes schema

Schema to validate a string with a maximum of 64 bytes.

    const MaxBytesSchema = v.pipe(
      v.string(),
      v.maxBytes(64, 'The string must not exceed 64 bytes.')
    );
    

### Related

The following APIs can be combined with `maxBytes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

maxGraphemes
------------

Creates a max [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.maxGraphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxGraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxGraphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxGraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxGraphemes` can be used.

#### Max graphemes schema

Schema to validate a string with a maximum of 8 graphemes.

    const MaxGraphemesSchema = v.pipe(
      v.string(),
      v.maxGraphemes(8, 'The string must not exceed 8 graphemes.')
    );
    

### Related

The following APIs can be combined with `maxGraphemes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

maxLength
---------

Creates a max length validation action.

    const Action = v.maxLength<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxLengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxLength` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxLengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxLength` can be used.

#### Maximum string length

Schema to validate a string with a maximum length of 32 characters.

    const MaxStringSchema = v.pipe(
      v.string(),
      v.maxLength(32, 'The string must not exceed 32 characters.')
    );
    

#### Maximum array length

Schema to validate an array with a maximum length of 5 items.

    const MaxArraySchema = v.pipe(
      v.array(v.number()),
      v.maxLength(5, 'The array must not exceed 5 numbers.')
    );
    

### Related

The following APIs can be combined with `maxLength`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

maxSize
-------

Creates a max size validation action.

    const Action = v.maxSize<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxSizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxSize` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxSizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `maxSize` can be used.

#### Blob size schema

Schema to validate a blob with a maximum size of 10 MB.

    const BlobSchema = v.pipe(
      v.blob(),
      v.maxSize(10 * 1024 * 1024, 'The blob must not exceed 10 MB.')
    );
    

#### Set size schema

Schema to validate a set with a maximum of 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.maxSize(8, 'The set must not exceed 8 numbers.')
    );
    

### Related

The following APIs can be combined with `maxSize`.

#### Schemas

*   [`any`](any.md),
*   [`blob`](blob.md),
*   [`custom`](custom.md),
*   [`file`](file.md),
*   [`instance`](instance.md),
*   [`map`](map.md),
*   [`set`](set.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

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

maxWords
--------

Creates a max [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.maxWords<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxWordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `maxWords` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MaxWordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `maxWords` can be used.

#### Max words schema

Schema to validate a string with a maximum of 300 words.

    const MaxWordsSchema = v.pipe(
      v.string(),
      v.maxWords('en', 300, 'The string must not exceed 300 words.')
    );
    

### Related

The following APIs can be combined with `maxWords`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

metadata
--------

Creates a custom metadata action.

    const Action = v.metadata<TInput, TMetadata>(metadata_);
    

### Generics

*   `TInput` `extends any`
*   `TMetadata` `extends Record<string, unknown>`

### Parameters

*   `metadata_` `TMetadata`

#### Explanation

With `metadata` you can attach custom metadata to a schema. This can be useful when working with AI tools or for documentation purposes.

### Returns

*   `Action` `MetadataAction<TInput, TMetadata>`

### Examples

The following examples show how `metadata` can be used.

#### Profile table schema

Schema to describe a profile table.

    const ProfileTableSchema = v.pipe(
      v.object({
        username: v.pipe(v.string(), v.nonEmpty()),
        email: v.pipe(v.string(), v.email()),
        avatar: v.pipe(v.string(), v.url()),
        description: v.pipe(v.string(), v.maxLength(500)),
      }),
      v.metadata({
        table: 'profiles',
        primaryKey: 'username',
        indexes: ['email'],
      })
    );
    

### Related

The following APIs can be combined with `metadata`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

mimeType
--------

Creates a [MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) validation action.

    const Action = v.mimeType<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends Blob`
*   `TRequirement` `extends string[]`
*   `TMessage` `extends ErrorMessage<MimeTypeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `mimeType` you can validate the MIME type of a blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MimeTypeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `mimeType` can be used.

#### Image schema

Schema to validate an image file.

    const ImageSchema = v.pipe(
      v.blob(),
      v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.')
    );
    

### Related

The following APIs can be combined with `mimeType`.

#### Schemas

*   [`any`](any.md),
*   [`blob`](blob.md),
*   [`custom`](custom.md),
*   [`file`](file.md),
*   [`instance`](instance.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

minBytes
--------

Creates a min [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.minBytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinBytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minBytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinBytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minBytes` can be used.

#### Min bytes schema

Schema to validate a string with a minimum of 64 bytes.

    const MinBytesSchema = v.pipe(
      v.string(),
      v.minBytes(64, 'The string must contain at least 64 bytes.')
    );
    

### Related

The following APIs can be combined with `minBytes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

minGraphemes
------------

Creates a min [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.minGraphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinGraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minGraphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinGraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minGraphemes` can be used.

#### Min graphemes schema

Schema to validate a string with a minimum of 8 graphemes.

    const MinGraphemesSchema = v.pipe(
      v.string(),
      v.minGraphemes(8, 'The string must contain at least 8 graphemes.')
    );
    

### Related

The following APIs can be combined with `minGraphemes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

minLength
---------

Creates a min length validation action.

    const Action = v.minLength<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinLengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minLength` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinLengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minLength` can be used.

#### Minumum string length

Schema to validate a string with a minimum length of 3 characters.

    const MinStringSchema = v.pipe(
      v.string(),
      v.minLength(3, 'The string must be 3 or more characters long.')
    );
    

#### Minimum array length

Schema to validate an array with a minimum length of 5 items.

    const MinArraySchema = v.pipe(
      v.array(v.number()),
      v.minLength(5, 'The array must contain 5 numbers or more.')
    );
    

### Related

The following APIs can be combined with `minLength`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

minSize
-------

Creates a min size validation action.

    const Action = v.minSize<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinSizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minSize` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinSizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `minSize` can be used.

#### Blob size schema

Schema to validate a blob with a minimum size of 10 MB.

    const BlobSchema = v.pipe(
      v.blob(),
      v.minSize(10 * 1024 * 1024, 'The blob must be at least 10 MB.')
    );
    

#### Set size schema

Schema to validate a set with a minimum of 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.minSize(8, 'The set must contain at least 8 numbers.')
    );
    

### Related

The following APIs can be combined with `minSize`.

#### Schemas

*   [`any`](any.md),
*   [`blob`](blob.md),
*   [`custom`](custom.md),
*   [`file`](file.md),
*   [`instance`](instance.md),
*   [`map`](map.md),
*   [`set`](set.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

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

minWords
--------

Creates a min [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.minWords<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinWordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `minWords` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MinWordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `minWords` can be used.

#### Min words schema

Schema to validate a string with a minimum of 50 words.

    const MinWordsSchema = v.pipe(
      v.string(),
      v.minWords('en', 50, 'The string must contain at least 50 words.')
    );
    

### Related

The following APIs can be combined with `minWords`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

multipleOf
----------

Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_\$0mathematics\$0) of validation action.

    const Action = v.multipleOf<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends number`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `multipleOf` you can validate the value of a number. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `MultipleOfAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `multipleOf` can be used.

#### Even number schema

Schema to validate an even number.

    const EvenNumberSchema = v.pipe(
      v.number(),
      v.multipleOf(2, 'The number must be even.')
    );
    

### Related

The following APIs can be combined with `multipleOf`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`number`](number.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nanoid
------

Creates a [Nano ID](https://github.com/ai/nanoid) validation action.

    const Action = v.nanoid<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<NanoIDIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `nanoid` you can validate the formatting of a string. If the input is not an Nano ID, you can use `message` to customize the error message.

### Returns

*   `Action` `NanoIDAction<TInput, TMessage>`

### Examples

The following examples show how `nanoid` can be used.

> Since Nano IDs are not limited to a fixed length, it is recommended to combine `nanoid` with [`length`](length.md) to ensure the correct length.

#### Nano ID schema

Schema to validate a Nano ID.

    const NanoIDSchema = v.pipe(
      v.string(),
      v.nanoid('The Nano ID is badly formatted.'),
      v.length(21, 'The Nano ID must be 21 characters long.')
    );
    

### Related

The following APIs can be combined with `nanoid`.

#### Schemas

*   [`any`](any.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

nonEmpty
--------

Creates a non-empty validation action.

    const Action = v.nonEmpty<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<NonEmptyIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `nonEmpty` you can validate that a string or array is non-empty. If the input is empty, you can use `message` to customize the error message.

### Returns

*   `Action` `NonEmptyAction<TInput, TMessage>`

### Examples

The following examples show how `nonEmpty` can be used.

#### String schema

Schema to validate that a string is non-empty.

    const StringSchema = v.pipe(
      v.string(),
      v.nonEmpty('The string should contain at least one character.')
    );
    

#### Array schema

Schema to validate that an array is non-empty.

    const ArraySchema = v.pipe(
      v.array(v.number()),
      v.nonEmpty('The array should contain at least one item.')
    );
    

### Related

The following APIs can be combined with `nonEmpty`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

normalize
---------

Creates a normalize transformation action.

    const Action = v.normalize<TForm>(form);
    

### Generics

*   `TForm` `extends NormalizeForm | undefined`

### Parameters

*   `form` `TForm`

### Returns

*   `Action` `NormalizeAction`

### Examples

The following examples show how `normalize` can be used.

#### Normalized string

Schema to normalize a string.

    const StringSchema = v.pipe(v.string(), v.normalize());
    

### Related

The following APIs can be combined with `normalize`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

notBytes
--------

Creates a not [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

    const Action = v.notBytes<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotBytesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notBytes` you can validate the bytes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotBytesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notBytes` can be used.

#### Not bytes schema

Schema to validate a string with more or less than 8 bytes.

    const NotBytesSchema = v.pipe(
      v.string(),
      v.notBytes(8, 'The string must not have 8 bytes.')
    );
    

### Related

The following APIs can be combined with `notBytes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

notGraphemes
------------

Creates a not [graphemes](https://en.wikipedia.org/wiki/Grapheme) validation action.

    const Action = v.notGraphemes<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotGraphemesIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notGraphemes` you can validate the graphemes of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotGraphemesAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notGraphemes` can be used.

#### Not graphemes schema

Schema to validate a string with more or less than 8 graphemes.

    const NotGraphemesSchema = v.pipe(
      v.string(),
      v.notGraphemes(8, 'The string must not have 8 graphemes.')
    );
    

### Related

The following APIs can be combined with `notGraphemes`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

notLength
---------

Creates a not length validation action.

    const Action = v.notLength<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotLengthIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notLength` you can validate the length of a string or array. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotLengthAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notLength` can be used.

#### String schema

Schema to validate the length of a string.

    const StringSchema = v.pipe(
      v.string(),
      v.notLength(8, 'The string must not be 8 characters long.')
    );
    

#### Array schema

Schema to validate the length of an array.

    const ArraySchema = v.pipe(
      v.array(number()),
      v.notLength(10, 'The array must not contain 10 numbers.')
    );
    

### Related

The following APIs can be combined with `notLength`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

notSize
-------

Creates a not size validation action.

    const Action = v.notSize<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotSizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notSize` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotSizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `notSize` can be used.

#### Blob size schema

Schema to validate a blob with less ore more then 10 MB.

    const BlobSchema = v.pipe(
      v.blob(),
      v.notSize(10 * 1024 * 1024, 'The blob must not be 10 MB in size.')
    );
    

#### Set size schema

Schema to validate a set with less ore more then 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.notSize(8, 'The set must not contain 8 numbers.')
    );
    

### Related

The following APIs can be combined with `notSize`.

#### Schemas

*   [`any`](any.md),
*   [`blob`](blob.md),
*   [`custom`](custom.md),
*   [`file`](file.md),
*   [`instance`](instance.md),
*   [`map`](map.md),
*   [`set`](set.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

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

notWords
--------

Creates a not [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.notWords<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotWordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `notWords` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `NotWordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `notWords` can be used.

#### Not words schema

Schema to validate a string with more or less than 5 words.

    const NotWordsSchema = v.pipe(
      v.string(),
      v.notWords('en', 5, 'The string must not have 5 words.')
    );
    

### Related

The following APIs can be combined with `notWords`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

octal
-----

Creates an [octal](https://en.wikipedia.org/wiki/Octal) validation action.

    const Action = v.octal<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<OctalIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `octal` you can validate the formatting of a string. If the input is not an octal, you can use `message` to customize the error message.

### Returns

*   `Action` `OctalAction<TInput, TMessage>`

### Examples

The following examples show how `octal` can be used.

#### Octal schema

Schema to validate a octal string.

    const OctalSchema = v.pipe(
      v.string(),
      v.octal('The octal is badly formatted.')
    );
    

### Related

The following APIs can be combined with `octal`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

partialCheck
------------

Creates a partial check validation action.

    const Action = v.partialCheck<TInput, TPathList, TSelection, TMessage>(
      pathList,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends Record<string, unknown> | ArrayLike<unknown>`
*   `TPathList` `extends readonly PathKeys<TInput>[]`
*   `TSelection` `extends DeepPickN<TInput, TPathList>`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Parameters

*   `pathList` `TPathList`
*   `requirement` `(input: TSelection) => boolean`
*   `message` `TMessage`

#### Explanation

With `partialCheck` you can freely validate the selected input and return `true` if it is valid or `false` otherwise. If the input does not match your `requirement`, you can use `message` to customize the error message.

> The difference to [`check`](check.md) is that `partialCheck` can be executed whenever the selected part of the data is valid, while [`check`](check.md) is executed only when the entire dataset is typed. This can be an important advantage when working with forms.

### Returns

*   `Action` `PartialCheckAction<TInput, TSelection, TMessage>`

### Examples

The following examples show how `partialCheck` can be used.

#### Register schema

Schema that ensures that the two passwords match.

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
    

### Related

The following APIs can be combined with `partialCheck`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`union`](union.md),
*   [`variant`](variant.md)

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

rawCheck
--------

Creates a raw check validation action.

    const Action = v.rawCheck<TInput>(action);
    

### Generics

*   `TInput` `extends any`

### Parameters

*   `action` `(context: Context<TInput>) => void`

#### Explanation

With `rawCheck` you can freely validate the input with a custom `action` and add issues if necessary.

### Returns

*   `Action` `RawCheckAction<TInput>`

### Examples

The following examples show how `rawCheck` can be used.

#### Emails schema

Object schema that ensures that the primary email is not the same as any of the other emails.

> This `rawCheck` validation action adds an issue for any invalid other email and forwards it via `path` to the appropriate nested field.

    const EmailsSchema = v.pipe(
      v.object({
        primaryEmail: v.pipe(v.string(), v.email()),
        otherEmails: v.array(v.pipe(v.string(), v.email())),
      }),
      v.rawCheck(({ dataset, addIssue }) => {
        if (dataset.typed) {
          dataset.value.otherEmails.forEach((otherEmail, index) => {
            if (otherEmail === dataset.value.primaryEmail) {
              addIssue({
                message: 'This email is already being used as the primary email.',
                path: [
                  {
                    type: 'object',
                    origin: 'value',
                    input: dataset.value,
                    key: 'otherEmails',
                    value: dataset.value.otherEmails,
                  },
                  {
                    type: 'array',
                    origin: 'value',
                    input: dataset.value.otherEmails,
                    key: index,
                    value: otherEmail,
                  },
                ],
              });
            }
          });
        }
      })
    );
    

### Related

The following APIs can be combined with `rawCheck`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

rawTransform
------------

Creates a raw transformation action.

    const Action = v.rawTransform<TInput, TOutput>(action);
    

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Parameters

*   `action` `(context: { dataset: SuccessDataset<TInput>, config: Config<RawCheckIssue<TInput>>, addIssue: (info: { label?: string, input?: unknown, expected?: string, received?: string, message?: ErrorMessage<RawCheckIssue<TInput>>, path?: [IssuePathItem, ...IssuePathItem[]] }) => void, NEVER: never }) => TOutput`

#### Explanation

With `rawTransform` you can freely transform and validate the input with a custom `action` and add issues if necessary.

### Returns

*   `Action` `RawTransformAction<TInput, TOutput>`

### Examples

The following examples show how `rawTransform` can be used.

#### Calculate game result

Schema that calculates the total score of a game based on the scores and a multiplier.

> This `rawTransform` validation action adds an issue for points that exceed a certain maximum and forwards it via `path` to the appropriate nested score.

    const GameResultSchema = v.pipe(
      v.object({
        scores: v.array(v.pipe(v.number(), v.integer())),
        multiplier: v.number(),
      }),
      v.rawTransform(({ dataset, addIssue, NEVER }) => {
        // Create total variable
        let total = 0;
    
        // Iterate over scores and check points
        for (let index = 0; index < dataset.value.scores.length; index++) {
          // Calculate points by multiplying score with multiplier
          const score = dataset.value.scores[index];
          const points = score * dataset.value.multiplier;
    
          // Add issue if points exceed maximum of 1,000 points
          if (points > 1_000) {
            addIssue({
              message:
                'The score exceeds the maximum allowed value of 1,000 points.',
              path: [
                {
                  type: 'object',
                  origin: 'value',
                  input: dataset.value,
                  key: 'scores',
                  value: dataset.value.scores,
                },
                {
                  type: 'array',
                  origin: 'value',
                  input: dataset.value.scores,
                  key: index,
                  value: score,
                },
              ],
            });
    
            // Abort transformation
            return NEVER;
          }
    
          // Add points to total
          total += points;
        }
    
        // Add calculated total to dataset
        return { ...dataset.value, total };
      })
    );
    

### Related

The following APIs can be combined with `rawTransform`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`forward`](forward.md),
*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

readonly
--------

Creates a readonly transformation action.

    const Action = v.readonly<TInput>();
    

### Generics

*   `TInput` `extends any`

### Returns

*   `Action` `ReadonlyAction<TInput>`

### Examples

The following examples show how `readonly` can be used.

#### Readonly array

Schema for a readonly array of numbers.

    const ArraySchema = v.pipe(v.array(v.number()), v.readonly());
    

#### Readonly entry

Object schema with an entry marked as readonly.

    const ObjectSchema = v.object({
      name: v.string(),
      username: v.pipe(v.string(), v.readonly()),
      age: v.number(),
    });
    

### Related

The following APIs can be combined with `readonly`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

reduceItems
-----------

Creates a reduce items transformation action.

    const Action = v.reduceItems<TInput, TOutput>(operation, initial);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Parameters

*   `operation` `(output: TOutput, item: TInput[number], index: number, array: TInput) => TOutput`
*   `initial` `TOutput`

#### Explanation

With `reduceItems` you can apply an `operation` to each item in an array to reduce it to a single value.

### Returns

*   `Action` `ReduceItemsAction<TInput, TOutput>`

### Examples

The following examples show how `reduceItems` can be used.

#### Sum all numbers

Schema that sums all the numbers in an array.

    const SumArraySchema = v.pipe(
      v.array(v.number()),
      v.reduceItems((sum, item) => sum + item, 0)
    );
    

### Related

The following APIs can be combined with `reduceItems`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

regex
-----

Creates a [regex](https://en.wikipedia.org/wiki/Regular_expression) validation action.

    const Action = v.regex<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<RegexIssue<TInput>> | undefined`

### Parameters

*   `requirement` `RegExp`
*   `message` `TMessage`

#### Explanation

With `regex` you can validate the formatting of a string. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `RegexAction<TInput, TMessage>`

### Examples

The following examples show how `regex` can be used.

#### Pixel string schema

Schema to validate a pixel string.

    const PixelStringSchema = v.pipe(
      v.string(),
      v.regex(/^\d+px$/, 'The pixel string is badly formatted.')
    );
    

### Related

The following APIs can be combined with `regex`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

returns
-------

Creates a function return transformation action.

    const Action = v.returns<TInput, TSchema>(schema);
    

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

#### Explanation

With `returns` you can force the returned value of a function to match the given `schema`.

### Returns

*   `Action` `ReturnsAction<TInput, TSchema>`

### Examples

The following examples show how `returns` can be used.

#### Function schema

Schema of a function that transforms a string to a number.

    const FunctionSchema = v.pipe(
      v.function(),
      v.args(v.tuple([v.pipe(v.string(), v.decimal())])),
      v.returns(v.number())
    );
    

### Related

The following APIs can be combined with `returns`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

safeInteger
-----------

Creates a safe integer validation action.

    const Action = v.safeInteger<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<SafeIntegerIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `safeInteger` you can validate the value of a number. If the input is not a safe integer, you can use `message` to customize the error message.

### Returns

*   `Action` `SafeIntegerAction<TInput, TMessage>`

### Examples

The following examples show how `safeInteger` can be used.

#### Safe integer schema

Schema to validate an safe integer.

    const SafeIntegerSchema = v.pipe(
      v.number(),
      v.safeInteger('The number must be a safe integer.')
    );
    

### Related

The following APIs can be combined with `safeInteger`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`number`](number.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

size
----

Creates a size validation action.

    const Action = v.size<TInput, TRequirement, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<SizeIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `size` you can validate the size of a map, set or blob. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `SizeAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `size` can be used.

#### Blob size schema

Schema to validate a blob with a size of 256 bytes.

    const BlobSchema = v.pipe(
      v.blob(),
      v.size(256, 'The blob must be 256 bytes in size.')
    );
    

#### Set size schema

Schema to validate a set of 8 numbers.

    const SetSchema = v.pipe(
      v.set(number()),
      v.size(8, 'The set must contain 8 numbers.')
    );
    

### Related

The following APIs can be combined with `size`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`string`](string.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

someItem
--------

Creates a some item validation action.

    const Action = v.someItem<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<SomeItemIssue<TInput>> | undefined`

### Parameters

*   `requirement` `ArrayRequirement<TInput>`
*   `message` `TMessage`

#### Explanation

With `someItem` you can freely validate the items of an array and return `true` if they are valid or `false` otherwise. If not some item matches your `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `SomeItemAction<TInput, TMessage>`

### Examples

The following examples show how `someItem` can be used.

#### Unsorted array schema

Schema to validate that an array is not sorted.

    const UnsortedArraySchema = v.pipe(
      v.array(v.number()),
      v.someItem(
        (item, index, array) => array.length === 1 || item < array[index - 1],
        'The numbers must not be sorted in ascending order.'
      )
    );
    

### Related

The following APIs can be combined with `someItem`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

sortItems
---------

Creates a sort items transformation action.

    const Action = v.sortItems<TInput>(operation);
    

### Generics

*   `TInput` `extends ArrayInput`

### Parameters

*   `operation` `((itemA: TInput[number], itemB: TInput[number]) => number) | undefined`

#### Explanation

With `sortItems` you can sort the items of an array based on a custom `operation`. This is a function that takes two items and returns a number. If the number is less than 0, the first item is sorted before the second item. If the number is greater than 0, the second item is sorted before the first. If the number is 0, the order of the items is not changed.

### Returns

*   `Action` `SortItemsAction<TInput>`

### Examples

The following examples show how `sortItems` can be used.

#### Sort numbers

Schema that sorts the numbers in an array in ascending order.

    const SortedArraySchema = v.pipe(v.array(v.number()), v.sortItems());
    

### Related

The following APIs can be combined with `sortItems`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`tuple`](tuple.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

startsWith
----------

Creates a starts with validation action.

    const Action = v.startsWith<TInput, TRequirement, TMessage>(
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<StartsWithIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `startsWith` you can validate the start of a string. If the start does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `StartsWithAction<TInput, TRequirement, TMessage>`

### Examples

The following examples show how `startsWith` can be used.

#### HTTPS URL schema

Schema to validate a HTTPS URL.

    const HttpsUrlSchema = v.pipe(v.string(), v.url(), v.startsWith('https://'));
    

### Related

The following APIs can be combined with `startsWith`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

title
-----

Creates a title metadata action.

    const Action = v.title<TInput, TTitle>(title_);
    

### Generics

*   `TInput` `extends any`
*   `TTitle` `extends string`

### Parameters

*   `title_` `TTitle`

#### Explanation

With `title` you can give a title to a schema. This can be useful when working with AI tools or for documentation purposes.

### Returns

*   `Action` `TitleAction<TInput, TTitle>`

### Examples

The following examples show how `title` can be used.

#### Username schema

Schema to validate a user name.

    const UsernameSchema = v.pipe(
      v.string(),
      v.regex(/^[a-z0-9_-]{4,16}$/iu),
      v.title('Username'),
      v.description(
        'A username must be between 4 and 16 characters long and can only contain letters, numbers, underscores and hyphens.'
      )
    );
    

### Related

The following APIs can be combined with `title`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

toLowerCase
-----------

Creates a to lower case transformation action.

    const Action = v.toLowerCase();
    

### Returns

*   `Action` `ToLowerCaseAction`

### Examples

The following examples show how `toLowerCase` can be used.

#### Lower case string

Schema that transforms a string to lower case.

    const StringSchema = v.pipe(v.string(), v.toLowerCase());
    

### Related

The following APIs can be combined with `toLowerCase`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

toMaxValue
----------

Creates a to max value transformation action.

    const Action = v.toMaxValue<TInput, TRequirement>(requirement);
    

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Parameters

*   `requirement` `TRequirement`

#### Explanation

With `toMaxValue` you can enforce a maximum value for a number, date or string. If the input does not meet the `requirement`, it will be changed to its value.

### Returns

*   `Action` `ToMaxValueAction<TInput, TRequirement>`

### Examples

The following examples show how `toMaxValue` can be used.

#### Number schema

Schema to enforce a maximum value for a number.

    const NumberSchema = v.pipe(v.number(), v.toMaxValue(100));
    

#### Date schema

Schema to enforce a maximum value for a date.

    const DateSchema = v.pipe(v.date(), v.toMaxValue(new Date('1999-12-31')));
    

### Related

The following APIs can be combined with `toMaxValue`.

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

toUpperCase
-----------

Creates a to upper case transformation action.

    const Action = v.toUpperCase();
    

### Returns

*   `Action` `ToUpperCaseAction`

### Examples

The following examples show how `toUpperCase` can be used.

#### Lower case string

Schema that transforms a string to upper case.

    const StringSchema = v.pipe(v.string(), v.toUpperCase());
    

### Related

The following APIs can be combined with `toUpperCase`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

transform
---------

Creates a custom transformation action.

    const Action = v.transform<TInput, TOutput>(action);
    

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Parameters

*   `action` `(input: TInput) => TOutput`

#### Explanation

`transform` can be used to freely transform the input. The `action` parameter is a function that takes the input and returns the transformed output.

### Returns

*   `Action` `TransformAction<TInput, TOutput>`

### Examples

The following examples show how `transform` can be used.

#### Transform to length

Schema that transforms a string to its length.

    const StringLengthSchema = v.pipe(
      v.string(),
      v.transform((input) => input.length)
    );
    

#### Add object entry

Schema that transforms an object to add an entry.

    const UserSchema = v.pipe(
      v.object({ name: v.string(), age: v.number() }),
      v.transform((input) => ({
        ...input,
        created: new Date().toISOString(),
      }))
    );
    

### Related

The following APIs can be combined with `transform`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

trim
----

Creates a trim transformation action.

    const Action = v.trim();
    

### Returns

*   `Action` `TrimAction`

### Examples

The following examples show how `trim` can be used.

#### Trimmed string

Schema to trim the start and end of a string.

    const StringSchema = v.pipe(v.string(), v.trim());
    

### Related

The following APIs can be combined with `trim`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

trimEnd
-------

Creates a trim end transformation action.

    const Action = v.trimEnd();
    

### Returns

*   `Action` `TrimEndAction`

### Examples

The following examples show how `trimEnd` can be used.

#### Trimmed string

Schema to trimEnd the end of a string.

    const StringSchema = v.pipe(v.string(), v.trimEnd());
    

### Related

The following APIs can be combined with `trimEnd`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

trimStart
---------

Creates a trim start transformation action.

    const Action = v.trimStart();
    

### Returns

*   `Action` `TrimStartAction`

### Examples

The following examples show how `trimStart` can be used.

#### Trimmed string

Schema to trimStart the start of a string.

    const StringSchema = v.pipe(v.string(), v.trimStart());
    

### Related

The following APIs can be combined with `trimStart`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

ulid
----

Creates an [ULID](https://github.com/ulid/spec) validation action.

    const Action = v.ulid<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UlidIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `ulid` you can validate the formatting of a string. If the input is not an ULID, you can use `message` to customize the error message.

### Returns

*   `Action` `UlidAction<TInput, TMessage>`

### Examples

The following examples show how `ulid` can be used.

#### ULID schema

Schema to validate an ULID.

    const UlidSchema = v.pipe(v.string(), v.ulid('The ULID is badly formatted.'));
    

### Related

The following APIs can be combined with `ulid`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

url
---

Creates an [URL](https://en.wikipedia.org/wiki/URL) validation action.

    const Action = v.url<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UrlIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `url` you can validate the formatting of a string. If the input is not an URL, you can use `message` to customize the error message.

### Returns

*   `Action` `UrlAction<TInput, TMessage>`

### Examples

The following examples show how `url` can be used.

#### URL schema

Schema to validate an URL.

    const UrlSchema = v.pipe(
      v.string(),
      v.nonEmpty('Please enter your url.'),
      v.url('The url is badly formatted.'),
      v.endsWith('.com', 'Only ".com" domains are allowed.')
    );
    

### Related

The following APIs can be combined with `url`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

uuid
----

Creates an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) validation action.

    const Action = v.uuid<TInput, TMessage>(message);
    

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UuidIssue<TInput>> | undefined`

### Parameters

*   `message` `TMessage`

#### Explanation

With `uuid` you can validate the formatting of a string. If the input is not an UUID, you can use `message` to customize the error message.

### Returns

*   `Action` `UuidAction<TInput, TMessage>`

### Examples

The following examples show how `uuid` can be used.

#### UUID schema

Schema to validate an UUID.

    const UuidSchema = v.pipe(v.string(), v.uuid('The UUID is badly formatted.'));
    

### Related

The following APIs can be combined with `uuid`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

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

words
-----

Creates a [words](https://en.wikipedia.org/wiki/Word) validation action.

    const Action = v.words<TInput, TLocales, TRequirement, TMessage>(
      locales,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<WordsIssue<TInput, TRequirement>> | undefined`

### Parameters

*   `locales` `TLocales`
*   `requirement` `TRequirement`
*   `message` `TMessage`

#### Explanation

With `words` you can validate the words of a string based on the specified `locales`. If the input does not match the `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `WordsAction<TInput, TLocales, TRequirement, TMessage>`

### Examples

The following examples show how `words` can be used.

#### Words schema

Schema to validate a string with 3 words.

    const WordsSchema = v.pipe(
      v.string(),
      v.words('en', 3, 'Exactly 3 words are required.')
    );
    

### Related

The following APIs can be combined with `words`.

#### Schemas

*   [`any`](any.md),
*   [`custom`](custom.md),
*   [`string`](string.md),
*   [`unknown`](unknown.md)

#### Methods

*   [`pipe`](pipe.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

deleteGlobalConfig
------------------

Deletes the global configuration.

    v.deleteGlobalConfig();

deleteGlobalMessage
-------------------

Deletes a global error message.

    v.deleteGlobalMessage(lang);
    

### Parameters

*   `lang` `string | undefined`

deleteSchemaMessage
-------------------

Deletes a schema error message.

    v.deleteSchemaMessage(lang);
    

### Parameters

*   `lang` `string | undefined`

deleteSpecificMessage
---------------------

Deletes a specific error message.

    v.deleteSpecificMessage(reference, lang);
    

### Parameters

*   `reference` `Reference`
*   `lang` `string | undefined`

getGlobalConfig
---------------

Returns the global configuration.

    const config = v.getGlobalConfig<TIssue>(merge);
    

### Generics

*   `TIssue` `extends BaseIssue<unknown>`

### Parameters

*   `merge` `Config<TIssue> | undefined`

#### Explanation

Properties that you want to explicitly override can be optionally specified with `merge`.

### Returns

*   `config` `Config<TIssue>`

getGlobalMessage
----------------

Returns a global error message.

    const message = v.getGlobalMessage(lang);
    

### Parameters

*   `lang` `string | undefined`

### Returns

*   `message` `ErrorMessage<BaseIssue<unknown>> | undefined`

getSchemaMessage
----------------

Returns a schema error message.

    const message = v.getSchemaMessage(lang);
    

### Parameters

*   `lang` `string | undefined`

### Returns

*   `message` `ErrorMessage<BaseIssue<unknown>> | undefined`

getSpecificMessage
------------------

Returns a specific error message.

    const message = v.getSpecificMessage(reference, lang);
    

### Parameters

*   `reference` `Reference`
*   `lang` `string | undefined`

### Returns

*   `message` `ErrorMessage<BaseIssue<unknown>> | undefined`

setGlobalConfig
---------------

Sets the global configuration.

    v.setGlobalConfig(merge);
    

### Parameters

*   `config` `GlobalConfig`

#### Explanation

The properties specified by `config` are merged with the existing global configuration. If a property is already set, it will be overwritten.

setGlobalMessage
----------------

Sets a global error message.

    v.setGlobalMessage(message, lang);
    

### Parameters

*   `message` `ErrorMessage<BaseIssue<unknown>>`
*   `lang` `string | undefined`

setSchemaMessage
----------------

Sets a schema error message.

    v.setSchemaMessage(message, lang);
    

### Parameters

*   `message` `ErrorMessage<BaseIssue<unknown>>`
*   `lang` `string | undefined`

setSpecificMessage
------------------

Sets a specific error message.

    v.setSpecificMessage<TReference>(reference, message, lang);
    

### Generics

*   `TReference` `extends Reference`

### Parameters

*   `reference` `TReference`
*   `message` `ErrorMessage<InferIssue<ReturnType<TReference>>>`
*   `lang` `string | undefined`

entriesFromList
---------------

Creates an object entries definition from a list of keys and a schema.

    const entries = v.entriesFromList<TList, TSchema>(list, schema);
    

### Generics

*   `TList` `extends (string | number | symbol)[]`
*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `list` `TList`
*   `schema` `TSchema`

### Returns

*   `entries` `Record<TList[number], TSchema>`

### Examples

The following example show how `entriesFromList` can be used.

    const ObjectSchema = v.object(
      v.entriesFromList(['foo', 'bar', 'baz'], v.string())
    );
    

### Related

The following APIs can be combined with `entriesFromList`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unionWithRest`](unionWithRest.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

getDotPath
----------

Creates and returns the dot path of an issue if possible.

    const dotPath = v.getDotPath<TSchema>(issue);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `issue` `InferIssue<TSchema>`

### Returns

*   `dotPath` `IssueDotPath<TSchema> | null`

isOfKind
--------

A generic type guard to check the kind of an object.

    const result = v.isOfKind<TKind, TObject>(kind, object);
    

### Generics

*   `TKind` `extends TObject['kind']`
*   `TObject` `extends { kind: string }`

### Parameters

*   `kind` `TKind`
*   `object` `TObject`

### Returns

*   `result` `boolean`

isOfType
--------

A generic type guard to check the type of an object.

    const result = v.isOfType<TType, TObject>(type, object);
    

### Generics

*   `TType` `extends TObject['type']`
*   `TObject` `extends { type: string }`

### Parameters

*   `type` `TType`
*   `object` `TObject`

### Returns

*   `result` `boolean`

isValiError
-----------

A type guard to check if an error is a ValiError.

    const result = v.isValiError<TSchema>(error);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `error` `unknown`

### Returns

*   `result` `boolean`

ValiError
---------

Creates a Valibot error with useful information.

    const error = new v.ValiError<TSchema>(issues);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `issues` `[InferIssue<TSchema>, ...InferIssue<TSchema>[]]`

### Returns

*   `error` `ValiError<TSchema>`

argsAsync
---------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/actions/args/argsAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

arrayAsync
----------

Creates an array schema.

    const Schema = v.arrayAsync<TItem, TMessage>(item, message);
    

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ArrayIssue> | undefined`

### Parameters

*   `item` `TItem`
*   `message` `TMessage`

#### Explanation

With `arrayAsync` you can validate the data type of the input. If the input is not an array, you can use `message` to customize the error message.

> If your array has a fixed length, consider using [`tupleAsync`](tupleAsync.md) for a more precise typing.

### Returns

*   `Schema` `ArraySchemaAsync<TItem, TMessage>`

### Examples

The following examples show how `arrayAsync` can be used.

#### Stored emails schema

Schema to validate an array of stored emails.

    import { isEmailPresent } from '~/api';
    
    const StoredEmailsSchema = v.arrayAsync(
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      )
    );
    

### Related

The following APIs can be combined with `arrayAsync`.

#### Schemas

*   [`any`](any.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

awaitAsync
----------

Creates an await transformation action.

    const Action = v.awaitAsync<TInput>();
    

### Generics

*   `TInput` `extends Promise<unknown>`

#### Explanation

With `awaitAsync` you can transform a promise into its resolved value.

### Returns

*   `Action` `AwaitActionAsync<TInput>`

### Examples

The following examples show how `awaitAsync` can be used.

#### Unique emails schema

Schema to check a set of emails wrapped in a promise object.

    const UniqueEmailsSchema = v.pipeAsync(
      v.promise(),
      v.awaitAsync(),
      v.set(v.pipe(v.string(), v.email()))
    );
    

### Related

The following APIs can be combined with `awaitAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

checkAsync
----------

Creates a check validation action.

    const Action = v.checkAsync<TInput, TMessage>(requirement, message);
    

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CheckIssue<TInput>> | undefined`

### Parameters

*   `requirement` `(input: TInput) => MaybePromise<boolean>`
*   `message` `TMessage`

#### Explanation

With `checkAsync` you can freely validate the input and return `true` if it is valid or `false` otherwise. If the input does not match your `requirement`, you can use `message` to customize the error message.

### Returns

*   `Action` `CheckActionAsync<TInput, TMessage>`

### Examples

The following examples show how `checkAsync` can be used.

#### Cart item schema

Schema to check a cart item object.

    import { getProductItem } from '~/api';
    
    const CartItemSchema = v.pipeAsync(
      v.object({
        itemId: v.pipe(v.string(), v.regex(/^[a-z0-9]{10}$/i)),
        quantity: v.pipe(v.number(), v.minValue(1)),
      }),
      v.checkAsync(async (input) => {
        const productItem = await getProductItem(input.itemId);
        return productItem?.quantity >= input.quantity;
      }, 'The required quantity is greater than available.')
    );
    

### Related

The following APIs can be combined with `checkAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

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

customAsync
-----------

Creates a custom schema.

> This schema function allows you to define a schema that matches a value based on a custom function. Use it whenever you need to define a schema that cannot be expressed using any of the other schema functions.

    const Schema = v.customAsync<TInput, TMessage>(check, message);
    

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CustomIssue> | undefined = ErrorMessage<CustomIssue> | undefined`

### Parameters

*   `check` `(input: unknown) => MaybePromise<boolean>`
*   `message` `TMessage`

#### Explanation

With `customAsync` you can validate the data type of the input. If the input does not match the validation of `check`, you can use `message` to customize the error message.

> Make sure that the validation in `check` matches the data type of `TInput`.

### Returns

*   `Schema` `CustomSchemaAsync<TInput, TMessage>`

### Examples

The following examples show how `customAsync` can be used.

#### Vacant seat schema

Schema to validate a vacant seat.

    import { isSeatVacant } from '~/api';
    
    type Group = 'A' | 'B' | 'C' | 'D' | 'E';
    type DigitLessThanSix = '0' | '1' | '2' | '3' | '4' | '5';
    type Digit = DigitLessThanSix | '6' | '7' | '8' | '9';
    type Seat = `${Group}${DigitLessThanSix}${Digit}`;
    
    function isSeat(possibleSeat: string): possibleSeat is Seat {
      return /^[A-E][0-5]\d$/.test(possibleSeat);
    }
    
    const VacantSeatSchema = v.customAsync<Seat>(
      (input) => typeof input === 'string' && isSeat(input) && isSeatVacant(input),
      'The input is not a valid vacant seat.'
    );
    

### Related

The following APIs can be combined with `customAsync`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`base64`](base64.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md)

fallbackAsync
-------------

Returns a fallback value as output if the input does not match the schema.

    const Schema = v.fallbackAsync<TSchema, TFallback>(schema, fallback);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends FallbackAsync<TSchema>`

### Parameters

*   `schema` `TSchema`
*   `fallback` `TFallback`

#### Explanation

`fallbackAsync` allows you to define a fallback value for the output that will be used if the validation of the input fails. This means that no issues will be returned when using `fallbackAsync` and the schema will always return an output.

> If you only want to set a default value for `null` or `undefined` inputs, you should use [`optionalAsync`](optionalAsync.md), [`nullableAsync`](nullableAsync.md) or [`nullishAsync`](nullishAsync.md) instead.

> The fallback value is not validated. Make sure that the fallback value matches your schema.

### Returns

*   `Schema` `SchemaWithFallbackAsync<TSchema, TFallback>`

### Examples

The following examples show how `fallbackAsync` can be used.

#### Unique username schema

Schema that will always return a unique username.

> By using a function as the `fallbackAsync` parameter, the schema will return any unique username each time the input does not match the schema.

    import { getAnyUniqueUsername, isUsernameUnique } from '~/api';
    
    const UniqueUsernameSchema = v.fallbackAsync(
      v.pipeAsync(v.string(), v.minLength(4), v.checkAsync(isUsernameUnique)),
      getAnyUniqueUsername
    );
    

### Related

The following APIs can be combined with `fallbackAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`pick`](pick.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

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

getDefaultsAsync
----------------

Returns the default values of the schema.

> The difference to [`getDefault`](getDefault.md) is that for object and tuple schemas this function recursively returns the default values of the subschemas instead of `undefined`.

    const values = v.getDefaultsAsync<TSchema>(schema);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `values` `Promise<InferDefaults<TSchema>>`

### Examples

The following examples show how `getDefaultsAsync` can be used.

#### Donation schema defaults

Get the default values of a donation schema.

    import { getRandomOrgId } from '~/api';
    
    const DonationSchema = v.objectAsync({
      timestamp: v.optional(v.date(), () => new Date()),
      sponsor: v.optional(v.pipe(v.string(), v.nonEmpty()), 'anonymous'),
      organizationId: v.optionalAsync(v.pipe(v.string(), v.uuid()), getRandomOrgId),
      message: v.optional(v.pipe(v.string(), v.minLength(1))),
    });
    
    const defaultValues = await v.getDefaultsAsync(DonationSchema);
    
    /*
      {
        timestamp: new Date(),
        sponsor: "anonymous",
        organizationId: "43775869-95f3-4e00-9f37-161ec8f9f7cd",
        message: undefined
      }
    */
    

### Related

The following APIs can be combined with `getDefaultsAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

getFallbacksAsync
-----------------

Returns the fallback values of the schema.

> The difference to [`getFallback`](getFallback.md) is that for object and tuple schemas this function recursively returns the fallback values of the subschemas instead of `undefined`.

    const values = v.getFallbacksAsync<TSchema>(schema);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`

### Returns

*   `values` `Promise<InferFallbacks<TSchema>>`

### Examples

The following examples show how `getFallbacksAsync` can be used.

#### New user fallbacks

Get the fallback values of a new user schema.

    import { getAnyUniqueUsername, isUsernameUnique } from '~/api';
    
    const NewUserSchema = v.objectAsync({
      username: v.fallbackAsync(
        v.pipeAsync(v.string(), v.minLength(3), v.checkAsync(isUsernameUnique)),
        getAnyUniqueUsername
      ),
      password: v.pipe(v.string(), v.minLength(8)),
    });
    
    const fallbackValues = await v.getFallbacksAsync(NewUserSchema);
    /*
      {
        username: "cookieMonster07",
        password: undefined
      }
    */
    

### Related

The following APIs can be combined with `getFallbacksAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

intersectAsync
--------------

Creates an intersect schema.

> I recommend to read the [intersections guide](../guides/intersections.md) before using this schema function.

    const Schema = v.intersectAsync<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends IntersectOptionsAsync`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `intersectAsync` you can validate if the input matches each of the given `options`. If the output of the intersection cannot be successfully merged, you can use `message` to customize the error message.

### Returns

*   `Schema` `IntersectSchemaAsync<TOptions, TMessage>`

### Examples

The following examples show how `intersectAsync` can be used.

#### Donation schema

Schema that combines objects to validate donation details.

    import { isOrganizationPresent } from '~/api';
    
    const DonationSchema = v.intersectAsync([
      v.objectAsync({
        organizationId: v.pipeAsync(
          v.string(),
          v.uuid(),
          v.checkAsync(
            isOrganizationPresent,
            'The organization is not in the database.'
          )
        ),
      }),
      // Assume the schemas below are from different files and are reused here
      v.object({
        amount: v.pipe(v.number(), v.minValue(100)),
        message: v.pipe(v.string(), v.nonEmpty()),
      }),
      v.object({
        amount: v.pipe(v.number(), v.maxValue(1_000_000)),
        message: v.pipe(v.string(), v.maxLength(500)),
      }),
    ]);
    

### Related

The following APIs can be combined with `intersectAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexColor`](hexColor.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

lazyAsync
---------

Creates a lazy schema.

    const Schema = v.lazyAsync<TWrapped>(getter);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `getter` `(input: unknown) => MaybePromise<TWrapped>`

#### Explanation

The `getter` function is called lazily to retrieve the schema. This is necessary to be able to access the input through the first argument of the `getter` function and to avoid a circular dependency for recursive schemas.

### Returns

*   `Schema` `LazySchemaAsync<TWrapped>`

### Examples

The following examples show how `lazyAsync` can be used.

#### Transaction list schema

Recursive schema to validate transactions.

> Due to a TypeScript limitation, the input and output types of recursive schemas cannot be inferred automatically. Therefore, you must explicitly specify these types using [`GenericSchemaAsync`](GenericSchemaAsync.md).

    import { isTransactionValid } from '~/api';
    
    type Transaction = {
      transactionId: string;
      next: Transaction | null;
    };
    
    const TransactionSchema: v.GenericSchemaAsync<Transaction> = v.objectAsync({
      transactionId: v.pipeAsync(
        v.string(),
        v.uuid(),
        v.checkAsync(isTransactionValid, 'The transaction is not valid.')
      ),
      next: v.nullableAsync(v.lazyAsync(() => TransactionSchema)),
    });
    

#### Email or username schema

Schema to validate an object containing an email or username.

> In most cases, [`unionAsync`](unionAsync.md) and [`variantAsync`](variantAsync.md) are the better choices for creating such a schema. I recommend using `lazyAsync` only in special cases.

    import { isEmailPresent, isUsernamePresent } from '~/api';
    
    const EmailOrUsernameSchema = v.lazyAsync((input) => {
      if (input && typeof input === 'object' && 'type' in input) {
        switch (input.type) {
          case 'email':
            return v.objectAsync({
              type: v.literal('email'),
              email: v.pipeAsync(
                v.string(),
                v.email(),
                v.checkAsync(
                  isEmailPresent,
                  'The email is not present in the database.'
                )
              ),
            });
          case 'username':
            return v.objectAsync({
              type: v.literal('username'),
              username: v.pipeAsync(
                v.string(),
                v.nonEmpty(),
                v.checkAsync(
                  isUsernamePresent,
                  'The username is not present in the database.'
                )
              ),
            });
        }
      }
      return v.never();
    });
    

### Related

The following APIs can be combined with `lazyAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexColor`](hexColor.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

looseObjectAsync
----------------

Creates a loose object schema.

    const Schema = v.looseObjectAsync<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `looseObjectAsync` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object, you can use `message` to customize the error message.

> The difference to [`objectAsync`](objectAsync.md) is that this schema includes any unknown entries in the output. In addition, this schema filters certain entries from the unknown entries for security reasons.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `LooseObjectSchemaAsync<TEntries, TMessage>`

### Examples

The following examples show how `looseObjectAsync` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### New user schema

Schema to validate a loose object containing specific new user details.

    import { isEmailPresent } from '~/api';
    
    const NewUserSchema = v.looseObjectAsync({
      firstName: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
      lastName: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
      email: v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is already in use by another user.')
      ),
      password: v.pipe(v.string(), v.minLength(8)),
      avatar: v.optional(v.pipe(v.string(), v.url())),
    });
    

### Related

The following APIs can be combined with `looseObjectAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`pick`](pick.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

looseTupleAsync
---------------

Creates a loose tuple schema.

    const Schema = v.looseTupleAsync<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<LooseTupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `looseTuplAsynce` you can validate the data type of the input and whether the content matches `items`. If the input is not an array, you can use `message` to customize the error message.

> The difference to [`tupleAsync`](tupleAsync.md) is that this schema does include unknown items into the output.

### Returns

*   `Schema` `LooseTupleSchemaAsync<TItems, TMessage>`

### Examples

The following examples show how `looseTupleAsync` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Number and email tuple

Schema to validate a loose tuple with one number and one stored email address.

    import { isEmailPresent } from '~/api';
    
    const TupleSchema = v.looseTupleAsync([
      v.number(),
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      ),
    ]);
    

### Related

The following APIs can be combined with `looseTupleAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

mapAsync
--------

Creates a map schema.

    const Schema = v.mapAsync<TKey, TValue, TMessage>(key, value, message);
    

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<MapIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `mapAsync` you can validate the data type of the input and whether the entries match `key` and `value`. If the input is not a map, you can use `message` to customize the error message.

### Returns

*   `Schema` `MapSchemaAsync<TKey, TValue, TMessage>`

### Examples

The following examples show how `mapAsync` can be used.

#### Shopping items schema

Schema to validate a map with usernames that are allowed to shop as keys and the total items purchased as values.

    import { isUserVerified } from '~/api';
    
    const ShoppingItemsSchema = v.mapAsync(
      v.pipeAsync(
        v.string(),
        v.checkAsync(isUserVerified, 'The username is not allowed to shop.')
      ),
      v.pipe(v.number(), v.minValue(0))
    );
    

### Related

The following APIs can be combined with `mapAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

nonNullableAsync
----------------

Creates a non nullable schema.

> This schema function can be used to override the behavior of [`nullableAsync`](nullableAsync.md).

    const Schema = v.nonNullableAsync<TWrapped, TMessage>(wrapped, message);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullableIssue> | undefined`

### Parameters

*   `wrapped` `TWrapped`
*   `message` `TMessage`

#### Explanation

With `nonNullableAsync` the validation of your schema will not pass `null` inputs. If the input is `null`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NonNullableSchemaAsync<TWrapped, TMessage>`

### Examples

The following examples show how `nonNullableAsync` can be used.

#### Unique username schema

Schema to validate a non-null unique username.

    import { isUsernameUnique } from '~/api';
    
    const UniqueUsernameSchema = v.nonNullableAsync(
      // Assume this schema is from a different file and reused here.
      v.nullableAsync(
        v.pipeAsync(
          v.string(),
          v.nonEmpty(),
          v.checkAsync(isUsernameUnique, 'The username is not unique.')
        )
      )
    );
    

### Related

The following APIs can be combined with `nonNullableAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

nonNullishAsync
---------------

Creates a non nullish schema.

> This schema function can be used to override the behavior of [`nullishAsync`](nullishAsync.md).

    const Schema = v.nonNullishAsync<TWrapped, TMessage>(wrapped, message);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullishIssue> | undefined`

### Parameters

*   `wrapped` `TWrapped`
*   `message` `TMessage`

#### Explanation

With `nonNullishAsync` the validation of your schema will not pass `null` and `undefined` inputs. If the input is `null` or `undefined`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NonNullishSchemaAsync<TWrapped, TMessage>`

### Examples

The following examples show how `nonNullishAsync` can be used.

#### Allowed country schema

Schema to check if a string matches one of the allowed country names.

    import { isAllowedCountry } from '~/api';
    
    const AllowedCountrySchema = v.nonNullishAsync(
      // Assume this schema is from a different file and reused here.
      v.nullishAsync(
        v.pipeAsync(v.string(), v.nonEmpty(), v.checkAsync(isAllowedCountry))
      )
    );
    

### Related

The following APIs can be combined with `nonNullishAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

nonOptionalAsync
----------------

Creates a non optional schema.

> This schema function can be used to override the behavior of [`optionalAsync`](optionalAsync.md).

    const Schema = v.nonOptionalAsync<TWrapped, TMessage>(wrapped, message);
    

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Parameters

*   `wrapped` `TWrapped`
*   `message` `TMessage`

#### Explanation

With `nonOptionalAsync` the validation of your schema will not pass `undefined` inputs. If the input is `undefined`, you can use `message` to customize the error message.

### Returns

*   `Schema` `NonOptionalSchemaAsync<TWrapped, TMessage>`

### Examples

The following examples show how `nonOptionalAsync` can be used.

#### Add user schema

Schema to validate an object containing details required to add a user to an existing group.

    import { isGroupPresent } from '~/api';
    
    const AddUserSchema = v.objectAsync({
      groupId: v.nonOptionalAsync(
        // Assume this schema is from a different file and reused here.
        v.optionalAsync(
          v.pipeAsync(
            v.string(),
            v.uuid(),
            v.checkAsync(
              isGroupPresent,
              'The group is not present in the database.'
            )
          )
        )
      ),
      userEmail: v.pipe(v.string(), v.email()),
    });
    

### Related

The following APIs can be combined with `nonOptionalAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

nullableAsync
-------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/nullable/nullableAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

nullishAsync
------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/nullish/nullishAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

objectAsync
-----------

Creates an object schema.

    const Schema = v.objectAsync<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<ObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `objectAsync` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object, you can use `message` to customize the error message.

> This schema removes unknown entries. The output will only include the entries you specify. To include unknown entries, use [`looseObjectAsync`](looseObjectAsync.md). To return an issue for unknown entries, use [`strictObjectAsync`](strictObjectAsync.md). To include and validate unknown entries, use [`objectWithRestAsync`](objectWithRestAsync.md).

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `ObjectSchemaAsync<TEntries, TMessage>`

### Examples

The following examples show how `objectAsync` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### New user schema

Schema to validate an object containing new user details.

    import { isEmailPresent } from '~/api';
    
    const NewUserSchema = v.objectAsync({
      firstName: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
      lastName: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
      email: v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is already in use by another user.')
      ),
      password: v.pipe(v.string(), v.minLength(8)),
      avatar: v.optional(v.pipe(v.string(), v.url())),
    });
    

### Related

The following APIs can be combined with `objectAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`pick`](pick.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

objectWithRestAsync
-------------------

Creates an object with rest schema.

    const Schema = v.objectWithRestAsync<TEntries, TRest, TMessage>(
      entries,
      rest,
      message
    );
    

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ObjectWithRestIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `objectWithRestAsync` you can validate the data type of the input and whether the content matches `entries` and `rest`. If the input is not an object, you can use `message` to customize the error message.

> The difference to [`objectAsync`](objectAsync.md) is that this schema includes unknown entries in the output. In addition, this schema filters certain entries from the unknown entries for security reasons.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `ObjectWithRestSchemaAsync<TEntries, TRest, TMessage>`

### Examples

The following examples show how `objectWithRestAsync` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### Word map schema

Schema to validate an object with word map mutation details.

    import { isUserAllowedToMutate } from '~/api';
    
    // Assume the rest of the keys are always English words
    const WordMapSchema = v.objectWithRestAsync(
      {
        $userId: v.pipeAsync(
          v.string(),
          v.regex(/^[a-z0-9]{12}$/i),
          v.checkAsync(
            isUserAllowedToMutate,
            'The user is not allowed to change the word map.'
          )
        ),
        $targetLanguage: v.union([
          v.literal('hindi'),
          v.literal('spanish'),
          v.literal('french'),
        ]),
      },
      v.string()
    );
    

### Related

The following APIs can be combined with `objectWithRestAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`pick`](pick.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

optionalAsync
-------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/optional/optionalAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

parseAsync
----------

Parses an unknown input based on a schema.

    const output = v.parseAsync<TSchema>(schema, input, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`
*   `config` `Config<InferIssue<TSchema>> | undefined`

#### Explanation

`parseAsync` will throw a [`ValiError`](ValiError.md) if the `input` does not match the `schema`. Therefore you should use a try/catch block to catch errors. If the input matches the schema, it is valid and the `output` of the schema will be returned typed.

> If an asynchronous operation associated with the passed schema throws an error, the promise returned by `parseAsync` is rejected and the error thrown may not be a [`ValiError`](ValiError.md).

### Returns

*   `output` `Promise<InferOutput<TSchema>>`

### Examples

The following examples show how `parseAsync` can be used.

    import { isEmailPresent } from '~/api';
    
    try {
      const StoredEmailSchema = v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      );
      const storedEmail = await v.parseAsync(StoredEmailSchema, 'jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.error(error);
    }
    

### Related

The following APIs can be combined with `parseAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md),
*   [`isValiError`](isValiError.md),
*   [`ValiError`](ValiError.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

parserAsync
-----------

Returns a function that parses an unknown input based on a schema.

    const parser = v.parserAsync<TSchema, TConfig>(schema, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Parameters

*   `schema` `TSchema`
*   `config` `TConfig`

### Returns

*   `parser` `ParserAsync<TSchema, TConfig>`

### Examples

The following examples show how `parserAsync` can be used.

    import { isEmailPresent } from '~/api';
    
    try {
      const StoredEmailSchema = v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      );
      const storedEmailParser = v.parserAsync(StoredEmailSchema);
      const storedEmail = await storedEmailParser('jane@example.com');
    
      // Handle errors if one occurs
    } catch (error) {
      console.error(error);
    }
    

### Related

The following APIs can be combined with `parserAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md),
*   [`isValiError`](isValiError.md),
*   [`ValiError`](ValiError.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

partialAsync
------------

Creates a modified copy of an object schema that marks all or only the selected entries as optional.

    const Schema = v.partialAsync<TSchema, TKeys>(schema, keys);
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>`
*   `TKeys` `extends ObjectKeys<TSchema> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`

#### Explanation

`partialAsync` creates a modified copy of the given object `schema` where all entries or only the selected `keys` are optional. It is similar to TypeScript's [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility type.

> Because `partialAsync` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipeAsync`](pipeAsync.md) method, as this may cause runtime errors. Please use the [`pipeAsync`](pipeAsync.md) method after you have modified the schema with `partialAsync`.

### Returns

*   `Schema` `SchemaWithPartialAsync<TSchema, TKeys>`

### Examples

The following examples show how `partialAsync` can be used.

#### Update user schema

Schema to update the user details.

    import { isEmailAbsent, isUsernameAbsent } from '~/api';
    
    const UserSchema = v.objectAsync({
      email: v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailAbsent, 'The email is already in the database.')
      ),
      username: v.pipeAsync(
        v.string(),
        v.nonEmpty(),
        v.checkAsync(isUsernameAbsent, 'The username is already in the database.')
      ),
      password: v.pipe(v.string(), v.minLength(8)),
    });
    
    const UpdateUserSchema = v.partialAsync(UserSchema);
    
    /*
      { 
        email?: string;
        username?: string; 
        password?: string;
      }
    */
    

### Related

The following APIs can be combined with `partialAsync`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`omit`](omit.md),
*   [`keyof`](keyof.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md)

partialCheckAsync
-----------------

Creates a partial check validation action.

    const Action = v.partialCheckAsync<TInput, TPathList, TSelection, TMessage>(
      pathList,
      requirement,
      message
    );
    

### Generics

*   `TInput` `extends PartialInput`
*   `TPathList` `extends readonly PathKeys<TInput>[]`
*   `TSelection` `extends DeepPickN<TInput, TPathList>`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Parameters

*   `pathList` `TPathList`
*   `requirement` `(input: TSelection) => MaybePromise<boolean>`
*   `message` `TMessage`

#### Explanation

With `partialCheckAsync` you can freely validate the selected input and return `true` if it is valid or `false` otherwise. If the input does not match your `requirement`, you can use `message` to customize the error message.

> The difference to [`checkAsync`](checkAsync.md) is that `partialCheckAsync` can be executed whenever the selected part of the data is valid, while [`checkAsync`](checkAsync.md) is executed only when the entire dataset is typed. This can be an important advantage when working with forms.

### Returns

*   `Action` `PartialCheckActionAsync<TInput, TSelection, TMessage>`

### Examples

The following examples show how `partialCheckAsync` can be used.

#### Message details schema

Schema to validate details associated with a message.

    import { isSenderInTheGroup } from '~/api';
    
    const MessageDetailsSchema = v.pipeAsync(
      v.object({
        sender: v.object({
          name: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
          email: v.pipe(v.string(), v.email()),
        }),
        groupId: v.pipe(v.string(), v.uuid()),
        message: v.pipe(v.string(), v.nonEmpty(), v.maxLength(500)),
      }),
      v.forwardAsync(
        v.partialCheckAsync(
          [['sender', 'email'], ['groupId']],
          (input) =>
            isSenderInTheGroup({
              senderEmail: input.sender.email,
              groupId: input.groupId,
            }),
          'The sender is not in the group.'
        ),
        ['sender', 'email']
      )
    );
    

### Related

The following APIs can be combined with `partialCheckAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`custom`](custom.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`union`](union.md),
*   [`variant`](variant.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

pipeAsync
---------

Adds a pipeline to a schema, that can validate and transform its input.

    const Schema = v.pipeAsync<TSchema, TItems>(schema, ...items);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TItems` `extends (PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>>)[]`

### Parameters

*   `schema` `TSchema`
*   `items` `TItems`

#### Explanation

`pipeAsync` creates a modified copy of the given `schema`, containing a pipeline for detailed validations and transformations. It passes the input data asynchronously through the `items` in the order they are provided and each item can examine and modify it.

> Since `pipeAsync` returns a schema that can be used as the first argument of another pipeline, it is possible to nest multiple `pipeAsync` calls to extend the validation and transformation further.

`pipeAsync` aborts early and marks the output as untyped if issues were collected before attempting to execute a schema or transformation action as the next item in the pipeline, to prevent unexpected behavior.

### Returns

*   `Schema` `SchemaWithPipeAsync<[TSchema, ...TItems]>`

### Examples

The following examples show how `pipeAsync` can be used. Please see the [pipeline guide](../guides/pipelines.md) for more examples and explanations.

#### Stored email schema

Schema to validate a stored email address.

    import { isEmailPresent } from '~/api';
    
    const StoredEmailSchema = v.pipeAsync(
      v.string(),
      v.nonEmpty('Please enter your email.'),
      v.email('The email is badly formatted.'),
      v.maxLength(30, 'Your email is too long.'),
      v.checkAsync(isEmailPresent, 'The email is not in the database.')
    );
    

#### New user schema

Schema to validate and transform new user details to a string.

    import { isUsernameUnique } from '~/api';
    
    const NewUserSchema = v.pipeAsync(
      v.objectAsync({
        firstName: v.pipe(v.string(), v.nonEmpty(), v.maxLength(30)),
        lastName: v.pipe(v.string(), v.nonEmpty(), v.maxLength(30)),
        username: v.pipeAsync(
          v.string(),
          v.nonEmpty(),
          v.maxLength(30),
          v.checkAsync(isUsernameUnique, 'The username is not unique.')
        ),
      }),
      v.transform(
        ({ firstName, lastName, username }) =>
          `${username} (${firstName} ${lastName})`
      )
    );
    

### Related

The following APIs can be combined with `pipeAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`is`](is.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`parse`](parse.md),
*   [`parser`](parser.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`required`](required.md),
*   [`safeParse`](safeParse.md),
*   [`safeParser`](safeParser.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nanoid`](nanoid.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

rawCheckAsync
-------------

Creates a raw check validation action.

    const Action = v.rawCheckAsync<TInput>(action);
    

### Generics

*   `TInput` `extends any`

### Parameters

*   `action` `(context: Context<TInput>) => MaybePromise<void>`

#### Explanation

With `rawCheckAsync` you can freely validate the input with a custom `action` and add issues if necessary.

### Returns

*   `Action` `RawCheckActionAsync<TInput>`

### Examples

The following examples show how `rawCheckAsync` can be used.

#### Add users schema

Object schema that ensures that only users not already in the group are included.

> This `rawCheckAsync` validation action adds an issue for any invalid username and forwards it via `path` to the appropriate nested field.

    import { isAlreadyInGroup } from '~/api';
    
    const AddUsersSchema = v.pipeAsync(
      v.object({
        groupId: v.pipe(v.string(), v.uuid()),
        usernames: v.array(v.pipe(v.string(), v.nonEmpty())),
      }),
      v.rawCheckAsync(async ({ dataset, addIssue }) => {
        if (dataset.typed) {
          await Promise.all(
            dataset.value.usernames.map(async (username, index) => {
              if (await isAlreadyInGroup(username, dataset.value.groupId)) {
                addIssue({
                  received: username,
                  message: 'The user is already in the group.',
                  path: [
                    {
                      type: 'object',
                      origin: 'value',
                      input: dataset.value,
                      key: 'usernames',
                      value: dataset.value.usernames,
                    },
                    {
                      type: 'array',
                      origin: 'value',
                      input: dataset.value.usernames,
                      key: index,
                      value: username,
                    },
                  ],
                });
              }
            })
          );
        }
      })
    );
    

### Related

The following APIs can be combined with `rawCheckAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

rawTransformAsync
-----------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/actions/rawTransform/rawTransformAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

recordAsync
-----------

Creates a record schema.

    const Schema = v.recordAsync<TKey, TValue, TMessage>(key, value, message);
    

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `recordAsync` you can validate the data type of the input and whether the entries match `key` and `value`. If the input is not an object, you can use `message` to customize the error message.

> This schema filters certain entries from the record for security reasons.

> This schema marks an entry as optional if it detects that its key is a literal type. The reason for this is that it is not technically possible to detect missing literal keys without restricting the `key` schema to [`string`](string.md), [`enum`](enum.md) and [`picklist`](picklist.md). However, if [`enum`](enum.md) and [`picklist`](picklist.md) are used, it is better to use [`objectAsync`](objectAsync.md) with [`entriesFromList`](entriesFromList.md) because it already covers the needed functionality. This decision also reduces the bundle size of `recordAsync`, because it only needs to check the entries of the input and not any missing keys.

### Returns

*   `Schema` `RecordSchemaAsync<TKey, TValue, TMessage>`

### Examples

The following examples show how `recordAsync` can be used.

#### ID to email schema

Schema to validate a record that maps an ID to a public user email.

    import { isEmailPublic } from '~/api';
    
    const IdToEmailSchema = v.recordAsync(
      v.pipe(v.string(), v.uuid()),
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPublic, 'The email address is private.')
      )
    );
    

### Related

The following APIs can be combined with `recordAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

requiredAsync
-------------

Creates a modified copy of an object schema that marks all or only the selected entries as required.

    const AllKeysSchema = v.requiredAsync<TSchema, TMessage>(schema, message);
    const SelectedKeysSchema = v.requiredAsync<TSchema, TKeys, TMessage>(
      schema,
      keys,
      message
    );
    

### Generics

*   `TSchema` `extends SchemaWithoutPipe<LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>>`
*   `TKeys` `ObjectKeys<TSchema>`
*   `TMessage` `ErrorMessage<NonOptionalIssue> | undefined`

### Parameters

*   `schema` `TSchema`
*   `keys` `TKey`
*   `message` `TMessage`

#### Explanation

`requiredAsync` creates a modified copy of the given object `schema` where all or only the selected `keys` are required. It is similar to TypeScript's [`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) utility type.

> Because `requiredAsync` changes the data type of the input and output, it is not allowed to pass a schema that has been modified by the [`pipeAsync`](pipeAsync.md) method, as this may cause runtime errors. Please use the [`pipeAsync`](pipeAsync.md) method after you have modified the schema with `requiredAsync`.

### Returns

*   `AllKeysSchema` `SchemaWithRequiredAsync<TSchema, undefined, TMessage>`
*   `SelectedKeysSchema` `SchemaWithRequiredAsync<TSchema, TKeys, TMessage>`

### Examples

The following examples show how `requiredAsync` can be used.

#### New task schema

Schema to validate an object containing task details.

    import { isOwnerPresent } from '~/api';
    
    const UpdateTaskSchema = v.objectAsync({
      owner: v.optionalAsync(
        v.pipeAsync(
          v.string(),
          v.email(),
          v.checkAsync(isOwnerPresent, 'The owner is not in the database.')
        )
      ),
      title: v.optional(v.pipe(v.string(), v.nonEmpty(), v.maxLength(255))),
      description: v.optional(v.pipe(v.string(), v.nonEmpty())),
    });
    
    const NewTaskSchema = v.requiredAsync(UpdateTaskSchema);
    
    /*
      {
        owner: string;
        title: string;
        description: string;
      }
    */
    

### Related

The following APIs can be combined with `requiredAsync`.

#### Schemas

*   [`array`](array.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`forward`](forward.md),
*   [`getDefault`](getDefault.md),
*   [`getDefaults`](getDefaults.md),
*   [`getFallback`](getFallback.md),
*   [`getFallbacks`](getFallbacks.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`unwrap`](unwrap.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md)

returnsAsync
------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/actions/returns/returnsAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

safeParseAsync
--------------

Parses an unknown input based on a schema.

    const result = v.safeParseAsync<TSchema>(schema, input, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Parameters

*   `schema` `TSchema`
*   `input` `unknown`
*   `config` `Config<InferIssue<TSchema>> | undefined`

### Returns

*   `result` `Promise<SafeParseResult<TSchema>>`

### Example

The following example shows how `safeParseAsync` can be used.

    import { isEmailPresent } from '~/api';
    
    const StoredEmailSchema = v.pipeAsync(
      v.string(),
      v.email(),
      v.checkAsync(isEmailPresent, 'The email is not in the database.')
    );
    const result = await v.safeParseAsync(StoredEmailSchema, 'jane@example.com');
    
    if (result.success) {
      const storedEmail = result.output;
    } else {
      console.error(result.issues);
    }
    

### Related

The following APIs can be combined with `safeParseAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

safeParserAsync
---------------

Returns a function that parses an unknown input based on a schema.

    const safeParser = v.safeParserAsync<TSchema, TConfig>(schema, config);
    

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Parameters

*   `schema` `TSchema`
*   `config` `TConfig`

### Returns

*   `safeParser` `SafeParserAsync<TSchema, TConfig>`

### Example

The following example shows how `safeParserAsync` can be used.

    import { isEmailPresent } from '~/api';
    
    const StoredEmailSchema = v.pipeAsync(
      v.string(),
      v.email(),
      v.checkAsync(isEmailPresent, 'The email is not in the database.')
    );
    const safeStoredEmailParser = v.safeParserAsync(StoredEmailSchema);
    const result = await safeStoredEmailParser('jane@example.com');
    
    if (result.success) {
      const storedEmail = result.output;
    } else {
      console.error(result.issues);
    }
    

### Related

The following APIs can be combined with `safeParserAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`assert`](assert.md),
*   [`config`](config.md),
*   [`fallback`](fallback.md),
*   [`flatten`](flatten.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`partial`](partial.md),
*   [`pick`](pick.md),
*   [`pipe`](pipe.md),
*   [`required`](required.md),
*   [`unwrap`](unwrap.md)

#### Utils

*   [`getDotPath`](getDotPath.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`undefinedableAsync`](undefinedableAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

setAsync
--------

Creates a set schema.

    const Schema = v.setAsync<TValue, TMessage>(value, message);
    

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<SetIssue> | undefined`

### Parameters

*   `value` `TValue`
*   `message` `TMessage`

#### Explanation

With `setAsync` you can validate the data type of the input and whether the content matches `value`. If the input is not a set, you can use `message` to customize the error message.

### Returns

*   `Schema` `SetSchemaAsync<TValue, TMessage>`

### Examples

The following examples show how `setAsync` can be used.

#### Allowed IPs schema

Schema to validate a set of allowed IP addresses.

    import { isIpAllowed } from '~/api';
    
    const AllowedIPsSchema = v.setAsync(
      v.pipeAsync(
        v.string(),
        v.ip(),
        v.checkAsync(isIpAllowed, 'This IP address is not allowed.')
      )
    );
    

### Related

The following APIs can be combined with `setAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`maxSize`](maxSize.md),
*   [`metadata`](metadata.md),
*   [`minSize`](minSize.md),
*   [`notSize`](notSize.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`size`](size.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

strictObjectAsync
-----------------

Creates a strict object schema.

    const Schema = v.strictObjectAsync<TEntries, TMessage>(entries, message);
    

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<StrictObjectIssue> | undefined`

### Parameters

*   `entries` `TEntries`
*   `message` `TMessage`

#### Explanation

With `strictObjectAsync` you can validate the data type of the input and whether the content matches `entries`. If the input is not an object or does include unknown entries, you can use `message` to customize the error message.

> The difference to [`objectAsync`](objectAsync.md) is that this schema returns an issue for unknown entries. It intentionally returns only one issue. Otherwise, attackers could send large objects to exhaust device resources. If you want an issue for every unknown key, use the [`objectWithRestAsync`](objectWithRestAsync.md) schema with [`never`](never.md) for the `rest` argument.

> This schema does not distinguish between missing and `undefined` entries. The reason for this decision is that it reduces the bundle size, and we also expect that most users will expect this behavior.

### Returns

*   `Schema` `StrictObjectSchemaAsync<TEntries, TMessage>`

### Examples

The following examples show how `strictObjectAsync` can be used. Please see the [object guide](../guides/objects.md) for more examples and explanations.

#### New user schema

Schema to validate a strict object containing only specific new user details.

    import { isEmailPresent } from '~/api';
    
    const NewUserSchema = v.strictObjectAsync({
      firstName: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
      lastName: v.pipe(v.string(), v.minLength(2), v.maxLength(45)),
      email: v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is already in use by another user.')
      ),
      password: v.pipe(v.string(), v.minLength(8)),
      avatar: v.optional(v.pipe(v.string(), v.url())),
    });
    

### Related

The following APIs can be combined with `strictObjectAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md),
*   [`keyof`](keyof.md),
*   [`omit`](omit.md),
*   [`pick`](pick.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`forwardAsync`](forwardAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialAsync`](partialAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`requiredAsync`](requiredAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

strictTupleAsync
----------------

Creates a strict tuple schema.

    const Schema = v.strictTupleAsync<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `strictTupleAsync` you can validate the data type of the input and whether the content matches `items`. If the input is not an array or does include unknown items, you can use `message` to customize the error message.

> The difference to [`tupleAsync`](tupleAsync.md) is that this schema returns an issue for unknown items. It intentionally returns only one issue. Otherwise, attackers could send large arrays to exhaust device resources. If you want an issue for every unknown item, use the [`tupleWithRestAsync`](tupleWithRestAsync.md) schema with [`never`](never.md) for the `rest` argument.

### Returns

*   `Schema` `StrictTupleSchemaAsync<TItems, TMessage>`

### Examples

The following examples show how `strictTupleAsync` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Number and email tuple

Schema to validate a strict tuple with one number and one stored email address.

    import { isEmailPresent } from '~/api';
    
    const TupleSchema = v.strictTupleAsync([
      v.number(),
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      ),
    ]);
    

### Related

The following APIs can be combined with `strictTupleAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

transformAsync
--------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/transform/transformAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

tupleAsync
----------

Creates a tuple schema.

    const Schema = v.tupleAsync<TItems, TMessage>(items, message);
    

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<TupleIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `message` `TMessage`

#### Explanation

With `tupleAsync` you can validate the data type of the input and whether the content matches `items`. If the input is not an array, you can use `message` to customize the error message.

> This schema removes unknown items. The output will only include the items you specify. To include unknown items, use [`looseTupleAsync`](looseTupleAsync.md). To return an issue for unknown items, use [`strictTupleAsync`](strictTupleAsync.md). To include and validate unknown items, use [`tupleWithRestAsync`](tupleWithRestAsync.md).

### Returns

*   `Schema` `TupleSchemaAsync<TItems, TMessage>`

### Examples

The following examples show how `tupleAsync` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Number and email tuple

Schema to validate a tuple with one number and one stored email address.

    import { isEmailPresent } from '~/api';
    
    const TupleSchema = v.tupleAsync([
      v.number(),
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      ),
    ]);
    

### Related

The following APIs can be combined with `tupleAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

tupleWithRestAsync
------------------

Creates a tuple with rest schema.

    const Schema = v.tupleWithRestAsync<TItems, TRest, TMessage>(
      items,
      rest,
      message
    );
    

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Parameters

*   `items` `TItems`
*   `rest` `TRest`
*   `message` `TMessage`

#### Explanation

With `tupleWithRestAsync` you can validate the data type of the input and whether the content matches `items` and `rest`. If the input is not an array, you can use `message` to customize the error message.

### Returns

*   `Schema` `TupleWithRestSchemaAsync<TItems, TRest, TMessage>`

### Examples

The following examples show how `tupleWithRestAsync` can be used. Please see the [arrays guide](../guides/arrays.md) for more examples and explanations.

#### Tuple schema with rest

Schema to validate a tuple with generic rest items.

    import { isEmailPresent } from '~/api';
    
    const TupleSchemaWithRest = v.tupleWithRestAsync(
      [
        v.number(),
        v.pipeAsync(
          v.string(),
          v.email(),
          v.checkAsync(isEmailPresent, 'The email is not in the database.')
        ),
      ],
      v.boolean()
    );
    

### Related

The following APIs can be combined with `tupleWithRestAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`brand`](brand.md),
*   [`description`](description.md),
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
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`someItem`](someItem.md),
*   [`sortItems`](sortItems.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`unionAsync`](unionAsync.md),
*   [`variantAsync`](variantAsync.md)

undefinedableAsync
------------------

> The content of this page is not yet ready. Until then, please use the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/undefinedable/undefinedableAsync.ts) or take a look at [issue #287](https://github.com/fabian-hiller/valibot/issues/287) to help us extend the API reference.

unionAsync
----------

Creates an union schema.

> I recommend that you read the [unions guide](../guides/unions.md) before using this schema function.

    const Schema = v.unionAsync<TOptions, TMessage>(options, message);
    

### Generics

*   `TOptions` `extends UnionOptionsAsync`
*   `TMessage` `extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined`

### Parameters

*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `unionAsync` you can validate if the input matches one of the given `options`. If the input does not match a schema and cannot be clearly assigned to one of the options, you can use `message` to customize the error message.

If a bad input can be uniquely assigned to one of the schemas based on the data type, the result of that schema is returned. Otherwise, a general issue is returned that contains the issues of each schema as subissues. This is a special case within the library, as the issues of `unionAsync` can contradict each other.

### Returns

*   `Schema` `UnionSchemaAsync<TOptions, TMessage>`

### Examples

The following examples show how `unionAsync` can be used.

#### User schema

Schema to validate a user's email or username.

    import { isEmailPresent, isUsernamePresent } from '~/api';
    
    const UserSchema = v.unionAsync([
      v.pipeAsync(
        v.string(),
        v.email(),
        v.checkAsync(isEmailPresent, 'The email is not in the database.')
      ),
      v.pipeAsync(
        v.string(),
        v.nonEmpty(),
        v.checkAsync(isUsernamePresent, 'The username is not in the database.')
      ),
    ]);
    

### Related

The following APIs can be combined with `unionAsync`.

#### Schemas

*   [`any`](any.md),
*   [`array`](array.md),
*   [`bigint`](bigint.md),
*   [`blob`](blob.md),
*   [`boolean`](boolean.md),
*   [`custom`](custom.md),
*   [`date`](date.md),
*   [`enum`](enum.md),
*   [`file`](file.md),
*   [`function`](function.md),
*   [`instance`](instance.md),
*   [`intersect`](intersect.md),
*   [`lazy`](lazy.md),
*   [`literal`](literal.md),
*   [`looseObject`](looseObject.md),
*   [`looseTuple`](looseTuple.md),
*   [`map`](map.md),
*   [`nan`](nan.md),
*   [`never`](never.md),
*   [`nonNullable`](nonNullable.md),
*   [`nonNullish`](nonNullish.md),
*   [`nonOptional`](nonOptional.md),
*   [`null`](null.md),
*   [`nullable`](nullable.md),
*   [`nullish`](nullish.md),
*   [`number`](number.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`optional`](optional.md),
*   [`picklist`](picklist.md),
*   [`promise`](promise.md),
*   [`record`](record.md),
*   [`set`](set.md),
*   [`strictObject`](strictObject.md),
*   [`strictTuple`](strictTuple.md),
*   [`string`](string.md),
*   [`symbol`](symbol.md),
*   [`tuple`](tuple.md),
*   [`tupleWithRest`](tupleWithRest.md),
*   [`undefined`](undefined.md),
*   [`undefinedable`](undefinedable.md),
*   [`union`](union.md),
*   [`unknown`](unknown.md),
*   [`variant`](variant.md),
*   [`void`](void.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`base64`](base64.md),
*   [`bic`](bic.md),
*   [`brand`](brand.md),
*   [`bytes`](bytes.md),
*   [`check`](check.md),
*   [`checkItems`](checkItems.md),
*   [`creditCard`](creditCard.md),
*   [`cuid2`](cuid2.md),
*   [`decimal`](decimal.md),
*   [`description`](description.md),
*   [`digits`](digits.md),
*   [`email`](email.md),
*   [`emoji`](emoji.md),
*   [`empty`](empty.md),
*   [`endsWith`](endsWith.md),
*   [`everyItem`](everyItem.md),
*   [`excludes`](excludes.md),
*   [`filterItems`](filterItems.md),
*   [`findItem`](findItem.md),
*   [`finite`](finite.md),
*   [`graphemes`](graphemes.md),
*   [`hash`](hash.md),
*   [`hexadecimal`](hexadecimal.md),
*   [`hexColor`](hexColor.md),
*   [`imei`](imei.md),
*   [`includes`](includes.md),
*   [`integer`](integer.md),
*   [`ip`](ip.md),
*   [`ipv4`](ipv4.md),
*   [`ipv6`](ipv6.md),
*   [`isoDate`](isoDate.md),
*   [`isoDateTime`](isoDateTime.md),
*   [`isoTime`](isoTime.md),
*   [`isoTimeSecond`](isoTimeSecond.md),
*   [`isoTimestamp`](isoTimestamp.md),
*   [`isoWeek`](isoWeek.md),
*   [`length`](length.md),
*   [`mac`](mac.md),
*   [`mac48`](mac48.md),
*   [`mac64`](mac64.md),
*   [`mapItems`](mapItems.md),
*   [`maxBytes`](maxBytes.md),
*   [`maxGraphemes`](maxGraphemes.md),
*   [`maxLength`](maxLength.md),
*   [`maxSize`](maxSize.md),
*   [`maxValue`](maxValue.md),
*   [`maxWords`](maxWords.md),
*   [`metadata`](metadata.md),
*   [`mimeType`](mimeType.md),
*   [`minBytes`](minBytes.md),
*   [`minGraphemes`](minGraphemes.md),
*   [`minLength`](minLength.md),
*   [`minSize`](minSize.md),
*   [`minValue`](minValue.md),
*   [`minWords`](minWords.md),
*   [`multipleOf`](multipleOf.md),
*   [`nonEmpty`](nonEmpty.md),
*   [`notBytes`](notBytes.md),
*   [`notGraphemes`](notGraphemes.md),
*   [`notLength`](notLength.md),
*   [`notSize`](notSize.md),
*   [`notValue`](notValue.md),
*   [`notWords`](notWords.md),
*   [`octal`](octal.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`reduceItems`](reduceItems.md),
*   [`regex`](regex.md),
*   [`safeInteger`](safeInteger.md),
*   [`size`](size.md),
*   [`someItem`](someItem.md),
*   [`sortItem`](sortItem.md),
*   [`startsWith`](startsWith.md),
*   [`title`](title.md),
*   [`toLowerCase`](toLowerCase.md),
*   [`toMaxValue`](toMaxValue.md),
*   [`toMinValue`](toMinValue.md),
*   [`toUpperCase`](toUpperCase.md),
*   [`transform`](transform.md),
*   [`trim`](trim.md),
*   [`trimEnd`](trimEnd.md),
*   [`trimStart`](trimStart.md),
*   [`ulid`](ulid.md),
*   [`url`](url.md),
*   [`uuid`](uuid.md),
*   [`value`](value.md),
*   [`words`](words.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`arrayAsync`](arrayAsync.md),
*   [`checkAsync`](checkAsync.md),
*   [`customAsync`](customAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`intersectAsync`](intersectAsync.md),
*   [`lazyAsync`](lazyAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`looseTupleAsync`](looseTupleAsync.md),
*   [`mapAsync`](mapAsync.md),
*   [`nonNullableAsync`](nonNullableAsync.md),
*   [`nonNullishAsync`](nonNullishAsync.md),
*   [`nonOptionalAsync`](nonOptionalAsync.md),
*   [`nullableAsync`](nullableAsync.md),
*   [`nullishAsync`](nullishAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`optionalAsync`](optionalAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`recordAsync`](recordAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`setAsync`](setAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`strictTupleAsync`](strictTupleAsync.md),
*   [`transformAsync`](transformAsync.md),
*   [`tupleAsync`](tupleAsync.md),
*   [`tupleWithRestAsync`](tupleWithRestAsync.md),
*   [`variantAsync`](variantAsync.md)

variantAsync
------------

Creates a variant schema.

    const Schema = v.variantAsync<TKey, TOptions, TMessage>(key, options, message);
    

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptionsAsync<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Parameters

*   `key` `TKey`
*   `options` `TOptions`
*   `message` `TMessage`

#### Explanation

With `variantAsync` you can validate if the input matches one of the given object `options`. The object schema to be used for the validation is determined by the discriminator `key`. If the input does not match a schema and cannot be clearly assigned to one of the options, you can use `message` to customize the error message.

> It is allowed to specify the exact same or a similar discriminator multiple times. However, in such cases `variantAsync` will only return the output of the first untyped or typed variant option result. Typed results take precedence over untyped ones.

> For deeply nested `variant` schemas with several different discriminator keys, `variant` will return an issue for the first most likely object schemas on invalid input. The order of the discriminator keys and the presence of a discriminator in the input are taken into account.

### Returns

*   `Schema` `VariantSchemaAsync<TKey, TOptions, TMessage>`

### Examples

The following examples show how `variantAsync` can be used.

#### Message schema

Schema to validate a message object.

    import { isValidGroupReceiver, isValidUserReceiver } from '~/api';
    
    const MessageSchema = v.objectAsync({
      message: v.pipe(v.string(), v.nonEmpty()),
      receiver: v.variantAsync('type', [
        v.objectAsync({
          type: v.literal('group'),
          groupId: v.pipeAsync(
            v.string(),
            v.uuid(),
            v.checkAsync(isValidGroupReceiver, 'The group cannot receive messages.')
          ),
        }),
        v.objectAsync({
          type: v.literal('user'),
          email: v.pipeAsync(
            v.string(),
            v.email(),
            v.checkAsync(isValidUserReceiver, 'The user cannot receive messages.')
          ),
        }),
      ]),
    });
    

#### User schema

Schema to validate unique user details.

    import { isRegisteredEmail, isRegisteredUsername, isValidUserId } from '~/api';
    
    const UserSchema = v.variantAsync('type', [
      // Assume this schema is from a different file and reused here.
      v.variantAsync('type', [
        v.objectAsync({
          type: v.literal('email'),
          email: v.pipeAsync(
            v.string(),
            v.email(),
            v.checkAsync(isRegisteredEmail, 'The email is not registered.')
          ),
        }),
        v.objectAsync({
          type: v.literal('username'),
          username: v.pipeAsync(
            v.string(),
            v.nonEmpty(),
            v.checkAsync(isRegisteredUsername, 'The username is not registered.')
          ),
        }),
      ]),
      v.objectAsync({
        type: v.literal('userId'),
        userId: v.pipeAsync(
          v.string(),
          v.uuid(),
          v.checkAsync(isValidUserId, 'The user id is not valid.')
        ),
      }),
    ]);
    

### Related

The following APIs can be combined with `variantAsync`.

#### Schemas

*   [`looseObject`](looseObject.md),
*   [`object`](object.md),
*   [`objectWithRest`](objectWithRest.md),
*   [`strictObject`](strictObject.md)

#### Methods

*   [`config`](config.md),
*   [`getDefault`](getDefault.md),
*   [`getFallback`](getFallback.md)

#### Actions

*   [`brand`](brand.md),
*   [`check`](check.md),
*   [`description`](description.md),
*   [`metadata`](metadata.md),
*   [`partialCheck`](partialCheck.md),
*   [`rawCheck`](rawCheck.md),
*   [`rawTransform`](rawTransform.md),
*   [`readonly`](readonly.md),
*   [`title`](title.md),
*   [`transform`](transform.md)

#### Utils

*   [`entriesFromList`](entriesFromList.md),
*   [`isOfKind`](isOfKind.md),
*   [`isOfType`](isOfType.md)

#### Async

*   [`checkAsync`](checkAsync.md),
*   [`fallbackAsync`](fallbackAsync.md),
*   [`getDefaultsAsync`](getDefaultsAsync.md),
*   [`getFallbacksAsync`](getFallbacksAsync.md),
*   [`looseObjectAsync`](looseObjectAsync.md),
*   [`objectAsync`](objectAsync.md),
*   [`objectWithRestAsync`](objectWithRestAsync.md),
*   [`parseAsync`](parseAsync.md),
*   [`parserAsync`](parserAsync.md),
*   [`partialCheckAsync`](partialCheckAsync.md),
*   [`pipeAsync`](pipeAsync.md),
*   [`rawCheckAsync`](rawCheckAsync.md),
*   [`rawTransformAsync`](rawTransformAsync.md),
*   [`safeParseAsync`](safeParseAsync.md),
*   [`safeParserAsync`](safeParserAsync.md),
*   [`strictObjectAsync`](strictObjectAsync.md),
*   [`transformAsync`](transformAsync.md)

AnySchema
---------

Any schema type.

### Definition

*   `AnySchema` `extends BaseSchema<any, any, never>`
    *   `type` `'any'`
    *   `reference` `typeof any`
    *   `expects` `'any'`

ArgsAction
----------

Args action type.

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends LooseTupleSchema<TupleItems, ErrorMessage<LooseTupleIssue> | undefined> | StrictTupleSchema<TupleItems, ErrorMessage<StrictTupleIssue> | undefined> | TupleSchema<TupleItems, ErrorMessage<TupleIssue> | undefined> | TupleWithRestSchema<TupleItems, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<TupleWithRestIssue> | undefined>`

### Definition

*   `ArgsAction` `extends BaseTransformation<TInput, (...args: InferInput<TSchema>) => ReturnType<TInput>, never>`
    *   `type` `'args'`
    *   `reference` `typeof args`
    *   `schema` `TSchema`

ArrayInput
----------

Array input type.

### Definition

*   `ArrayInput` `MaybeReadonly<unknown[]>`

ArrayIssue
----------

Array issue type.

### Definition

*   `ArrayIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'array'`
    *   `expected` `'Array'`

ArrayPathItem
-------------

Array path item type.

### Definition

*   `ArrayPathItem`
    *   `type` `'array'`
    *   `origin` `'value'`
    *   `input` `MaybeReadonly<unknown[]>`
    *   `key` `number`
    *   `value` `unknown`

The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.

ArrayRequirement
----------------

Array requirement type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `ArrayRequirement` `(item: TInput[number], index: number, array: TInput) => boolean`

ArrayRequirementAsync
---------------------

Array requirement async type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `ArrayRequirementAsync` `(item: TInput[number], index: number, array: TInput) => MaybePromise<boolean>`

ArraySchema
-----------

Array schema type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ArrayIssue> | undefined`

### Definition

*   `ArraySchema` `extends BaseSchema<InferInput<TItem>[], InferOutput<TItem>[], ArrayIssue | InferIssue<TItem>>`
    *   `type` `'array'`
    *   `reference` `typeof array`
    *   `expects` `'Array'`
    *   `item` `TItem`
    *   `message` `TMessage`

ArraySchemaAsync
----------------

Array schema async type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ArrayIssue> | undefined`

### Definition

*   `ArraySchemaAsync` `extends BaseSchemaAsync<InferInput<TItem>[], InferOutput<TItem>[], ArrayIssue | InferIssue<TItem>>`
    *   `type` `'array'`
    *   `reference` `typeof arrayAsync`
    *   `expects` `'Array'`
    *   `item` `TItem`
    *   `message` `TMessage`

AwaitActionAsync
----------------

Await action async type.

### Generics

*   `TInput` `extends Promise<unknown>`

### Definition

*   `AwaitActionAsync` `extends BaseTransformationAsync<TInput, Awaited<TInput>, never>`
    *   `type` `'await'`
    *   `reference` `typeof awaitAsync`

Base64Action
------------

Base64 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Base64Issue<TInput>> | undefined`

### Definition

*   `Base64Action` `extends BaseValidation<TInput, TInput, Base64Issue<TInput>>`
    *   `type` `'base64'`
    *   `reference` `typeof base64`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

Base64Issue
-----------

Base64 issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `Base64Issue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'base64'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

BaseIssue
---------

Schema issue type.

### Generics

*   `TInput` `extends any`

### Definition

*   `BaseIssue` `extends Config<BaseIssue<TInput>>`
    *   `kind` `'schema' | 'validation' | 'transformation'`
    *   `type` `string`
    *   `input` `TInput`
    *   `expected` `string | null`
    *   `received` `string`
    *   `message` `string`
    *   `requirement` `unknown | undefined`
    *   `path` `[IssuePathItem, ...IssuePathItem[]] | undefined`
    *   `issues` `[BaseIssue<TInput>, ...BaseIssue<TInput>[]] | undefined`

BaseMetadata
------------

Base metadata type.

### Generics

*   `TInput` `extends any`

### Definition

*   `BaseMetadata`
    *   `kind` `'metadata'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseMetadata<any>`
    *   `~types` `{ input: TInput, output: TInput, issue: never } | undefined`

BaseSchema
----------

Base schema type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseSchema`
    *   `kind` `'schema'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>>`
    *   `expects` `string`
    *   `async` `false`
    *   `~standard` `1`
    *   `~vendor` `'valibot'`
    *   `~types` `{ input: TInput, output: TOutput, issue: TIssue } | undefined`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, TIssue>`

BaseSchemaAsync
---------------

Base schema async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseSchemaAsync` `extends Omit<BaseSchema<TInput, TOutput, TIssue>, 'reference' | 'async' | '~validate'>`
    *   `reference` `((...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)`
    *   `async` `true`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, TIssue>>`

BaseTransformation
------------------

Base transformation type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseTransformation`
    *   `kind` `'transformation'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>>`
    *   `async` `false`
    *   `~types` `{ input: TInput, output: TOutput, issue: TIssue } | undefined`
    *   `~validate` `(dataset: SuccessDataset<TInput>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>`

BaseTransformationAsync
-----------------------

Base transformation async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseTransformationAsync` `extends Omit<BaseTransformation<TInput, TOutput, TIssue>, 'reference' | 'async' | '~validate'>`
    *   `reference` `((...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>> | BaseTransformationAsync<any, any, BaseIssue<unknown>>)`
    *   `async` `true`
    *   `~validate` `(dataset: SuccessDataset<TInput>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>`

BaseValidation
--------------

Base action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseValidation`
    *   `kind` `'validation'`
    *   `type` `string`
    *   `reference` `(...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>>`
    *   `expects` `string | null`
    *   `async` `false`
    *   `~types` `{ input: TInput, output: TOutput, issue: TIssue } | undefined`
    *   `~validate` `(dataset: OutputDataset<TInput, BaseIssue<unknown>>, config: Config<TIssue>) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>`

BaseValidationAsync
-------------------

Base validation async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `BaseValidationAsync` `extends Omit<BaseValidation<TInput, TOutput, TIssue>, 'reference' | 'async' | '~validate'>`
    *   `reference` `((...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>> | BaseValidationAsync<any, any, BaseIssue<unknown>>)`
    *   `async` `true`
    *   `~validate` `(dataset: OutputDataset<TInput, BaseIssue<unknown>>, config: Config<TIssue>) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>`

BicAction
---------

BIC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<BicIssue<TInput>> | undefined`

### Definition

*   `BicAction` `extends BaseValidation<TInput, TInput, BicIssue<TInput>>`
    *   `type` `'bic'`
    *   `reference` `typeof bic`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

BicIssue
--------

Bic issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `BicIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'bic'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

BigintIssue
-----------

Bigint issue type.

### Definition

*   `BigintIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'bigint'`
    *   `expected` `'bigint'`

BigintSchema
------------

Bigint schema type.

### Generics

*   `TMessage` `extends ErrorMessage<BigintIssue> | undefined`

### Definition

*   `BigintSchema` `extends BaseSchema<bigint, bigint, BigintIssue>`
    *   `type` `'bigint'`
    *   `reference` `typeof bigint`
    *   `expects` `'bigint'`
    *   `message` `TMessage`

BlobIssue
---------

Blob issue type.

### Definition

*   `BlobIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'blob'`
    *   `expected` `'Blob'`

BlobSchema
----------

Blob schema type.

### Generics

*   `TMessage` `extends ErrorMessage<BlobIssue> | undefined`

### Definition

*   `BlobSchema` `extends BaseSchema<Blob, Blob, BlobIssue>`
    *   `type` `'blob'`
    *   `reference` `typeof blob`
    *   `expects` `'Blob'`
    *   `message` `BlobIssue`

BooleanIssue
------------

Boolean issue type.

### Definition

*   `BooleanIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'boolean'`
    *   `expected` `'boolean'`

BooleanSchema
-------------

Boolean schema type.

### Generics

*   `TMessage` `extends ErrorMessage<BooleanIssue> | undefined`

### Definition

*   `BooleanSchema` `extends BaseSchema<boolean, boolean, BooleanIssue>`
    *   `type` `'boolean'`
    *   `reference` `typeof boolean`
    *   `expects` `'boolean'`
    *   `message` `TMessage`

Brand
-----

Brand type.

### Generics

*   `TName` `extends BrandName`

### Definition

*   `Brand` `{ [BrandSymbol]: { [TValue in TName]: TValue } }`

BrandAction
-----------

Brand action type.

### Generics

*   `TInput` `extends any`
*   `TName` `extends BrandName`

### Definition

*   `BrandAction` `extends BaseTransformation<TInput, TInput & Brand<TName>, never>`
    *   `type` `'brand'`
    *   `reference` `typeof brand`
    *   `name` `TName`

BrandName
---------

Brand name type.

### Definition

*   `BrandName` `string | number | symbol`

BytesAction
-----------

Bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<BytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `BytesAction` `extends BaseValidation<TInput, TInput, BytesIssue<TInput, TRequirement>>`
    *   `type` `'bytes'`
    *   `reference` `typeof bytes`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

BytesIssue
----------

Bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `BytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'bytes'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

CheckAction
-----------

Check action type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CheckIssue<TInput>> | undefined`

### Definition

*   `CheckAction` `extends BaseValidation<TInput, TInput, CheckIssue<TInput>>`
    *   `type` `'check'`
    *   `reference` `typeof check`
    *   `expects` `null`
    *   `requirement` `(input: TInput) => boolean`
    *   `message` `TMessage`

CheckActionAsync
----------------

Check action async type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CheckIssue<TInput>> | undefined`

### Definition

*   `CheckActionAsync` `extends BaseValidationAsync<TInput, TInput, CheckIssue<TInput>>`
    *   `type` `'check'`
    *   `reference` `typeof checkAsync`
    *   `expects` `null`
    *   `requirement` `(input: TInput) => MaybePromise<boolean>`
    *   `message` `TMessage`

CheckIssue
----------

Check issue type.

### Generics

*   `TInput` `extends any`

### Definition

*   `CheckIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'check'`
    *   `expected` `null`
    *   `requirement` `(input: TInput) => MaybePromise<boolean>`

CheckItemsAction
----------------

Check items action type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Definition

*   `CheckItemsAction` `extends BaseValidation<TInput, TInput, CheckItemsIssue<TInput>>`
    *   `type` `'check_items'`
    *   `reference` `typeof checkItems`
    *   `expects` `null`
    *   `requirement` `ArrayRequirement<TInput>`
    *   `message` `TMessage`

CheckItemsActionAsync
---------------------

Check items action async type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TMessage` `extends ErrorMessage<CheckItemsIssue<TInput>> | undefined`

### Definition

*   `CheckItemsActionAsync` `extends BaseValidationAsync<TInput, TInput, CheckItemsIssue<TInput>>`
    *   `type` `'check_items'`
    *   `reference` `typeof checkItemsAsync`
    *   `expects` `null`
    *   `requirement` `ArrayRequirementAsync<TInput>`
    *   `message` `TMessage`

CheckItemsIssue
---------------

Check items issue type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `CheckItemsIssue` `extends BaseIssue<TInput[number]>`
    *   `kind` `'validation'`
    *   `type` `'check_items'`
    *   `expected` `null`
    *   `requirement` `ArrayRequirementAsync<TInput>`

Class
-----

Class type.

### Definition

*   `Class` `new (...args: any[]) => any`

Config
------

Config type.

### Generics

*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `Config`
    *   `lang` `string | undefined`
    *   `message` `ErrorMessage<TIssue> | undefined`
    *   `abortEarly` `boolean | undefined`
    *   `abortPipeEarly` `boolean | undefined`

ContentInput
------------

Content input type.

### Definition

*   `ContentInput` `string | MaybeReadonly<unknown[]>`

ContentRequirement
------------------

Content requirement type.

### Generics

*   `TInput` `extends ContentInput`

### Definition

*   `ContentRequirement` `TInput extends readonly unknown[] ? TInput[number] : TInput`

CreditCardAction
----------------

Credit card action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<CreditCardIssue<TInput>> | undefined`

### Definition

*   `CreditCardAction` `extends BaseValidation<TInput, TInput, CreditCardIssue<TInput>>`
    *   `type` `'credit_card'`
    *   `reference` `typeof creditCard`
    *   `expects` `null`
    *   `requirement` `(input: string) => boolean`
    *   `message` `TMessage`

CreditCardIssue
---------------

Credit card issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `CreditCardIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'credit_card'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `(input: string) => boolean`

Cuid2Action
-----------

Cuid2 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Cuid2Issue<TInput>> | undefined`

### Definition

*   `Cuid2Action` `extends BaseValidation<TInput, TInput, Cuid2Issue<TInput>>`
    *   `type` `'cuid2'`
    *   `reference` `typeof cuid2`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

Cuid2Issue
----------

Cuid2 issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `Cuid2Issue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'cuid2'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

CustomIssue
-----------

Custom issue type.

### Definition

*   `CustomIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'custom'`
    *   `expected` `'unknown'`

CustomSchema
------------

Custom schema type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CustomIssue> | undefined`

### Definition

*   `CustomSchema` `extends BaseSchema<TInput, TInput, CustomIssue>`
    *   `type` `'custom'`
    *   `reference` `typeof custom`
    *   `expects` `'unknown'`
    *   `check` `(input: unknown) => boolean`
    *   `message` `TMessage`

CustomSchemaAsync
-----------------

Custom schema async type.

### Generics

*   `TInput` `extends any`
*   `TMessage` `extends ErrorMessage<CustomIssue> | undefined`

### Definition

*   `CustomSchemaAsync` `extends BaseSchemaAsync<TInput, TInput, CustomIssue>`
    *   `type` `'custom'`
    *   `reference` `typeof customAsync`
    *   `expects` `'unknown'`
    *   `check` `(input: unknown) => MaybePromise<boolean>`
    *   `message` `TMessage`

DateIssue
---------

Date issue type.

### Definition

*   `DateIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'date'`
    *   `expected` `'Date'`

DateSchema
----------

Date schema type.

### Generics

*   `TMessage` `extends ErrorMessage<DateIssue> | undefined`

### Definition

*   `DateSchema` `extends BaseSchema<Date, Date, DateIssue>`
    *   `type` `'date'`
    *   `reference` `typeof date`
    *   `expects` `'Date'`
    *   `message` `TMessage`

DecimalAction
-------------

Decimal action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DecimalIssue<TInput>> | undefined`

### Definition

*   `DecimalAction` `extends BaseValidation<TInput, TInput, DecimalIssue<TInput>>`
    *   `type` `'decimal'`
    *   `reference` `typeof decimal`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

DecimalIssue
------------

Decimal issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `DecimalIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'decimal'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

DeepPickN
---------

Deeply picks N specific keys.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/types/utils.ts).

Default
-------

Default type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TInput` `extends null | undefined`

### Definition

*   `Default` `MaybeReadonly<InferInput<TWrapped>, TInput> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybeReadonly<InferInput<TWrapped>, TInput>)`

DefaultAsync
------------

Default async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TInput` `extends null | undefined`

### Definition

*   `DefaultAsync` `MaybeReadonly<InferInput<TWrapped>, TInput> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise<MaybeReadonly<InferInput<TWrapped>, TInput>>)`

DefaultValue
------------

Default value type.

### Generics

*   `TDefault` `extends Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, null | undefined> | DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, null | undefined>`

### Definition

*   `DefaultValue` `TDefault extends DefaultAsync<infer TWrapped, infer TInput> ? TDefault extends (dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise<MaybeReadonly<InferInput<TWrapped>, TInput>> ? Awaited<ReturnType<TDefault>> : TDefault : never`

DescriptionAction
-----------------

Description action type.

### Generics

*   `TInput` `extends any`
*   `TDescription` `extends string`

### Definition

*   `DescriptionAction` `extends BaseMetadata<TInput>`
    *   `type` `'description'`
    *   `reference` `typeof description`
    *   `description` `TDescription`

DigitsAction
------------

Digits action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<DecimalIssue<TInput>> | undefined`

### Definition

*   `DigitsAction` `extends BaseValidation<TInput, TInput, DigitsIssue<TInput>>`
    *   `type` `'digits'`
    *   `reference` `typeof digits`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

DigitsIssue
-----------

Digits issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `DigitsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'digits'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

EmailAction
-----------

Email action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmailIssue<TInput>> | undefined`

### Definition

*   `EmailAction` `extends BaseValidation<TInput, TInput, EmailIssue<TInput>>`
    *   `type` `'email'`
    *   `reference` `typeof email`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

EmailIssue
----------

Email issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `EmailIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'email'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

EmojiAction
-----------

Emoji action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<EmojiIssue<TInput>> | undefined`

### Definition

*   `EmojiAction` `extends BaseValidation<TInput, TInput, EmojiIssue<TInput>>`
    *   `type` `'emoji'`
    *   `reference` `typeof emoji`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

EmojiIssue
----------

Emoji issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `EmojiIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'emoji'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

EmptyAction
-----------

Empty action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<EmptyIssue<TInput, TRequirement>> | undefined`

### Definition

*   `EmptyAction` `extends BaseValidation<TInput, TInput, EmptyIssue<TInput, TRequirement>>`
    *   `type` `'empty'`
    *   `reference` `typeof empty`
    *   `expects` `'0'`
    *   `message` `TMessage`

EmptyIssue
----------

Empty issue type.

### Generics

*   `TInput` `extends LengthInput`

### Definition

*   `EmptyIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'empty'`
    *   `expected` `'0'`
    *   `received` `` `${number}` ``

EndsWithAction
--------------

Ends with action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<EndsWithIssue<TInput, TRequirement>> | undefined`

### Definition

*   `EndsWithAction` `extends BaseValidation<TInput, TInput, EndsWithIssue<TInput, TRequirement>>`
    *   `type` `'ends_with'`
    *   `reference` `typeof endsWith`
    *   `expects` `` `"${TRequirement}"` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

EndsWithIssue
-------------

Ends with issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`

### Definition

*   `EndsWithIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'ends_with'`
    *   `expected` `` `"${TRequirement}"` ``
    *   `received` `` `"${string}"` ``
    *   `requirement` `TRequirement`

Enum
----

Enum type.

### Definition

*   `Enum` `{ [key: string]: string | number }`

EnumIssue
---------

Enum issue type.

### Definition

*   `EnumIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'enum'`
    *   `expected` `string`

EnumSchema
----------

Enum schema type.

### Generics

*   `TEnum` `extends Enum`
*   `TMessage` `extends ErrorMessage<EnumIssue> | undefined`

### Definition

*   `EnumSchema` `extends BaseSchema<TEnum[keyof TEnum], TEnum[keyof TEnum], EnumIssue>`
    *   `type` `'enum'`
    *   `reference` `typeof enum`
    *   `enum` `TEnum`
    *   `options` `TEnum[keyof TEnum][]`
    *   `message` `TMessage`

ErrorMessage
------------

Error message type.

### Generics

*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `ErrorMessage` `((issue: TIssue) => string) | string`

EveryItemAction
---------------

Every action type.

### Generics

*   `TInput` `extends readonly unknown[]`
*   `TMessage` `extends ErrorMessage<EveryItemIssue<TInput>> | undefined`

### Definition

*   `EveryItemAction` `extends BaseValidation<TInput, TInput, EveryItemIssue<TInput>>`
    *   `type` `'every_item'`
    *   `reference` `typeof everyItem`
    *   `expects` `null`
    *   `requirement` `(item: TInput[number], index: number, array: TInput) => boolean`
    *   `message` `TMessage`

EveryItemIssue
--------------

Every item issue type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `EveryItemIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'every_item'`
    *   `expected` `null`
    *   `requirement` `ArrayRequirement<TInput>`

ExcludesAction
--------------

Excludes action type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`
*   `TMessage` `extends ErrorMessage<ExcludesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `ExcludesAction` `extends BaseValidation<TInput, TInput, ExcludesIssue<TInput, TRequirement>>`
    *   `type` `'excludes'`
    *   `referece` `typeof excludes`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

ExcludesIssue
-------------

Excludes issue type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`

### Definition

*   `ExcludesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'excludes'`
    *   `expected` `string`
    *   `requirement` `TRequirement`

FailureDataset
--------------

Failure dataset type.

### Generics

*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `UntypedDataset`
    *   `typed` `false`
    *   `value` `unknown`
    *   `issues` `[TIssue, ...TIssue[]]`

Fallback
--------

Fallback type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `Fallback` `extends InferOutput<TSchema> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => InferOutput<TSchema>)`

FallbackAsync
-------------

Fallback async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `FallbackAsync` `extends InferOutput<TSchema> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => MaybePromise<InferOutput<TSchema>>)`

FileIssue
---------

File issue type.

### Definition

*   `FileIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'file'`
    *   `expected` `'File'`

FileSchema
----------

File schema type.

### Generics

*   `TMessage` `extends ErrorMessage<FileIssue> | undefined`

### Definition

*   `FileSchema` `extends BaseSchema<File, File, FileIssue>`
    *   `type` `'file'`
    *   `reference` `typeof file`
    *   `expects` `'File'`
    *   `message` `TMessage`

FilterItemsAction
-----------------

Filter items action type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `FilterItemsAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'filter_items'`
    *   `reference` `typeof filterItems`
    *   `operation` `ArrayRequirement<TInput>`

FindItemAction
--------------

Find item action type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `FindItemAction` `extends BaseTransformation<TInput, TInput[number] | undefined, never>`
    *   `type` `'find_item'`
    *   `reference` `typeof findItem`
    *   `operation` `ArrayRequirement<TInput>`

FiniteAction
------------

Finite action type.

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<FiniteIssue<TInput>> | undefined`

### Definition

*   `FiniteAction` `extends BaseValidation<TInput, TInput, FiniteIssue<TInput>>`
    *   `type` `'finite'`
    *   `reference` `typeof finite`
    *   `expects` `null`
    *   `requirement` `(input: number) => boolean`
    *   `message` `TMessage`

FiniteIssue
-----------

Finite issue type.

### Generics

*   `TInput` `extends number`

### Definition

*   `FiniteIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'finite'`
    *   `expected` `null`
    *   `received` `` `${number}` ``
    *   `requirement` `(input: number) => boolean`

FirstTupleItem
--------------

Extracts first tuple item.

### Generics

*   `TTuple` `extends [unknown, ...unknown[]]`

### Definition

*   `FirstTupleItem` `TTuple[0]`

FlatErrors
----------

Flat errors type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/flatten/flatten.ts).

FunctionIssue
-------------

Function issue type.

### Definition

*   `FunctionIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'function'`
    *   `expected` `'Function'`

FunctionSchema
--------------

Function schema type.

### Generics

*   `TMessage` `extends ErrorMessage<FunctionIssue> | undefined`

### Definition

*   `FunctionSchema` `extends BaseSchema<(...args: unknown[]) => unknown, (...args: unknown[]) => unknown, FunctionIssue>`
    *   `type` `'function'`
    *   `reference` `typeof function`
    *   `expects` `'Function'`
    *   `message` `TMessage`

GenericIssue
------------

Generic issue type.

### Generics

*   `TInput` `extends any = unknown`

### Definition

*   `GenericIssue` `extends BaseIssue<TInput>`

GenericMetadata
---------------

Generic metadata type.

### Generics

*   `TInput` `extends any = any`

### Definition

*   `GenericMetadata` `extends BaseMetadata<TInput>`

GenericSchema
-------------

Generic schema type.

### Generics

*   `TInput` `extends any = unknown`
*   `TOutput` `extends any = TInput`
*   `TIssue` `extends BaseIssue<unknown> = BaseIssue<unknown>`

### Definition

*   `GenericSchema` `extends BaseSchema<TInput, TOutput, TIssue>`

GenericSchemaAsync
------------------

Generic schema async type.

### Generics

*   `TInput` `extends any = unknown`
*   `TOutput` `extends any = TInput`
*   `TIssue` `extends BaseIssue<unknown> = BaseIssue<unknown>`

### Definition

*   `GenericSchemaAsync` `BaseSchemaAsync<TInput, TOutput, TIssue>`

GenericTransformation
---------------------

Generic transformation type.

### Generics

*   `TInput` `extends any = any`
*   `TOutput` `extends any = TInput`
*   `TIssue` `extends BaseIssue<unknown> = BaseIssue<unknown>`

### Definition

*   `GenericTransformation` `extends BaseTransformation<TInput, TOutput, TIssue>`

GenericTransformationAsync
--------------------------

Generic transformation async type.

### Generics

*   `TInput` `extends any = any`
*   `TOutput` `extends any = TInput`
*   `TIssue` `extends BaseIssue<unknown> = BaseIssue<unknown>`

### Definition

*   `GenericTransformationAsync` `BaseTransformationAsync<TInput, TOutput, TIssue>`

GenericValidation
-----------------

Generic validation type.

### Generics

*   `TInput` `extends any = any`
*   `TOutput` `extends any = TInput`
*   `TIssue` `extends BaseIssue<unknown> = BaseIssue<unknown>`

### Definition

*   `GenericValidation` `extends BaseValidation<TInput, TOutput, TIssue>`

GenericValidationAsync
----------------------

Generic validation async type.

### Generics

*   `TInput` `extends any = any`
*   `TOutput` `extends any = TInput`
*   `TIssue` `extends BaseIssue<unknown> = BaseIssue<unknown>`

### Definition

*   `GenericValidationAsync` `BaseValidationAsync<TInput, TOutput, TIssue>`

GlobalConfig
------------

The global config type.

### Definition

*   `GlobalConfig` `Omit<Config<never>, 'message'>`

GraphemesAction
---------------

Graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<GraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `GraphemesAction` `extends BaseValidation<TInput, TInput, GraphemesIssue<TInput, TRequirement>>`
    *   `type` `'graphemes'`
    *   `reference` `typeof graphemes`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

GraphemesIssue
--------------

Graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `GraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'graphemes'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

HashAction
----------

Hash action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HashIssue<TInput>> | undefined`

### Definition

*   `HashAction` `extends BaseValidation<TInput, TInput, HashIssue<TInput>>`
    *   `type` `'hash'`
    *   `reference` `typeof hash`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

HashIssue
---------

Hash issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `HashIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'hash'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

HashType
--------

Hash type type.

### Definition

*   `HashType` `'md4' | 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'ripemd128' | 'ripemd160' | 'tiger128' | 'tiger160' | 'tiger192' | 'crc32' | 'crc32b' | 'adler32'`

HexadecimalAction
-----------------

Hexadecimal action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexadecimalIssue<TInput>> | undefined`

### Definition

*   `HexadecimalAction` `extends BaseValidation<TInput, TInput, HexadecimalIssue<TInput>>`
    *   `type` `'hexadecimal'`
    *   `reference` `typeof hexadecimal`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

HexadecimalIssue
----------------

Hexadecimal issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `HexadecimalIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'hexadecimal'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

HexColorAction
--------------

Hex color action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<HexColorIssue<TInput>> | undefined`

### Definition

*   `HexColorAction` `extends BaseValidation<TInput, TInput, HexColorIssue<TInput>>`
    *   `type` `'hex_color'`
    *   `reference` `typeof hexColor`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

HexColorIssue
-------------

HexColor issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `HexColorIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'hex_color'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

ImeiAction
----------

Imei action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<ImeiIssue<TInput>> | undefined`

### Definition

*   `ImeiAction` `extends BaseValidation<TInput, TInput, ImeiIssue<TInput>>`
    *   `type` `'imei'`
    *   `reference` `typeof imei`
    *   `expects` `null`
    *   `requirement` `(input: string) => boolean`
    *   `message` `TMessage`

ImeiIssue
---------

IMEI issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `ImeiIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'imei'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `(input: string) => boolean`

IncludesAction
--------------

Includes action type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`
*   `TMessage` `extends ErrorMessage<IncludesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `IncludesAction` `extends BaseValidation<TInput, TInput, IncludesIssue<TInput, TRequirement>>`
    *   `type` `'includes'`
    *   `reference` `typeof includes`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

IncludesIssue
-------------

Includes issue type.

### Generics

*   `TInput` `extends ContentInput`
*   `TRequirement` `extends ContentRequirement<TInput>`

### Definition

*   `IncludesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'includes'`
    *   `expected` `string`
    *   `requirement` `TRequirement`

InferDefault
------------

Infer default type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/getDefault/getDefault.ts).

InferDefaults
-------------

Infer fallbacks type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/getDefaults/types.ts).

InferFallback
-------------

Infer fallback type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/getFallback/getFallback.ts).

InferFallbacks
--------------

Infer fallbacks type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/getFallbacks/types.ts).

InferInput
----------

Infer input type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>`

### Definition

*   `InferInput` `NonNullable<TItem['~types']>['input']`

### Example

    // Create object schema
    const ObjectSchema = v.object({
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    });
    
    // Infer object input type
    type ObjectInput = v.InferInput<typeof ObjectSchema>; // { key: string }

InferIntersectInput
-------------------

Infer intersect input type.

    // Create object schemas
    const ObjectSchemas = [
      v.object({
        key1: v.pipe(
          v.string(),
          v.transform((input) => input.length)
        ),
      }),
      v.object({
        key2: v.pipe(
          v.string(),
          v.transform((input) => input.length)
        ),
      }),
    ];
    
    // Infer object intersect input type
    type ObjectInput = v.InferIntersectInput<typeof ObjectSchemas>; // { key1: string } & { key2: string }

InferIntersectOutput
--------------------

Infer intersect output type.

    // Create object schemas
    const ObjectSchemas = [
      v.object({
        key1: v.pipe(
          v.string(),
          v.transform((input) => input.length)
        ),
      }),
      v.object({
        key2: v.pipe(
          v.string(),
          v.transform((input) => input.length)
        ),
      }),
    ];
    
    // Infer object intersect output type
    type ObjectOutput = v.InferIntersectOutput<typeof ObjectSchemas>; // { key1: number } & { key2: number }

InferIssue
----------

Infer issue type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>`

### Definition

*   `InferIssue` `NonNullable<TItem['~types']>['issue']`

InferMapInput
-------------

Infer map input type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `InferMapInput` `Map<InferInput<TKey>, InferInput<TValue>>`

InferMapOutput
--------------

Infer map output type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `InferMapOutput` `Map<InferOutput<TKey>, InferOutput<TValue>>`

InferNonNullableInput
---------------------

Infer non nullable input type.

    // Create nullable sting schema
    const NullableStringSchema = v.nullable(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullable string input type
    type NonNullableStringInput = v.InferNonNullableInput<
      typeof NullableStringSchema
    >; // string

InferNonNullableIssue
---------------------

Infer non nullable issue type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/nonNullable/types.ts).

InferNonNullableOutput
----------------------

Infer non nullable output type.

    // Create nullable sting schema
    const NullableStringSchema = v.nullable(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullable string output type
    type NonNullableStringOutput = v.InferNonNullableOutput<
      typeof NullableStringSchema
    >; // number

InferNonNullishInput
--------------------

Infer non nullable input type.

    // Create nullish sting schema
    const NullishStringSchema = v.nullish(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullish string input type
    type NonNullishStringInput = v.InferNonNullishInput<typeof NullishStringSchema>; // string

InferNonNullishIssue
--------------------

Infer non nullish issue type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/nonNullish/types.ts).

InferNonNullishOutput
---------------------

Infer non nullable output type.

    // Create nullish sting schema
    const NullishStringSchema = v.nullish(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non nullish string output type
    type NonNullishStringOutput = v.InferNonNullishOutput<
      typeof NullishStringSchema
    >; // number

InferNonOptionalInput
---------------------

Infer non optional input type.

    // Create optional sting schema
    const OptionalStringSchema = v.optional(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non optional string input type
    type NonOptionalStringInput = v.InferNonOptionalInput<
      typeof OptionalStringSchema
    >; // string

InferNonOptionalIssue
---------------------

Infer non optional issue type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/schemas/nonOptional/types.ts).

InferNonOptionalOutput
----------------------

Infer non optional output type.

    // Create optional sting schema
    const OptionalStringSchema = v.optional(
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      )
    );
    
    // Infer non optional string output type
    type NonOptionalStringOutput = v.InferNonOptionalOutput<
      typeof OptionalStringSchema
    >; // number

InferNullableOutput
-------------------

Infer nullable output type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null>`

### Definition

*   `InferNullableOutput` `[TDefault] extends [never] ? InferOutput<TWrapped> | null : NonNullable<InferOutput<TWrapped>> | Extract<DefaultValue<TDefault>, null>`

InferNullishOutput
------------------

Infer nullish output type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null | undefined>`

### Definition

*   `InferNullishOutput` `[TDefault] extends [never] ? InferOutput<TWrapped> | null | undefined : NonNullish<InferOutput<TWrapped>> | Extract<DefaultValue<TDefault>, null | undefined>`

InferObjectInput
----------------

Infer object input type.

    // Create object entries
    const entries = {
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    };
    
    // Infer entries input type
    type EntriesInput = v.InferObjectInput<typeof entries>; // { key: string }

InferObjectIssue
----------------

Infer object issue type.

### Generics

*   `TEntries` `extends ObjectEntries | ObjectEntriesAsync`

### Definition

*   `InferObjectIssue` `InferIssue<TEntries[keyof TEntries]>`

InferObjectOutput
-----------------

Infer object output type.

    // Create object entries
    const entries = {
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    };
    
    // Infer entries output type
    type EntriesOutput = v.InferObjectOutput<typeof entries>; // { key: number }

InferOptionalOutput
-------------------

Infer optional output type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, undefined>`

### Definition

*   `InferOptionalOutput` `[TDefault] extends [never] ? InferOutput<TWrapped> | undefined : NonOptional<InferOutput<TWrapped>> | Extract<DefaultValue<TDefault>, undefined>`

InferOutput
-----------

Infer output type.

### Generics

*   `TItem` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>`

### Definition

*   `InferIssue` `NonNullable<TItem['~types']>['output']`

### Example

    // Create object schema
    const ObjectSchema = v.object({
      key: v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    });
    
    // Infer object output type
    type ObjectOutput = v.InferOutput<typeof ObjectSchema>; // { key: number }

InferRecordInput
----------------

> The content of this page is not yet ready.

InferRecordOutput
-----------------

> The content of this page is not yet ready.

InferSetInput
-------------

Infer set input type.

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `InferSetInput` `Set<InferInput<TValue>>`

InferSetOutput
--------------

Infer set output type.

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `InferSetOutput` `Set<InferOutput<TValue>>`

InferTupleInput
---------------

Infer tuple output type.

    // Create tuple items
    const items = [
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    ];
    
    // Infer items input type
    type ItemsInput = v.InferTupleInput<typeof items>; // [string]

InferTupleIssue
---------------

Infer tuple issue type.

### Generics

*   `TItems` `extends TupleItems | TupleItemsAsync`

### Definition

*   `InferTupleIssue` `InferIssue<TItems[number]>`

InferTupleOutput
----------------

Infer tuple issue type.

    const items = [
      v.pipe(
        v.string(),
        v.transform((input) => input.length)
      ),
    ];
    
    // Infer items output type
    type ItemsOutput = v.InferTupleOutput<typeof items>; // [number]

InferVariantIssue
-----------------

Infer variant issue type.

### Generics

*   `TOptions` `extends VariantOptions<string> | VariantOptionsAsync<string>`

### Definition

*   `InferVariantIssue` `Exclude<InferIssue<TOptions[number]>, { type: 'loose_object' | 'object' | 'object_with_rest' }>`

InstanceIssue
-------------

Instance issue type.

### Definition

*   `InstanceIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'instance'`
    *   `expected` `string`

InstanceSchema
--------------

Instance schema type.

### Generics

*   `TClass` `extends Class`
*   `TMessage` `extends ErrorMessage<InstanceIssue> | undefined`

### Definition

*   `InstanceSchema` `extends BaseSchema<InstanceType<TClass>, InstanceType<TClass>, InstanceIssue>`
    *   `type` `'instance'`
    *   `reference` `typeof instance`
    *   `class` `TClass`
    *   `message` `TMessage`

IntegerAction
-------------

Integer action type.

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<IntegerIssue<TInput>> | undefined`

### Definition

*   `IntegerAction` `extends BaseValidation<TInput, TInput, IntegerIssue<TInput>>`
    *   `type` `'integer'`
    *   `reference` `typeof integer`
    *   `expects` `null`
    *   `requirement` `(input: number) => boolean`
    *   `message` `TMessage`

IntegerIssue
------------

Integer issue type.

### Generics

*   `TInput` `extends number`

### Definition

*   `IntegerIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'integer'`
    *   `expected` `null`
    *   `received` `` `${number}` ``
    *   `requirement` `(input: number) => boolean`

IntersectIssue
--------------

Intersect issue type.

### Definition

*   `IntersectIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'intersect'`
    *   `expected` `string`

IntersectOptions
----------------

Intersect options type.

### Definition

*   `IntersectOptions` `MaybeReadonly<BaseSchema<unknown, unknown, BaseIssue<unknown>>[]>`

IntersectOptionsAsync
---------------------

Intersect options async type.

### Definition

*   `IntersectOptionsAsync` `MaybeReadonly<(BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)[]>`

IntersectSchema
---------------

Intersect schema type.

### Generics

*   `TOptions` `extends IntersectOptions`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Definition

*   `IntersectSchema` `extends BaseSchema<InferIntersectInput<TOptions>, InferIntersectOutput<TOptions>, IntersectIssue | InferIssue<TOptions[number]>>`
    *   `type` `'intersect'`
    *   `reference` `typeof intersect`
    *   `options` `TOptions`
    *   `message` `TMessage`

IntersectSchemaAsync
--------------------

Intersect schema async type.

### Generics

*   `TOptions` `extends IntersectOptionsAsync`
*   `TMessage` `extends ErrorMessage<IntersectIssue> | undefined`

### Definition

*   `IntersectSchemaAsync` `extends BaseSchemaAsync<InferIntersectInput<TOptions>, InferIntersectOutput<TOptions>, IntersectIssue | InferIssue<TOptions[number]>>`
    *   `type` `'intersect'`
    *   `reference` `typeof intersectAsync`
    *   `options` `TOptions`
    *   `message` `TMessage`

IpAction
--------

IP action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IpIssue<TInput>> | undefined`

### Definition

*   `IpAction` `extends BaseValidation<TInput, TInput, IpIssue<TInput>>`
    *   `type` `'ip'`
    *   `reference` `typeof ip`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IpIssue
-------

IP issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IpIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'ip'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

Ipv4Action
----------

IPv4 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv4Issue<TInput>> | undefined`

### Definition

*   `Ipv4Action` `extends BaseValidation<TInput, TInput, Ipv4Issue<TInput>>`
    *   `type` `'ipv4'`
    *   `reference` `typeof ipv4`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

Ipv4Issue
---------

IPv4 issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `Ipv4Issue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'ipv4'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

Ipv6Action
----------

IPv6 action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Ipv6Issue<TInput>> | undefined`

### Definition

*   `Ipv6Action` `extends BaseValidation<TInput, TInput, Ipv6Issue<TInput>>`
    *   `type` `'ipv6'`
    *   `reference` `typeof ipv6`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

Ipv6Issue
---------

IPv6 issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `Ipv6Issue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'ipv6'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IsoDateAction
-------------

ISO date action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateIssue<TInput>> | undefined`

### Definition

*   `IsoDateAction` `extends BaseValidation<TInput, TInput, IsoDateIssue<TInput>>`
    *   `type` `'iso_date'`
    *   `reference` `typeof isoDate`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IsoDateIssue
------------

ISO date issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IsoDateIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'iso_date'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IsoDateTimeAction
-----------------

ISO date time action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined`

### Definition

*   `IsoDateTimeAction` `extends BaseValidation<TInput, TInput, IsoDateTimeIssue<TInput>>`
    *   `type` `'iso_date_time'`
    *   `reference` `typeof isoDateTime`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IsoDateTimeIssue
----------------

ISO date time issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IsoDateTimeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'iso_date_time'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IsoTimeAction
-------------

ISO time action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeIssue<TInput>> | undefined`

### Definition

*   `IsoTimeAction` `extends BaseValidation<TInput, TInput, IsoTimeIssue<TInput>>`
    *   `type` `'iso_time'`
    *   `reference` `typeof isoTime`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IsoTimeIssue
------------

ISO time issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IsoTimeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'iso_time'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IsoTimeSecondAction
-------------------

ISO time second action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimeSecondIssue<TInput>> | undefined`

### Definition

*   `IsoTimeSecondAction` `extends BaseValidation<TInput, TInput, IsoTimeSecondIssue<TInput>>`
    *   `type` `'iso_time_second'`
    *   `reference` `typeof isoTimeSecond`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IsoTimeSecondIssue
------------------

ISO time second issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IsoTimeSecondIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'iso_time_second'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IsoTimestampAction
------------------

ISO timestamp action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoTimestampIssue<TInput>> | undefined`

### Definition

*   `IsoTimestampAction` `extends BaseValidation<TInput, TInput, IsoTimestampIssue<TInput>>`
    *   `type` `'iso_timestamp'`
    *   `reference` `typeof isoTimestamp`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IsoTimestampIssue
-----------------

ISO timestamp issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IsoTimestampIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'iso_timestamp'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IsoWeekAction
-------------

ISO week action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<IsoWeekIssue<TInput>> | undefined`

### Definition

*   `IsoWeekAction` `extends BaseValidation<TInput, TInput, IsoWeekIssue<TInput>>`
    *   `type` `'iso_week'`
    *   `reference` `typeof isoWeek`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

IsoWeekIssue
------------

ISO week issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `IsoWeekIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'iso_week'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

IssueDotPath
------------

Issue dot path type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/types/issue.ts).

IssuePathItem
-------------

Path item type.

### Definition

*   `IssuePathItem` `ArrayPathItem | MapPathItem | ObjectPathItem | SetPathItem | UnknownPathItem`

LazySchema
----------

Lazy schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `LazySchema` `extends BaseSchema<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>>`
    *   `type` `'lazy'`
    *   `reference` `typeof lazy`
    *   `expects` `'unknown'`
    *   `getter` `(input: unknown) => TWrapped`

LazySchemaAsync
---------------

Lazy schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `LazySchemaAsync` `extends BaseSchemaAsync<InferInput<TWrapped>, InferOutput<TWrapped>, InferIssue<TWrapped>>`
    *   `type` `'lazy'`
    *   `reference` `typeof lazyAsync`
    *   `expects` `'unknown'`
    *   `getter` `(input: unknown) => MaybePromise<TWrapped>`

LengthAction
------------

Length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<LengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `LengthAction` `extends BaseValidation<TInput, TInput, LengthIssue<TInput, TRequirement>>`
    *   `type` `'length'`
    *   `reference` `typeof length`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

LengthInput
-----------

Length input type.

### Definition

*   `LengthInput` `string | ArrayLike<unknown>`

LengthIssue
-----------

Length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `LengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'length'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

Literal
-------

Literal type.

### Definition

*   `Literal` `bigint | boolean | number | string | symbol`

LiteralIssue
------------

Literal issue type.

### Definition

*   `LiteralIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'literal'`
    *   `expected` `string`

LooseObjectIssue
----------------

Loose object issue type.

### Definition

*   `LooseObjectIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'loose_object'`
    *   `expected` `'Object'`

LooseObjectSchema
-----------------

Loose object schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Definition

*   `LooseObjectSchema` `extends BaseSchema<InferObjectInput<TEntries> & { [key: string]: unknown }, InferObjectOutput<TEntries> & { [key: string]: unknown }, LooseObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'loose_object'`
    *   `reference` `typeof looseObject`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`

LooseObjectSchemaAsync
----------------------

Loose object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<LooseObjectIssue> | undefined`

### Definition

*   `LooseObjectSchemaAsync` `extends BaseSchemaAsync<InferObjectInput<TEntries> & { [key: string]: unknown }, InferObjectOutput<TEntries> & { [key: string]: unknown }, LooseObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'loose_object'`
    *   `reference` `typeof looseObjectAsync`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`

LooseTupleIssue
---------------

Loose tuple issue type.

### Definition

*   `LooseTupleIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'loose_tuple'`
    *   `expected` `'Array'`

LooseTupleSchema
----------------

Loose tuple schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<LooseTupleIssue> | undefined`

### Definition

*   `LooseTupleSchema` `extends BaseSchema<[...InferTupleInput<TItems>, ...unknown[]], [...InferTupleOutput<TItems>, ...unknown[]], LooseTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'loose_tuple'`
    *   `reference` `typeof looseTuple`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`

LooseTupleSchemaAsync
---------------------

Loose tuple schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<LooseTupleIssue> | undefined`

### Definition

*   `LooseTupleSchemaAsync` `extends BaseSchemaAsync<[...InferTupleInput<TItems>, ...unknown[]], [...InferTupleOutput<TItems>, ...unknown[]], LooseTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'loose_tuple'`
    *   `reference` `typeof looseTupleAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`

LiteralSchema
-------------

Literal schema type.

### Generics

*   `TLiteral` `extends Literal`
*   `TMessage` `extends ErrorMessage<LiteralIssue> | undefined`

### Definition

*   `LiteralSchema` `extends BaseSchema<TLiteral, TLiteral, LiteralIssue>`
    *   `type` `'literal'`
    *   `reference` `typeof literal`
    *   `literal` `TLiteral`
    *   `message` `TMessage`

Mac48Action
-----------

48-bit MAC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac48Issue<TInput>> | undefined`

### Definition

*   `Mac48Action` `extends BaseValidation<TInput, TInput, Mac48Issue<TInput>>`
    *   `type` `'mac48'`
    *   `reference` `typeof mac48`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

Mac48Issue
----------

48-bit MAC issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `Mac48Issue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'mac48'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

Mac64Action
-----------

64-bit MAC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<Mac64Issue<TInput>> | undefined`

### Definition

*   `Mac64Action` `extends BaseValidation<TInput, TInput, Mac64Issue<TInput>>`
    *   `type` `'mac64'`
    *   `reference` `typeof mac64`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

Mac64Issue
----------

64-bit MAC issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `Mac64Issue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'mac64'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

MacAction
---------

MAC action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<MacIssue<TInput>> | undefined`

### Definition

*   `MacAction` `extends BaseValidation<TInput, TInput, MacIssue<TInput>>`
    *   `type` `'mac'`
    *   `reference` `typeof mac`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

MacIssue
--------

MAC issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `MacIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'mac'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

MapIssue
--------

Map issue type.

### Definition

*   `MapIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'map'`
    *   `expected` `'Map'`

MapItemsAction
--------------

Map items action type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Definition

*   `MapItemsAction` `extends BaseTransformation<TInput, TOuput[], never>`
    *   `type` `'map_items'`
    *   `reference` `typeof mapItems`
    *   `operation` `(item: TInput[number], index: number, array: TInput) => TOutput`

MapPathItem
-----------

Map path item type.

### Definition

*   `MapPathItem`
    *   `type` `'map'`
    *   `origin` `'key' | 'value'`
    *   `input` `Map<unknown, unknown>`
    *   `key` `unknown`
    *   `value` `unknown`

The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.

MapSchema
---------

Map schema type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<MapIssue> | undefined`

### Definition

*   `MapSchema` `extends BaseSchema<InferMapInput<TKey, TValue>, InferMapOutput<TKey, TValue>, MapIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'map'`
    *   `reference` `typeof map`
    *   `expects` `'Map'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`

MapSchemaAsync
--------------

Map schema async type.

### Generics

*   `TKey` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<MapIssue> | undefined`

### Definition

*   `MapSchemaAsync` `extends BaseSchemaAsync<InferMapInput<TKey, TValue>, InferMapOutput<TKey, TValue>, MapIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'map'`
    *   `reference` `typeof mapAsync`
    *   `expects` `'Map'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`

MaxBytesAction
--------------

Max bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxBytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxBytesAction` `extends BaseValidation<TInput, TInput, MaxBytesIssue<TInput, TRequirement>>`
    *   `type` `'max_bytes'`
    *   `reference` `typeof maxBytes`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MaxBytesIssue
-------------

Max bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MaxBytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_bytes'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MaxGraphemesAction
------------------

Max graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxGraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxGraphemesAction` `extends BaseValidation<TInput, TInput, MaxGraphemesIssue<TInput, TRequirement>>`
    *   `type` `'max_graphemes'`
    *   `reference` `typeof maxGraphemes`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MaxGraphemesIssue
-----------------

Max graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MaxGraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_graphemes'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MaxLengthAction
---------------

Max length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxLengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxLengthAction` `extends BaseValidation<TInput, TInput, MaxLengthIssue<TInput, TRequirement>>`
    *   `type` `'max_length'`
    *   `reference` `typeof maxLength`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MaxLengthIssue
--------------

Max length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `MaxLengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_length'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MaxSizeAction
-------------

Max size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxSizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxSizeAction` `extends BaseValidation<TInput, TInput, MaxSizeIssue<TInput, TRequirement>>`
    *   `type` `'max_size'`
    *   `reference` `typeof maxSize`
    *   `expects` `` `<=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MaxSizeIssue
------------

Max size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `MaxSizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_size'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MaxValueAction
--------------

Max value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<MaxValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxValueAction` `extends BaseValidation<TInput, TInput, MaxValueIssue<TInput, TRequirement>>`
    *   `type` `'max_value'`
    *   `reference` `typeof maxValue`
    *   `expects` `` `<=${string}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MaxValueIssue
-------------

Max value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `MaxValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_value'`
    *   `expected` `` `<=${string}` ``
    *   `requirement` `TRequirement`

MaxWordsAction
--------------

Max words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MaxWordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MaxWordsAction` `extends BaseValidation<TInput, TInput, MaxWordsIssue<TInput, TRequirement>>`
    *   `type` `'max_words'`
    *   `reference` `typeof maxWords`
    *   `expects` `` `<=${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MaxWordsIssue
-------------

Max words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MaxWordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'max_words'`
    *   `expected` `` `<=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MaybePromise
------------

Maybe promise type.

### Generics

*   `TValue` `extends any`

### Definition

*   `MaybePromise` `TValue | Promise<TValue>`

MaybeReadonly
-------------

Maybe readonly type.

### Generics

*   `TValue` `extends any`

### Definition

*   `MaybeReadonly` `TValue | Readonly<TValue>`

MetadataAction
--------------

Metadata action type.

### Generics

*   `TInput` `extends any`
*   `TMetadata` `extends Record<string, unknown>`

### Definition

*   `MetadataAction` `extends BaseMetadata<TInput>`
    *   `type` `'metadata'`
    *   `reference` `typeof metadata`
    *   `metadata_` `TMetadata`

MimeTypeAction
--------------

MIME type action type.

### Generics

*   `TInput` `extends Blob`
*   `TRequirement` `extends string[]`
*   `TMessage` `extends ErrorMessage<MimeTypeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MimeTypeAction` `extends BaseValidation<TInput, TInput, MimeTypeIssue<TInput, TRequirement>>`
    *   `type` `'mime_type'`
    *   `reference` `typeof mimeType`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MimeTypeIssue
-------------

Mime type issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` ``extends `${string}/${string}`[]``

### Definition

*   `MimeTypeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'mime_type'`
    *   `expected` `string`
    *   `received` `` `"${string}"` ``
    *   `requirement` `TRequirement`

MinBytesAction
--------------

Min bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinBytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinBytesAction` `extends BaseValidation<TInput, TInput, MinBytesIssue<TInput, TRequirement>>`
    *   `type` `'min_bytes'`
    *   `reference` `typeof minBytes`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MinBytesIssue
-------------

Min bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MinBytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_bytes'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MinGraphemesAction
------------------

Min graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinGraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinGraphemesAction` `extends BaseValidation<TInput, TInput, MinGraphemesIssue<TInput, TRequirement>>`
    *   `type` `'min_graphemes'`
    *   `reference` `typeof minGraphemes`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MinGraphemesIssue
-----------------

Min graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MinGraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_graphemes'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MinLengthAction
---------------

Min length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinLengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinLengthAction` `extends BaseValidation<TInput, TInput, MinLengthIssue<TInput, TRequirement>>`
    *   `type` `'min_length'`
    *   `reference` `typeof minLength`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MinLengthIssue
--------------

Min length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `MinLengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_length'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MinSizeAction
-------------

Min size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinSizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinSizeAction` `extends BaseValidation<TInput, TInput, MinSizeIssue<TInput, TRequirement>>`
    *   `type` `'min_size'`
    *   `referece` `typeof minSize`
    *   `expects` `` `>=${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MinSizeIssue
------------

Min size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `MinSizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_size'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MinValueAction
--------------

Min value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<MinValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinValueAction` `extends BaseValidation<TInput, TInput, MinValueIssue<TInput, TRequirement>>`
    *   `type` `'min_value'`
    *   `reference` `typeof minValue`
    *   `expects` `` `>=${string}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MinValueIssue
-------------

Min value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `MinValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_value'`
    *   `expected` `` `>=${string}` ``
    *   `requirement` `TRequirement`

MinWordsAction
--------------

Min words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MinWordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MinWordsAction` `extends BaseValidation<TInput, TInput, MinWordsIssue<TInput, TRequirement>>`
    *   `type` `'min_words'`
    *   `reference` `typeof minWords`
    *   `expects` `` `>=${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MinWordsIssue
-------------

Min words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `MinWordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'min_words'`
    *   `expected` `` `>=${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

MultipleOfAction
----------------

Multiple of action type.

### Generics

*   `TInput` `extends number`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<MultipleOfIssue<TInput, TRequirement>> | undefined`

### Definition

*   `MultipleOfAction` `extends BaseValidation<TInput, TInput, MultipleOfIssue<TInput, TRequirement>>`
    *   `type` `'multiple_of'`
    *   `reference` `typeof multipleOf`
    *   `expects` `` `%${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

MultipleOfIssue
---------------

Multiple of issue type.

### Generics

*   `TInput` `extends number`
*   `TRequirement` `extends number`

### Definition

*   `MultipleOfIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'multiple_of'`
    *   `expected` `null`
    *   `received` `` `%${TRequirement}` ``
    *   `requirement` `(input: number) => boolean`

NanIssue
--------

NaN issue type.

### Definition

*   `NanIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'nan'`
    *   `expected` `'NaN'`

NanSchema
---------

NaN schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NanIssue> | undefined`

### Definition

*   `NanSchema` `extends BaseSchema<number, number, NanIssue>`
    *   `type` `'nan'`
    *   `reference` `readonly nan`
    *   `expects` `'NaN'`
    *   `message` `TMessage`

NeverIssue
----------

Never issue type.

### Definition

*   `NeverIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'never'`
    *   `expected` `'never'`

NeverSchema
-----------

Never schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NeverIssue> | undefined`

### Definition

*   `NeverSchema` `extends BaseSchema<never, never, NeverIssue>`
    *   `type` `'never'`
    *   `reference` `readonly never`
    *   `expects` `'never'`
    *   `message` `TMessage`

NonEmptyAction
--------------

Non empty action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TMessage` `extends ErrorMessage<NonEmptyIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NonEmptyAction` `extends BaseValidation<TInput, TInput, NonEmptyIssue<TInput, TRequirement>>`
    *   `type` `'non_empty'`
    *   `reference` `typeof nonEmpty`
    *   `expects` `'!0'`
    *   `message` `TMessage`

NonEmptyIssue
-------------

Non empty issue type.

### Generics

*   `TInput` `extends LengthInput`

### Definition

*   `NonEmptyIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'non_empty'`
    *   `expected` `'!0'`
    *   `received` `'0'`

NonNullable
-----------

Extracts `null` from a type.

### Generics

*   `TValue` `extends any`

### Definition

*   `NonNullable` `TValue extends null ? never : TValue`

NonNullableIssue
----------------

Non nullable issue type.

### Definition

*   `NonNullableIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'non_nullable'`
    *   `expected` `'!null'`

NonNullableSchema
-----------------

Non nullable schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullableIssue> | undefined`

### Definition

*   `NonNullableSchema` `extends BaseSchema<InferNonNullableInput<TWrapped>, InferNonNullableOutput<TWrapped>, NonNullableIssue | InferNonNullableIssue<TWrapped>>`
    *   `type` `'non_nullable'`
    *   `reference` `typeof nonNullable`
    *   `expects` `'!null'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`

NonNullableSchemaAsync
----------------------

Non nullable schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullableIssue> | undefined`

### Definition

*   `NonNullableSchemaAsync` `BaseSchema<InferNonNullableInput<TWrapped>, InferNonNullableOutput<TWrapped>, NonNullableIssue | InferNonNullishIssue<TWrapped>>`
    *   `type` `'non_nullable'`
    *   `reference` `typeof nonNullableAsync`
    *   `expects` `'!null'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`

NonNullish
----------

Extracts `null` and `undefined` from a type.

### Generics

*   `TValue` `extends any`

### Definition

*   `NonNullish` `TValue extends null | undefined ? never : TValue`

NonNullishIssue
---------------

Non nullish issue type.

### Definition

*   `NonNullishIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'non_nullish'`
    *   `expected` `'(!null & !undefined)'`

NonNullishSchema
----------------

Non nullish schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullishIssue> | undefined`

### Definition

*   `NonNullishSchema` `extends BaseSchema<InferNonNullishInput<TWrapped>, InferNonNullishOutput<TWrapped>, NonNullishIssue | InferNonNullishIssue<TWrapped>>`
    *   `type` `'non_nullish'`
    *   `reference` `typeof nonNullish`
    *   `expects` `'(!null & !undefined)'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`

NonNullishSchemaAsync
---------------------

Non nullish schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonNullishIssue> | undefined`

### Definition

*   `NonNullishSchemaAsync` `BaseSchema<InferNonNullishInput<TWrapped>, InferNonNullishOutput<TWrapped>, NonNullishIssue | InferNonNullishIssue<TWrapped>>`
    *   `type` `'non_nullish'`
    *   `reference` `typeof nonNullishAsync`
    *   `expects` `'(!null & !undefined)'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`

NonOptional
-----------

Extracts `undefined` from a type.

### Generics

*   `TValue` `extends any`

### Definition

*   `NonOptional` `TValue extends undefined ? never : TValue`

NonOptionalIssue
----------------

Non optional issue type.

### Definition

*   `NonOptionalIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'non_optional'`
    *   `expected` `'!undefined'`

NonOptionalSchema
-----------------

Non optional schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Definition

*   `NonOptionalSchema` `extends BaseSchema<InferNonOptionalInput<TWrapped>, InferNonOptionalOutput<TWrapped>, NonOptionalIssue | InferNonOptionalIssue<TWrapped>>`
    *   `type` `'non_optional'`
    *   `reference` `typeof nonOptional`
    *   `expects` `'!undefined'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`

NonOptionalSchemaAsync
----------------------

Non optional schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<NonOptionalIssue> | undefined`

### Definition

*   `NonOptionalSchemaAsync` `BaseSchema<InferNonOptionalInput<TWrapped>, InferNonOptionalOutput<TWrapped>, NonOptionalIssue | InferNonOptionalIssue<TWrapped>>`
    *   `type` `'non_optional'`
    *   `reference` `typeof nonOptionalAsync`
    *   `expects` `'!undefined'`
    *   `wrapped` `TWrapped`
    *   `message` `TMessage`

NormalizeAction
---------------

Normalize action type.

### Generics

*   `TForm` `extends NormalizeForm`

### Definition

*   `NormalizeAction` `extends BaseTransformation<string, string, never>`
    *   `type` `'normalize'`
    *   `reference` `typeof normalize`
    *   `form` `TForm`

NormalizeForm
-------------

Normalize form type.

### Definition

*   `NormalizeForm` `'NFC' | 'NFD' | 'NFKC' | 'NFKD'`

NotBytesAction
--------------

Not bytes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotBytesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotBytesAction` `extends BaseValidation<TInput, TInput, NotBytesIssue<TInput, TRequirement>>`
    *   `type` `'not_bytes'`
    *   `reference` `typeof notBytes`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

NotBytesIssue
-------------

Not bytes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `NotBytesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_bytes'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

NotGraphemesAction
------------------

Not graphemes action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotGraphemesIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotGraphemesAction` `extends BaseValidation<TInput, TInput, NotGraphemesIssue<TInput, TRequirement>>`
    *   `type` `'not_graphemes'`
    *   `reference` `typeof notGraphemes`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

NotGraphemesIssue
-----------------

Not graphemes issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `NotGraphemesIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_graphemes'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

NotLengthAction
---------------

Not length action type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotLengthIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotLengthAction` `extends BaseValidation<TInput, TInput, NotLengthIssue<TInput, TRequirement>>`
    *   `type` `'not_length'`
    *   `reference` `typeof notLength`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

NotLengthIssue
--------------

Not length issue type.

### Generics

*   `TInput` `extends LengthInput`
*   `TRequirement` `extends number`

### Definition

*   `NotLengthIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_length'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`

NotSizeAction
-------------

Not size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotSizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotSizeAction` `extends BaseValidation<TInput, TInput, NotSizeIssue<TInput, TRequirement>>`
    *   `type` `'not_size'`
    *   `reference` `typeof notSize`
    *   `expects` `` `!${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

NotSizeIssue
------------

Not size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `NotSizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_size'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`

NotValueAction
--------------

Not value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<NotValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotValueAction` `extends BaseValidation<TInput, TInput, NotValueIssue<TInput, TRequirement>>`
    *   `type` `'not_value'`
    *   `reference` `typeof notValue`
    *   `expects` `` `!${string}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

NotValueIssue
-------------

Not value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `NotValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_value'`
    *   `expected` `` `!${string}` ``
    *   `requirement` `TRequirement`

NotWordsAction
--------------

Not words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<NotWordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `NotWordsAction` `extends BaseValidation<TInput, TInput, NotWordsIssue<TInput, TRequirement>>`
    *   `type` `'not_words'`
    *   `reference` `typeof notWords`
    *   `expects` `` `!${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

NotWordsIssue
-------------

Not words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `NotWordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'not_words'`
    *   `expected` `` `!${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

NullableSchema
--------------

Nullable schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, null>`

### Definition

*   `NullableSchema` `extends BaseSchema<InferInput<TWrapped> | null, InferNullableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullable'`
    *   `reference` `typeof nullable`
    *   `expects` `` `(${TWrapped['expects']} | null)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

NullableSchemaAsync
-------------------

Nullable schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null>`

### Definition

*   `NullableSchemaAsync` `BaseSchemaAsync<InferInput<TWrapped> | null, InferNullableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullable'`
    *   `reference` `typeof nullableAsync`
    *   `expects` `` `(${TWrapped['expects']} | null)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

NullishSchema
-------------

Nullish schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, null | undefined>`

### Definition

*   `Nullish` `extends BaseSchema<InferInput<TWrapped> | null | undefined, InferNullishOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullish'`
    *   `reference` `typeof nullish`
    *   `expects` `` `(${TWrapped['expects']} | null | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

NullishSchemaAsync
------------------

Nullish schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, null | undefined>`

### Definition

*   `Nullish` `BaseSchemaAsync<InferInput<TWrapped> | null | undefined, InferNullishOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'nullish'`
    *   `reference` `typeof nullishAsync`
    *   `expects` `` `(${TWrapped['expects']} | null | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

NullIssue
---------

Null issue type.

### Definition

*   `NullIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'null'`
    *   `expected` `'null'`

NullSchema
----------

Null schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NullIssue> | undefined`

### Definition

*   `NullSchema` `extends BaseSchema<null, null, NullIssue>`
    *   `type` `'null'`
    *   `reference` `typeof null`
    *   `expects` `'null'`
    *   `message` `TMessage`

NumberIssue
-----------

Number issue type.

### Definition

*   `NumberIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'number'`
    *   `expected` `'number'`

NumberSchema
------------

Number schema type.

### Generics

*   `TMessage` `extends ErrorMessage<NumberIssue> | undefined`

### Definition

*   `NumberSchema` `extends BaseSchema<number, number, NumberIssue>`
    *   `type` `'number'`
    *   `reference` `typeof number`
    *   `expects` `'number'`
    *   `message` `TMessage`

ObjectEntries
-------------

Object entries type.

### Definition

*   `ObjectEntries` `{ [key: string]: BaseSchema<unknown, unknown, BaseIssue<unknown>> }`

ObjectEntriesAsync
------------------

Object entries async type.

### Definition

*   `ObjectEntriesAsync` `{ [key: string]: BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> }`

ObjectIssue
-----------

Object issue type.

### Definition

*   `ObjectIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'object'`
    *   `expected` `'Object'`

ObjectKeys
----------

Object keys type.

### Generics

*   `TSchema` `extends LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined> | LooseObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined> | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<ObjectEntries, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | ObjectWithRestSchemaAsync<ObjectEntriesAsync, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<ObjectEntries, ErrorMessage<StrictObjectIssue> | undefined> | StrictObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<StrictObjectIssue> | undefined>`

### Definition

*   `ObjectKeys` `MaybeReadonly<[keyof TSchema['entries'], ...(keyof TSchema['entries'])[]]>`

ObjectPathItem
--------------

Object path item type.

### Definition

*   `ObjectPathItem`
    *   `type` `'object'`
    *   `origin` `'key' | 'value'`
    *   `input` `Record<string, unknown>`
    *   `key` `string`
    *   `value` `unknown`

The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.

ObjectSchema
------------

Object schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<ObjectIssue> | undefined`

### Definition

*   `ObjectSchema` `extends BaseSchema<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, ObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object'`
    *   `reference` `typeof object`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`

ObjectSchemaAsync
-----------------

Object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<ObjectIssue> | undefined`

### Definition

*   `ObjectSchemaAsync` `extends BaseSchemaAsync<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, ObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object'`
    *   `reference` `typeof objectAsync`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`

ObjectWithRestIssue
-------------------

Object with rest issue type.

### Definition

*   `ObjectWithRestIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'object_with_rest'`
    *   `expected` `'Object'`

ObjectWithRestSchema
--------------------

Object with rest schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ObjectWithRestIssue> | undefined`

### Definition

*   `ObjectWithRestSchema` `extends BaseSchema<InferObjectInput<TEntries> & { [key: string]: InferInput<TRest> }, InferObjectOutput<TEntries> & { [key: string]: InferInput<TRest> }, ObjectWithRestIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object_with_rest'`
    *   `reference` `typeof objectWithRest`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `rest` `TRest`
    *   `message` `TMessage`

ObjectWithRestSchemaAsync
-------------------------

Object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<ObjectWithRestIssue> | undefined`

### Definition

*   `ObjectWithRestSchemaAsync` `extends BaseSchema<InferObjectInput<TEntries> & { [key: string]: InferInput<TRest> }, InferObjectOutput<TEntries> & { [key: string]: InferInput<TRest> }, ObjectWithRestIssue | InferObjectIssue<TEntries>>`
    *   `type` `'object_with_rest'`
    *   `reference` `typeof objectWithRest`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `rest` `TRest`
    *   `message` `TMessage`

OctalAction
-----------

Octal action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<OctalIssue<TInput>> | undefined`

### Definition

*   `OctalAction` `extends BaseValidation<TInput, TInput, OctalIssue<TInput>>`
    *   `type` `'octal'`
    *   `reference` `typeof octal`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

OctalIssue
----------

Octal issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `OctalIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'octal'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

OptionalSchema
--------------

Optional schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, undefined>`

### Definition

*   `OptionalSchema` `extends BaseSchema<InferInput<TWrapped> | undefined, InferOptionalOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'optional'`
    *   `reference` `typeof optional`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

OptionalSchemaAsync
-------------------

Optional schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, undefined>`

### Definition

*   `OptionalSchemaAsync` `BaseSchemaAsync<InferInput<TWrapped> | undefined, InferOptionalOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'optional'`
    *   `reference` `typeof optionalAsync`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

OutputDataset
-------------

Output dataset type.

### Generics

*   `TValue` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `OutputDataset` `SuccessDataset<TValue> | PartialDataset<TValue, TIssue> | FailureDataset<TIssue>`

Parser
------

The parser type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `Parser`
    *   `(input: unknown) => InferOutput<TSchema>`
    *   `schema` `TSchema`
    *   `config` `TConfig`

ParserAsync
-----------

The parser async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `ParserAsync`
    *   `(input: unknown) => Promise<InferOutput<TSchema>>`
    *   `schema` `TSchema`
    *   `config` `TConfig`

PartialCheckAction
------------------

Partial check action type.

### Generics

*   `TInput` `extends PartialInput`
*   `TSelection` `extends PartialInput`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Definition

*   `PartialCheckAction` `extends BaseValidation<TInput, TInput, PartialCheckIssue<TSelection>>`
    *   `type` `'partial_check'`
    *   `reference` `typeof partialCheck`
    *   `expects` `null`
    *   `requirement` `(input: TSelection) => boolean`
    *   `message` `TMessage`

PartialCheckActionAsync
-----------------------

Partial check action async type.

### Generics

*   `TInput` `extends PartialInput`
*   `TSelection` `extends PartialInput`
*   `TMessage` `extends ErrorMessage<PartialCheckIssue<TSelection>> | undefined`

### Definition

*   `PartialCheckActionAsync` `extends BaseValidationAsync<TInput, TInput, PartialCheckIssue<TSelection>>`
    *   `type` `'partial_check'`
    *   `reference` `typeof partialCheckAsync`
    *   `expects` `null`
    *   `requirement` `(input: TSelection) => MaybePromise<boolean>`
    *   `message` `TMessage`

PartialCheckIssue
-----------------

Partial check issue type.

### Generics

*   `TInput` `extends PartialInput`

### Definition

*   `PartialCheckIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'partial_check'`
    *   `expected` `null`
    *   `requirement` `(input: TInput) => MaybePromise<boolean>`

PartialDataset
--------------

Partial dataset type.

### Generics

*   `TValue` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `UntypedDataset`
    *   `typed` `true`
    *   `value` `TValue`
    *   `issues` `[TIssue, ...TIssue[]]`

PartialInput
------------

Partial input type.

### Definition

*   `PartialInput` `Record<string, unknown> | ArrayLike<unknown>`

PathKeys
--------

Extracts tuples with path keys.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/types/utils.ts).

PicklistOptions
---------------

Picklist options type.

### Definition

*   `PicklistOptions` `MaybeReadonly<(string | number | bigint)[]>`

PicklistIssue
-------------

Picklist issue type.

### Definition

*   `PicklistIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'picklist'`
    *   `expected` `string`

PicklistSchema
--------------

Picklist schema type.

### Generics

*   `TOptions` `extends PicklistOptions`
*   `TMessage` `extends ErrorMessage<PicklistIssue> | undefined`

### Definition

*   `PicklistSchema` `extends BaseSchema<TOptions[number], TOptions[number], PicklistIssue>`
    *   `type` `'picklist'`
    *   `reference` `typeof picklist`
    *   `options` `TOptions`
    *   `message` `TMessage`

PipeAction
----------

Pipe action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `PipeAction` `BaseValidation<TInput, TOutput, TIssue> | BaseTransformation<TInput, TOutput, TIssue> | BaseMetadata<TInput>`

PipeActionAsync
---------------

Pipe action async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `PipeActionAsync` `BaseValidationAsync<TInput, TOutput, TIssue> | BaseTransformationAsync<TInput, TOutput, TIssue>`

PipeItem
--------

Pipe item type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `PipeItem` `BaseSchema<TInput, TOutput, TIssue> | PipeAction<TInput, TOutput, TIssue>`

PipeItemAsync
-------------

Pipe item async type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`
*   `TIssue` `extends BaseIssue<unknown>`

### Definition

*   `PipeItemAsync` `BaseSchemaAsync<TInput, TOutput, TIssue> | PipeActionAsync<TInput, TOutput, TIssue>`

PromiseIssue
------------

Promise issue type.

### Definition

*   `PromiseIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'promise'`
    *   `expected` `'Promise'`

PromiseSchema
-------------

Promise schema type.

### Generics

*   `TMessage` `extends ErrorMessage<PromiseIssue> | undefined`

### Definition

*   `PromiseSchema` `extends BaseSchema<Promise<unknown>, Promise<unknown>, PromiseIssue>`
    *   `type` `'promise'`
    *   `reference` `typeof promise`
    *   `expects` `'Promise'`
    *   `message` `TMessage`

RawCheckAction
--------------

Raw check action type.

### Generics

*   `TInput` `extends any`

### Definition

*   `RawCheckAction` `extends BaseValidation<TInput, TInput, RawCheckIssue<TInput>>`
    *   `type` `'raw_check'`
    *   `reference` `typeof rawCheck`

RawCheckActionAsync
-------------------

Raw check action async type.

### Generics

*   `TInput` `extends any`

### Definition

*   `RawCheckActionAsync` `extends BaseValidationAsync<TInput, TInput, RawCheckIssue<TInput>>`
    *   `type` `'raw_check'`
    *   `reference` `typeof rawCheckAsync`
    *   `expects` `null`

RawCheckIssue
-------------

Raw check issue type.

### Generics

*   `TInput` `extends any`

### Definition

*   `RawCheckIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'raw_check'`

RawTransformAction
------------------

Raw transform action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Definition

*   `RawTransformAction` `extends BaseTransformation<TInput, TOutput, RawTransformIssue<TInput>>`
    *   `type` `'raw_transform'`
    *   `reference` `typeof rawTransform`

RawTransformIssue
-----------------

Raw transform issue type.

### Generics

*   `TInput` `extends any`

### Definition

*   `RawTransformIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'raw_transform'`

ReadonlyAction
--------------

Readonly action type.

### Generics

*   `TInput` `extends any`

### Definition

*   `ReadonlyAction` `extends BaseTransformation<TInput, Readonly<TInput>, never>`
    *   `type` `'readonly'`
    *   `reference` `typeof readonly`

RecordIssue
-----------

Record issue type.

### Definition

*   `RecordIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'record'`
    *   `expected` `'Object'`

RecordSchema
------------

Record schema type.

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Definition

*   `RecordSchema` `extends BaseSchema<InferRecordInput<TKey, TValue>, InferRecordOutput<TKey, TValue>, RecordIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'record'`
    *   `reference` `typeof record`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`

RecordSchemaAsync
-----------------

Record schema async type.

### Generics

*   `TKey` `extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>`
*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<RecordIssue> | undefined`

### Definition

*   `RecordSchemaAsync` `extends BaseSchemaAsync<InferRecordInput<TKey, TValue>, InferRecordOutput<TKey, TValue>, RecordIssue | InferIssue<TKey> | InferIssue<TValue>>`
    *   `type` `'record'`
    *   `reference` `typeof recordAsync`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `value` `TValue`
    *   `message` `TMessage`

ReduceItemsAction
-----------------

Reduce items action type.

### Generics

*   `TInput` `extends ArrayInput`
*   `TOutput` `extends any`

### Definition

*   `ReduceItemsAction` `extends BaseTransformation<TInput, TOuput, never>`
    *   `type` `'reduce_items'`
    *   `reference` `typeof reduceItems`
    *   `operation` `(output: TOutput, item: TInput[number], index: number, array: TInput) => TOutput`
    *   `initial` `TOutput`

RegexAction
-----------

Regex action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<RegexIssue<TInput>> | undefined`

### Definition

*   `RegexAction` `extends BaseValidation<TInput, TInput, RegexIssue<TInput>>`
    *   `type` `'regex'`
    *   `reference` `typeof regex`
    *   `expects` `string`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

RegexIssue
----------

Regex issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `RegexIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'regex'`
    *   `expected` `string`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

ReturnsAction
-------------

Returns action type.

### Generics

*   `TInput` `extends (...args: any[]) => unknown`
*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `ReturnsAction` `extends BaseTransformation<TInput, (...args: Parameters<TInput>) => InferOutput<TSchema>, never>`
    *   `type` `'returns'`
    *   `reference` `typeof returns`
    *   `schema` `TSchema`

SafeIntegerAction
-----------------

Safe integer action type.

### Generics

*   `TInput` `extends number`
*   `TMessage` `extends ErrorMessage<SafeIntegerIssue<TInput>> | undefined`

### Definition

*   `SafeIntegerAction` `extends BaseValidation<TInput, TInput, SafeIntegerIssue<TInput>>`
    *   `type` `'safe_integer'`
    *   `reference` `typeof safeInteger`
    *   `expects` `null`
    *   `requirement` `(input: number) => boolean`
    *   `message` `TMessage`

SafeIntegerIssue
----------------

Safe integer issue type.

### Generics

*   `TInput` `extends number`

### Definition

*   `SafeIntegerIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'safe_integer'`
    *   `expected` `null`
    *   `received` `` `${number}` ``
    *   `requirement` `(input: number) => boolean`

SafeParser
----------

The safe parser type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `SafeParser`
    *   `(input: unknown) => SafeParseResult<TSchema>`
    *   `schema` `TSchema`
    *   `config` `TConfig`

SafeParserAsync
---------------

The safe parser async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TConfig` `extends Config<InferIssue<TSchema>> | undefined`

### Definition

*   `SafeParserAsync`
    *   `(input: unknown) => Promise<SafeParseResult<TSchema>>`
    *   `schema` `TSchema`
    *   `config` `TConfig`

SafeParseResult
---------------

Safe parse result type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `SafeParseResult`
    *   `typed` `boolean`
    *   `success` `boolean`
    *   `output` `InferOutput<TSchema> | unknown`
    *   `issues` `[InferIssue<TSchema>, ...InferIssue<TSchema>[]] | undefined`

SchemaWithFallback
------------------

Schema with fallback type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends Fallback<TSchema>`

### Definition

*   `SchemaWithFallback` `extends TSchema`
    *   `fallback` `TFallback`

SchemaWithFallbackAsync
-----------------------

Schema with fallback async type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TFallback` `extends FallbackAsync<TSchema>`

### Definition

*   `SchemaWithFallbackAsync` `extends Omit<TSchema, 'async' | '~validate'>`
    *   `fallback` `TFallback`
    *   `async` `true`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>>`

SchemaWithoutPipe
-----------------

Schema without pipe type.

### Generics

*   `TSchema` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`

### Definition

*   `SchemaWithoutPipe` `TSchema & { pipe?: never }`

SchemaWithPartial
-----------------

Schema with partial type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/partial/partial.ts).

SchemaWithPartialAsync
----------------------

Schema with partial async type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/partial/partialAsync.ts).

SchemaWithPipe
--------------

Schema with pipe type.

### Generics

*   `TPipe` `extends [BaseSchema<unknown, unknown, BaseIssue<unknown>>, ...PipeItem<any, unknown, BaseIssue<unknown>>[]]`

### Definition

*   `SchemaWithPipe` `extends Omit<FirstTupleItem<TPipe>, '~types' | '~validate'>`
    *   `pipe` `TPipe`
    *   `~types` `{ input: InferInput<FirstTupleItem<TPipe>>, output: InferOutput<LastTupleItem<TPipe>>, issue: InferIssue<TPipe[number]> } | undefined`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>`

SchemaWithPipeAsync
-------------------

Schema with pipe async type.

### Generics

*   `TPipe` `extends [BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ...(PipeItem<any, unknown, BaseIssue<unknown>> | PipeItemAsync<any, unknown, BaseIssue<unknown>>)[]]`

### Definition

*   `SchemaWithPipeAsync` `extends Omit<FirstTupleItem<TPipe>, 'async' | '~types' | '~validate'>`
    *   `pipe` `TPipe`
    *   `async` `true`
    *   `~types` `{ input: InferInput<FirstTupleItem<TPipe>>, output: InferOutput<LastTupleItem<TPipe>>, issue: InferIssue<TPipe[number]> } | undefined`
    *   `~validate` `(dataset: UnknownDataset, config?: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>>`

SchemaWithRequired
------------------

Schema with required type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/required/required.ts).

SchemaWithRequiredAsync
-----------------------

Schema with required async type.

> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/valibot/blob/main/library/src/methods/required/requiredAsync.ts).

SetPathItem
-----------

Set path item type.

### Definition

*   `SetPathItem` `object`
    *   `type` `'set'`
    *   `origin` `'value'`
    *   `input` `Set<unknown>`
    *   `value` `unknown`

The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.

RecordIssue
-----------

Record issue type.

### Definition

*   `RecordIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'set'`
    *   `expected` `'Set'`

SetSchema
---------

Set schema type.

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `ErrorMessage<SetIssue> | undefined`

### Definition

*   `SetSchema` `extends BaseSchema<InferSetInput<TValue>, InferSetOutput<TValue>, SetIssue | InferIssue<TValue>>`
    *   `type` `'set'`
    *   `reference` `typeof set`
    *   `expects` `'Set'`
    *   `value` `TValue`
    *   `message` `TMessage`

SetSchemaAsync
--------------

Set schema async type.

### Generics

*   `TValue` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `ErrorMessage<SetIssue> | undefined`

### Definition

*   `SetSchemaAsync` `extends BaseSchemaAsync<InferSetInput<TValue>, InferSetOutput<TValue>, SetIssue | InferIssue<TValue>>`
    *   `type` `'set'`
    *   `reference` `typeof setAsync`
    *   `expects` `'Set'`
    *   `value` `TValue`
    *   `message` `TMessage`

SizeAction
----------

Size action type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<SizeIssue<TInput, TRequirement>> | undefined`

### Definition

*   `SizeAction` `extends BaseValidation<TInput, TInput, SizeIssue<TInput, TRequirement>>`
    *   `type` `'size'`
    *   `reference` `typeof size`
    *   `expects` `` `${TRequirement}` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

SizeInput
---------

Size input type.

### Definition

*   `SizeInput` `Blob | Map<unknown, unknown> | Set<unknown>`

SizeIssue
---------

Size issue type.

### Generics

*   `TInput` `extends SizeInput`
*   `TRequirement` `extends number`

### Definition

*   `SizeIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'size'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

SomeItemAction
--------------

Some action type.

### Generics

*   `TInput` `extends readonly unknown[]`
*   `TMessage` `extends ErrorMessage<SomeItemIssue<TInput>> | undefined`

### Definition

*   `SomeItemAction` `extends BaseValidation<TInput, TInput, SomeItemIssue<TInput>>`
    *   `type` `'some_item'`
    *   `reference` `typeof someItem`
    *   `expects` `null`
    *   `requirement` `(item: TInput[number], index: number, array: TInput) => boolean`
    *   `message` `TMessage`

SomeItemIssue
-------------

Some item issue type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `SomeItemIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'some_item'`
    *   `expected` `null`
    *   `requirement` `ArrayRequirement<TInput>`

SortItemsAction
---------------

Sort items action type.

### Generics

*   `TInput` `extends ArrayInput`

### Definition

*   `SortItemsAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'sort_items'`
    *   `reference` `typeof sortItems`
    *   `operation` `((itemA: TInput[number], itemB: TInput[number]) => number) | undefined`

StartsWithAction
----------------

Starts with action type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`
*   `TMessage` `extends ErrorMessage<StartsWithIssue<TInput, TRequirement>> | undefined`

### Definition

*   `StartsWithAction` `extends BaseValidation<TInput, TInput, StartsWithIssue<TInput, TRequirement>>`
    *   `type` `'starts_with'`
    *   `reference` `typeof startsWith`
    *   `expects` `` `"${TRequirement}"` ``
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

StartsWithIssue
---------------

Starts with issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends string`

### Definition

*   `StartsWithIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'starts_with'`
    *   `expected` `` `"${TRequirement}"` ``
    *   `received` `` `"${string}"` ``
    *   `requirement` `TRequirement`

StrictObjectIssue
-----------------

Strict object issue type.

### Definition

*   `StrictObjectIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'strict_object'`
    *   `expected` `'Object'`

StrictObjectSchema
------------------

Strict object schema type.

### Generics

*   `TEntries` `extends ObjectEntries`
*   `TMessage` `extends ErrorMessage<StrictObjectIssue> | undefined`

### Definition

*   `StrictObjectSchema` `extends BaseSchema<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, StrictObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'strict_object'`
    *   `reference` `typeof strictObject`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`

StrictObjectSchemaAsync
-----------------------

Strict object schema async type.

### Generics

*   `TEntries` `extends ObjectEntriesAsync`
*   `TMessage` `extends ErrorMessage<StrictObjectIssue> | undefined`

### Definition

*   `StrictObjectSchemaAsync` `extends BaseSchemaAsync<InferObjectInput<TEntries>, InferObjectOutput<TEntries>, StrictObjectIssue | InferObjectIssue<TEntries>>`
    *   `type` `'strict_object'`
    *   `reference` `typeof strictObjectAsync`
    *   `expects` `'Object'`
    *   `entries` `TEntries`
    *   `message` `TMessage`

StrictTupleIssue
----------------

Strict tuple issue type.

### Definition

*   `StrictTupleIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'strict_tuple'`
    *   `expected` `'Array'`

StrictTupleSchema
-----------------

Strict tuple schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Definition

*   `StrictTupleSchema` `extends BaseSchema<InferTupleInput<TItems>, InferTupleOutput<TItems>, StrictTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'strict_tuple'`
    *   `reference` `typeof strictTuple`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`

StrictTupleSchemaAsync
----------------------

Strict tuple schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<StrictTupleIssue> | undefined`

### Definition

*   `StrictTupleSchemaAsync` `extends BaseSchemaAsync<InferTupleInput<TItems>, InferTupleOutput<TItems>, StrictTupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'strict_tuple'`
    *   `reference` `typeof strictTupleAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`

RecordIssue
-----------

Record issue type.

### Definition

*   `RecordIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'string'`
    *   `expected` `'string'`

StringSchema
------------

String schema type.

### Generics

*   `TMessage` `extends ErrorMessage | undefined`

### Definition

*   `StringSchema` `extends BaseSchema<string, string, StringIssue>`
    *   `type` `'string'`
    *   `reference` `typeof string`
    *   `expects` `'string'`
    *   `message` `TMessage`

SuccessDataset
--------------

Success dataset type.

### Generics

*   `TValue` `extends any`

### Definition

*   `TypedDataset`
    *   `typed` `true`
    *   `value` `TValue`
    *   `issues` `undefined`

SymbolIssue
-----------

Symbol issue type.

### Definition

*   `SymbolIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'symbol'`
    *   `expected` `'symbol'`

SymbolSchema
------------

Symbol schema type.

### Generics

*   `TMessage` `extends ErrorMessage | undefined`

### Definition

*   `SymbolSchema` `extends BaseSchema<symbol, symbol, SymbolIssue>`
    *   `type` `'symbol'`
    *   `reference` `typeof symbol`
    *   `expects` `'symbol'`
    *   `message` `TMessage`

TitleAction
-----------

Title action type.

### Generics

*   `TInput` `extends any`
*   `TTitle` `extends string`

### Definition

*   `TitleAction` `extends BaseMetadata<TInput>`
    *   `type` `'title'`
    *   `reference` `typeof title`
    *   `title` `TTitle`

ToLowerCaseAction
-----------------

To lower case action type.

### Definition

*   `ToLowerCaseAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'to_lower_case'`
    *   `reference` `typeof toLowerCase`

ToMinValueAction
----------------

To min value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `ToMinValueAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'to_min_value'`
    *   `reference` `typeof toMinValue`
    *   `requirement` `TRequirement`

ToMaxValueAction
----------------

To max value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `ToMaxValueAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'to_max_value'`
    *   `reference` `typeof toMaxValue`
    *   `requirement` `TRequirement`

ToUpperCaseAction
-----------------

To upper case action type.

### Definition

*   `ToUpperCaseAction` `extends BaseTransformation<TInput, TInput, never>`
    *   `type` `'to_upper_case'`
    *   `reference` `typeof toUpperCase`

TransformAction
---------------

Transform action type.

### Generics

*   `TInput` `extends any`
*   `TOutput` `extends any`

### Definition

*   `TransformAction` `extends BaseTransformation<TInput, TOutput, never>`
    *   `type` `'transform'`
    *   `reference` `typeof transform`
    *   `operation` `(input: TInput) => TOutput`

TrimAction
----------

Trim action type.

### Definition

*   `TrimAction` `extends BaseTransformation<string, string, never>`
    *   `type` `'trim'`
    *   `reference` `typeof trim`

TrimEndAction
-------------

Trim end action type.

### Definition

*   `TrimEndAction` `extends BaseTransformation<string, string, never>`
    *   `type` `'trim_end'`
    *   `reference` `typeof trimEnd`

TrimStartAction
---------------

Trim start action type.

### Definition

*   `TrimStartAction` `extends BaseTransformation<string, string, never>`
    *   `type` `'trim_start'`
    *   `reference` `typeof trimStart`

TupleIssue
----------

Tuple issue type.

### Definition

*   `TupleIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'tuple'`
    *   `expected` `'Array'`

TupleItems
----------

Tuple items type.

### Definition

*   `TupleItems` `MaybeReadonly<BaseSchema<unknown, unknown, BaseIssue<unknown>>[]>`

TupleItemsAsync
---------------

Tuple items async type.

### Definition

*   `TupleItemsAsync` `MaybeReadonly<(BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)[]>`

TupleSchema
-----------

Tuple schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TMessage` `extends ErrorMessage<TupleIssue> | undefined`

### Definition

*   `TupleSchema` `extends BaseSchema<InferTupleInput<TItems>, InferTupleOutput<TItems>, TupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'tuple'`
    *   `reference` `typeof tuple`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`

TupleSchemaAsync
----------------

Tuple schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TMessage` `extends ErrorMessage<TupleIssue> | undefined`

### Definition

*   `TupleSchemaAsync` `extends BaseSchemaAsync<InferTupleInput<TItems>, InferTupleOutput<TItems>, TupleIssue | InferTupleIssue<TItems>>`
    *   `type` `'tuple'`
    *   `reference` `typeof tupleAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `message` `TMessage`

TupleWithRestIssue
------------------

Tuple with rest issue type.

### Definition

*   `TupleWithRestIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'tuple_with_rest'`
    *   `expected` `'Array'`

TupleWithRestSchema
-------------------

Tuple with rest schema type.

### Generics

*   `TItems` `extends TupleItems`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Definition

*   `TupleWithRestSchema` `extends BaseSchema<[...InferTupleInput<TItems>, ...InferInput<TRest>[]], [...InferTupleOutput<TItems>, ...InferOutput<TRest>[]], TupleWithRestIssue | InferTupleIssue<TItems> | InferIssue<TRest>>`
    *   `type` `'tuple_with_rest'`
    *   `reference` `typeof tupleWithRest`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `rest` `TRest`
    *   `message` `TMessage`

TupleWithRestSchemaAsync
------------------------

Tuple with rest schema async type.

### Generics

*   `TItems` `extends TupleItemsAsync`
*   `TRest` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TMessage` `extends ErrorMessage<TupleWithRestIssue> | undefined`

### Definition

*   `TupleWithRestSchemaAsync` `extends BaseSchemaAsync<[...InferTupleInput<TItems>, ...InferInput<TRest>[]], [...InferTupleOutput<TItems>, ...InferOutput<TRest>[]], TupleWithRestIssue | InferTupleIssue<TItems> | InferIssue<TRest>>`
    *   `type` `'tuple_with_rest'`
    *   `reference` `typeof tupleWithRestAsync`
    *   `expects` `'Array'`
    *   `items` `TItems`
    *   `rest` `TRest`
    *   `message` `TMessage`

UlidAction
----------

ULID action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UlidIssue<TInput>> | undefined`

### Definition

*   `UlidAction` `extends BaseValidation<TInput, TInput, UlidIssue<TInput>>`
    *   `type` `'ulid'`
    *   `reference` `typeof ulid`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

UlidIssue
---------

ULID issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `UlidIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'ulid'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

UndefinedableSchema
-------------------

Undefinedable schema type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends Default<TWrapped, undefined>`

### Definition

*   `UndefinedableSchema` `extends BaseSchema<InferInput<TWrapped> | undefined, InferUndefinedableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'undefinedable'`
    *   `reference` `typeof undefinedable`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

UndefinedableSchemaAsync
------------------------

Undefinedable schema async type.

### Generics

*   `TWrapped` `extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>`
*   `TDefault` `extends DefaultAsync<TWrapped, undefined>`

### Definition

*   `UndefinedableSchemaAsync` `BaseSchemaAsync<InferInput<TWrapped> | undefined, InferUndefinedableOutput<TWrapped, TDefault>, InferIssue<TWrapped>>`
    *   `type` `'undefinedable'`
    *   `reference` `typeof undefinedableAsync`
    *   `expects` `` `(${TWrapped['expects']} | undefined)` ``
    *   `wrapped` `TWrapped`
    *   `default` `TDefault`

UndefinedIssue
--------------

Undefined issue type.

### Definition

*   `UndefinedIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'undefined'`
    *   `expected` `'undefined'`

UndefinedSchema
---------------

Undefined schema type.

### Generics

*   `TMessage` `extends ErrorMessage<UndefinedIssue> | undefined`

### Definition

*   `UndefinedSchema` `extends BaseSchema<undefined, undefined, UndefinedIssue>`
    *   `type` `'undefined'`
    *   `reference` `typeof undefined`
    *   `expects` `'undefined'`
    *   `message` `TMessage`

UnionOptions
------------

Union options type.

### Definition

*   `UnionOptions` `MaybeReadonly<BaseSchema<unknown, unknown, BaseIssue<unknown>>[]>`

UnionOptionsAsync
-----------------

Union options async type.

### Definition

*   `UnionOptionsAsync` `MaybeReadonly<(BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>)[]>`

UnionIssue
----------

Union issue type.

### Generics

*   `TSubIssue` `extends BaseIssue<unknown>`

### Definition

*   `UnionIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'union'`
    *   `expected` `string`
    *   `issues` `[TSubIssue, ...TSubIssue[]]`

UnionSchema
-----------

Union schema type.

### Generics

*   `TOptions` `extends UnionOptions`
*   `TMessage` `extends ErrorMessage<UnionIssue<InferIssue[number]>> | undefined`

### Definition

*   `UnionSchema` `extends BaseSchema<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, UnionIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>>`
    *   `type` `'union'`
    *   `reference` `typeof union`
    *   `options` `TOptions`
    *   `message` `TMessage`

UnionSchemaAsync
----------------

Union schema async type.

### Generics

*   `TOptions` `extends UnionOptionsAsync`
*   `TMessage` `extends ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>> | undefined`

### Definition

*   `UnionSchemaAsync` `BaseSchemaAsync<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, UnionIssue<InferIssue<TOptions[number]>> | InferIssue<TOptions[number]>>`
    *   `type` `'union'`
    *   `reference` `typeof unionAsync`
    *   `options` `TOptions`
    *   `message` `TMessage`

UnknownPathItem
---------------

Unknown path item type.

### Definition

*   `UnknownPathItem`
    *   `type` `'unknown'`
    *   `origin` `'key' | 'value'`
    *   `input` `unknown`
    *   `key` `unknown`
    *   `value` `unknown`

The `input` of a path item may differ from the `input` of its issue. This is because path items are subsequently added by parent schemas and are related to their input. Transformations of child schemas are not taken into account.

UnknownSchema
-------------

Unknown schema type.

### Definition

*   `UnknownSchema` `extends BaseSchema<unknown, unknown, never>`
    *   `type` `'unknown'`
    *   `reference` `typeof unknown`
    *   `expects` `'unknown'`

UrlAction
---------

URL action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UrlIssue<TInput>> | undefined`

### Definition

*   `UrlAction` `extends BaseValidation<TInput, TInput, UrlIssue<TInput>>`
    *   `type` `'url'`
    *   `reference` `typeof url`
    *   `expects` `null`
    *   `requirement` `(input: string) => boolean`
    *   `message` `TMessage`

UrlIssue
--------

URL issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `UrlIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'url'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `(input: string) => boolean`

UuidAction
----------

UUID action type.

### Generics

*   `TInput` `extends string`
*   `TMessage` `extends ErrorMessage<UuidIssue<TInput>> | undefined`

### Definition

*   `UuidAction` `extends BaseValidation<TInput, TInput, UuidIssue<TInput>>`
    *   `type` `'uuid'`
    *   `reference` `typeof uuid`
    *   `expects` `null`
    *   `requirement` `RegExp`
    *   `message` `TMessage`

UuidIssue
---------

UUID issue type.

### Generics

*   `TInput` `extends string`

### Definition

*   `UuidIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'uuid'`
    *   `expected` `null`
    *   `received` `` `"${string}"` ``
    *   `requirement` `RegExp`

ValueAction
-----------

Value action type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`
*   `TMessage` `extends ErrorMessage<ValueIssue<TInput, TRequirement>> | undefined`

### Definition

*   `ValueAction` `extends BaseValidation<TInput, TInput, ValueIssue<TInput, TRequirement>>`
    *   `type` `'value'`
    *   `reference` `typeof value`
    *   `expects` `string`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

ValueInput
----------

Value input type.

### Definition

*   `ValueInput` `string | number | bigint | boolean | Date`

ValueIssue
----------

Value issue type.

### Generics

*   `TInput` `extends ValueInput`
*   `TRequirement` `extends TInput`

### Definition

*   `ValueIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'value'`
    *   `expected` `string`
    *   `requirement` `TRequirement`

VariantOptions
--------------

Variant options type.

### Generics

*   `TKey` `extends string`

### Definition

*   `VariantOptions` `MaybeReadonly<VariantOption<TKey>[]>`

VariantOptionsAsync
-------------------

Variant options async type.

### Generics

*   `TKey` `extends string`

### Definition

*   `VariantOptionsAsync` `MaybeReadonly<VariantOption<TKey>[] | VariantOptionAsync<TKey>[]>`

VariantSchema
-------------

Variant schema type.

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptions<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Definition

*   `VariantSchema` `extends BaseSchema<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, VariantIssue | InferVariantIssue<TOptions[number]>>`
    *   `type` `'variant'`
    *   `reference` `typeof variant`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `options` `TOptions`
    *   `message` `TMessage`

VariantSchemaAsync
------------------

Variant schema async type.

### Generics

*   `TKey` `extends string`
*   `TOptions` `extends VariantOptionsAsync<TKey>`
*   `TMessage` `extends ErrorMessage<VariantIssue> | undefined`

### Definition

*   `VariantSchemaAsync` `extends BaseSchemaAsync<InferInput<TOptions[number]>, InferOutput<TOptions[number]>, VariantIssue | InferVariantIssue<TOptions>>`
    *   `type` `'variant'`
    *   `reference` `typeof variantAsync`
    *   `expects` `'Object'`
    *   `key` `TKey`
    *   `options` `TOptions`
    *   `message` `TMessage`

VoidIssue
---------

Void issue type.

### Definition

*   `VoidIssue` `extends BaseIssue<unknown>`
    *   `kind` `'schema'`
    *   `type` `'void'`
    *   `expected` `'void'`

VoidSchema
----------

Void schema type.

### Generics

*   `TMessage` `extends ErrorMessage<VoidIssue> | undefined`

### Definition

*   `VoidSchema` `extends BaseSchema<void, void, VoidIssue>`
    *   `type` `'void'`
    *   `reference` `typeof void`
    *   `expects` `'void'`
    *   `message` `TMessage`

WordsAction
-----------

Words action type.

### Generics

*   `TInput` `extends string`
*   `TLocales` `extends Intl.LocalesArgument`
*   `TRequirement` `extends number`
*   `TMessage` `extends ErrorMessage<WordsIssue<TInput, TRequirement>> | undefined`

### Definition

*   `WordsAction` `extends BaseValidation<TInput, TInput, WordsIssue<TInput, TRequirement>>`
    *   `type` `'words'`
    *   `reference` `typeof words`
    *   `expects` `` `${TRequirement}` ``
    *   `locales` `TLocales`
    *   `requirement` `TRequirement`
    *   `message` `TMessage`

WordsIssue
----------

Words issue type.

### Generics

*   `TInput` `extends string`
*   `TRequirement` `extends number`

### Definition

*   `WordsIssue` `extends BaseIssue<TInput>`
    *   `kind` `'validation'`
    *   `type` `'words'`
    *   `expected` `` `${TRequirement}` ``
    *   `received` `` `${number}` ``
    *   `requirement` `TRequirement`

