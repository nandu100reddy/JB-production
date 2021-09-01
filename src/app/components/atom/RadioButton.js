import React from 'react';
import { Form } from 'react-bootstrap';


const RadioButton = props => {

  const { key, type, id, label } = props

  return (
    <>
      <Form>

        <div key={key} >
          <Form.Check
            type="radio"
            id={id}
            label={label}
          />
        </div>

      </Form>
    </>
  )
}

export default RadioButton;