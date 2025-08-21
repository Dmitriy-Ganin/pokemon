import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from '../routes';
import * as z from "zod";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setLogin } from '../store/slices/loginSlice';
import { useRegisterMutation } from '../api/authAPI';
import { setCookie } from '../utils/cookes';

import styles from "../layouts/AuthLayout.module.css";

const registerSchema = z.object({
  login: z.string().min(1, "Enter login"),
  password: z.string().min(6, "Please enter at least 6 symbol"),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords must match",
  path: ["passwordConfirmation"],
});

type RegisterSchema = z.infer<typeof registerSchema>;

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const savedLogin = useSelector((state: RootState) => state.login.login);
  console.log("Saved login from store:", savedLogin);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: savedLogin || "",
      password: "",
      passwordConfirmation: "",
    }
  });

  const handleSignInClick = () => {
    const currentLogin = getValues("login");
    if (currentLogin.trim()) {
      dispatch(setLogin(currentLogin));
    }
    navigate(ROUTES.LOGIN);
  };

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const response = await registerUser({
        companyName: data.login + "_Company",
        userName: data.login,
        email: `${data.login}@example.com`,
        password: data.password
      }).unwrap();

      setCookie('access_token', response.access_token, 3600);

      navigate(ROUTES.HOME);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.tabs}>
          <div className={styles.tab} onClick={handleSignInClick}>Sign in</div>
          <div className={styles.tab}></div>
          <Link to={ROUTES.REGISTER} className={`${styles.tab} ${styles.active}`}>Sign up</Link>
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
          <div className={styles.formEl}>
            <label className={styles.requiredLabel}>Password confirmation</label>
            <input {...register("passwordConfirmation")} className={styles.input} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <input type="submit" value={isLoading ? 'Loading...' : 'Sign in'} disabled={isLoading} className={styles.signInButton} />
        </div>
      </form>
    </div>
  )
}