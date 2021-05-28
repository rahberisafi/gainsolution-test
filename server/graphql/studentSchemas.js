var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');

var studentType = new GraphQLObjectType({
  name: 'student',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLInt
      },
      dob: {
        type: GraphQLInt
      },
      subject: {
        type: GraphQLString
      },
      updated_date: {
        type: GraphQLDate
      }
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      students: {
        type: new GraphQLList(studentType),
        resolve: function () {
          const students = StudentModel.find().exec()
          if (!students) {
            throw new Error('Error')
          }
          return students
        }
      },
      student: {
        type: studentType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const studentDetails = StudentModel.findById(params.id).exec()
          if (!studentDetails) {
            throw new Error('Error')
          }
          return studentDetails
        }
      }
    }
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addStudent: {
        type: studentType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          dob: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          subject: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          const studentModel = new StudentModel(params);
          const newStudent = studentModel.save();
          if (!newStudent) {
            throw new Error('Error');
          }
          return newStudent
        }
      },
      updateStudent: {
        type: studentType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          dob: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          subject: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return StudentModel.findByIdAndUpdate(params.id, { name: params.name, email: params.email, phone: params.phone, dob: params.dob, subject: params.subject, updated_date: new Date() }, function (err) {
            if (err) return next(err);
          });
        }
      },
      removeStudent: {
        type: studentType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remStudent = StudentModel.findByIdAndRemove(params.id).exec();
          if (!remStudent) {
            throw new Error('Error')
          }
          return remStudent;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });