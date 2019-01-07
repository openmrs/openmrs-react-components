import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formUtil from '../../features/form/util';
import ButtonGroup from '../widgets/ButtonGroup';
import CheckBox from '../widgets/CheckBox';
import FieldInput from "../widgets/FieldInput";
import TextArea from "../widgets/TextArea";
import Dropdown from '../widgets/Dropdown';
import CustomDatePicker from '../widgets/CustomDatePicker';
import withFormContext from './withFormContext';
import withObsGroupContext from './withObsGroupContext';
import { conceptActions } from "../../features/concept";
import { selectors } from "../../store";
import formValidations from '../../features/form/validations';

// TODO perhaps a little refactoring to have all these if/thens... maybe make underlying ObsDate, ObsCoded, ObsNumeric, worth it?
class Obs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      getValidationAbnormalRange: formValidations.getAbnormalRangeFromConcept(this.props.concept),
      getValidationNormalRange: formValidations.getNormalRangeFromConcept(this.props.concept)
    }; 
  }

  componentDidMount() {
    if (!this.props.concept) {
      this.props.dispatch(conceptActions.fetchConcepts([this.props.conceptUuid]));
    }
  }

  // TODO change datatype to be be driven by concept.datatype (need to test in lab workflow module)
  // TODO change validations and warning to be potentially driven by hi/low of concepts

  render() {
    if (this.props.datatype === 'date') {
      return (
        <Field
          component={CustomDatePicker}
          displayValue={this.props.value}
          mode={this.props.formContext.mode}
          name={this.props.name}
          validate={this.props.validate || this.state.getValidationNormalRange}
        />
      );
    } else if (this.props.widget === 'checkbox') {
      return (
        <Field
          checkBoxValue={this.props.conceptAnswer}
          component={CheckBox}
          displayValue={this.props.value}
          mode={this.props.formContext.mode}
          name={this.props.name}
          onBlur={e => {
            e.preventDefault();
          }}
          title={this.props.checkBoxTitle}
        />
      );
    } else if (this.props.widget === 'textarea') {
      return (
        <Field
          component={TextArea}
          displayValue={this.props.value}
          mode={this.props.formContext.mode}
          name={this.props.name}
          placeholder={this.props.placeholder}
        />
      );
    } else if (typeof this.props.conceptAnswers !== 'undefined') {
      if (this.props.widget === 'dropdown') {
        return (
          <Field
            component={Dropdown}
            defaultValue={this.props.defaultValue}
            disabled={this.props.disabled}
            displayValue={this.props.value}
            dropDownStyle={this.props.dropDownStyle}
            list={this.props.conceptAnswers}
            mode={this.props.formContext.mode}
            name={this.props.name}
            placeholder={this.props.placeholder}
            title={this.props.dropDownTitle}
          />
        );
      } else {
        return (
          <Field
            component={ButtonGroup}
            displayValue={this.props.value}
            mode={this.props.formContext.mode}
            name={this.props.name}
            options={this.props.conceptAnswers}
          />
        );
      }
    } else {
      return (
        <div>
          <Field
            component={FieldInput}
            displayValue={this.props.value}
            mode={this.props.formContext.mode}
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.datatype}
            validate={this.props.validate|| this.state.getValidationNormalRange}
            warn={this.props.warn || this.state.getValidationAbnormalRange}
          />
        </div>
      );
    }
  }
};

Obs.propTypes = {
  concept: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string]).isRequired,
  conceptAnswers: PropTypes.array,
  conceptUuid: PropTypes.string.isRequired,
  datatype: PropTypes.string.isRequired,
  placeholder: PropTypes.string,	
  validate: PropTypes.oneOfType([	
    PropTypes.array,	
    PropTypes.func]),	
  value:  PropTypes.oneOfType([	
    PropTypes.string,	
    PropTypes.number]),	
  warn: PropTypes.oneOfType([	
    PropTypes.array,	
    PropTypes.func]),
  widget: PropTypes.string
};

Obs.defaultProps = {	
  datatype: 'number'
};

// utility method to allow us to accept a string uuid or an object for a concept
const getUuid = (concept) => {
  return concept.uuid ? concept.uuid : concept;
};

const mapStateToProps = (state, props) => {

  let concepts = '';

  if (props.obsGroupContext) {
    concepts = props.obsGroupContext.groupingConcepts
      .map((concept) => getUuid(concept))
      .reduce((acc, item) => acc + item + '^', '');
  }

  concepts += getUuid(props.concept);

  const fullPath = (props.obsGroupContext ? props.obsGroupContext.path + '^' : '') + props.path;

  const name = formUtil.obsFieldName(fullPath, concepts);
  const concept = selectors.getConcept(state, getUuid(props.concept));
  return {
    name: name,
    value: props.formContext ? props.formContext.selector(state, name) : null,
    concept: { ...concept, ...props.concept },
    conceptUuid: getUuid(props.concept)  // TODO better way to handle this
  };
};

export default withObsGroupContext(withFormContext(connect(mapStateToProps)(Obs)));
