import styles from './schedule-table.module.css';
import { Step } from '@lib/types';
import DiscordButton from './discord-button';

type Props = {
  allSteps: Step[];
};

export default function ScheduleTable({ allSteps }: Props) {
  const headers = [
    '',
    'Steps involved',
    'Important Dates',
    'Start Time',
    'End Time',
    'Description'
  ];
  const steps = allSteps;

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
                  whiteSpace: 'nowrap'
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
                {Object.keys(step).map((key: string, i) => {
                  let value = step[key];

                  if (key.includes('Time') && value) {
                    const event = new Date(value);
                    value = event.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  }

                  return (
                    <td
                      key={`${key}${i}`}
                      style={{ whiteSpace: key !== 'description' ? 'nowrap' : 'normal' }}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.discord}>
        <DiscordButton />
      </div>
    </div>
  );
}
