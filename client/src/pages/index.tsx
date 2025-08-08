import { lazy } from "react";

// lazy loadings
const Chat = lazy(() => import("./chat"));
const SignIn = lazy(() => import("./sign-in"));
const SignUp = lazy(() => import("./sign-up"));

export { Chat, SignIn, SignUp };
