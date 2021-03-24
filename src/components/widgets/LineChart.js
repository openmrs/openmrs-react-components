import React from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const CustomLineChart = (props) => {
  const { ...otherProps } = props;
  return (
    <LineChart
      data={otherProps.data}
      height={otherProps.height}
      margin={otherProps.margin}
      width={otherProps.width}
    >
      <YAxis
        type='number'
        yAxisId={0}
      />
      <XAxis
        dataKey={otherProps.xAxisKey}
        domain={['dataMin', 'dataMax']}
        tickFormatter={(unixTime) => format(unixTime, 'DD MMM YYYY')}
        type='number'
      />
      <Tooltip
        labelFormatter={(unixTime) => format(unixTime,'DD MMM YYYY')}
        position={{ y: 200 }}
      />
      <CartesianGrid
        horizontal
        vertical
      />
      <Line
        dataKey={otherProps.yAxisKey}
        type={otherProps.type}
      />
    </LineChart>

  );
};

CustomLineChart.defaultProps = {
  type: "monotone",
};

CustomLineChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number.isRequired,
  type: PropTypes.string,
  width: PropTypes.number.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  yAxisKey: PropTypes.string.isRequired,
};

export default CustomLineChart;
