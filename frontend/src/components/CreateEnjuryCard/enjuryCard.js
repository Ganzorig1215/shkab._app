import React, { useState, useEffect } from "react";
import css from "./enjuryCard.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DatePicker, Space, Button, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";
const defaultPort = 4000;

// import moment from "moment";
const { RangePicker } = DatePicker;
const EnjuryCard = () => {
  const [enjury, setEnjury] = useState({
    garsanGemtliinTsag: "",
    garsanGemtliinTuhai: "",
    shalgaltiinTsag: "",
    shalgaltiinTuhai: "",
    shalgaltiinGariinUseg: "",
    zasuulahaarUgsunTsag: "",
    hendZasuulahaarUgsun: "",
    zassanTsag: "",
    zassanHend: "",
    zassanGemtliinBaidal: "",
    zassanTailbar: "",
  });
  const handleInput = (e) => {
    e.persist();
    setEnjury({ ...enjury, [e.target.name]: e.target.value });
  };
  const [test, setTest] = useState();
  const handleDateChange = (date, dateString, name) => {
    setTest((prevEnjury) => ({
      ...prevEnjury,
      [name]: dateString,
    }));
  };
  const save = (e) => {
    e.preventDefault();
    const data = {
      garsanGemtel: [
        {
          garsanGemtliinTsag: test.garsanGemtliinTsag,
          garsanGemtliinTuhai: enjury.garsanGemtliinTuhai,
        },
      ],
      shalgalt: [
        {
          shalgaltiinTsag: test.shalgaltiinTsag,
          shalgaltiinTuhai: enjury.shalgaltiinTuhai,
          shalgaltiinGariinUseg: enjury.shalgaltiinGariinUseg,
        },
      ],
      fixing: [
        {
          zasuulahaarUgsunTsag: test.zasuulahaarUgsunTsag,
          hendZasuulahaarUgsun: enjury.hendZasuulahaarUgsun,
        },
      ],
      fixed: [
        {
          zassanTsag: test.zassanTsag,
          zassanHend: enjury.zassanHend,
          zassanGemtliinBaidal: enjury.zassanGemtliinBaidal,
          zassanTailbar: enjury.zassanTailbar,
        },
      ],
    };
    console.log(data);
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/enjury/${usernumber}`;
    console.log(apiUrl);
    //Axios ашиглан сервертэй холбох үйлдэл
    axios
      .post(apiUrl, data)
      .then((res) => {
        notification.success({ message: res.data.message });
        Navigate("/");
      })
      .catch((error) => {});
  };
  const Navigate = useNavigate();
  const { usernumber } = useParams();
  return (
    <div>
      <h2>NGN-Телефон Хэрэглэгчийн карт</h2>

      <table>
        <tbody>
          <tr>
            <td colSpan="2">Гарсан гэмтэл</td>
            <td colSpan="3">Шалгалт</td>
            <td colSpan="2">Засуулахаар өгсөн</td>
            <td colSpan="4">Зассан</td>
          </tr>
          <tr>
            <td>Он сар өдөр Цаг минут</td>
            <td>Юуны тухай</td>
            <td>Цаг минут</td>
            <td>Шалгалтын ширээнээс гарсан гэмтлийн байдал</td>
            <td>Гарын үсэг</td>
            <td>Он сар өдөр Цаг минут</td>
            <td>Хэнд</td>
            <td>Он сар өдөр Цаг минут</td>
            <td>Хэнд</td>
            <td>Гэмтлийн байдал</td>
            <td>Тайлбар</td>
          </tr>
          <tr>
            <td>
              <Space direction="vertical" size={12}>
                <DatePicker
                  showTime
                  name="garsanGemtliinTsag"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "garsanGemtliinTsag")
                  }
                  defaultValue={
                    enjury.garsanGemtliinTsag
                      ? dayjs(enjury.garsanGemtliinTsag)
                      : null
                  }
                />
              </Space>
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="garsanGemtliinTuhai"
                onChange={handleInput}
                value={enjury.garsanGemtliinTuhai}
              />
            </td>
            <td>
              <Space direction="vertical" size={12}>
                <DatePicker
                  showTime
                  name="shalgaltiinTsag"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "shalgaltiinTsag")
                  }
                  defaultValue={
                    enjury.shalgaltiinTsag
                      ? dayjs(enjury.shalgaltiinTsag)
                      : null
                  }
                />
              </Space>
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shalgaltiinTuhai"
                onChange={handleInput}
                value={enjury.shalgaltiinTuhai}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shalgaltiinGariinUseg"
                onChange={handleInput}
                value={enjury.shalgaltiinGariinUseg}
              />
            </td>
            <td>
              <Space direction="vertical" size={12}>
                <DatePicker
                  showTime
                  name="zasuulahaarUgsunTsag"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "zasuulahaarUgsunTsag")
                  }
                  defaultValue={
                    enjury.zasuulahaarUgsunTsag
                      ? dayjs(enjury.zasuulahaarUgsunTsag)
                      : null
                  }
                />
              </Space>
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="hendZasuulahaarUgsun"
                onChange={handleInput}
                value={enjury.hendZasuulahaarUgsun}
              />
            </td>
            <td>
              <Space direction="vertical" size={12}>
                <DatePicker
                  showTime
                  name="zassanTsag"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "zassanTsag")
                  }
                  defaultValue={
                    enjury.zassanTsag ? dayjs(enjury.zassanTsag) : null
                  }
                />
              </Space>
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="zassanHend"
                onChange={handleInput}
                value={enjury.zassanHend}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="zassanGemtliinBaidal"
                onChange={handleInput}
                value={enjury.zassanGemtliinBaidal}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="zassanTailbar"
                onChange={handleInput}
                value={enjury.zassanTailbar}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button type="primary" onClick={save} className={css.aaa}>
        Хадгалах
      </Button>
    </div>
  );
};
export default EnjuryCard;
