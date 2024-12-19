Valibot v0.31.0 is finally available
------------------------------------

![GitHub profile picture of fabian-hiller](https://github.com/fabian-hiller.png?size=64)

June 6, 2024

v0.31.0

After 3 months of hard work I am happy to announce that Valibot v0.31.0 is finally available. This is not a regular release as we have rewritten the whole library from scratch.

Based on your feedback and all the lessons learned from the past, we were able to drastically improve the mental model, bundle size, flexibility, type safety and stability of the library. I would like to highlight some of the major improvements and changes in this post.

> Because this release introduces some breaking changes, we put a lot of effort into making the migration experience as smooth as possible. I worked closely with the open source community to create a detailed [migration guide](../guides/migrate-to-v0.31.0.md) and two codemods to automatically update your schemas.

### Mental model

We believe that Valibot will be easier to use because we have drastically improved the mental model. For a modular library like Valibot, this is crucial, as each functionality is imported as its own function.

The mental model is now reduced to **schemas**, **methods** and **actions**. Schemas are used to validate a specific data type like a string, object or date. They are the starting point for using Valibot.

Methods help you either modify or use a schema. For example, the new [`pipe`](../api/pipe.md) method extends the functionality of a schema by adding additional validation and transformation rules. When using a method, you always pass a schema as the first argument.

Finally, there are actions. Actions are used exclusively in the pipeline of a schema. They can be used to further validate or transform a particular data type. For example, the following schema can be used to trim a string and check if it is a valid email address.

 

> We recommend using Valibot with a wildcard import as this improves the developer experience. Tree shaking still works when using `v.`. We tested it with various build-systems.

You can find a list of all schemas, methods and actions in our [API reference](../api.md).

### Bundle Size

After increasing the initial bundle size by introducing new features to the core of Valibot in the past, I am pleased to announce that this release reduces the individual bundle size of your schemas by approximately 15 to 30% without losing any functionality. This has been achieved by simplifying and unifying the internal structure and implementation.

For example, the [`string`](../api/string.md) schema required 800 bytes in the previous version, while the same schema now requires only 560 bytes. This is a reduction of 30%. As the library is optimized for compression, and most of these bytes are shared across all schemas and actions, the bundle size increases only slightly when adding more schemas or actions.

 

For example, adding the [`number`](../api/number.md) schema increases the bundle size by only 40 bytes, resulting in a total bundle size of 600 bytes. This is a huge improvement and makes Valibot even more attractive when using schemas to validate unknown data in the browser, on the edge, or in serverless environments. A smaller bundle size can greatly improve the startup performance of your application by reducing the time it takes to download and parse the JavaScript code.

> I am planning an experimental library with the same external API but slightly less functionality. If it works out, it could become a drop-in replacement if you do not need the full functionality of Valibot. I expect the initial bundle size of this library to start around 200 bytes. Stay tuned!

### Flexibility

Another huge improvement is the flexibility gained by our new [`pipe`](../api/pipe.md) method. Compared to the previous versions, we removed many limitation. For example, it is now possible to transform the data type inside of pipelines. This simplifies the usage and readability as it reduces function nesting.

    // With the previous API
    const BirthdaySchema = v.brand(
      v.transform(v.string([v.isoDate()]), (input) => new Date(input)),
      'birthday'
    );
    
    // With the brand new API
    const BirthdaySchema = v.pipe(
      v.string(),
      v.isoDate(),
      v.transform((input) => new Date(input)),
      v.brand('birthday')
    );
    

Furthermore, it is now possible to extend the pipeline of an existing schema by adding additional validation and transformation rules. This makes it possible to reuse already created schemas to construct more specific ones. Similar to how you extend a class in object-oriented programming to make it more specialized.

    const EmailSchema = v.pipe(v.string(), v.email());
    const GmailSchema = v.pipe(EmailSchema, v.endsWith('@gmail.com'));
    

### Type safety

After I started working on a first draft in early March, I spent at least two weeks thinking about the structure and interplay of everything. I also thought a lot about the type safety of the library.

Previously, many parts were only typed generically. An example is the issues that a schema returns when parsing invalid data. Even though each issue contains very specific data depending on the schema or action, they were all previously typed as a generic `SchemaIssue`.

This changes with this release. Wherever possible, we have tried to achieve 100% type safety. You can even infer the issue type of any schema or action used. We expect this improvement to result in a better developer experience and fewer bugs.

 

### Stability

Once most of the decisions were made, we spent a lot of time writing unit and type tests. This explains why it took us two and a half months to release the first release candidate. The tests have allowed us to fix some previously undetected bugs and enhance the stability of the library in the long run.

Before v1, I would like to further improve the test coverage to be able to fully guarantee the functionality of each function. This is an ambitious goal, but I am confident that we will reach it soon.

### Thank you!

This release was a team effort! Because so many of you contributed to this release in so many different ways, I am not able to mention everyone. However, I have tried to link all of your GitHub profiles and highlight some very important contributions. Please ping me if your avatar is missing.

*   [![GitHub profile picture of Afsoon](https://github.com/Afsoon.png?size=88)](https://github.com/Afsoon)
*   [![GitHub profile picture of AlexXanderGrib](https://github.com/AlexXanderGrib.png?size=88)](https://github.com/AlexXanderGrib)
*   [![GitHub profile picture of Andarist](https://github.com/Andarist.png?size=88)](https://github.com/Andarist)
*   [![GitHub profile picture of AndreyYolkin](https://github.com/AndreyYolkin.png?size=88)](https://github.com/AndreyYolkin)
*   [![GitHub profile picture of ariskemper](https://github.com/ariskemper.png?size=88)](https://github.com/ariskemper)
*   [![GitHub profile picture of colinhacks](https://github.com/colinhacks.png?size=88)](https://github.com/colinhacks)
*   [![GitHub profile picture of Demivan](https://github.com/Demivan.png?size=88)](https://github.com/Demivan)
*   [![GitHub profile picture of DylanThomasFr](https://github.com/DylanThomasFr.png?size=88)](https://github.com/DylanThomasFr)
*   [![GitHub profile picture of EltonLobo07](https://github.com/EltonLobo07.png?size=88)](https://github.com/EltonLobo07)
*   [![GitHub profile picture of GabrielHangor](https://github.com/GabrielHangor.png?size=88)](https://github.com/GabrielHangor)
*   [![GitHub profile picture of Hugos68](https://github.com/Hugos68.png?size=88)](https://github.com/Hugos68)
*   [![GitHub profile picture of IlyaSemenov](https://github.com/IlyaSemenov.png?size=88)](https://github.com/IlyaSemenov)
*   [![GitHub profile picture of MohammedEsafi](https://github.com/MohammedEsafi.png?size=88)](https://github.com/MohammedEsafi)
*   [![GitHub profile picture of MrGeniusProgrammer](https://github.com/MrGeniusProgrammer.png?size=88)](https://github.com/MrGeniusProgrammer)
*   [![GitHub profile picture of Saeris](https://github.com/Saeris.png?size=88)](https://github.com/Saeris)
*   [![GitHub profile picture of Sandros94](https://github.com/Sandros94.png?size=88)](https://github.com/Sandros94)
*   [![GitHub profile picture of Sec-ant](https://github.com/Sec-ant.png?size=88)](https://github.com/Sec-ant)
*   [![GitHub profile picture of alexbit-codemod](https://github.com/alexbit-codemod.png?size=88)](https://github.com/alexbit-codemod)
*   [![GitHub profile picture of ammarriq](https://github.com/ammarriq.png?size=88)](https://github.com/ammarriq)
*   [![GitHub profile picture of anuraghazra](https://github.com/anuraghazra.png?size=88)](https://github.com/anuraghazra)
*   [![GitHub profile picture of arybitskiy](https://github.com/arybitskiy.png?size=88)](https://github.com/arybitskiy)
*   [![GitHub profile picture of bingtsingw](https://github.com/bingtsingw.png?size=88)](https://github.com/bingtsingw)
*   [![GitHub profile picture of brandonpittman](https://github.com/brandonpittman.png?size=88)](https://github.com/brandonpittman)
*   [![GitHub profile picture of brenelz](https://github.com/brenelz.png?size=88)](https://github.com/brenelz)
*   [![GitHub profile picture of chertik77](https://github.com/chertik77.png?size=88)](https://github.com/chertik77)
*   [![GitHub profile picture of chimame](https://github.com/chimame.png?size=88)](https://github.com/chimame)
*   [![GitHub profile picture of christophsturm](https://github.com/christophsturm.png?size=88)](https://github.com/christophsturm)
*   [![GitHub profile picture of dboune](https://github.com/dboune.png?size=88)](https://github.com/dboune)
*   [![GitHub profile picture of devcaeg](https://github.com/devcaeg.png?size=88)](https://github.com/devcaeg)
*   [![GitHub profile picture of dusty](https://github.com/dusty.png?size=88)](https://github.com/dusty)
*   [![GitHub profile picture of fredericoo](https://github.com/fredericoo.png?size=88)](https://github.com/fredericoo)
*   [![GitHub profile picture of gmaxlev](https://github.com/gmaxlev.png?size=88)](https://github.com/gmaxlev)
*   [![GitHub profile picture of homersimpsons](https://github.com/homersimpsons.png?size=88)](https://github.com/homersimpsons)
*   [![GitHub profile picture of jansedlon](https://github.com/jansedlon.png?size=88)](https://github.com/jansedlon)
*   [![GitHub profile picture of jchatard](https://github.com/jchatard.png?size=88)](https://github.com/jchatard)
*   [![GitHub profile picture of joshwashywash](https://github.com/joshwashywash.png?size=88)](https://github.com/joshwashywash)
*   [![GitHub profile picture of jsudelko](https://github.com/jsudelko.png?size=88)](https://github.com/jsudelko)
*   [![GitHub profile picture of juliusmarminge](https://github.com/juliusmarminge.png?size=88)](https://github.com/juliusmarminge)
*   [![GitHub profile picture of kovalchukq](https://github.com/kovalchukq.png?size=88)](https://github.com/kovalchukq)
*   [![GitHub profile picture of linkb15](https://github.com/linkb15.png?size=88)](https://github.com/linkb15)
*   [![GitHub profile picture of lukemorton](https://github.com/lukemorton.png?size=88)](https://github.com/lukemorton)
*   [![GitHub profile picture of macarie](https://github.com/macarie.png?size=88)](https://github.com/macarie)
*   [![GitHub profile picture of morgante](https://github.com/morgante.png?size=88)](https://github.com/morgante)
*   [![GitHub profile picture of mtt-artis](https://github.com/mtt-artis.png?size=88)](https://github.com/mtt-artis)
*   [![GitHub profile picture of mutewinter](https://github.com/mutewinter.png?size=88)](https://github.com/mutewinter)
*   [![GitHub profile picture of mxdvl](https://github.com/mxdvl.png?size=88)](https://github.com/mxdvl)
*   [![GitHub profile picture of nakanoasaservice](https://github.com/nakanoasaservice.png?size=88)](https://github.com/nakanoasaservice)
*   [![GitHub profile picture of naveen-bharathi](https://github.com/naveen-bharathi.png?size=88)](https://github.com/naveen-bharathi)
*   [![GitHub profile picture of sacrosanctic](https://github.com/sacrosanctic.png?size=88)](https://github.com/sacrosanctic)
*   [![GitHub profile picture of samualtnorman](https://github.com/samualtnorman.png?size=88)](https://github.com/samualtnorman)
*   [![GitHub profile picture of saturnonearth](https://github.com/saturnonearth.png?size=88)](https://github.com/saturnonearth)
*   [![GitHub profile picture of seren5240](https://github.com/seren5240.png?size=88)](https://github.com/seren5240)
*   [![GitHub profile picture of sillvva](https://github.com/sillvva.png?size=88)](https://github.com/sillvva)
*   [![GitHub profile picture of ssalbdivad](https://github.com/ssalbdivad.png?size=88)](https://github.com/ssalbdivad)
*   [![GitHub profile picture of vladshcherbin](https://github.com/vladshcherbin.png?size=88)](https://github.com/vladshcherbin)
*   [![GitHub profile picture of xcfox](https://github.com/xcfox.png?size=88)](https://github.com/xcfox)
*   [![GitHub profile picture of yudinmaxim](https://github.com/yudinmaxim.png?size=88)](https://github.com/yudinmaxim)
*   [![GitHub profile picture of znycheporuk](https://github.com/znycheporuk.png?size=88)](https://github.com/znycheporuk)

Thanks to [@Demivan](https://github.com/Demivan) and [@xcfox](https://github.com/xcfox) for their contributions to the new API design. [@Demivan](https://github.com/Demivan) had the initial idea for the [`pipe`](../api/pipe.md) method and helped me with many decisions along the way. Thanks to [@ariskemper](https://github.com/ariskemper) for influencing the new structure of our unit tests, thanks to [@EltonLobo07](https://github.com/EltonLobo07) for porting over 25 actions to the new implementation and thanks to [@anuraghazra](https://github.com/anuraghazra) for finding a TypeScript workaround that made the new [`pipe`](../api/pipe.md) method possible in this way.

I would also like to thank our partners and sponsors who provide intellectual and financial support to the project. In particular, I would like to thank the [Seidenberg School of Computer Science and Information Systems](https://www.pace.edu/seidenberg) at Pace University. Without their support over the past few months, this release would not have been possible.

> Please [contact us](mailto:info@sifa-digital.de) if your organization is interested in becoming a partner of Valibot to help us ensure the long-term development and maintenance of the project.

[

Edit page

](https://github.com/fabian-hiller/valibot/blob/main/website/src/routes/blog/\$0posts\$0/valibot-v0.31.0-is-finally-available/index.mdx)