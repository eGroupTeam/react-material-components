A wrapper to position the loader component.

Loader will make body and html tag with 100% height when it be rendered.
Therefore you can stretch container with `height:100%` and `align="center"` to vertical center loader.
One more things to do is make your root height inherit height from body.

e.g.,

```html
  <div id="root" style="height: inherit;"></div>
```