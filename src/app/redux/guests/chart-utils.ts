import { groupBy } from 'underscore';

import { Guest } from 'app/api';

export type ChartItemType = { label: string, count: number, color: string }

const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];

export default function buildChart(list: Guest[], groupByKey: string): ChartItemType[] {
  const groups = groupBy(list, (item: Guest) => (item as any)[groupByKey]);
  const result: ChartItemType[] = [];
  Object.keys(groups).forEach((key, i) => {
    result.push({
      label: key,
      count: groups[key].length,
      color: COLORS[i]
    })
  });

  return result;
} 