import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_STUDENT = gql`
    query student($studentId: String) {
        student(id: $studentId) {
            _id
            name
            email
            phone
            dob
            subject
            updated_date
        }
    }
`;


const UPDATE_STUDENT = gql`
    mutation updateStudent(
      $id: String!,
      $name: String!,
      $email: String!,
      $phone: Int!,
      $dob: Int!,
      $subject: String!)  {
        updateStudent(
          id: $id,
          name: $name,
          email: $email,
          phone: $phone,
          dob: $dob,
          subject: $subject) {
            updated_date
        }
    }
`;

class Edit extends Component {

  render() {
    let name, email, phone, dob, subject;
    return (
      <Query query={GET_STUDENT} variables={{ studentId: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation mutation={UPDATE_STUDENT} key={data.student._id} onCompleted={() => this.props.history.push(`/`)}>
              {(updateStudent, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        EDIT Student
                    </h3>
                    </div>
                    <div className="panel-body">
                      <h4><Link to="/" className="btn btn-primary">Student List</Link></h4>
                      <form onSubmit={e => {
                        e.preventDefault();
                        updateStudent({ variables: { id: data.student._id, name: name.value, email: email.value, phone: parseInt(phone.value), dob: parseInt(dob.value), subject: subject.value } });
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
                          }} placeholder="Name" defaultValue={data.student.name} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input type="text" className="form-control" name="email" ref={node => {
                            email = node;
                          }} placeholder="Email" defaultValue={data.student.email} />
                        </div>
                    
                        <div className="form-group">
                          <label htmlFor="phone">Phone:</label>
                          <textarea className="form-control" name="phone" ref={node => {
                            phone = node;
                          }} placeholder="Phone" defaultValue={data.student.phone} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="dob">Date Of Birth:</label>
                          <input type="text" className="form-control" name="dob" ref={node => {
                            dob = node;
                          }} placeholder="Date Of Birth" defaultValue={data.student.dob} />
                        </div>

                        <div className="form-group">
                          <label htmlFor="subject">subject:</label>
                          <input type="text" className="form-control" name="subject" ref={node => {
                            subject = node;
                          }} placeholder="subject" defaultValue={data.student.subject} />
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
        }}
      </Query>
    );
  }
}

export default Edit;