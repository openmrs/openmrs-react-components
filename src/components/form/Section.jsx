import React from 'react';
import { Row, Col } from 'reactstrap';

const sectionStyle = {
  backgroundColor: 'rgba(255, 177, 0, 0.26)'
};
const leftPadding = {
  paddingLeft: '60px',
  height: '40px'
};

const Section = (props) => {

  return (
    <Row style={ sectionStyle }>
      <Col sm={20} md={20} style={ leftPadding }>
        <span><h2>{props.title}</h2></span>
      </Col>
    </Row>
  );

};

export default Section;
