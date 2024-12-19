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