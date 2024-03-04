import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./more.module.css";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { notification } from "antd";

const MoreCard = () => {
  // const { usernumber } = useParams();
  const { userId } = useParams();
  console.log(userId);
  const [enjuryData, setEnjuryData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [enjuryId, setEnjuryId] = useState({
    id: "",
  });
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/enjury?userId=${userId}`;
    axios
      .get(apiUrl)
      .then((res) => {
        const fetchedEnjuryData = res.data.data;
        setEnjuryData(fetchedEnjuryData);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  const handleDelete = (enjuryId) => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/deleteEnjury/${enjuryId}`;
    axios
      .delete(apiUrl, enjuryId)
      .then((res) => {
        notification.success({ message: "sdfsfd" });
        setIsDeleting(false);
        setData(enjuryData);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={css.container}>
      {enjuryData.length > 0 ? (
        enjuryData.map((enjury, index) => (
          <table className={css.www}>
            <tbody>
              <tr key={index}>
                <td rowSpan="2">{index + 1} </td>
              </tr>
              <tr>
                <table>
                  <thead>
                    <tr>
                      <td className={css.ddd} colSpan="2">
                        Гарсан гэмтэл
                      </td>
                      <td className={css.ddd} colSpan="3">
                        Шалгалт
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={css.lll}>Он сар өдөр:</td>
                      <td className={css.lll}>Юуны тухай:</td>
                      <td className={css.lll}>Он сар өдөр:</td>
                      <td className={css.lll}>Гэмтлийн байдал:</td>
                      <td className={css.lll}>Гарын үсэг</td>
                    </tr>
                    <tr>
                      <td>{enjury.enjury[0].garsanGemtliinTsag}</td>
                      <td>{enjury.enjury[0].garsanGemtliinTuhai}</td>
                      <td>{enjury.check[0].shalgaltiinTsag}</td>
                      <td>{enjury.check[0].shalgaltiinTuhai}</td>
                      <td>{enjury.check[0].shalgaltiinGariinUseg}</td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr>
                      <td className={css.ddd} colSpan="2">
                        Засуулахаар өгсөн
                      </td>
                      <td className={css.ddd} colSpan="4">
                        Зассан
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={css.lll}>Он сар өдөр:</td>
                      <td className={css.lll}>Хэнд</td>
                      <td className={css.lll}>Он сар өдөр:</td>
                      <td className={css.lll}>Хэнд</td>
                      <td className={css.lll}>Гэмтлийн байдал</td>
                      <td className={css.lll}>Тайлбар</td>
                    </tr>
                    <tr>
                      <td>{enjury.fixing[0].zasuulahaarUgsunTsag}</td>
                      <td>{enjury.fixing[0].hendZasuulahaarUgsun}</td>
                      <td>{enjury.fixed[0].zassanTsag}</td>
                      <td>{enjury.fixed[0].zassanHend}</td>
                      <td>{enjury.fixed[0].zassanTailbar}</td>
                      <td>{enjury.fixed[0].zassanGemtliinBaidal}</td>
                    </tr>
                  </tbody>
                </table>
                <td>
                  <button
                    onClick={() => handleDelete(enjury.id)}
                    // onClick={() => {
                    //   setEnjuryId({
                    //     id: enjury.enjury[0].id,
                    //   });
                    //   handleDelete;
                    // }}
                    className={css.deleteButton}
                    // className={css.iconButton}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))
      ) : (
        <tr>
          <td className={css.ddd} colSpan="5">
            Одоогоор гарсан гэмтэл байхгүй байна.
          </td>
        </tr>
      )}
    </div>
  );
};

export default MoreCard;
