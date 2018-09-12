import React from 'react';
import { Row, Col } from 'react-bootstrap';

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
        <span><h1>{props.title}</h1></span>
      </Col>
    </Row>
  );

};

export default Section;
