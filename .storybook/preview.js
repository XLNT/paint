import React from 'react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';

import Layout from './Layout';

addDecorator((story) => <Layout>{story()}</Layout>);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withInfo);
