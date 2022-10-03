import { Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useUserContext } from "../context/user-context";

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
`;

const SignUp: NextPage = () => {
  const router = useRouter();
  const { setUsername } = useUserContext();

  return (
    <Container>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, action) => {
          try {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ ...values }),
            }).then((res) => {
              console.log("res", res);
              if (res.status > 400) {
                console.log("BAD");
              }
              if (res.status === 200) {
                setUsername(values.username);
                router.push("/lobby");
              }

              console.log("GOOD");
            });
          } catch (err) {
            console.log("err", err);
          }
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
            <h2>Register</h2>
            <TextInput
              type="text"
              name="username"
              label="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <TextInput
              type="password"
              name="password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <Button type="submit" disabled={isSubmitting} title="register" />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
