A container component to limit max-width when screen width larger than 960px

# CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:

```javascript
  {
    root: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        maxWidth: '960px'
      },
      margin: 'auto'
    }
  }
```