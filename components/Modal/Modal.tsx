import React, { FC } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Room } from "../../types";
import ModalForm from "./ModalForm";

const Container = styled("div")`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
  }

  .modal-wrapper {
    position: fixed;
    top: 185px;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
  }

  .modal {
    z-index: 100;
    background: white;
    position: relative;
    margin: 1.75rem auto;
    border-radius: 3px;
    max-width: 25rem;
    padding: 1rem;
  }

  .modal-header {
    display: flex;
    justify-content: flex-end;
  }

  .modal-close-button {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    opacity: 0.4;
    cursor: pointer;
    border: none;
    background-color: #f00;
  }

  button {
    font-size: 0.9rem;
    font-weight: 700;
    border: none;
    border-radius: 3px;
    padding: 0.3rem 1rem;
    margin-left: 0.5rem;
  }

  .button-default {
    background: #247ba0;
    color: #fff;
  }
`;

type ModalProps = {
  createRoom: (room: Room) => void;
  isShowing: boolean;
  hide: () => void;
};

const Modal: FC<ModalProps> = ({ isShowing, hide, createRoom }) =>
  isShowing
    ? ReactDOM.createPortal(
        <Container>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <ModalForm createRoom={createRoom} />
            </div>
          </div>
        </Container>,
        document.body
      )
    : null;

export default Modal;
