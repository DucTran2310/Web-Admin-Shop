import { Login, SignUp } from "@/screens";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AuthRouter = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg bg-white">
        <div className="hidden md:flex flex-col justify-center items-center p-8 bg-gray-50 w-full md:w-2/5">
          <div className="mb-4">
            <img
              style={{
                width: 256,
                height: 256,
                objectFit: "cover",
              }}
              alt="Logo"
              src="https://firebasestorage.googleapis.com/v0/b/admin-shop-6e6a7.appspot.com/o/Logo_sm.png?alt=media&token=a27b16b6-a1ee-4beb-9faa-556788856b52"
            />
          </div>
          <h1 className="text-4xl font-bold text-center">ADMIN SHOP</h1>
        </div>

        <div className="w-full p-6 md:w-3/5">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
