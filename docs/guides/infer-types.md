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