import { Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useUserContext } from "../context/user-context";
import NextLink from "next/link";
import { useAuth } from "../hooks/useAuth";

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

const Home: NextPage = () => {
  const router = useRouter();
  const { setUsername } = useUserContext();
  useAuth();

  return (
    <Container>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, action) => {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ ...values }),
            }).then((res) => {
              if (res.status > 200) {
                action.setSubmitting(false);
              } else {
                setUsername(values.username);
                router.push("/lobby");
              }
            });
          } catch (error) {
            console.log("error", error);
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
            <h2>Login</h2>
            <TextInput
              type="username"
              name="username"
              label="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <TextInput
              label="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <Button type="submit" disabled={isSubmitting} title="Login" />
            <NextLink href="/signup" passHref={true}>
              <a>Register</a>
            </NextLink>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Home;
