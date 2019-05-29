A component to position children. It's implement by css flexbox you can see detail below.

`Position` will make body and html tag with 100% height when it be rendered.
Therefore you can stretch container with `height:100%`, `align="center"` and `justifyContent="center"` to center elements.
One more things to do is make sure your root height is inherit from body.

e.g.,

```html
  <div id="root" style="height: inherit;"></div>
```