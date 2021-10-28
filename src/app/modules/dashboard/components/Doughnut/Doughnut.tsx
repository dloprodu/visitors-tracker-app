/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';

import Chart from 'chart.js/auto';

import { ChartItemType } from 'app/redux/guests/chart-utils';

interface DoughnutProps {
  title: string,
  items?: ChartItemType[]
}

/**
 * Doughnut chart component.
 */
export default function Doughnut( { title, items = [] }: DoughnutProps ) {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  let chart: Chart;

  useEffect(() => {
    if (!canvasRef.current || !items?.length) {
      return;
    }

    const labels = items.map(i => i.label);
    const values = items.map(i => i.count);
    const colors = items.map(i => i.color);

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: values,
          backgroundColor: colors,
        }
      ]
    };

    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d')!;
    chart?.destroy();

    setTimeout(() => {
      chart = new Chart(ctx, {
        type: 'doughnut',
        data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: title
            }
          }
        },
      });
    });

  }, [items]);

  return (
    <div style={{
      position: 'relative',
      height: 360,
      width: 360
    }}>
      <canvas ref={canvasRef} />
    </div>
  );
}