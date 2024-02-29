import React, { useState, useEffect } from "react";
import { List, Button, message, Modal, Pagination, notification } from "antd";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";
const AddAdmin1 = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    role: "",
    id: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const Navigate = useNavigate();

  const fetchUsers = async () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/registration`;
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleAddAdmin = () => {
    const id = user.id;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(user),
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/addAdmin/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.updated) {
          notification.success({ message: result.message });
          setIsModalOpen(false);
          fetchUsers();
        } else {
          notification.error({ message: result.message });
        }
      })
      .catch((error) => console.error(error));
  };
  const handleRemoveAdmin = () => {
    const id = user.id;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(user),
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/removeAdmin/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        notification.success({ message: result.message });
        setModalOpen(false);
        fetchUsers();
      })
      .catch((error) => console.error(error));
  };

  //   axios
  //     .put(apiUrl, user)
  //     .then((res) => {
  //       console.log(res);
  //       // notification.success({ message: res.data.message });
  //       // setIsModalOpen(false);
  //       // setUsers((prevUsers) =>
  //       //   prevUsers.map((u) =>
  //       //     u.id === selectedUser.id ? { ...u, role: "admin" } : u
  //       //   )
  //       // );
  //     })
  //     .catch((error) => {
  //       console.error("Failed to add admin", error);
  //     });
  // };

  const showAddModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const showRemoveModal = () => {
    setModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false) || setModalOpen(false);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);
  return (
    <div>
      <h2>Бүртүүлсэн хэрэглэгчдийн лист</h2>
      <List
        dataSource={paginatedUsers}
        renderItem={(user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} description={user.email} />
            {user.role === "user" && (
              <Button
                type="primary"
                onClick={() => {
                  setUser({
                    role: user.role,
                    name: user.name,
                    id: user.id,
                  });
                  showAddModal(user);
                }}
              >
                Add Admin
              </Button>
            )}
            {user.role === "admin" && (
              <Button
                type="primary"
                onClick={() => {
                  setUser({
                    role: user.role,
                    name: user.name,
                    id: user.id,
                  });
                  showRemoveModal(user);
                }}
              >
                Remove Admin
              </Button>
            )}
          </List.Item>
        )}
      />
      <>
        <Modal
          title="Add Admin"
          visible={isModalOpen}
          onOk={handleAddAdmin} // Change to handleAddAdmin
          onCancel={handleCancel}
        >
          <p>{`Хэрэглэгч: ${user?.name}`}</p>
          <p>{`Одоогийн эрх: ${user?.role}`}</p>
          <p>Та админ эрх нэмэхийг хүсэж байна уу?</p>
        </Modal>
        <Modal
          title="Remove Admin"
          visible={modalOpen}
          onOk={handleRemoveAdmin} // Change to handleAddAdmin
          onCancel={handleCancel}
        >
          <p>{`Хэрэглэгч: ${user?.name}`}</p>
          <p>{`Одоогийн эрх: ${user?.role}`}</p>
          <p>Та админ эрх хасах хүсэж байна уу?</p>
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
