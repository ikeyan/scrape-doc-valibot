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