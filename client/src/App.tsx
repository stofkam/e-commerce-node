// import React from 'react'
import { Routes, Route } from "react-router";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import NotFound from "./pages/not-found";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
const App = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(user)
  return (
    <div className=" flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}> </CheckAuth>} />
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /> </CheckAuth>} >

          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />



        </Route>

        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>} >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          {/* <Route path="features" element={<AdminFeatures />} /> */}
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App