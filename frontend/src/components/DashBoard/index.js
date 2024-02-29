import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { CiSquareMore } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AudioOutlined } from "@ant-design/icons";

import {
  Table,
  Modal,
  Pagination,
  Button,
  notification,
  Tooltip,
  Input,
  Space,
} from "antd";
import DeleteModal from "../Model/deleteModal";
import css from "./style.module.css";
const Dashboard = () => {
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [role, setRole] = useState();
  const Navigate = useNavigate();
  const { Search } = Input;
  const enjuryData = (record) => {
    Navigate(`/more/${modalData.usernumber}`);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/?page=${currentPage}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    if (modalData && modalData.usernumber) {
    }
  }, [modalData]);
  useEffect(() => {
    fetchData();
  }, [currentPage, searchInput]);
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
        notification.success({ message: res.data.message });
        fetchData();
      })
      .catch((err) => console.log(err));
    setDeleteUserId(null);
    setDeleteShow(false);
  };
  const { id } = useParams();
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };
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
    role === "admin" && {
      title: "Устгах",
      dataIndex: "delete",
      key: "delete",
      visible: false,
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
  ].filter(Boolean);
  return (
    <div className={css.bigContainer}>
      <div className={css.dashboard}>
        <div>
          <h1 className={css.h1}>NGN-Телефон Хэрэглэгчдийн картын лист</h1>
        </div>
        <div className={css.buttonContainer}>
          <Search
            placeholder="Хайх"
            onSearch={searchInput}
            defaultValue={searchInput}
            style={{ width: 700 }}
            className={css.searchInput}
            onChange={handleSearchInputChange}
          />
          {/* <input
            type="search"
            placeholder="Search"
            className={css.searchInput}
            value={searchInput}
            onChange={handleSearchInputChange}
          /> */}
          {/* <Tooltip title="Карт үүсгэх"> */}
          <button
            onClick={() => Navigate("/createUsersCard")}
            className={css.iconButtons}
          >
            {/* <FaPlus /> */}
            Карт үүсгэх
          </button>
          {/* </Tooltip> */}
        </div>
        <Table
          style={{ backgroundColor: "transparent", color: "red" }}
          columns={columns}
          dataSource={(data.users || [])
            .map((user, index) => ({
              ...user,
              key: user.usernumber || index,
            }))
            .filter(
              (user) =>
                user.username.toLowerCase().includes(searchInput) ||
                user.usernumber.toLowerCase().includes(searchInput) ||
                user.address.toLowerCase().includes(searchInput) ||
                user.specialNote.toLowerCase().includes(searchInput) ||
                user.stationNumber.toLowerCase().includes(searchInput) ||
                user.longMetr.toLowerCase().includes(searchInput) ||
                user.wardrobeNumber.toLowerCase().includes(searchInput)
            )}
          pagination={false}
          scroll={{ y: 500 }}
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
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          centered
          width={800}
          overflow-y={scroll}
        >
          <div>
            <div className={css.hhh}>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Хэрэглэгчийн дугаар</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.usernumber}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Хэрэглэгчийн нэр</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.username}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Хаяг</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.address}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Тусгай тэмдэглэл</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.specialNote}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={css.hhh}>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Станц талын дугаар</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.stationNumber}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Урт нь метрээр</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.longMetr}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Үүсгэсэн огноо</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <td className={css.jjj}>Шкаф №</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{modalData.wardrobeNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={css.hhh}>
              <table>
                <thead>
                  <tr>
                    <td className={css.kkk} colSpan="3">
                      Шкаф 1 анги
                    </td>
                    <td className={css.kkk} colSpan="3">
                      Шкаф 2 анги
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={css.jjj}>Гол кабелийн дугаар</td>
                    <td className={css.jjj}>Хосын дугаар</td>
                    <td className={css.jjj}>Салбар кабелийн дугаар</td>
                    <td className={css.jjj}>Гол кабелийн дугаар</td>
                    <td className={css.jjj}>Хосын дугаар</td>
                    <td className={css.jjj}>Салбар кабелийн дугаар</td>
                  </tr>
                  <tr>
                    <td>{modalData?.wardrobeClass1?.[0]?.cableNumber1}</td>
                    <td> {modalData?.wardrobeClass1?.[0]?.coupleNumber1}</td>
                    <td> {modalData?.wardrobeClass1?.[0]?.sectorNumber1}</td>
                    <td>{modalData?.wardrobeClass2?.[0]?.cableNumber2}</td>
                    <td> {modalData?.wardrobeClass2?.[0]?.coupleNumber2}</td>
                    <td> {modalData?.wardrobeClass2?.[0]?.sectorNumber2}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={css.hhh}>
              <table>
                <thead>
                  <tr>
                    <td className={css.kkk} colSpan="3">
                      Тавьсан
                    </td>
                    <td className={css.kkk} colSpan="3">
                      Шилжүүлсэн
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={css.jjj}>Он сар өдөр</td>
                    <td className={css.jjj}>Хүний нэр</td>
                    <td className={css.jjj}>Тайлбар</td>
                    <td className={css.jjj}>Он сар өдөр</td>
                    <td className={css.jjj}>Хүний нэр</td>
                    <td className={css.jjj}>Тайлбар</td>
                  </tr>
                  <tr>
                    <td> {modalData?.install?.[0]?.tavisanOgnoo}</td>
                    <td> {modalData?.install?.[0]?.tavisanHuniiNer}</td>
                    <td> {modalData?.install?.[0]?.tavisanTailbar}</td>
                    <td> {modalData?.transfer?.[0]?.shiljuulsenOgnoo}</td>
                    <td>{modalData?.transfer?.[0]?.shiljuulsenHuniiNer}</td>
                    <td>{modalData?.transfer?.[0]?.shiljuulsenTailbar}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={css.hhh}>
              <table>
                <thead>
                  <tr>
                    <td className={css.kkk} colSpan="3">
                      Хураасан
                    </td>
                    <td className={css.kkk} colSpan="3">
                      Номер сольсон
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={css.jjj}>Он сар өдөр</td>
                    <td className={css.jjj}>Хүний нэр</td>
                    <td className={css.jjj}>Тайлбар</td>
                    <td className={css.jjj}>Он сар өдөр</td>
                    <td className={css.jjj}>Хүний нэр</td>
                    <td className={css.jjj}>Тайлбар</td>
                  </tr>
                  <tr>
                    <td>{modalData?.collect?.[0]?.huraasanOgnoo}</td>
                    <td>{modalData?.collect?.[0]?.huraasanHuniiNer}</td>
                    <td> {modalData?.collect?.[0]?.huraasanTailbar}</td>
                    <td> {modalData?.changeNumber?.[0]?.nomerSolisonOgnoo}</td>
                    <td>
                      {modalData?.changeNumber?.[0]?.nomerSolisonHuniiNer}
                    </td>
                    <td>
                      {" "}
                      {modalData?.changeNumber?.[0]?.nomerSolisonTailbar}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={css.hhh}>
              <table>
                <thead>
                  <tr>
                    <td className={css.kkk} colSpan="3">
                      Нэр сольсон
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={css.jjj}>Он сар өдөр</td>
                    <td className={css.jjj}>Хүний нэр</td>
                    <td className={css.jjj}>Тайлбар</td>
                  </tr>
                  <tr>
                    <td> {modalData?.changeName?.[0]?.nerSolisonOgnoo}</td>
                    <td>{modalData?.changeName?.[0]?.nerSolisonHuniiNer}</td>
                    <td> {modalData?.changeName?.[0]?.nerSolisonTailbar}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={css.bbb}>
              <Button
                type="primary"
                className={css.enjuryButton}
                onClick={enjuryData}
              >
                Гэмтлийн мэдээлэл
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
