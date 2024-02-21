import React, { useState, useEffect } from "react";
import { List, Button, message, Modal, Pagination, notification } from "antd";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";

const AddAdmin1 = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    role: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/registration");
        setUsers(response.data.data);
        console.log(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);
  // const data = user.id;
  // const handleAddAdmin = () => {
  //   console.log(data);
  //   const apiUrl = `http://localhost:4000/addAdmin/${id}`;
  //   axios
  //     .put(apiUrl, data)
  //     .then((res) => {
  //       notification.success({ message: res.data.message });
  //       Navigate("/");
  //     })
  //     .catch((error) => {});
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);
  return (
    <div>
      <h2>Бүртүүлсэн хэрэглэгчдийн лист</h2>
      <List
        dataSource={paginatedUsers}
        renderItem={(user, record) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} description={user.email} />
            <Button type="primary" onClick={() => showModal(user)}>
              Add Admin
            </Button>
            <Button type="danger" onClick={() => showRemoveModal(user)}>
              Remove Admin
            </Button>
          </List.Item>
        )}
      />
      <>
        <Modal
          title="Add Admin"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{`Хэрэглэгч: ${user.name}`}</p>
          <p>{`Одоогийн эрх: ${user.role}`}</p>
          <p>Та админ эрх нэмэхийг хүсэж байна уу?</p>
        </Modal>
      </>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={users.length}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default AddAdmin1;
