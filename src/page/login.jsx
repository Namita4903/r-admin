
// import React, { useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// import axiosInstance from "../../../src/axiosinstance";
// import {apiUrl} from "../../../config";
// import { useNavigate, NavLink } from "react-router";
// import "react-toastify/dist/ReactToastify.css";
// import "animate.css";

// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const onFinish = async (values) => {
//     try {
//       const response = await axiosInstance.post(
//         `${apiUrl}/api/auth/login`,
//         values
//       );
//       console.log(response);

//       if (response.data.success) {
//         const { jwtToken, role,email } = response.data;

//         // ✅ Allow only admin or user role to login
//         if (role) {
//           toast.success(response.data.message);
//           localStorage.setItem("accessToken", jwtToken);
//           localStorage.setItem("role", role);
//           localStorage.setItem("userEmail", email);

//           setIsLoading(true);

//           setTimeout(() => {
//             setIsLoading(false);
//             if (role === "admin") {
//               navigate("/dashboard");
//             } else if (role === "user") {
//               navigate("/dashboard"); // Make sure this route exists
//             }
//           }, 1000);
//         } else {
//           toast.error("Access denied. Only admin and user roles are allowed.");
//         }
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="... animate__animated animate__fadeInDown">
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-100 to-red-50 px-4">
//         <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border-t-8 border-yellow-500 animate-fade-in-down">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mt-2">
//               Welcome Back
//             </h2>
//             <p className="text-gray-500 text-sm">Login to continue</p>
//           </div>

//           <Form name="login" onFinish={onFinish} layout="vertical">
//             <Form.Item
//               name="email"
//               label={<span className="text-gray-700 font-medium">Email</span>}
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input
//                 size="large"
//                 prefix={<UserOutlined />}
//                 placeholder="you@example.com"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label={
//                 <span className="text-gray-700 font-medium">Password</span>
//               }
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password
//                 size="large"
//                 prefix={<LockOutlined />}
//                 placeholder="••••••••"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 block
//                 type="primary"
//                 htmlType="submit"
//                 loading={isLoading}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 text-lg transition-all duration-200"
//               >
//                 Log in
//               </Button>
//             </Form.Item>

//             <p className="text-sm text-center text-gray-600">
//               Don’t have an account?{" "}
//               <NavLink
//                 to="/register"
//                 className="text-yellow-600 font-semibold hover:underline"
//               >
//                 Register
//               </NavLink>
//             </p>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// import axiosInstance from "../../../src/axiosinstance";
// import { apiUrl } from "../../../config";
// import { useNavigate, NavLink } from "react-router";
// import "react-toastify/dist/ReactToastify.css";
// import "animate.css";
// import { toast } from "react-toastify";
// import { Layout, Menu } from "antd";
// import logo from "../assets/image.png";

// const { Header } = Layout;

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//  const onFinish = async (values) => {
//   try {
//     const response = await axiosInstance.post(
//      `${apiUrl}/api/auth/admin/login`,

//       values
//     );
//     console.log("success is...",response)

    
//     const data = response?.data;
//      // Validate response data
//       if (!data || typeof data !== "object") {
//         console.error("Invalid response data:", data);
//         toast.error("Invalid server response. Please try again.");
//         return;
//       }

//       // Log response for debugging
//       console.log("Response data:", data);

//     if (!data.success) {
//       console.log("not success")
//       // Backend responded with success: false
//       toast.error(data.message || "Login failed");
//       return;
//     }

//     const { jwtToken, role, email } = data;

//     if (role === "admin" || role === "user") {
//       toast.success(data.message);
//       localStorage.setItem("accessToken", jwtToken);
//       localStorage.setItem("role", role);
//       localStorage.setItem("userEmail", email);

//       setIsLoading(true);

//       setTimeout(() => {
//         setIsLoading(false);
//         navigate("/admin");
//       }, 1000);
//     } else {
//       // Unauthorized role (doctor/patient trying to login here)
//       toast.error("Access denied. Only admin and user roles are allowed.");
//     }
//   } catch (error) {
//     console.error("Login error:", error);

//       // Handle Axios errors
//       if (error.isAxiosError && error.response) {
//         const status = error.response.status;
//         const message = error.response.data?.message;

//         console.log("Error status:", status, "Message:", message);

//         if (status === 400) {
//           toast.error(message || "Admin not found. Please check your email.");
//         } else if (status === 401) {
//           toast.error(message || "Incorrect password. Please try again.");
//         } else if (status === 403) {
//           toast.error(message || "Access denied. This panel is only for admins.");
//         } else {
//           toast.error(message || "An unexpected error occurred. Please try again.");
//         }
//       } else {
//         // Handle non-Axios errors (e.g., network errors, TypeError)
//         console.error("Non-Axios error:", error);
//         toast.error(error.message || "An unexpected error occurred. Please try again.");
//       }
//   }
// };


//   return (
//     <div className="animate__animated animate__fadeInDown min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100">
//       {/* Navbar */}
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "16px",
//           background: "#006d77",
//           height: "80px",
//           padding: "0 24px",
//         }}
//       >
//         <img
//           src={logo}
//           alt="PlatterGo Logo"
//           style={{
//             height: "60px",
//             width: "60px",
//             borderRadius: 80,
//             objectFit: "fit",
//           }}
//         />
//         <h1
//           style={{
//             color: "#ffffff",
//             fontWeight: "bold",
//             margin: 0,
//             fontSize: "22px",
//           }}
//         >
//           Admin Panel
//         </h1>
//         <Menu
//           mode="horizontal"
//           items={[]}
//           style={{
//             flex: 1,
//             justifyContent: "end",
//             background: "#006d77",
//             color: "#ffffff",
//           }}
//         />
//       </Header>

