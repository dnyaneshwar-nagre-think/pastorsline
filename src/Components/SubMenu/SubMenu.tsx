import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../../App.css";
import ModalCompB from "../ModalsComponent/ModalCompB";
import ModalCompA from "../ModalsComponent/ModalCompA";
import SingleContactItem from "../ModalsComponent/SingleContactItem";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

const SubMenu = () => {
  const navigate = useNavigate();

  const [isModalC, setIsModalC] = useState({
    isModal: false,
    item: "",
  });

  const [modalShow, setModalShow] = useState({
    modalA: false,
    modalB: false,
  });

  const handleModalA = (modal: string) => {
    if (modal === "A") {
      setModalShow((prev) => ({
        ...prev,
        modalA: true,
        modalB: false,
      }));

      return;
    }
    setModalShow((prev) => ({
      ...prev,
      modalA: false,
      modalB: true,
    }));
  };

  const handleCloseModal = () => {
    setModalShow((prev) => ({
      ...prev,
      modalA: false,
      modalB: false,
    }));
    navigate("/");
  };

  const handleCloseModalC = () => {
    setIsModalC({
      isModal: false,
      item: "",
    });
    navigate("/");
  };

  useEffect(() => {
    if (isModalC.isModal) {
      setModalShow((prev) => ({
        ...prev,
        modalA: false,
        modalB: false,
      }));
    }
  }, [isModalC]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="d-flex gap-2">
            <Link to={"/all-contacts"}>
              <Button
                onClick={() => handleModalA("A")}
                className="btnA"
                size="lg"
              >
                Button A
              </Button>
            </Link>

            <Link to={"/us-contacts"}>
              <Button
                className="btnB"
                onClick={() => handleModalA("B")}
                size="lg"
              >
                Button B
              </Button>
            </Link>
          </div>
        }
      />

      <Route
        path="/all-contacts"
        element={
          <ModalCompA
            show={modalShow.modalA}
            onHide={handleCloseModal}
            handleModalA={handleModalA}
            setIsModalC={setIsModalC}
          />
        }
      ></Route>

      {modalShow.modalB && (
        <Route
          path="/us-contacts"
          element={
            <ModalCompB
              show={modalShow.modalB}
              onHide={handleCloseModal}
              handleModalA={handleModalA}
              setIsModalC={setIsModalC}
            />
          }
        ></Route>
      )}

      {isModalC.isModal && (
        <Route
          path="/modalc"
          element={
            <SingleContactItem
              show={isModalC.isModal}
              onHide={handleCloseModalC}
              singleData={isModalC.item}
            />
          }
        ></Route>
      )}
    </Routes>
  );
};

export default SubMenu;
