import { Formik, Form } from "formik";
import React, { FC } from "react";
import { Room } from "../../types";
import Box from "../Box";
import Button from "../Button";
import TextInput from "../TextInput";
import { v4 as uuidv4 } from "uuid";

type ModalFormProps = {
  createRoom: (room: Room) => void;
};

const ModalForm: FC<ModalFormProps> = ({ createRoom }) => {
  return (
    <Formik
      initialValues={{
        roomName: "",
        locked: false,
        password: "",
        maxPlayers: 2,
      }}
      onSubmit={(values, action) => {
        createRoom({
          ...values,
          id: uuidv4(),
          playerCount: 0,
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
          <h2>Create room</h2>
          <TextInput
            type="text"
            name="roomName"
            label="Room name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.roomName}
            required={true}
          />
          {errors.roomName && touched.roomName && errors.roomName}

          <Box alignItems="flex-start">
            <label htmlFor="locked">Lock room</label>
            <input
              type="checkbox"
              name="locked"
              id="locked"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.locked}
            />
          </Box>

          {values.locked && (
            <>
              <TextInput
                type="password"
                name="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </>
          )}

          <TextInput
            type="number"
            name="maxPlayers"
            label="Max players"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.maxPlayers}
            min={2}
            max={4}
          />
          {errors.maxPlayers && touched.maxPlayers && errors.maxPlayers}
          <Box justifyContent="center" margin="2rem 0 0 0">
            <Button type="submit" disabled={isSubmitting} title="Create" />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ModalForm;
