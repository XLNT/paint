import React from 'react'
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Layout from './Layout';

addDecorator(story => <Layout>{story()}</Layout>)
addDecorator(withKnobs);
