import { Outlet } from "react-router"
import Clicker from "./AuthLogo/Clicker.png"
import Pokemon from "./AuthLogo/Pokemon.png"

import styles from "./AuthLayout.module.css"

export const AuthLaout = () => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authLaout}>
        <div className={styles.logoWrapper}>
          <img src={Clicker}
            alt="Clicker"
            width="149px"
            height="54px" />
          <div className={styles.divider}></div>
          <img src={Pokemon}
            alt="Pokemon"
            width="153px"
            height="54px" />
        </div>
        <Outlet />
      </div>
    </div>
  )
}