import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./more.module.css";
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
    <table className={css.qqq}>
      {enjuryData.length > 0 ? (
        enjuryData.map((enjury, index) => (
          <tr key={index}>
            <td className={css.ddd}>{index + 1}</td>
            <tr>
              <table className={css.www}>
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
              <table className={css.www}>
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
            </tr>
          </tr>
        ))
      ) : (
        <tr>
          <td className={css.ddd} colSpan="5">
            Одоогоор гарсан гэмтэл байхгүй байна.
          </td>
        </tr>
      )}
    </table>
  );
};

export default MoreCard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import css from "./more.module.css";
// import { useParams } from "react-router-dom";

// const MoreCard = () => {
//   const { usernumber } = useParams();
//   const [enjuryData, setEnjuryData] = useState([]);

//   useEffect(() => {
//     const apiUrl = `${process.env.REACT_APP_BASE_URL}/enjury?usernumber=${usernumber}`;
//     axios
//       .get(apiUrl)
//       .then((res) => {
//         const fetchedEnjuryData = res.data.data;
//         setEnjuryData(fetchedEnjuryData);
//       })
//       .catch((err) => console.log(err));
//   }, [usernumber]);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <td className={css.lll}>
//             №
//           </td>
//           <td className={css.lll}>
//             Гарсан гэмтэл
//           </td>
//           <td className={css.lll}>
//             Шалгалт
//           </td>
//           <td className={css.lll}>
//             Засуулахаар өгсөн
//           </td>
//           <td className={css.lll}>
//             Зассан
//           </td>
//         </tr>
//       </thead>
//       <tbody>
//         {enjuryData.length > 0 ? (
//           enjuryData.map((enjury, index) => (
//             <tr key={index}>
//               <tr>{index + 1}</tr>
//               <tr className={css.aaa}>
//                 <td>
//                   Он сар өдөр:
//                 </td>
//                 <td>{enjury.enjury[0].garsanGemtliinTsag}</td>
//                 <td>
//                   Юуны тухай:
//                 </td>
//                 <td>{enjury.enjury[0].garsanGemtliinTuhai}</td>
//               </tr>
//               <tr className={css.bbb}>
//                 <td>
//                   Он сар өдөр:
//                 </td>
//                 <td>{enjury.check[0].shalgaltiinTsag}</td>
//                 <td>
//                   Гэмтлийн байдал:
//                 </td>
//                 <td>{enjury.check[0].shalgaltiinTuhai}</td>
//                 <td>
//                   Гарын үсэг:
//                 </td>
//                 <td>{enjury.check[0].shalgaltiinGariinUseg}</td>
//               </tr>
//               <tr className={css.ccc}>
//                 <td>
//                   Он сар өдөр:
//                 </td>
//                 <td>{enjury.fixing[0].zasuulahaarUgsunTsag}</td>
//                 <td>
//                   Хэнд:
//                 </td>
//                 <td>{enjury.fixing[0].hendZasuulahaarUgsun}</td>
//               </tr>
//               <tr className={css.ddd}>
//                 <td>
//                   Он сар өдөр:
//                 </td>
//                 <td>{enjury.fixed[0].zassanTsag}</td>
//                 <td>
//                   Хэнд:
//                 </td>
//                 <td>{enjury.fixed[0].zassanHend}</td>
//                 <td>
//                   Гэмтлийн байдал:
//                 </td>
//                 <td>{enjury.fixed[0].zassanTailbar}</td>
//                 <td>
//                   Тайлбар:
//                 </td>
//                 <td>{enjury.fixed[0].zassanGemtliinBaidal}</td>
//               </tr>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td className={css.ddd} colSpan="5">Одоогоор гарсан гэмтэл байхгүй байна.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default MoreCard;
