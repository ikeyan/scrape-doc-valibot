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