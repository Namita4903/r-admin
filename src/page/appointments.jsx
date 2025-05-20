import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, message } from "antd";
import axios from "axios";

const { Title } = Typography;

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://r-backend-2.onrender.com/api/auth/getAppointment");

      const { appointments } = response.data;

      if (Array.isArray(appointments)) {
        setAppointments(appointments);
      } else {
        setAppointments([]);
        message.error("Appointments data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Doctor Email",
      dataIndex: "doctorEmail",
      key: "doctorEmail",
    },
    {
      title: "Doctor Phone",
      dataIndex: "doctorPhone",
      key: "doctorPhone",
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (text ? new Date(text).toLocaleString() : "Not Available"),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>📅 Booked Appointments</Title>

      {loading ? (
        <Spin tip="Loading Appointments..." size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey={(record) => record._id || record.id || Math.random()}
          pagination={{ pageSize: 8 }}
          bordered
        />
      )}
    </div>
  );
};

export default AdminAppointments;
