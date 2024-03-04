import React, { useState, useEffect } from "react";
import css from "./enjuryCard.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DatePicker, Space, Button, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";
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
  const [test, setTest] = useState("");
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
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/enjury/${userId}`;
    console.log(apiUrl);
    axios
      .post(apiUrl, data)
      .then((res) => {
        notification.success({ message: res.data.message });
        Navigate("/");
      })
      .catch((error) => {});
  };
  const Navigate = useNavigate();
  const { userId } = useParams();
  return (
    <div className={css.bigContainer}>
      <h1 className={css.h1}>NGN-Телефон Хэрэглэгчийн картын гэмтэл үүсгэх</h1>

      <table>
        <tbody>
          <tr>
            <td className={css.td} colSpan="2">
              Гарсан гэмтэл
            </td>
            <td className={css.td} colSpan="3">
              Шалгалт
            </td>
            <td className={css.td} colSpan="2">
              Засуулахаар өгсөн
            </td>
            <td className={css.td} colSpan="4">
              Зассан
            </td>
          </tr>
          <tr>
            <td className={css.td}>Он сар өдөр Цаг минут</td>
            <td className={css.td}>Юуны тухай</td>
            <td className={css.td}>Цаг минут</td>
            <td className={css.td}>
              Шалгалтын ширээнээс гарсан гэмтлийн байдал
            </td>
            <td className={css.td}>Гарын үсэг</td>
            <td className={css.td}>Он сар өдөр Цаг минут</td>
            <td className={css.td}>Хэнд</td>
            <td className={css.td}>Он сар өдөр Цаг минут</td>
            <td className={css.td}>Хэнд</td>
            <td className={css.td}>Гэмтлийн байдал</td>
            <td className={css.td}>Тайлбар</td>
          </tr>
          <tr>
            <td className={css.td}>
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
            <td className={css.td}>
              <input
                placeholder="Энд бөглөнө үү"
                name="garsanGemtliinTuhai"
                onChange={handleInput}
                value={enjury.garsanGemtliinTuhai}
              />
            </td>
            <td className={css.td}>
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
            <td className={css.td}>
              <input
                placeholder="Энд бөглөнө үү"
                name="shalgaltiinTuhai"
                onChange={handleInput}
                value={enjury.shalgaltiinTuhai}
              />
            </td>
            <td className={css.td}>
              <input
                placeholder="Энд бөглөнө үү"
                name="shalgaltiinGariinUseg"
                onChange={handleInput}
                value={enjury.shalgaltiinGariinUseg}
              />
            </td>
            <td className={css.td}>
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
            <td className={css.td}>
              <input
                placeholder="Энд бөглөнө үү"
                name="hendZasuulahaarUgsun"
                onChange={handleInput}
                value={enjury.hendZasuulahaarUgsun}
              />
            </td>
            <td className={css.td}>
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
            <td className={css.td}>
              <input
                placeholder="Энд бөглөнө үү"
                name="zassanHend"
                onChange={handleInput}
                value={enjury.zassanHend}
              />
            </td>
            <td className={css.td}>
              <input
                placeholder="Энд бөглөнө үү"
                name="zassanGemtliinBaidal"
                onChange={handleInput}
                value={enjury.zassanGemtliinBaidal}
              />
            </td>
            <td className={css.td}>
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

      <Button type="primary" onClick={save} className={css.saveButton}>
        Хадгалах
      </Button>
    </div>
  );
};
export default EnjuryCard;
