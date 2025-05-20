// import React from "react";
// import { Table, Button, Space, Tooltip } from "antd";
// import moment from "moment";

// // Example dummy data (replace with actual backend response later)
// const reportData = [
//   {
//     key: "1",
//     title: "Hemogram Report",
//     description:
//       "Includes RBC, Hemoglobin, MCV, MCH, RDW, TLC, DLC. Slightly high RBC a…",
//     date: "2024-09-18T00:00:00.000+00:00",
//     uploadedByDoctor: "namitamahajan4903@gmail.com",
//     uploadedOfPatient: "priyabarjatia1280@gmail.com",
//     uploadedAt: "2025-05-18T06:22:02.835+00:00",
//     image: "data:application/pdf;base64,...", // For download/view (optional)
//   },
// ];

// // Actions
// const handleUpdate = (record) => {
//   console.log("Update clicked:", record);
// };

// const handleDelete = (record) => {
//   console.log("Delete clicked:", record);
// };

// // Table columns
// const columns = [
//   {
//     title: "Title",
//     dataIndex: "title",
//     key: "title",
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//     key: "description",
//     render: (text) => (
//       <Tooltip title={text}>
//         {text.length > 50 ? `${text.slice(0, 50)}...` : text}
//       </Tooltip>
//     ),
//   },
//   {
//     title: "Report Date",
//     dataIndex: "date",
//     key: "date",
//     render: (date) => moment(date).format("YYYY-MM-DD"),
//   },
//   {
//     title: "Doctor Email",
//     dataIndex: "uploadedByDoctor",
//     key: "uploadedByDoctor",
//   },
//   {
//     title: "Patient Email",
//     dataIndex: "uploadedOfPatient",
//     key: "uploadedOfPatient",
//   },
//   {
//     title: "Uploaded At",
//     dataIndex: "uploadedAt",
//     key: "uploadedAt",
//     render: (uploadedAt) => moment(uploadedAt).format("YYYY-MM-DD HH:mm"),
//   },
//   {
//     title: "Actions",
//     key: "actions",
//     render: (_, record) => (
//       <Space>
//         <Button type="primary" onClick={() => handleUpdate(record)}>
//           Update
//         </Button>
//         <Button type="danger" onClick={() => handleDelete(record)}>
//           Delete
//         </Button>
//       </Space>
//     ),
//   },
// ];

// const AdminReportsTable = () => {
//   return (
//     <div>
//       <h2>Uploaded Reports</h2> <br/>  <br/>  <br/>
//       <Table dataSource={reportData} columns={columns} scroll={{ x: "max-content" }} />
//     </div>
//   );
// };

// export default AdminReportsTable;








// import React, { useEffect, useState } from "react";
// import { Table, Button, Space, Tooltip, message } from "antd";
// import moment from "moment";
// import axios from "axios";

// const AdminReportsTable = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch reports
//   const fetchReports = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5001/api/report/getAllReports");
//       const formatted = response.data.map((report, index) => ({
//         key: report._id || index,
//         ...report,
//       }));
//       setReportData(formatted);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//       message.error("Failed to load reports.");
//     }
//     setLoading(false);
//   };

//   // Fetch on mount
//   useEffect(() => {
//     fetchReports();
//   }, []);

//   // Handle update
//   const handleUpdate = (record) => {
//     console.log("Update clicked:", record);
//     message.info("Update feature not implemented yet.");
//   };

//   // Handle delete
//   const handleDelete = async (record) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/report/delete/${record._id}`);
//       message.success("Report deleted successfully.");
//       fetchReports(); // Refresh table
//     } catch (error) {
//       console.error("Delete failed:", error);
//       message.error("Failed to delete report.");
//     }
//   };

//   // Table columns
//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//       render: (text) => (
//         <Tooltip title={text}>
//           {text.length > 50 ? `${text.slice(0, 50)}...` : text}
//         </Tooltip>
//       ),
//     },
//     {
//       title: "Report Date",
//       dataIndex: "date",
//       key: "date",
//       render: (date) => moment(date).format("YYYY-MM-DD"),
//     },
//     {
//       title: "Doctor Email",
//       dataIndex: "uploadedByDoctor",
//       key: "uploadedByDoctor",
//     },
//     {
//       title: "Patient Email",
//       dataIndex: "uploadedOfPatient",
//       key: "uploadedOfPatient",
//     },
//     {
//       title: "Uploaded At",
//       dataIndex: "uploadedAt",
//       key: "uploadedAt",
//       render: (uploadedAt) => moment(uploadedAt).format("YYYY-MM-DD HH:mm"),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <Button type="primary" onClick={() => handleUpdate(record)}>
//             Update
//           </Button>
//           <Button danger onClick={() => handleDelete(record)}>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>Uploaded Reports</h2>
//       <br />
//       <Table
//         dataSource={reportData}
//         columns={columns}
//         scroll={{ x: "max-content" }}
//         loading={loading}
//       />
//     </div>
//   );
// };

// export default AdminReportsTable;








import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Tooltip,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";
import axios from "axios";

const AdminReportsTable = () => {
  const [reportData, setReportData] = useState([]);
  console.log(reportData)
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // Fetch reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5001/api/report/getAllReports"
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
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle update button click
  const handleUpdate = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      date: moment(record.date),
      uploadedByDoctor:record.uploadedByDoctor,
    uploadedByPatient:record.uploadedOfPatient,
    });
    setIsModalVisible(true);
  };

  // Handle modal OK (submit update)
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://localhost:5001/api/report/update/${currentRecord._id}`,
        {
          ...values,
          date: values.date.toISOString(),
        }
      );
      message.success("Report updated successfully.");
      setIsModalVisible(false);
      fetchReports();
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update report.");
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle delete
  const handleDelete = async (record) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/report/delete/${record._id}`
      );
      message.success("Report deleted successfully.");
      fetchReports(); // Refresh table
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Failed to delete report.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 50 ? `${text.slice(0, 50)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: "Report Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Doctor Email",
      dataIndex: "uploadedByDoctor",
      key: "uploadedByDoctor",
    },
    {
      title: "Patient Email",
      dataIndex: "uploadedOfPatient",
      key: "uploadedOfPatient",
    },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (uploadedAt) => moment(uploadedAt).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Uploaded Reports</h2>
      <br />
      <Table
        dataSource={reportData.reports}
        columns={columns}
        scroll={{ x: "max-content" }}
        loading={loading}
      />
<Modal
  title="Update Report"
  open={isModalVisible}
  onOk={handleModalOk}
  onCancel={handleModalCancel}
  okText="Update"
>
  <Form form={form} layout="vertical">
    <Form.Item
      name="title"
      label="Title"
      rules={[{ required: true, message: "Please enter a title" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="description"
      label="Description"
      rules={[{ required: true, message: "Please enter a description" }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>

    <Form.Item
      name="date"
      label="Report Date"
      rules={[{ required: true, message: "Please select a date" }]}
    >
      <DatePicker format="YYYY-MM-DD" />
    </Form.Item>

    <Form.Item
      name="uploadedByDoctor"
      label="Doctor Email"
      rules={[{ required: true, message: "Please enter doctor's email" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="uploadedOfPatient"
      label="Patient Email"
      rules={[{ required: true, message: "Please enter patient's email" }]}
    >
      <Input />
    </Form.Item>
  </Form>
</Modal>
    </div>
  );
};

export default AdminReportsTable;

