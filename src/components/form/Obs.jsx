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

// TODO change datatype to be be driven by concept.datatype (need to test in lab workflow module)
// TODO perhaps a little refactoring to have all these if/thens... maybe make underlying ObsDate, ObsCoded, ObsNumeric, worth it?
class Obs extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      getValidationAbnormalRange: formValidations.generateAbnormalAndCriticalWarningFunctions(this.props.concept),
      getValidationAbsoluteRange: formValidations.generateAbsoluteRangeValidators(this.props.concept)
    }; 
  }

  componentDidMount() {
    // we need to test on "props.concept._openmrsClass" instead of just "props.concept" because we allow user to pass their own concept prop to supply custom validation values
    if (!this.props.concept._openmrsClass) {
      this.props.dispatch(conceptActions.fetchConcepts([this.props.conceptUuid]));
    }
  }

  componentDidUpdate(prevProps) {
    // reset the validation after loading the concept
    if (!prevProps.concept._openmrsClass && this.props.concept._openmrsClass) {
      this.setState({
        getValidationAbnormalRange: formValidations.generateAbnormalAndCriticalWarningFunctions(this.props.concept),
        getValidationAbsoluteRange: formValidations.generateAbsoluteRangeValidators(this.props.concept)
      });
    }
  }

  render() {
    const { required } = this.props;
    if (this.props.datatype === 'date') {
      const defaultValidations = this.props.validate || this.state.getValidationAbsoluteRange;
      const validations = required ? defaultValidations.concat(formValidations.isRequired) : defaultValidations;
      return (
        <Field
          component={CustomDatePicker}
          displayValue={this.props.value}
          mode={this.props.formContext.mode}
          name={this.props.name}
          usePortalMode={this.props.usePortalMode}
          validate={validations}
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
        const defaultValidations = this.props.validate || [];
        const validations = required ? defaultValidations.concat(formValidations.isRequired) : defaultValidations;
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
            validate={validations}
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
      const defaultValidations = this.props.validate || this.state.getValidationAbsoluteRange;
      const defaultWarnings = this.props.warn || this.state.getValidationAbnormalRange;
      const validations = required ? defaultValidations.concat(formValidations.isRequired) : defaultValidations;
      const warnings = required ? defaultWarnings.concat(formValidations.isRequired) : defaultWarnings;
      
      return (
        <div>
          <Field
            component={FieldInput}
            displayValue={this.props.value}
            mode={this.props.formContext.mode}
            name={this.props.name}
            placeholder={this.props.placeholder}
            type={this.props.datatype}
            validate={validations}
            warn={warnings}
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
  required: PropTypes.bool,
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
  datatype: 'number',
};

// utility method to allow us to accept a string uuid or an object for a concept
const getUuid = (concept) => {
  return concept.uuid ? concept.uuid : concept;
};

const mapStateToProps = (state, props) => {

  let concepts = (props.obsGroupContext ?
    props.obsGroupContext.groupingConcepts
      .map((concept) => getUuid(concept))
    : []
  );

  concepts.push(getUuid(props.concept));

  let fullPath = (props.obsGroupContext ?
    props.obsGroupContext.path.split("^")
    : []
  );

  fullPath.push(props.path);

  const name = formUtil.obsFieldName(fullPath, concepts);
  const concept = selectors.getConcept(state, getUuid(props.concept));
  return {
    name: name,
    value: props.formContext ? props.formContext.selector(state, name) : null,
    concept: { ...concept, ...props.concept },      // this allows fetching by uuid, and allows user to override the absolute, abnormal, and critical ranges defined on the concept
    conceptUuid: getUuid(props.concept)  // TODO better way to handle this... I'm running into some sort of infinite loop if I don't break it up like this
  };
};

export default withObsGroupContext(withFormContext(connect(mapStateToProps)(Obs)));
