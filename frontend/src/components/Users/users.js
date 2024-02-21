import React, { useState, useEffect } from "react";
import css from "./users.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Input, notification, Button } from "antd";

const UpdateUserCard = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const Navigate = useNavigate();
  const back = () => {
    Navigate("/");
  };

  const [user, setUser] = useState({
    usernumber: "",
    username: "",
    address: "",
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
  console.log(user);
  const [usernumber, setUsernumber] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [wardrobeNumber, setWardrobeNumber] = useState("");
  const [wardrobeClass1, setWardrobeClass1] = useState("");
  const [wardrobeClass2, setWardrobeClass2] = useState("");
  const [install, setInstall] = useState("");
  const [transfer, setTransfer] = useState("");
  const [collect, setCollect] = useState("");
  const [changeNumber, setChangeNumber] = useState("");
  const [changeName, setChangeName] = useState("");
  const [createDate, setCreateDate] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:4000/update?id=${id}`)
      .then((res) => {
        const userData = res.data.data;
        console.log(userData);
        //state-d data haruulna
        setUser({
          usernumber: userData[0].usernumber,
          username: userData[0].username,
          address: userData[0].address,
          specialNote: userData[0].specialNote,
          stationNumber: userData[0].stationNumber,
          longMetr: userData[0].longMetr,
          wardrobeNumber: userData[0].wardrobeNumber,
          cableNumber1: userData[0].wardrobeClass1[0].cableNumber1,
          coupleNumber1: userData[0].wardrobeClass1[0].coupleNumber1,
          sectorNumber1: userData[0].wardrobeClass1[0].sectorNumber1,
          cableNumber2: userData[0].wardrobeClass2[0].cableNumber2,
          coupleNumber2: userData[0].wardrobeClass2[0].coupleNumber2,
          sectorNumber2: userData[0].wardrobeClass2[0].sectorNumber2,
          tavisanHuniiNer: userData[0].install[0].tavisanHuniiNer,
          tavisanTailbar: userData[0].install[0].tavisanTailbar,
          tavisanOgnoo: userData[0].install[0].tavisanOgnoo,
          shiljuulsenHuniiNer: userData[0].transfer[0].shiljuulsenHuniiNer,
          shiljuulsenTailbar: userData[0].transfer[0].shiljuulsenTailbar,
          shiljuulsenOgnoo: userData[0].transfer[0].shiljuulsenOgnoo,
          huraasanHuniiNer: userData[0].collect[0].huraasanHuniiNer,
          huraasanTailbar: userData[0].collect[0].huraasanTailbar,
          huraasanOgnoo: userData[0].collect[0].huraasanOgnoo,
          nomerSolisonHuniiNer:
            userData[0].changeNumber[0].nomerSolisonHuniiNer,
          nomerSolisonTailbar: userData[0].changeNumber[0].nomerSolisonTailbar,
          nomerSolisonOgnoo: userData[0].changeNumber[0].nomerSolisonOgnoo,
          nerSolisonHuniiNer: userData[0].changeName[0].nerSolisonHuniiNer,
          nerSolisonTailbar: userData[0].changeName[0].nerSolisonTailbar,
          nerSolisonOgnoo: userData[0].changeName[0].nerSolisonOgnoo,
        });
      })
      .catch((err) => console.log(Error));
  }, [id]);
  const handleInput = (e) => {
    e.persist();
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };
  const save = (e) => {
    e.preventDefault();

    const data = {
      usernumber: user.usernumber || "",
      username: user.username || "",
      address: user.address || "",
      specialNote: user.specialNote || "",
      stationNumber: user.longMetr || "",
      longMetr: user.longMetr || "",
      wardrobeNumber: user.wardrobeNumber || "",
      wardrobeClass1: [
        {
          cableNumber1: user.cableNumber1 || "",
          coupleNumber1: user.coupleNumber1 || "",
          sectorNumber1: user.sectorNumber1 || "",
        },
      ],
      wardrobeClass2: [
        {
          cableNumber2: user.cableNumber2 || "",
          coupleNumber2: user.coupleNumber2 || "",
          sectorNumber2: user.sectorNumber2 || "",
        },
      ],
      install: [
        {
          tavisanHuniiNer: user.tavisanHuniiNer || "",
          tavisanTailbar: user.tavisanTailbar || "",
          tavisanOgnoo: user.tavisanOgnoo || "",
        },
      ],
      transfer: [
        {
          shiljuulsenHuniiNer: user.shiljuulsenHuniiNer,
          shiljuulsenTailbar: user.shiljuulsenTailbar,
          shiljuulsenOgnoo: user.shiljuulsenOgnoo,
        },
      ],
      collect: [
        {
          huraasanHuniiNer: user.huraasanHuniiNer,
          huraasanTailbar: user.huraasanTailbar,
          huraasanOgnoo: user.huraasanOgnoo,
        },
      ],
      changeNumber: [
        {
          nomerSolisonHuniiNer: user.nomerSolisonHuniiNer,
          nomerSolisonTailbar: user.nomerSolisonTailbar,
          nomerSolisonOgnoo: user.nomerSolisonOgnoo,
        },
      ],
      changeName: [
        {
          nerSolisonHuniiNer: user.nerSolisonHuniiNer,
          nerSolisonTailbar: user.nerSolisonTailbar,
          nerSolisonOgnoo: user.nerSolisonOgnoo,
        },
      ],
    };
    console.log(data);

    const apiUrl = `http://localhost:4000/update/${id}`;
    axios.put(apiUrl, data).then((res) => {
      if (res.data.updated) {
        notification.success({ message: res.data.message });
        Navigate("/");
      } else {
        notification.error({ message: "Not updated" });
      }
    });
  };

  return (
    <div className="card-container">
      <h2>NGN-Телефон Хэрэглэгчийн карт</h2>
      <Form
        fields={[
          {
            name: ["usernumber"],
            value: user?.usernumber,
          },
          {
            name: ["username"],
            value: user?.username,
          },
          {
            name: ["address"],
            value: user?.address,
          },
        ]}
        onSubmit={save}
      >
        <Form.Item
          label="Хэрэглэгчийн дугаар:"
          name="usernumber"
          rules={[{ required: true, message: "Please input the user number!" }]}
        >
          <Input
            type="text"
            name="usernumber"
            onChange={handleInput}
            // defaultValue={user.usernumber}
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
            // defaultValue={user.username}
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
            // defaultValue={address}
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
                value={user.specialNote || ""}
                onChange={handleInput}
              />
            </td>
            <td colSpan="3">
              <input
                placeholder="Энд бөглөнө үү"
                name="stationNumber"
                value={user.stationNumber || ""}
                onChange={handleInput}
              />
            </td>
            <td colSpan="3">
              <input
                placeholder="Энд бөглөнө үү"
                name="longMetr"
                value={user.longMetr || ""}
                onChange={handleInput}
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
                defaultValue={user.wardrobeNumber || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="cableNumber1"
                defaultValue={user.cableNumber1 || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="coupleNumber1"
                defaultValue={user.coupleNumber1 || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="sectorNumber1"
                defaultValue={user.sectorNumber1 || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="cableNumber2"
                defaultValue={user.cableNumber2 || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="coupleNumber2"
                defaultValue={user.coupleNumber2 || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="sectorNumber2"
                defaultValue={user.sectorNumber2 || ""}
                onChange={handleInput}
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
                defaultValue={user.tavisanHuniiNer || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="tavisanTailbar"
                defaultValue={user.tavisanTailbar || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="tavisanOgnoo"
                defaultValue={user.tavisanOgnoo || ""}
                onChange={handleInput}
              />
            </td>
          </tr>
          <tr>
            <td>Шилжүүлсэн</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shiljuulsenHuniiNer"
                defaultValue={user.shiljuulsenHuniiNer || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shiljuulsenTailbar"
                defaultValue={user.shiljuulsenTailbar || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="shiljuulsenOgnoo"
                defaultValue={user.shiljuulsenOgnoo || ""}
                onChange={handleInput}
              />
            </td>
          </tr>
          <tr>
            <td>Хураасан</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="huraasanHuniiNer"
                defaultValue={user.huraasanHuniiNer || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="huraasanTailbar"
                defaultValue={user.huraasanTailbar || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="huraasanOgnoo"
                defaultValue={user.huraasanOgnoo || ""}
                onChange={handleInput}
              />
            </td>
          </tr>
          <tr>
            <td>Номер сольсон</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nomerSolisonHuniiNer"
                defaultValue={user.nomerSolisonHuniiNer || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nomerSolisonTailbar"
                defaultValue={user.nomerSolisonTailbar || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nomerSolisonOgnoo"
                defaultValue={user.nomerSolisonOgnoo || ""}
                onChange={handleInput}
              />
            </td>
          </tr>
          <tr>
            <td>Нэр сольсон</td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nerSolisonHuniiNer"
                defaultValue={user.nerSolisonHuniiNer || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nerSolisonTailbar"
                defaultValue={user.nerSolisonTailbar || ""}
                onChange={handleInput}
              />
            </td>
            <td>
              <input
                placeholder="Энд бөглөнө үү"
                name="nerSolisonOgnoo"
                defaultValue={user.nerSolisonOgnoo || ""}
                onChange={handleInput}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <button type="submit" onClick={save}>
        Submit
      </button> */}
      <Button onClick={save} type="primary" className={css.aaa}>
        Хадгалах
      </Button>
    </div>
  );
};
export default UpdateUserCard;
