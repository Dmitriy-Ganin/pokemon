import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from '../routes';
import * as z from "zod";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useLoginMutation } from '../api/authAPI';
import { setCookie } from '../utils/cookes';
import { setLogin } from '../store/slices/loginSlice';
import {setToken} from '../store/slices/authSlice';


import styles from "../layouts/AuthLayout.module.css";

const loginSchema = z.object({
  login: z.string().min(1, "Enter login"),
  password: z.string().min(6, "Please enter at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const Login = () => {
  console.log('Login component rendered');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();

  const savedLogin = useSelector((state: RootState) => state.login.login);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: savedLogin || "",
      password: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await loginUser({
        email: `${data.login}@example.com`,
        password: data.password
      }).unwrap();

      setCookie('access_token', response.access_token, 3600);

      dispatch(setLogin(data.login));
      dispatch(setToken(response.access_token));

      navigate(ROUTES.HOME);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleSignUpClick = () => {
    const currentLogin = getValues("login");
    if (currentLogin.trim()) {
      dispatch(setLogin(currentLogin));
    }
    navigate(ROUTES.REGISTER);
  };

  return (
    <div className={styles.loginWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.tabs}>
          <Link to={ROUTES.LOGIN} className={`${styles.tab} ${styles.active}`}>Sign in</Link>
          <div className={styles.tab}></div>
          <div className={styles.tab} onClick={handleSignUpClick}>Sign up</div>
        </div>
        <div>
          <div className={styles.formEl}>
            <label className={styles.requiredLabel}>Login</label>
            <input {...register("login")} className={styles.input} />
            {errors.login && <p>{errors.login.message}</p>}
          </div>
          <div className={styles.formEl}>
            <label className={styles.requiredLabel}>Password</label>
            <input {...register("password")} className={styles.input} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <input type="submit" value={isLoading ? 'Loading...' : 'Sign in'} disabled={isLoading} className={styles.signInButton} />
        </div>
      </form>
    </div>
  )
}