import React from 'react';
import PropTypes from 'prop-types';
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
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      width={otherProps.width}
    >
      <YAxis
        type='number'
        yAxisId={0}
      />
      <XAxis
        dataKey={otherProps.xAxisKey}
      />
      <Tooltip position={{ y: 200 }} />
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
