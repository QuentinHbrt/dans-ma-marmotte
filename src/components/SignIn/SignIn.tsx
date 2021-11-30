import React, { FC } from "react";
import { Form } from "reactstrap";
import {
  Container,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon,
  Text,
} from "./SignInElements";

export const SignIn: FC = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">DMM</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>{"Sign in to your account"}</FormH1>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" required></FormInput>
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput type="password" required></FormInput>
              <FormButton type="submit">{"Continue"}</FormButton>
              <Text>{"Forgot password"}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};
