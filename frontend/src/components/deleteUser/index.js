// import React, { useState, useEffect } from "react";
// import css from "./style.module.css";
// import MyInput from "../myInput";
// import axios from "axios";
// import { Navigate, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { notification } from "antd";
// import Navbar from "../Navbar";

// const defaultPort = 4000;

// const DeleteUser = () => {
//   const Navigate = useNavigate();
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     usernumber: "",
//     username: "",
//     address: "",
//     enjury: "",
//     date: "",
//   });
//   const [usernumber, setUsernumber] = useState("");
//   const [date, setDate] = useState("");
//   const [username, setUsername] = useState("");
//   const [address, setAddress] = useState("");
//   const [enjury, setEnjury] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/update?id=${id}`)
//       .then((res) => {
//         const userData = res.data.data;
//         setUsernumber(userData[0].number);
//         setDate(userData[0].date);
//         setUsername(userData[0].username);
//         setAddress(userData[0].address);
//         setEnjury(userData[0].enjury);
//       })
//       .catch((err) => console.log(Error));
//   }, [id]);
//   const handleDelete = () => {
//     const data = {
//       usernumber,
//       username,
//       address,
//       enjury,
//       date,
//     };
//     const apiUrl = `http://localhost:${
//       process.env.PORT || defaultPort
//     }/delete/${id}`;
//     axios.delete(apiUrl, data).then((res) => {
//       if (res.data.success) {
//         notification.success({ message: res.data.message });
//         Navigate("/");
//       } else {
//         notification.error({ message: "not deleted" });
//       }
//     });
//   };
//   return (
//     <div>
//       <div className={css.container}>
//         <Navbar />
//         <div className={css.card}>
//           <div className={css.cardHeader}>
//             <h3>Хэрэглэгчийн мэдээллийг устгах</h3>
//           </div>
//           <div className={css.cardBody}>
//             <form>
//               <p>
//                 <strong>Номер:</strong>
//                 {usernumber}
//               </p>
//               <ul>
//                 <li className={css.li}>Хэрэглэгчийн нэр:{username}</li>
//                 <li>Хаяг:{address}</li>
//               </ul>
//               <p>Гарсан гэмтэл:{enjury}</p>
//               <button type="button" onClick={handleDelete}>
//                 Устгах
//               </button>
//               <button type="button">bustah</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default DeleteUser;
