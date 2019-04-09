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
# Accordion

### Props


| Name |Type | Default | Description  |
| ------------- |:-------------:| --- | ---- |
| border|`bool`| false |  Border of the Accordion |
| children | `Reactnode` |  |Children to render inside Accordion|
| open|`bool`| false | Determines if the accordion is currently open or closed |
| title |`string`|  | Title of the Accordion  |

```
      <div className={`accordion ${this.props.border ? 'border' : ''}`}>
        <div
          className="header"
          onClick={() => {
            this.setState(() => ({ isVisible: !this.state.isVisible }));
          }}
          role="button"
          tabIndex={0}
        >
          <a>
            <span>
              <img
                className={`${this.state.isVisible ? 'rotate90' : ''}`}
                height="12px"
                src={Arrow}
                width="12px"
              />
            </span>&nbsp;&nbsp;
            {this.props.title}
          </a>
        </div>
        <div className={`content ${!this.state.isVisible ? 'close' : 'open'}`}>
          {this.props.children}
        </div>
      </div>
```