//       {/* Login Form Section */}
//       <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
//         <div className="backdrop-blur-lg bg-white/30 shadow-2xl border border-white/50 rounded-3xl p-10 w-full max-w-md">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//             <p className="text-gray-600 text-sm">Login to continue</p>
//           </div>

//           <Form name="login" onFinish={onFinish} layout="vertical">
//             <Form.Item
//               name="email"
//               label={
//                 <span className="text-gray-700 font-medium">Email</span>
//               }
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input
//                 size="large"
//                 prefix={<UserOutlined />}
//                 placeholder="you@example.com"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label={
//                 <span className="text-gray-700 font-medium">Password</span>
//               }
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password
//                 size="large"
//                 prefix={<LockOutlined />}
//                 placeholder="••••••••"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 block
//                 type="primary"
//                 htmlType="submit"
//                 loading={isLoading}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 text-lg transition-all duration-200"
//               >
//                 Log in
//               </Button>
//             </Form.Item>

//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;







// import React, { useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// import { useNavigate } from "react-router";
// import "react-toastify/dist/ReactToastify.css";
// import "animate.css";
// import { toast } from "react-toastify";
// import { Layout, Menu } from "antd";
// import logo from "../assets/image.png";

// const { Header } = Layout;

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   // Simple hardcoded login (Priya's logic)
//   const onFinish = async (values) => {
//     const { email, password } = values;

//     if (email === "mahajannamita2003@gmail.com" && password === "namita2003") {
//       toast.success("Login successful!");
//       localStorage.setItem("accessToken", "dummyToken");
//       localStorage.setItem("role", "admin");
//       localStorage.setItem("userEmail", email);

//       setIsLoading(true);
//       setTimeout(() => {
//         setIsLoading(false);
//         navigate("/admin");
//       }, 1000);
//     } else {
//       toast.error("Invalid credentials!");
//     }
//   };

//   return (
//     <div className="animate__animated animate__fadeInDown min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100">
//       {/* Navbar */}
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "16px",
//           background: "#006d77",
//           height: "80px",
//           padding: "0 24px",
//         }}
//       >
//         <img
//           src={logo}
//           alt="PlatterGo Logo"
//           style={{
//             height: "60px",
//             width: "60px",
//             borderRadius: 80,
//             objectFit: "fit",
//           }}
//         />
//         <h1
//           style={{
//             color: "#ffffff",
//             fontWeight: "bold",
//             margin: 0,
//             fontSize: "22px",
//           }}
//         >
//           Admin Panel
//         </h1>
//         <Menu
//           mode="horizontal"
//           items={[]}
//           style={{
//             flex: 1,
//             justifyContent: "end",
//             background: "#006d77",
//             color: "#ffffff",
//           }}
//         />
//       </Header>

//       {/* Login Form Section */}
//       <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
//         <div className="backdrop-blur-lg bg-white/30 shadow-2xl border border-white/50 rounded-3xl p-10 w-full max-w-md">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//             <p className="text-gray-600 text-sm">Login to continue</p>
//           </div>

//           <Form name="login" onFinish={onFinish} layout="vertical">
//             <Form.Item
//               name="email"
//               label={
//                 <span className="text-gray-700 font-medium">Email</span>
//               }
//               rules={[{ required: true, message: "Please input your email!" }]}
//             >
//               <Input
//                 size="large"
//                 prefix={<UserOutlined />}
//                 placeholder="you@example.com"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label={
//                 <span className="text-gray-700 font-medium">Password</span>
//               }
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input.Password
//                 size="large"
//                 prefix={<LockOutlined />}
//                 placeholder="••••••••"
//                 className="rounded-lg"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 block
//                 type="primary"
//                 htmlType="submit"
//                 loading={isLoading}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 text-lg transition-all duration-200"
//               >
//                 Log in
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from "react";
import { useNavigate } from "react-router";
 import "../index.css"; // or use './AdminLogin.css' if using a separate CSS file
 import logo from "../assets/image.png";
 import { Layout, Menu } from "antd";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { Header } = Layout;
  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with real authentication
    if (email === "mahajannamita2003@gmail.com" && password === "Namita2003") {
      alert("Login successful!");
      navigate("/admin");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
  
      
   <div className="animate__animated animate__fadeInDown min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100">
      {/* Navbar */}
      <Header
       style={{
         display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "#006d77",
          height: "80px",
          padding: "0 24px",
      }}
     >
       <img
          src={logo}
         alt="PlatterGo Logo"
         style={{
            height: "60px",
            width: "60px",
            borderRadius: 80,
            objectFit: "fit",
          }}
        />
         <h1
          style={{
             color: "#ffffff",
            fontWeight: "bold",
            margin: 0,
            fontSize: "22px",
          }}
        >
           Admin Panel
         </h1>
         <Menu
         mode="horizontal"
           items={[]}
           style={{
             flex: 1,
             justifyContent: "end",
             background: "#006d77",
         color: "#ffffff",
         }}
        />
       </Header>


      {/* Login Form */}
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2 className="admin-login-title">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;