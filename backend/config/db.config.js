// CREATE TABLE `userscard` (
// 	`id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`username` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
// 	`address` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
// 	`usernumber` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
// 	`createDate` TIMESTAMP NULL DEFAULT NULL,
// 	`wardrobeNumber` MEDIUMTEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
// 	`wardrobeClass1` JSON NULL DEFAULT NULL,
// 	`wardrobeClass2` JSON NULL DEFAULT NULL,
// 	`install` JSON NULL DEFAULT NULL,
// 	`transfer` JSON NULL DEFAULT NULL,
// 	`collect` JSON NULL DEFAULT NULL,
// 	`changeNumber` JSON NULL DEFAULT NULL,
// 	`changeName` JSON NULL DEFAULT NULL,
// 	`specialNote` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
// 	`stationNumber` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
// 	`longMetr` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
// 	INDEX `id` (`id`) USING BTREE
// )
// COLLATE='latin1_swedish_ci'
// ENGINE=InnoDB
// AUTO_INCREMENT=52
// ;
// CREATE TABLE `enjuryCard` (
// 	`enjury` JSON NULL DEFAULT NULL,
// 	`check` JSON NULL DEFAULT NULL,
// 	`fixing` JSON NULL DEFAULT NULL,
// 	`fixed` JSON NULL DEFAULT NULL,
// 	`id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`usernumber` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
// 	INDEX `id` (`id`) USING BTREE
// )
// COLLATE='utf8mb4_general_ci'
// ENGINE=InnoDB
// AUTO_INCREMENT=10
// ;
"UPDATE userscard SET usernumber=?, username=?, address=?, specialNote=?, stationNumber=?, longMetr=?, wardrobeNumber=?, wardrobeClass1=?, wardrobeClass2=?, tavisan=?, shiljuulsen=?,  huraasan=?, nomerSolison=?, nerSolison=?, createDate=NOW() WHERE ID = ?",
  (
    <div>
      <h3>Гарсан гэмтэл</h3>
      <p>
        <h4>Он сар өдөр:</h4>
        {modalData?.enjury?.[0]?.garsanGemtliinTsag}
      </p>
      <p>
        <h4>Юуны тухай:</h4>
        {modalData?.enjury?.[0]?.garsanGemtliinTuhai}
      </p>
    </div>
  );
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

  const showAddAdminModal = (user) => {
    console.log(user.id);
    Modal.confirm({
      title: "Add Admin",
      content: (
        <div>
          <p>{`Хэрэглэгч: ${user.name}`}</p>
          <p>{`Одоогийн эрх: ${user.role}`}</p>
          <p>Та админ эрх нэмэхийг хүсэж байна уу?</p>
        </div>
      ),
      onOk: (user) => {
        console.log(user);
      },
    });
    // console.log(user.id);
  };
  // const showRemoveAdminModal = (user) => {
  //   setSelectedUser(user);
  //   Modal.confirm({
  //     title: "Remove Admin",
  //     content: (
  //       <div>
  //         <p>{`Хэрэглэгч: ${user.name}`}</p>
  //         <p>{`Одоогийн эрх: ${user.role}`}</p>
  //         <p>Та админы эрхийг хасахыг хүсэж байна уу?</p>
  //       </div>
  //     ),
  //     onOk: () => handleRemoveAdmin(user.id),
  //   });
  // };
  const data = user.id;
  const handleAddAdmin = () => {
    console.log(data);
    // const apiUrl = `http://localhost:4000/addAdmin/${id}`;
    // axios
    //   .put(apiUrl, data)
    //   .then((res) => {
    //     notification.success({ message: res.data.message });
    //     Navigate("/");
    //   })
    //   .catch((error) => {});
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await axios.post("http://localhost:4000/remove-admin", { id });
      message.success("Admin removed successfully");
    } catch (error) {
      console.error("Failed to remove admin", error);
      message.error("Failed to remove admin");
    }
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
            <Button type="primary" onClick={() => showAddAdminModal(user)}>
              Add Admin
            </Button>
            <Button type="danger" onClick={() => showRemoveAdminModal(user)}>
              Remove Admin
            </Button>
          </List.Item>
        )}
      />
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
