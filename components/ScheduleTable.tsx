import styles from './schedule-table.module.css';
import { Step } from '@lib/types';
import DiscordButton from './discord-button'

type Props = {
  allSteps: Step[];
};

export default function ScheduleTable({ allSteps }: Props) {
  const headers = ['', 'Steps involved', 'Important Dates', 'Description']
  const steps = allSteps
  // const steps: Step[] = [
  //   {
  //     name: 'Register',
  //     date: 'Dec 2021 - Feb 14,2022',
  //     description: 'Click on the link to register'
  //   },
  //   {
  //     name: 'Join the Discord channel',
  //     date: 'Now - Feb 14,2022',
  //     description: 'Join the #oce-hackathon and introduce yourself to the Open Components community'
  //   },
  //   {
  //     name: 'Form teams',
  //     date: 'Now - Feb 14,2022',
  //     description: 'Join an existing team or form a new team and update your team information in <discord topic link>'
  //   },
  //   {
  //     name: 'Create team channel in discord',
  //     date: 'Now - Feb 14,2022',
  //     description: 'Collaborate with the team online'
  //   },
  //   {
  //     name: 'Kickstart Learn-a-thon',
  //     date: 'Feb 21,2022',
  //     description: 'Introduce teams and respective team learning goals'
  //   },
  //   {
  //     name: 'Learn with your team',
  //     date: 'Feb 21,2022 - Feb 25,2022',
  //     description: 'Collaborate and learn a new technology together'
  //   },
  //   {
  //     name: 'Present your learning',
  //     date: 'Feb 25, 2022',
  //     description: 'Demonstrate your learning including a short summary of the topic, its application, pros and cons,etc.'
  //   },
  //   {
  //     name: 'Kickstart Hackathon',
  //     date: 'Feb 28, 2022',
  //     description: 'Introduce teams and respective problem statement.'
  //   },
  //   {
  //     name: 'Build and test your hypothesis',
  //     date: 'Feb 28, 2022 - Mar 3, 2022',
  //     description: 'Hack a solution together'
  //   },
  //   {
  //     name: 'Demo your POC/Prototype',
  //     date: 'Mar 4, 2022',
  //     description: 'Demonstrate your solution and findings'
  //   },
  // ]

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
