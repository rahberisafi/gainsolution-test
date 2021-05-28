import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_STUDENT = gql`
    mutation AddStudent(
        $name: String!,
        $email: String!,
        $phone: Int!,
        $dob: Int!,
        $subject: String!) {
        addStudent(
            name: $name,
            email: $email,
            phone: $phone,
            dob: $dob,
            subject: $subject) {
            _id
        }
    }
`;

class Create extends Component {
  render() {
    let name, email, phone, dob, subject;
    return (
      <Mutation mutation={ADD_STUDENT} onCompleted={() => this.props.history.push('/')}>
        {(addStudent, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  ADD Student
                </h3>
              </div>
              <div className="panel-body">
                <h4><Link to="/" className="btn btn-primary">Student List</Link></h4>
                <form onSubmit={e => {
                  e.preventDefault();
                  addStudent({
                    variables: {
                      name: name.value,
                      email: email.value,
                      phone: parseInt(phone.value),
                      dob: parseInt(dob.value),
                      subject: subject.value,
                    }
                  });

                  name.value = "";
                  email.value = "";
                  phone.value = "";
                  dob.value = "";
                  subject.value = "";
                }}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" name="name" ref={node => {
                      name = node;
                    }} placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" name="email" ref={node => {
                      email = node;
                    }} placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" className="form-control" name="phone" ref={node => {
                      phone = node;
                    }} placeholder="Phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date Of Birth:</label>
                    <input type="text" className="form-control" name="dob" ref={node => {
                      dob = node;
                    }} placeholder="Date Of Birth" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">subject:</label>
                    <input type="text" className="form-control" name="subject" ref={node => {
                      subject = node;
                    }} placeholder="subject" />
                  </div>
            
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Create;