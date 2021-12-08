import styles from './schedule-table.module.css';
import { Step } from '@lib/types';
import DiscordButton from './discord-button'

type Props = {
  allSteps: Step[];
};

export default function ScheduleTable({ allSteps }: Props) {
  const headers = ['', 'Steps involved', 'Important Dates', 'Description']
  const steps = allSteps

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            {headers.map((header, i) => (
              <th
                key={`${header}${i}`}
                style={{
                  padding: '0.2rem 0rem',
                  lineHeight: '1.5rem',
                  borderBottom: '2px solid lightgrey',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {steps.map((step, i) => {
            return (
              <tr key={`${step.name}${i}`}>
                {Object.keys(step).map((key: string, i) => <td key={`${key}${i}`}>{step[key]}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={styles.discord}>
        <DiscordButton/>
      </div>
    </div>
  )
}
