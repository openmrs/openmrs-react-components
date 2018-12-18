import React, { PureComponent } from 'react';
import * as R from 'ramda';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import constantsRest from '../../rest/constantsRest';
import encounterRest from '../../rest/encounterRest';
import conceptRest from '../../rest/conceptRest';

// TODO this doesn't belong here, should likely be moved to the lab workflow owa
export class LabsSummary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labResults: []
    };

    this.fetchLabTestResults = this.fetchLabTestResults.bind(this);
  }

  componentDidMount() {
    // PatientID goes here
    this.fetchLabTestResults('70c9de3d-ce33-420b-818b-332acbfaf776');
  }

  getConceptValue = (conceptValue) => {
    if (typeof conceptValue === 'object' && conceptValue !== null) {
      return conceptValue.display;
    } else {
      return conceptValue;
    }
  } 

  async fetchLabTestResults(patientUUID) {
    // Fetch global properties
    const encounterTypeResponse = await constantsRest.fetchLabResultsEncounterType();
    const labResultsTestOrderTypeResponse = await constantsRest.fetchLabResultsTestOrderType();
    const labResultsTestOrderNumberConceptResponse = await constantsRest.fetchLabResultsTestOrderNumberConcept();
    const labResultsDateConceptResponse = await constantsRest.fetchLabResultsDateConcept();
    const labResultsTestLocationQuestionResponse = await constantsRest.fetchLabResultsTestLocationQuestion();

    if (encounterTypeResponse && labResultsTestOrderTypeResponse) {
      const encounterTypeUUID = encounterTypeResponse.results[0].value;
      const labResultsTestOrderNumberConcept = labResultsTestOrderNumberConceptResponse.results[0].value;
      const labResultsDateConcept = labResultsDateConceptResponse.results[0].value;
      const labResultsTestLocationQuestion = labResultsTestLocationQuestionResponse.results[0].value;
      const concealedConceptUUIDs = [
        labResultsTestOrderNumberConcept,
        labResultsTestLocationQuestion,
        labResultsDateConcept,
      ];

      // Fetch patient's encounters
      const patientEncountersResponse = await encounterRest.fetchEncountersByPatient(patientUUID, encounterTypeUUID);
      
      if ( patientEncountersResponse) {
        if (patientEncountersResponse.results.length) {
          const encounters= patientEncountersResponse.results;
          
          const labResults = encounters.map(async (encounter) => {
            const encounterDatetime = encounter.encounterDatetime;
            
            const hasObs = !R.isEmpty(encounter.obs);
            if (hasObs) {
              const obs = R.pipe(
                R.filter(item => !concealedConceptUUIDs.includes(item.concept.uuid)),
              )(encounter.obs);
              if (!R.isEmpty(obs)) {
                const conceptResponse = await conceptRest.getConcept(obs[0].concept.uuid);
                const {
                  hiNormal,
                  lowNormal,
                  units = '',
                } = conceptResponse;
                const range = (hiNormal && lowNormal) ? `${lowNormal} - ${hiNormal}${units}` : '';
    
                return {
                  range,
                  isPanel: obs[0].concept.set,
                  display: obs[0].concept.display,
                  value: this.getConceptValue(obs[0].value),
                  encounterDate: format(encounterDatetime, "DD-MMM-YYYY"),
                };
              }
            }
          });
          const labResultResponse = await Promise.all(labResults);
          const sortedLabResultsByEncounterDate = labResultResponse.sort((a,b) => new Date(b.encounterDate) - new Date(a.encounterDate));
          this.setState({ labResults: sortedLabResultsByEncounterDate });
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    const { labResults } = this.state;
    const { numberOfResults } = this.props;
    const defaultStyle = {
      width: '30%',
      fontSize: '10px',
      tableLayout: 'fixed'
    };
    return (<table style={defaultStyle}>
      {labResults.length && labResults.slice(0, numberOfResults ).map(({ range, isPanel, display, value, encounterDate }) => (<tr key={range}>
        <td>{encounterDate}</td>
        <td>{display}</td> 
        <td>{!isPanel ? value : 'reported'} &nbsp;{!isPanel && range}</td>
      </tr>))}
    </table>
    );
  }
}

LabsSummary.defaultProps = {
  numberOfResults: 5
};

LabsSummary.propTypes = {
  numberOfResults: PropTypes.number
};

export default LabsSummary;
