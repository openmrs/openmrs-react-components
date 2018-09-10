import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';


const styles = {
  datePickerContainerStyle: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  formControlStyle: {
    marginRight: '5px'
  }
};

class CustomDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultDate || moment(),
      field: 'dateTo',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { field } = nextProps;
    this.setState({
      field,
    });
  }

  handleChange(date) {
    const { handleDateChange } = this.props;
    const { field } = this.state;
    this.setState({
      selectedDate: date,
    });
    handleDateChange(field, date.format('YYYY-MM-DD'));
  }

  render() {
    const { ...otherProps } = this.props;
    const { selectedDate } = this.state;
    const DateDisplayComponent = ({ onClick, value }) => (
      <span style={styles.datePickerContainerStyle}>
        <span className={otherProps.labelClassName}>
          {
            otherProps.label
          }
        </span>
        <FormControl
          placeholder=""
          style={styles.formControlStyle}
          type="text"
          value={value}
        />
        <i
          className="icon-calendar scale small add-on"
          onClick={onClick}
          role="toolbar"
        />
      </span>
    );
    return (
      <DatePicker
        customInput={<DateDisplayComponent />}
        onChange={this.handleChange}
        selected={selectedDate}
      />
    );
  }
}

CustomDatePicker.defaultProps = {
  labelClassName: '',
  label: '',
  defaultDate: moment(),
  field: '',
};

CustomDatePicker.propTypes = {
  defaultDate: PropTypes.object,
  field: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default CustomDatePicker;
