import React from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
  singleData: any;
};

const SingleContactItem = (props: Props) => {
  const { onHide, singleData } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {singleData?.id}: {singleData?.first_name} {singleData?.last_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "auto" }}>
        <p>Email:{singleData?.email}</p>
        <p>Mobile no:{singleData?.phone_number}</p>
        <p>
          url: <p>{singleData?.external_url}</p>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SingleContactItem;
