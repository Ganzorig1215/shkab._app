import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MoreCard = () => {
  const { usernumber } = useParams();
  const [enjuryData, setEnjuryData] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/enjury?usernumber=${usernumber}`;
    axios
      .get(apiUrl)
      .then((res) => {
        const fetchedEnjuryData = res.data.data;
        setEnjuryData(fetchedEnjuryData);
      })
      .catch((err) => console.log(err));
  }, [usernumber]);

  return (
    <table>
      <thead>
        <tr>
          <td>
            <b>№</b>
          </td>
          <td>
            <b>Гарсан гэмтэл</b>
          </td>
          <td>
            <b>Шалгалт</b>
          </td>
          <td>
            <b>Засуулахаар өгсөн</b>
          </td>
          <td>
            <b>Зассан</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {enjuryData.length > 0 ? (
          enjuryData.map((enjury, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <p>
                  <b>Он сар өдөр:</b> {enjury.enjury[0].garsanGemtliinTsag}
                </p>
                <p>
                  <b>Юуны тухай:</b> {enjury.enjury[0].garsanGemtliinTuhai}
                </p>
              </td>
              <td>
                <p>
                  <b>Он сар өдөр:</b> {enjury.check[0].shalgaltiinTsag}
                </p>
                <p>
                  <b>Гэмтлийн байдал:</b> {enjury.check[0].shalgaltiinTuhai}
                </p>
                <p>
                  <b>Гарын үсэг:</b> {enjury.check[0].shalgaltiinGariinUseg}
                </p>
              </td>
              <td>
                <p>
                  <b>Он сар өдөр:</b> {enjury.fixing[0].zasuulahaarUgsunTsag}
                </p>
                <p>
                  <b>Хэнд:</b> {enjury.fixing[0].hendZasuulahaarUgsun}
                </p>
              </td>
              <td>
                <p>
                  <b>Он сар өдөр:</b> {enjury.fixed[0].zassanTsag}
                </p>
                <p>
                  <b>Хэнд:</b> {enjury.fixed[0].zassanHend}
                </p>
                <p>
                  <b>Гэмтлийн байдал:</b> {enjury.fixed[0].zassanTailbar}
                </p>
                <p>
                  <b>Тайлбар:</b> {enjury.fixed[0].zassanGemtliinBaidal}
                </p>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Одоогоор гарсан гэмтэл байхгүй байна.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MoreCard;
