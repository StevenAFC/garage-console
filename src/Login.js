import React from "react";
import gql from "graphql-tag";
import { Segment, Form, Button } from "semantic-ui-react";
import { Mutation } from "@apollo/react-components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      token
    }
  }
`;

const Login = () => {
  let navigate = useNavigate();

  return (
    <Segment>
      <Mutation mutation={LOGIN}>
        {(login) => (
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              login({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              }).then((response) => {
                if (response.data.login && response.data.login.token) {
                  localStorage.setItem("token", response.data.login.token);
                  setSubmitting(false);
                  navigate("/");
                } else {
                  console.log("Failed to login");
                  setSubmitting(false);
                }
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field
                  error={errors.email && touched.email ? true : false}
                  required
                >
                  <label>Email</label>
                  <input
                    placeholder="email@email.com"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Form.Field>
                <Form.Field
                  error={errors.password && touched.password ? true : false}
                  required
                >
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Form.Field>
                <Button type="submit" positive fluid disabled={isSubmitting}>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    </Segment>
  );
};

export default Login;
