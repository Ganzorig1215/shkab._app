// const express = require("express");
// const router = express.Router();
// router.post("/users/create", (req, res) => {
//   const {
//     userNumber,
//     userName,
//     address,
//     specialNote,
//     stationNumber,
//     longMetr,
//     wardrobeNumber,
//     wardrobeClass1,
//     wardrobeClass2,
//     tavisan,
//     shiljuulsen,
//     huraasan,
//     nomerSolison,
//     nerSolison,
//   } = req.body;
//   try {
//     db.query(
//       "INSERT INTO userscard (usernumber, username, address, specialNote, stationNumber, longMetr, wardrobeNumber, wardrobeClass1, wardrobeClass2, install, transfer, collect, changeNumber, changeName, createDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())",
//       [
//         userNumber,
//         userName,
//         address,
//         specialNote,
//         stationNumber,
//         longMetr,
//         wardrobeNumber,
//         wardrobeClass1,
//         wardrobeClass2,
//         tavisan,
//         shiljuulsen,
//         huraasan,
//         nomerSolison,
//         nerSolison,
//       ]
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Амжилттай хадгаллаа",
//       send: req.body,
//     });
//   } catch (error) {
//     console.error("Алдаа гарлаа:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Дотоод серверийн алдаа",
//     });
//   }
// });
// module.exports = router;
