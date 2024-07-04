import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalBody = (props) => {
  const [depositAmount, setDepositAmount] = useState("");

  const [disabled, setDisabled] = useState(true);

  const onPayment = (event) => {
    event.preventDefault();
    const { onPayment } = props.payment;
    onPayment('REQ_CRYPTO_DEPOSIT', { id: JSON.parse(localStorage.getItem('user')).id, amount: depositAmount });
  };

  useEffect(() => {
    if (props.wallet) window.open(`${props.wallet.data.payment_url}`, '_blank')
  }, [props.wallet])


  useEffect(() => {
    if (depositAmount !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    };
  }, [depositAmount])

  const onWalletChange = (event) => setDepositAmount(event.target.value);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Crypto Deposit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <form onSubmit={onPayment}>
            <label className="form-label mb-2">Deposit Amount (USD):</label>
            <input
              onChange={onWalletChange}
              type="number"
              className="form-control"
            />
            <Button
              variant="success"
              type="submit"
              className="mt-2 font-weight-bold"
              disabled={disabled}
            >
              Deposit
            </Button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CryptoPayment = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="success"
        size={props.size}
        className={props.classes}
        onClick={() => setModalShow(true)}
      >
        Crypto Deposit
      </Button>

      <ModalBody wallet={props.wallet} payment={{ onPayment: props.objectsRequestHandler }} show={modalShow} onHide={() => setModalShow(false)} />
    </React.Fragment>
  );
};

export default CryptoPayment