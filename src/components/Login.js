import React, { useState } from "react";
import { Grid, TextField, Stack, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useForm, yu } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

const schema = yup.object({
  email: yup.string().email("Enter Valid Email").required("Email is required"),
  pass: yup.string().min(8, "Password should have atleat 8 character").required("Password is required"),
});

function Login() {
  const [err, setErr] = useState(false);
  const [chkAdmin, setChkAdmin] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onChkAdmin = (e) => {
    setChkAdmin(e.target.checked);
  }

  const onSignIn = async ({ email, pass }) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      const ref = collection(db, "users");
      const q = query(ref, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const tempData = doc.data();
          console.log(tempData)
          if (tempData.type == "admin")
            navigate("/admin/request")
          else
            navigate("/")
        }
      });
    } catch (err) {
      setErr(true);
    }
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
            <FormControlLabel control={<Checkbox checked={chkAdmin} onChange={onChkAdmin} />} label="Login as admin" />
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
            {err && <Typography>Something went wrong</Typography>}
          </Stack>
        </form>
      </Grid>
    </Grid >
  )
}

export default Login;
