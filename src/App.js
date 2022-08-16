import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;

// Error Navigate ?????

// import { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Layout from "./components/Layout/Layout";
// import UserProfile from "./components/Profile/UserProfile";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
// import AuthContext from "./store/auth-context";

// function App() {
//   const authCtx = useContext(AuthContext);

//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" exact>
//           <HomePage />
//         </Route>
//         {!authCtx.isLoggedIn && (
//           <Route path="/auth">
//             <AuthPage />
//           </Route>
//         )}
//         <Route path="/profile">
//           {authCtx.isLoggedIn && <UserProfile />}
//           {!authCtx.isLoggedIn && <Navigate to="/auth" />}
//         </Route>
//         <Route path="*">
//           <Navigate to="/" />
//         </Route>
//       </Routes>
//     </Layout>
//   );
// }

// export default App;
