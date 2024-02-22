import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { CiSquareMore } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Table, Modal, Pagination, Button, notification } from "antd";
import DeleteModal from "../Model/deleteModal";

import css from "./style.module.css";

const Dashboard = (props) => {
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  // const [modalData1, setModalData1] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({
    wardrobeClass1: false,
    wardrobeClass2: false,
  });

  const Navigate = useNavigate();
  const enjuryData = (record) => {
    Navigate(`/more/${modalData.usernumber}`);
  };
  const fetchData = async () => {
    // const apiUrl = `${process.env.REACT_APP_BASE_URL}/?page=${currentPage}`
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/?page=${currentPage}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (modalData && modalData.usernumber) {
    }
  }, [modalData]);

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const openModal = (data) => {
    setModalData(data);

    setModalVisible(true);
  };

  const onChange = (page) => {
    setCurrentPage(page);
  };
  const onDeleteButtonClick = (userId) => {
    setDeleteUserId(userId);
    setDeleteShow(true);
  };

  const onCancelDelete = () => {
    setDeleteUserId(null);
    setDeleteShow(false);
  };

  const onConfirmDelete = () => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/delete/${deleteUserId}`;
    axios
      .delete(apiUrl)
      .then((res) => {
        console.log(res);
        notification.success({ message: res.data.message });
        fetchData();
      })
      .catch((err) => console.log(err));

    setDeleteUserId(null);
    setDeleteShow(false);
  };

  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const filteredUserData = userData.filter(
    (user) =>
      data.users.toLowerCase().includes(searchInput) ||
      user.username.toLowerCase().includes(searchInput) ||
      user.address.toLowerCase().includes(searchInput)
  );

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Хэрэглэгчийн дугаар",
      dataIndex: "usernumber",
      key: "usernumber",
    },
    {
      title: "Хэрэглэгчийн нэр",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Хаяг",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Үүсгэсэн огноо",
      dataIndex: "createDate",
      key: "createDate",
      render: (text, record) => {
        const dateObject = new Date(record.createDate);
        const formattedDate = dateObject.toLocaleString();
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Гэмтэл нэмэх",
      dataIndex: "plusEnjury",
      key: "plusEnjury",
      render: (_, record) => (
        <Link to={`/CreateEnjuryCard/${record.usernumber}`}>
          <button className={css.iconButton}>
            <FaPlus />
          </button>
        </Link>
      ),
    },
    {
      title: "Засах",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <Link to={`/update/${record.id}`}>
          <button className={css.iconButton}>
            <AiOutlineEdit />
          </button>
        </Link>
      ),
    },
    {
      title: "Устгах",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <button
          className={css.iconButton}
          onClick={() => onDeleteButtonClick(record.id)}
        >
          <MdDelete />
        </button>
      ),
    },
    {
      title: "Дэлгэрэнгүй",
      dataIndex: "moreDetails",
      key: "moreDetails",
      render: (_, record) => (
        // <Link to={`/More/${record.id}`}>
        <button className={css.iconButton} onClick={() => openModal(record)}>
          <CiSquareMore />
        </button>
        // </Link>
      ),
    },
  ];

  return (
    <div className={css.dashboardContainer}>
      <div className={css.dashboard}>
        <div className={css.buttonContainer}>
          <input
            type="search"
            placeholder="Search"
            className={css.searchInput}
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button
            onClick={() => Navigate("/createUsersCard")}
            className={css.iconButtons}
          >
            <FaPlus />
          </button>
        </div>
        <Table
          style={{ backgroundColor: "transparent", color: "red" }}
          columns={columns}
          // dataSource={data.users.map((user, index) => ({
          //   ...user,
          //   key: user.usernumber || index,
          // }))}
          dataSource={data.users}
          pagination={false}
        />
        <Pagination
          defaultCurrent={data?.currentPage}
          total={data?.totalPages}
          onChange={onChange}
        />
        {deleteShow && (
          <DeleteModal onCancel={onCancelDelete} onConfirm={onConfirmDelete} />
        )}
        <Modal
          title="Дэлгэрэнгүй мэдээлэл"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          centered
          width={1000}
        >
          <div className={css.modalTest}>
            <div className={css.modalTest1}>
              <div>
                <p>
                  <h4>Хэрэглэгчийн дугаар:</h4> {modalData.usernumber}
                </p>
                <p>
                  <h4>Хэрэглэгчийн нэр:</h4> {modalData.username}
                </p>
                <p>
                  <h4>Хаяг:</h4> {modalData.address}
                </p>
                <p>
                  <h4>Тусгай тэмдэглэл:</h4> {modalData.specialNote}
                </p>
                <p>
                  <h4>Станц талын дугаар:</h4> {modalData.stationNumber}
                </p>
                <p>
                  <h4>Урт нь метрээр:</h4> {modalData.longMetr}
                </p>
                <p>
                  <h4>Үүсгэсэн огноо:</h4>
                  {modalData.createDate &&
                    new Date(modalData.createDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      // timeZoneName: "short",
                    })}
                </p>
                <p>
                  <h4>Шкаф №:</h4> {modalData.wardrobeNumber}
                </p>
              </div>
              <div>
                <h3>Шкаф 1 анги</h3>
                <p>
                  <h4>Гол кабелийн дугаар:</h4>
                  {modalData?.wardrobeClass1?.[0]?.cableNumber1}
                </p>
                <p>
                  <h4>Салбар кабелийн дугаар:</h4>
                  {modalData?.wardrobeClass1?.[0]?.coupleNumber1}
                </p>
                <p>
                  <h4>Хосын дугаар:</h4>
                  {modalData?.wardrobeClass1?.[0]?.sectorNumber1}
                </p>
              </div>
              <div>
                <h3>Шкаф 2 анги</h3>
                <p>
                  <h4>Гол кабелийн дугаар:</h4>
                  {modalData?.wardrobeClass2?.[0]?.cableNumber2}
                </p>
                <p>
                  <h4>Салбар кабелийн дугаар:</h4>
                  {modalData?.wardrobeClass2?.[0]?.coupleNumber2}
                </p>
                <p>
                  <h4>Хосын дугаар:</h4>
                  {modalData?.wardrobeClass2?.[0]?.sectorNumber2}
                </p>
              </div>
            </div>
            <div className={css.modalTest1}>
              <div>
                <h3>Тавьсан</h3>
                <p>
                  <h4>Он сар өдөр: </h4>
                  {modalData?.install?.[0]?.tavisanOgnoo}
                </p>
                <p>
                  <h4>Тайлбар: </h4>
                  {modalData?.install?.[0]?.tavisanTailbar}
                </p>
                <p>
                  <h4>Хүний нэр: </h4>
                  {modalData?.install?.[0]?.tavisanHuniiNer}
                </p>
              </div>
              <div>
                <h3>Шилжүүлсэн</h3>
                <p>
                  <h4>Он сар өдөр:</h4>
                  {modalData?.transfer?.[0]?.shiljuulsenOgnoo}
                </p>
                <p>
                  <h4>Тайлбар:</h4>
                  {modalData?.transfer?.[0]?.shiljuulsenTailbar}
                </p>
                <p>
                  <h4>Хүний нэр:</h4>
                  {modalData?.transfer?.[0]?.shiljuulsenHuniiNer}
                </p>
              </div>
              <div>
                <h3>Хураасан</h3>
                <p>
                  <h4>Он сар өдөр:</h4> {modalData?.collect?.[0]?.huraasanOgnoo}
                </p>
                <p>
                  <h4>Тайлбар: </h4>
                  {modalData?.collect?.[0]?.huraasanTailbar}
                </p>
                <p>
                  <h4>Хүний нэр:</h4>
                  {modalData?.collect?.[0]?.huraasanHuniiNer}
                </p>
              </div>
            </div>
            <div className={css.modalTest1}>
              <div>
                <h3>Номер сольсон</h3>
                <p>
                  <h4>Он сар өдөр:</h4>
                  {modalData?.changeNumber?.[0]?.nomerSolisonOgnoo}
                </p>
                <p>
                  <h4>Тайлбар:</h4>
                  {modalData?.changeNumber?.[0]?.nomerSolisonTailbar}
                </p>
                <p>
                  <h4>Хүний нэр:</h4>
                  {modalData?.changeNumber?.[0]?.nomerSolisonHuniiNer}
                </p>
              </div>
              <Button
                type="primary"
                className={css.enjuryButton}
                onClick={enjuryData}
              >
                Гэмтлийн мэдээлэл
              </Button>
              <div>
                <h3>Нэр сольсон</h3>
                <p>
                  <h4>Он сар өдөр:</h4>
                  {modalData?.changeName?.[0]?.nerSolisonOgnoo}
                </p>
                <p>
                  <h4>Тайлбар:</h4>
                  {modalData?.changeName?.[0]?.nerSolisonTailbar}
                </p>
                <p>
                  <h4>Хүний нэр:</h4>
                  {modalData?.changeName?.[0]?.nerSolisonHuniiNer}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
