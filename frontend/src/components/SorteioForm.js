import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#modal");

export default function SorteioForm({ onClose, submitMsg, sorteio }) {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}></span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            x
          </button>
        </div>
        {submitMsg === "" ? (
          <div>Sorteando e enviando...</div>
        ) : (
          <div>
            <div>{submitMsg}</div>
            <hr />
            {sorteio.map((pessoa, index) => {
              return (
                <div>
                  {index + 1}. <strong>{pessoa.nome}</strong> tirou{" "}
                  <strong>{pessoa.amigo.nome}</strong> como amigo secreto!
                  <p />
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontWeight: "bold",
  },
};
