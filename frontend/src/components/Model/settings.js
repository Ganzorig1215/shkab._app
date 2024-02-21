import React, { useState, useEffect } from "react";
import css from "./settings.module.css";
import DarkMode from "../DarkMode";

const Settings = () => {
  return (
    <div className={css.container}>
      <DarkMode />
    </div>
  );
};
export default Settings;
// const Settings = () => {
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <div>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };
// export default Settings;
