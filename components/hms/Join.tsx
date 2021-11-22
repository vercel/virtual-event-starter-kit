import React from 'react';
import cn from 'classnames';
import styleUtils from '../utils.module.css';
import styles from '../conf-entry.module.css';

interface Props {
  joinRoom: (name: string) => void;
}

const Join: React.FC<Props> = ({ joinRoom }) => {
  const [username, setUsername] = React.useState('');
  return (
    <div className={cn(styles.container, styleUtils.appear, styleUtils['appear-first'])}>
      <h1 className={cn(styles.hero)}>
        Join the Talk by <br /> Lee Robinson live.
      </h1>
      <h2 className={cn(styles.description)}>
        An live interactive online experience by the community, free for everyone.
      </h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          joinRoom(username);
        }}
        className={styles.form}
      >
        <div className={styles['form-row']}>
          <label htmlFor="email-input-field" className={cn(styles['input-label'])}>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={styles.input}
              autoComplete="off"
              type="text"
              placeholder="Enter name to attend the talk"
              aria-label="Your name"
              required
            />
            )
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register)}
            disabled={false}
            onClick={() => {}}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
