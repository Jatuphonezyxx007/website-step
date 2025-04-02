// import PageMeta from "../../components/common/PageMeta";
// // import AuthLayout from "./AuthPageLayout";
// import SignInForm from "../../components/auth/SignInForm";

// export default function SignIn() {
//   return (
//     <>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       {/* <AuthLayout> */}
//         <SignInForm onLogin={onLogin} />
//       {/* </AuthLayout> */}
//     </>
//   );
// }

import PageMeta from "../../components/common/PageMeta";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn({ onLogin }) {
  return (
    <>
      <PageMeta title="Step Solution" description="" />
      <SignInForm onLogin={onLogin} />
    </>
  );
}
