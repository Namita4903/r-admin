import React,{useState,useEffect} from "react";
import { Card, Statistic, Row, Col, Table } from "antd";
import {
  UserOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const userStats = [
  { name: " Patients", value: 4 },
  { name: "Doctors", value: 1 },
];

// const monthlyRegistrations = [
//   { month: "Jan", users: 30 },
//   { month: "Feb", users: 50 },
//   { month: "Mar", users: 80 },
//   { month: "Apr", users: 65 },
//   { month: "May", users: 90 },
// ];

const recentUsers = [
  { key: "1", name: "Anu Gupta", email: "anugupta229@gmail.com", role: "Patient" },
  { key: "2", name: "Priya", email: "priyabarjatia1280@gmail.com", role: "Patient" },
  { key: "3", name: "Namit", email: "namitamahajan4903@gmail.com", role: "Doctor" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
];

const Dashboard = () => {
    const [user,setUsers]=useState("")
      const [reportData, setReportData] = useState([]);
      const [appointment, setAppointments] = useState([]);
    
  const [reports,setReports]=useState()
    const fetchDashBoardData = async () => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://r-backend-2.onrender.com/api/auth/getUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setUsers(response.data);
      //  const response1 = await axios.get("https://r-backend-2.onrender.com/api/auth/getUserReport", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // setReports(response1.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);
  
  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://r-backend-2.onrender.com/api/report/getAllReports"
      );
    //   const formatted = response.data.map((report, index) => ({
    //     key: report._id || index,
    //     ...report,
    //   }));
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to load reports.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);
  const fetchUserAppointments = async () => {
  try {

    const response = await axios.get("https://r-backend-2.onrender.com/api/auth/getAppointment");

    console.log("User appointments:", response.data);
    setAppointments(response.data)
  } catch (error) {
    console.error("Error fetching user appointments:", error);
  }
};
useEffect(() => {
  fetchUserAppointments();
}, []);
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={user.count}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Doctors"
              value={1}
              prefix={<UsergroupAddOutlined />}
              valueStyle={{ color: "#005f73" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Appointments"
              value={appointment.length}
              prefix={<ScheduleOutlined />}
              valueStyle={{ color: "#8338ec" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Reports"
              value={reportData?.reportsCount}
              prefix={<FileDoneOutlined />}
              valueStyle={{ color: "#ff006e" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="User Distribution">
            <PieChart width={350} height={300}>
              <Pie
                data={userStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        {/* <Col span={12}>
          <Card title="Monthly Registrations">
            <BarChart width={400} height={300} data={monthlyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#00b4d8" />
            </BarChart>
          </Card>
        </Col> */}
      </Row>

      <Card title="Recent Users" style={{ marginTop: 24 }}>
        <Table dataSource={recentUsers} columns={columns} pagination={false} />
      </Card>
    </div>
  );
};

export default Dashboard;
