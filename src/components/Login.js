import React, { useState } from "react";
import { Box, Grid, TextField, Stack, Button } from "@mui/material";
import { useForm, yu } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Enter Valid Email").required("Email is required"),
  pass: yup.string().min(8, "Password should have atleat 8 character").required("Password is required"),
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignIn = data => {
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
        <form onSubmit={handleSubmit(onSignIn)}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <TextField
              id="email"
              fullWidth
              label="Email"
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
              Login
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid >
  )
}

export default Login;
