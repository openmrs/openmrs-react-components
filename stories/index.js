import React from 'react';
import { storiesOf } from '@storybook/react';
import List from "../src/components/list/List";

storiesOf('List', module)
  .add('basic', () => (
    <List/>
  ));
