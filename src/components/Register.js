import React, { useState } from "react";
import { Box, Grid, TextField, Stack, Button } from "@mui/material";
import { useForm, yu } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter Valid Email").required("Email is required"),
  pass: yup.string().min(8, "Password should have atleat 8 character").required("Password is required"),
});

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignUp = data => {
    console.log(data)
  }

  return (
    <Grid
      height="100vh"
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <form onSubmit={handleSubmit(onSignUp)}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <TextField
              id="name"
              fullWidth
              label="Name"
              variant="outlined"
              helperText={errors.name?.message}
              error={errors.name ? true : false}
              {...register("name", { required: true })}
            />
            <TextField
              id="email"
              fullWidth
              label="Email"
              onClick={() => {
                console.log(errors.email)
              }}
              error={errors.email ? true : false}
              variant="outlined" {...register("email", { required: true })}
              helperText={errors.email?.message}
              {...register("email", { required: true })}
            />
            <TextField
              id="pass"
              fullWidth
              type="password"
              error={errors.pass ? true : false}
              label="Password"
              helperText={errors.pass?.message}
              variant="outlined"
              {...register("pass", { required: true })}
            />
            <Button type="submit" fullWidth variant="contained">
              Register
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid >
  )
}

export default Register;