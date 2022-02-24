import cn from 'classnames';
import styles from './index.module.css';

export default function Select({ className, ...props }: JSX.IntrinsicElements['select']) {
  return (
    <div className={styles.container}>
      <select className={cn(styles.select, className)} {...props} />
      <div className={styles.arrow}>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
