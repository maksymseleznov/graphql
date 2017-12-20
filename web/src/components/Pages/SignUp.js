import React, { Component } from 'react'

import { Container, Button, Checkbox, Form } from 'semantic-ui-react'

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      college: null,
    }
  }

  render() {
    return(
      <Container>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default SignUp;