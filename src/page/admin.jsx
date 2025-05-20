// import React, { useState } from "react";
// import {
//   UserOutlined,
//   DashboardOutlined,
//   UnorderedListOutlined,
//   LogoutOutlined,
//   FileAddOutlined,
//   LoginOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, theme } from "antd";
// import logo from "../assets/image.png";
// import Users from "./users";
// import Login from "./login";

// const { Header, Content, Sider } = Layout;

// const Admin = () => {
//   const {
//     token: { borderRadiusLG },
//   } = theme.useToken();

//   const [activeSection, setActiveSection] = useState("dashboard");
//   const renderSection = () => {
//     switch (activeSection) {
//       case "users":
//         return <Users />;
//       case "dashboard":
//         return <h2>Welcome to Dashboard</h2>;
//       case "doctors":
//         return <h2>Doctors Section (To be implemented)</h2>;
//       case "appointments":
//         return <h2>Appointments Section (To be implemented)</h2>;
//       case "reports":
//         return <h2>Reports Section (To be implemented)</h2>;
//       // case "login":
//       //   return <Login />; // ✅ Added this line
//       default:
//         return <h2>Select a section</h2>;
//     }
//   };
  
//   return (
//     <Layout>
//       {/* NavBar */}
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
//           style={{ height: "60px",width:"60px", borderRadius: 80,objectFit:"fit",}}
//         />
//         <h1 style={{ color: "#ffffff", fontWeight: "bold", margin: 0, fontSize: "22px" }}>
//           Admin Panel
//         </h1>

//         <Menu
//           mode="horizontal"
//           items={[{ label: "Namita Mahajan", icon: <UserOutlined />, key: "user" }]}
//           style={{
//             flex: 1,
//             minWidth: 0,
//             justifyContent: "end",
//             background: "#006d77",
//             color: "#ffffff",
//             fontWeight:"bold",
          
//           }}
//         />
//       </Header>

//       <Layout>
//         {/* Sidebar */}
//         <Sider
//           width={200}
//           style={{
//             background: "#edf6f9",
//             marginTop: 0,
            
//           }}
//         >
//           <Menu
//             mode="inline"
//             onClick={({ key }) => {
//               if (key === "/signout") {
//                 // clear tokens or session if needed
//                 setActiveSection("login");
//               } else {
//                 setActiveSection(key);
//               }
//             }}
            
//             selectedKeys={[activeSection]}
//             items={[
//               // {
//               //   label: "Login",
//               //   key: "login",
//               //   icon: <LoginOutlined />,
//               // },
//               {
//                 label: "Dashboard",
//                 key: "dashboard",
//                 icon: <DashboardOutlined />,
//               },
//               { label: "Users", key: "users", icon: <UserOutlined /> },
//               {
//                 label: "Doctors",
//                 key: "doctors",
//                 icon: <UserOutlined />,
//               },
//               {
//                 label: "Appointments",
//                 key: "appointments",
//                 icon: <UnorderedListOutlined />,
//               },
//               {
//                 label: "Reports",
//                 key: "reports",
//                 icon: <FileAddOutlined />,
//               },
//               {
//                 label: "Sign Out",
//                 key: "/signout",
//                 icon: <LogoutOutlined />,
//                 danger: true,
//               },
//             ]}
//             style={{ background: "#edf6f9" }}
//           />
//         </Sider>

//         {/* Content Area */}
//         <Content
//           style={{
//             padding: 24,
//             margin: 0,
//             minHeight: 280,
//             background: "#ffffff",
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           {renderSection()}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Admin;







import React, { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  FileAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Modal } from "antd";
import { useNavigate } from "react-router"; 
import logo from "../assets/image.png";
import Users from "./users";
import Login from "./login";
import AdminReportsTable from "./reports"; 
import Dashboard from "./dashboard";
import AdminAppointments from "./appointments";

const { Header, Content, Sider } = Layout;

const Admin = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsModalVisible(true);
  };

  const handleConfirmSignOut = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const handleCancelSignOut = () => {
    setIsModalVisible(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <Users />;
      case "dashboard":
        return <Dashboard/>
      case "doctors":
        return <h2>Doctors Section (To be implemented)</h2>;
      case "appointments":
        return <AdminAppointments/>
      case "reports":
        return <AdminReportsTable/>
      default:
        return <h2>Select a section</h2>;
    }
  };

  return (
    <Layout>
      {/* NavBar */}
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
          style={{ height: "60px", width: "60px", borderRadius: 80, objectFit: "fit" }}
        />
        <h1 style={{ color: "#ffffff", fontWeight: "bold", margin: 0, fontSize: "22px" }}>
          Admin Panel
        </h1>

        <Menu
          mode="horizontal"
          items={[{ label: "Namita Mahajan", icon: <UserOutlined />, key: "user" }]}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: "end",
            background: "#006d77",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        />
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider
          width={200}
          style={{
            background: "#edf6f9",
            marginTop: 0,
          }}
        >
          <Menu
            mode="inline"
            onClick={({ key }) => {
              if (key === "/signout") {
                handleSignOut();
              } else {
                setActiveSection(key);
              }
            }}
            selectedKeys={[activeSection]}
            items={[
              {
                label: "Dashboard",
                key: "dashboard",
                icon: <DashboardOutlined />,
              },
              { label: "Users", key: "users", icon: <UserOutlined /> },
              {
                label: "Doctors",
                key: "doctors",
                icon: <UserOutlined />,
              },
              {
                label: "Appointments",
                key: "appointments",
                icon: <UnorderedListOutlined />,
              },
              {
                label: "Reports",
                key: "reports",
                icon: <FileAddOutlined />,
              },
              {
                label: "Sign Out",
                key: "/signout",
                icon: <LogoutOutlined />,
                danger: true,
              },
            ]}
            style={{ background: "#edf6f9" }}
          />
        </Sider>

        {/* Content Area */}
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#ffffff",
            borderRadius: borderRadiusLG,
          }}
        >
          {renderSection()}
        </Content>
      </Layout>

      {/* Sign Out Confirmation Modal */}
      <Modal
        title="Confirm Sign Out"
        open={isModalVisible}
        onOk={handleConfirmSignOut}
        onCancel={handleCancelSignOut}
        okText="Yes"
        cancelText="No"
      >
        <p>Do you want to sign out?</p>
      </Modal>
    </Layout>
  );
};

export default Admin;
