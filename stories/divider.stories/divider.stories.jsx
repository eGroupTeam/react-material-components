/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Divider from '@e-group/material-lab/Divider';

storiesOf('Divider', module)
  .add(
    'default',
    () => (
      <>
       <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider dashed />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
      </>
    ),
    {
      info: {
        propTables: [Divider]
      }
    }
  )
  .add(
    'with text heading style',
    () => (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider plain={false}>Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider orientation="left"  plain={false}>Left Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider orientation="right"  plain={false}>Right Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
      </>
    ),
    {
      info: {
        propTables: [Divider]
      }
    }
  )
  .add(
    'with text',
    () => (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider plain>Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider orientation="left" plain>
          Left Text
        </Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider orientation="right" plain>
          Right Text
        </Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
          probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
      </>
    ),
    {
      info: {
        propTables: [Divider]
      }
    }
  )
  .add(
    'with vertical',
    () => (
      <>
       Text
        <Divider type="vertical" />
        <a href="#">Link</a>
        <Divider type="vertical" />
        <a href="#">Link</a>
      </>
    ),
    {
      info: {
        propTables: [Divider]
      }
    }
  )
