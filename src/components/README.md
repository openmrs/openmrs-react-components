# Components
- [PatientHeader](https://github.com/openmrs/openmrs-react-components/tree/OEUI_183/src/components#patientheader)
- Tabs


## PatientHeader

### Props


| Name |Type | Default | Description  |
| ------------- |:-------------:| --- | ---- |
| patient|`object`|  |  Patient object having `person`, `patientId` and `attributes` properties |
| note | `array` | `[]` | The first index is displayed, index will be an object having `value` and `auditInfo` properties|


```
import { PatientHeader } from '@openmrs/react-component';

function header = (props) => {
    return (
        <PatientHeader
          patient={props.patient}
          note={props.note}
        />
    );
}
```

## Tabs

### Basic Usage

For Every Tabbed Content create a div inside the Tabs component with a label and children.

```
import { Tabs } from '@openmrs/react-component';

function TabbedComponent = (props) => {
    return (
      <div>
        <h1>Tabs Demo</h1>
        <Tabs>
          <div label="PatientIn">
            Welcome, Dear <em>Patient</em>!
          </div>
          <div label="PatientOut">
            Sad to see you <em>Go</em>!
          </div>
        </Tabs>
      </div>
    );
}
```

![Tabs Demo Screenshot](https://s2.gifyu.com/images/tabbedcomponent.gif)

