- [PatientHeader](https://github.com/openmrs/openmrs-react-components/tree/OEUI_183/src/components#patientheader)


# PatientHeader

### Props


| Name |Type | Default | Description  |
| ------------- |:-------------:| --- | ---- |
| patientUtil|`object`|  |  Patient object having `person`, `patientId` and `attributes` properties |
| note | `array` | `[]` | The first index is displayed, index will be an object having `value` and `auditInfo` properties|


```
import { PatientHeader } from '@openmrs/react-component';

function header = (props) => {
    return (
        <PatientHeader
          patientUtil={props.patientUtil}
          note={props.note}
        />
    );
}
```
