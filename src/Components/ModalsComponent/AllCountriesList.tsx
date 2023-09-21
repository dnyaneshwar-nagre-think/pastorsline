import React from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";

type Props = {
  data: any;
  setIsModalC: any;
  closeModal: any;
};

const AllCountriesList = (props: Props) => {
  const { data, setIsModalC } = props;
  const navigate = useNavigate();

  const handleContactItem = (item: any) => {
    setIsModalC({
      isModal: true,
      item: item,
    });
    navigate("/modalc");
  };

  return (
    <>
      <ListGroup>
        {data &&
          data?.map((item: any, index: number) => {
            return (
              <ListGroup.Item
                onClick={() => handleContactItem(item)}
                key={index}
                className="hover-item"
              >
                ID: {item?.id}
                <p>
                  {item?.first_name} {item?.last_name}
                </p>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
};

export default AllCountriesList;
