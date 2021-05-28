import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const DELETE_STUDENT = gql`
  mutation removeStudent($id: String!) {
    removeStudent(id:$id) {
      _id
    }
  }
`;

class Show extends Component {
  render() {
    return (
      <Query pollInterval={500} query={GET_STUDENT} variables={{ studentId: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4><Link to="/">Student List</Link></h4>
                  <h3 className="panel-title">
                    {data.student.name}
                  </h3>
                </div>
                <div className="panel-body">
                  <dl>
                    <dt>Name:</dt>
                    <dd>{data.student.name}</dd>
                    <dt>Email:</dt>
                    <dd>{data.student.email}</dd>
                    <dt>Phone:</dt>
                    <dd>{data.student.phone}</dd>
                    <dt>Date Of Birth:</dt>
                    <dd>{data.student.dob}</dd>
                    <dt>Date Of Birth:</dt>
                    <dd>{data.student.subject}</dd>
                    <dt>Updated:</dt>
                    <dd>{data.student.updated_date}</dd>
                  </dl>
                  <Mutation mutation={DELETE_STUDENT} key={data.student._id} onCompleted={() => this.props.history.push('/')}>
                    {(removeStudent, { loading, error }) => (
                      <div>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            removeStudent({ variables: { id: data.student._id } });
                          }}>
                          <Link to={`/edit/${data.student._id}`} className="btn btn-success">Edit</Link>
                          {' '}
                          <button type="submit" className="btn btn-danger">Delete</button>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Show;