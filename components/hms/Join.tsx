import React from 'react';
import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from '../conf-entry.module.css';
import { PreviewScreen } from './preview';

interface Props {
  token: string;
}

const Join: React.FC<Props> = ({ token }) => {
  return (
    <div className={cn(styles.container, styleUtils.appear, styleUtils['appear-first'])}>
      {token ? <PreviewScreen token={token} /> : null}
    </div>
  );
};

export default Join;
