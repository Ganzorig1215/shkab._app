import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import css from "./createCard.style.module.css";
import { notification } from "antd";
import axios from "axios";
// require("dotenv").config();
const CreateCard = () => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState({
    usernumber: "",
    username: "",
    address: "",
    specialNote: "",
    stationNumber: "",
    longMetr: "",
    wardrobeNumber: "",
    cableNumber1: "",
    coupleNumber1: "",
    sectorNumber1: "",
    cableNumber2: "",
    coupleNumber2: "",
    sectorNumber2: "",
    tavisanHuniiNer: "",
    tavisanTailbar: "",
    tavisanOgnoo: "",
    shiljuulsenHuniiNer: "",
    shiljuulsenTailbar: "",
    shiljuulsenOgnoo: "",
    huraasanHuniiNer: "",
    huraasanTailbar: "",
    huraasanOgnoo: "",
    nomerSolisonHuniiNer: "",
    nomerSolisonTailbar: "",
    nomerSolisonOgnoo: "",
    nerSolisonHuniiNer: "",
    nerSolisonTailbar: "",
    nerSolisonOgnoo: "",
  });

  // Input өгөгдлүүдээр state-г шинэчилж өгөх үйлдэл
  const handleInput = (e) => {
    e.persist();
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  // Формыг submit хийх үйлдэл
  const save = (e) => {
    e.preventDefault();
    // HTTP POST хүсэлт илгээх өгөгдлийг бэлдэх
    if (!users.usernumber || !users.username || !users.address) {
      notification.error({ message: "Талбарыг бүрэн бөглөнө үү!" });
      return;
    }
    const data = {
      userNumber: users.usernumber,
      userName: users.username,
      address: users.address,
      specialNote: users.specialNote,
      stationNumber: users.stationNumber,
      longMetr: users.longMetr,
      wardrobeNumber: users.wardrobeNumber,
      wardrobeClass1: [
        {
          cableNumber1: users.cableNumber1,
          coupleNumber1: users.coupleNumber1,
          sectorNumber1: users.sectorNumber1,
        },
      ],
      wardrobeClass2: [
        {
          cableNumber2: users.cableNumber2,
          coupleNumber2: users.coupleNumber2,
          sectorNumber2: users.sectorNumber2,
        },
      ],
      tavisan: [
        {
          tavisanHuniiNer: users.tavisanHuniiNer,
          tavisanTailbar: users.tavisanTailbar,
          tavisanOgnoo: users.tavisanOgnoo,
        },
      ],
      huraasan: [
        {
          huraasanHuniiNer: users.huraasanHuniiNer,
          huraasanTailbar: users.huraasanTailbar,
          huraasanOgnoo: users.huraasanOgnoo,
        },
      ],
      shiljuulsen: [
        {
          shiljuulsenHuniiNer: users.shiljuulsenHuniiNer,
          shiljuulsenTailbar: users.shiljuulsenTailbar,
          shiljuulsenOgnoo: users.shiljuulsenOgnoo,
        },
      ],
      nomerSolison: [
        {
          nomerSolisonHuniiNer: users.nomerSolisonHuniiNer,
          nomerSolisonTailbar: users.nomerSolisonTailbar,
          nomerSolisonOgnoo: users.nomerSolisonOgnoo,
        },
      ],
      nerSolison: [
        {
          nerSolisonHuniiNer: users.nerSolisonHuniiNer,
          nerSolisonTailbar: users.nerSolisonTailbar,
          nerSolisonOgnoo: users.nerSolisonOgnoo,
        },
      ],
    };
    // Сервертэй холбох хаяг
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/users/create`;

    //Axios ашиглан сервертэй холбох үйлдэл
    axios
      .post(apiUrl, data)
      .then((res) => {
        notification.success({ message: res.data.message });
        Navigate("/");
      })
      .catch((error) => {});
  };

  return (
    <div className={css.bigContainer}>
      <h1 className={css.h1}>NGN-Телефон Хэрэглэгчийн карт үүсгэх</h1>
      <Form onSubmit={save}>
        <Form.Item
          label="Хэрэглэгчийн дугаар:"
          name="usernumber"
          rules={[{ required: true, message: "Please input the user number!" }]}
        >
          <Input
            type="text"
            name="usernumber"
            onChange={handleInput}
            value={users.usernumber}
          />
        </Form.Item>

        <Form.Item
          label="Хэрэглэгчийн нэр:"
          name="username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input
            type="text"
            name="username"
            onChange={handleInput}
            value={users.username}
          />
        </Form.Item>
        <Form.Item
          label="Хаяг:"
          name="address"
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input
            type="text"
            name="address"
            onChange={handleInput}
            value={users.address}
          />
        </Form.Item>
      </Form>
      <table>
        <tbody>
          <tr>
            <td>Тусгай тэмдэглэл</td>
            <td colSpan="3">Станц талын дугаар</td>
            <td colSpan="3">Урт нь метрээр</td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="specialNote"
                onChange={handleInput}
                value={users.specialNote}
              />
            </td>
            <td colSpan="3">
              <input
                placeholder="Энд бөглөнө үү"
                name="stationNumber"
                onChange={handleInput}
                value={users.stationNumber}
              />
            </td>
            <td colSpan="3">
              <input
                placeholder="Энд бөглөнө үү"
                name="longMetr"
                onChange={handleInput}
                value={users.longMetr}
              />
            </td>
          </tr>
          <tr>
            <td rowSpan="3">Шкаф №</td>
            <td colSpan="3">Шкаф 1 анги</td>
            <td colSpan="3">Шкаф 2 анги</td>
          </tr>
          <tr>
            <td colSpan="2">Гол кабель</td>
            <td rowSpan="2">Салбар кабелийн дугаар</td>
            <td colSpan="2">Гол кабель</td>
            <td rowSpan="2">Салбар кабелийн дугаар</td>
          </tr>
          <tr>
            <td>Дугаар</td>
            <td>Хосын дугаар</td>
            <td>Дугаар</td>
            <td>Хосын дугаар</td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="wardrobeNumber"
                onChange={handleInput}
                value={users.wardrobeNumber}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="cableNumber1"
                onChange={handleInput}
                value={users.cableNumber1}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="coupleNumber1"
                onChange={handleInput}
                value={users.coupleNumber1}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="sectorNumber1"
                onChange={handleInput}
                value={users.sectorNumber1}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="cableNumber2"
                onChange={handleInput}
                value={users.cableNumber2}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="coupleNumber2"
                onChange={handleInput}
                value={users.coupleNumber2}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="sectorNumber2"
                onChange={handleInput}
                value={users.sectorNumber2}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Төрөл</td>
            <td>Хүний нэр</td>
            <td>Тайлбар</td>
            <td>Он сар өдөр</td>
          </tr>
          <tr>
            <td>Тавьсан</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="tavisanHuniiNer"
                onChange={handleInput}
                value={users.tavisanHuniiNer}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="tavisanTailbar"
                onChange={handleInput}
                value={users.tavisanTailbar}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="tavisanOgnoo"
                onChange={handleInput}
                value={users.tavisanOgnoo}
              />
            </td>
          </tr>
          <tr>
            <td>Шилжүүлсэн</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shiljuulsenHuniiNer"
                onChange={handleInput}
                value={users.shiljuulsenHuniiNer}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shiljuulsenTailbar"
                onChange={handleInput}
                value={users.shiljuulsenTailbar}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shiljuulsenOgnoo"
                onChange={handleInput}
                value={users.shiljuulsenOgnoo}
              />
            </td>
          </tr>
          <tr>
            <td>Хураасан</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="huraasanHuniiNer"
                onChange={handleInput}
                value={users.huraasanHuniiNer}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="huraasanTailbar"
                onChange={handleInput}
                value={users.huraasanTailbar}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="huraasanOgnoo"
                onChange={handleInput}
                value={users.huraasanOgnoo}
              />
            </td>
          </tr>
          <tr>
            <td>Номер сольсон</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nomerSolisonHuniiNer"
                onChange={handleInput}
                value={users.nomerSolisonHuniiNer}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nomerSolisonTailbar"
                onChange={handleInput}
                value={users.nomerSolisonTailbar}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nomerSolisonOgnoo"
                onChange={handleInput}
                value={users.nomerSolisonOgnoo}
              />
            </td>
          </tr>
          <tr>
            <td>Нэр сольсон</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nerSolisonHuniiNer"
                onChange={handleInput}
                value={users.nerSolisonHuniiNer}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nerSolisonTailbar"
                onChange={handleInput}
                value={users.nerSolisonTailbar}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nerSolisonOgnoo"
                onChange={handleInput}
                value={users.nerSolisonOgnoo}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <button type="submit" onClick={save}>
        Submit
      </button> */}
      <Button type="primary" onClick={save} className={css.hadgalah}>
        Хадгалах
      </Button>
    </div>
  );
};
export default CreateCard;
