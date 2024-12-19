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