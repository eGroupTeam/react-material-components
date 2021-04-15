import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Typography, { TypographyProps } from '@e-group/material/Typography';
import { Grid } from '@material-ui/core';

export default {
  title: 'Components/Typography',
  component: Typography,
} as Meta;

export const FontWeight: Story<TypographyProps> = ({ variant, ...args }) => (
  <Grid container spacing={5}>
    <Grid item xs={3} style={{ textAlign: 'center' }}>
      <Typography variant="h1" fontWeight={100} color="textSecondary" {...args}>
        Aa
      </Typography>
      <p>Poppins Light</p>
    </Grid>
    <Grid item xs={3} style={{ textAlign: 'center' }}>
      <Typography variant="h1" fontWeight={400} color="textSecondary" {...args}>
        Aa
      </Typography>
      <p>Poppins Regular</p>
    </Grid>
    <Grid item xs={3} style={{ textAlign: 'center' }}>
      <Typography variant="h1" fontWeight={500} color="textSecondary" {...args}>
        Aa
      </Typography>
      <p>Poppins SemiBold</p>
    </Grid>
    <Grid item xs={3} />
    <Grid item xs={3} style={{ textAlign: 'center' }}>
      <Typography variant="h1" fontWeight={700} color="textSecondary" {...args}>
        Aa
      </Typography>
      <p>Poppins Bold</p>
    </Grid>
    <Grid item xs={3} style={{ textAlign: 'center' }}>
      <Typography variant="h1" fontWeight={900} color="textSecondary" {...args}>
        Aa
      </Typography>
      <p>Poppins ExtraBold</p>
    </Grid>
  </Grid>
);

export const Headings: Story<TypographyProps> = (args) => (
  <Grid container justify="center" spacing={2}>
    <Grid item xs={3}>
      <Typography variant="h1" color="textSecondary" {...args}>
        H1-60px
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Font Weight- Bold</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Line Spacing- 72px</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Character Spacing- Bold</p>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h2" color="textSecondary" {...args}>
        H2-48px
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Font Weight- Bold</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Line Spacing- 61px</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Character Spacing- Bold</p>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h3" color="textSecondary" {...args}>
        H3-40px
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Font Weight- Bold</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Line Spacing- 58px</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Character Spacing- Bold</p>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h4" color="textSecondary" {...args}>
        H4-30px
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Font Weight- Bold</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Line Spacing- 44px</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Character Spacing- Bold</p>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h5" color="textSecondary" {...args}>
        H5-24px
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Font Weight- Bold</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Line Spacing- 38px</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Character Spacing- Bold</p>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h6" color="textSecondary" {...args}>
        H6-18px
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Font Weight- Bold</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Line Spacing- 29px</p>
        </Grid>
        <Grid item xs={3}>
          <p style={{ marginBottom: '5px' }}>Character Spacing- Bold</p>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export const Paragraph: Story<TypographyProps> = (args) => (
  <Grid container justify="center" spacing={2}>
    <Grid item xs={8}>
      <Typography variant="body1" paragraph {...args}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur
      </Typography>
    </Grid>
  </Grid>
);

export const Pointers: Story<TypographyProps> = (args) => (
  <Grid container justify="center">
    <Grid item xs={8}>
      <Typography variant="body1" paragraph color="textSecondary" {...args}>
        <ul>
          <li>
            Account verification. We use cookies to verify whether your login
            status is valid, so that you can save yourself the trouble of
            re-login every time.
          </li>
          <li>
            For service-related functions, we use cookies to enable us to
            provide service-related functions when you log in. For example, the
            cookie will record your relevant information so that MICEPass can
            recognize your identity to facilitate the provision of services.
          </li>
        </ul>
      </Typography>
    </Grid>
  </Grid>
);
