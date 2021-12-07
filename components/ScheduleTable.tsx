import styles from './schedule.module.css';
import styled from 'styled-components'
import { Step } from '@lib/types';

const Container = styled.div`
  overflow: auto;
`

const Table = styled.table`
  border-spacing: 0.5rem;
  padding: 0.3rem 0.2rem 1rem;
  width: 100%;
`

export default function ScheduleTable() {
  const headers = ['Steps involved', 'Important Dates', 'Description']
  const steps: Step[] = [
    {
      step: 'Register',
      date: 'Dec 2021 - Feb 14,2022',
      description: 'Click on the link to register'
    }
  ]

  return (
    <Container>
      <Table>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            {headers.map((header, i) => (
              <th
                key={i}
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
          {steps.map((step) => {
            return (
              <tr>
                {Object.keys(step).map((key: string) => <td>{step[key]}</td>)}
              </tr>
            )
          })}
        </tbody>
        </Table>
    </Container>
  )
}

