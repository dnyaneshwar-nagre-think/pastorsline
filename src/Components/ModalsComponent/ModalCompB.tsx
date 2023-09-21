import React, { useEffect, useReducer, useRef, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import AllCountriesList from "./AllCountriesList";
import debounce from "lodash.debounce";
import axiosInstance from "../../Services/interceptors";
import { Link } from "react-router-dom";
import { initialState, reducer } from "../UseReducer/Modalreducer";

type Props = {
  show: boolean;
  onHide: () => void;
  handleModalA: (value: string) => void;
  setIsModalC: any;
};

const ModalCompB = (props: Props) => {
  const { onHide, handleModalA, setIsModalC } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (page: number) => {
    try {
      dispatch({ type: "SET_LOADING", isLoading: true });

      dispatch({ type: "SET_LOADING", isLoading: true });
      const apiUrl = "/contacts.json";
      const queryParams = {
        noGroupDuplicates: "1",
        companyId: "560",
        page: page,
        countryId: "226",
      };
      const response = await axiosInstance.get(apiUrl, {
        params: queryParams,
      });

      const arrayOfObjects: any[] = [];
      for (const key in response.data.contacts) {
        if (response.data.contacts.hasOwnProperty(key)) {
          const contact = { id: key, ...response.data.contacts[key] };
          arrayOfObjects.push(contact);
        }
      }
      dispatch({ type: "FETCH_DATA", payload: arrayOfObjects });
    } catch (error) {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      const heightMatch = container.scrollTop + container.clientHeight;

      if (heightMatch + 1 >= container.scrollHeight) {
        fetchData(state.page + 1);
      }
    }
  };

  useEffect(() => {
    fetchData(state.page);
  }, []);

  const debouncedHandleScroll = useRef(debounce(handleScroll, 300));

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", debouncedHandleScroll.current);

      return () => {
        container.removeEventListener("scroll", debouncedHandleScroll.current);
      };
    }
  }, [state.page]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const filteredData = isChecked
    ? state.data.filter((item) => item.id % 2 === 0)
    : state.data;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Modal B</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2">
          <Link to="/all-contacts">
            <Button
              onClick={() => handleModalA("A")}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #46139f",
                color: "#46139f",
              }}
              size="lg"
            >
              All Contacts
            </Button>
          </Link>
          <Link to="/us-contacts">
            <Button
              onClick={() => handleModalA("B")}
              className="btnB"
              size="lg"
            >
              US Contacts
            </Button>
          </Link>
          <Button className="BtnC" onClick={onHide} size="lg">
            Close
          </Button>
        </div>

        <div
          className="App"
          style={{ height: "500px", overflowY: "scroll", margin: "10px" }}
          ref={containerRef}
        >
          {state.isLoading && (
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                padding: "10px",
              }}
            >
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {filteredData.length > 0 ? (
            <div>
              <AllCountriesList
                closeModal={onHide}
                setIsModalC={setIsModalC}
                data={filteredData}
              />
              {state.isLoading && (
                <div style={{ textAlign: "center", padding: "10px" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
            </div>
          ) : !state.isLoading && filteredData.length == 0 ? (
            <div style={{ textAlign: "center", padding: "10px" }}>
              No data available.
            </div>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          justifyContent: "flex-start",
        }}
      >
        <Form.Check
          type="checkbox"
          label={`Only even`}
          checked={isChecked}
          onChange={handleCheck}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCompB;
