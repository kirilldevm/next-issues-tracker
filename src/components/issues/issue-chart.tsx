'use client';

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/card';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

export default function IssueChart({ open, inProgress, closed }: Props) {
  const data = useMemo(
    () => [
      { name: 'Open', value: open },
      { name: 'In Progress', value: inProgress },
      { name: 'Closed', value: closed },
    ],
    [open, inProgress, closed]
  );

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          responsive
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          data={data}
        >
          <XAxis dataKey='name' />
          <YAxis />
          <Bar dataKey='value' fill='#8884d8' barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
