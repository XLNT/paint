import makeBasicElement from '../util/makeBasicElement';
import { cn } from '../../utils/cn';

import styles from './Skeleton.module.css';

export default makeBasicElement('div', cn('block rounded', styles.skeleton));
