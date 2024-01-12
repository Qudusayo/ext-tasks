// @ts-nocheck

import { useState } from "react";
import Modal from "react-modal";
import SearchBar from "./search-bar";

Modal.setAppElement("#root");

const CityList = ({
  showModal,
  modal,
  addCity,
}: {
  showModal: (show: boolean) => void;
  modal: boolean;
  addCity: (tz: string) => void;
}) => {
  const customStyles = {
    overlay: {
      paddingTop: 0,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.525)",
    },
    content: {
      width: "400px",
      height: "80vh",
      backgroundColor: "rgb(33, 33, 33)",
      color: "white",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const closeModal = () => {
    showModal(false);
  };

  const handleClick = (tz) => {
    addCity(tz);
    setFiltered(timezones);
    closeModal();
  };
  const timezones = Intl.supportedValuesOf("timeZone");
  const [filtered, setFiltered] = useState(timezones);
  return (
    <Modal
      isOpen={modal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Timezone Modal"
    >
      <h2 className="text-center mb-6 text-sm">Choose a City</h2>

      <div className="flex gap-2 mb-2 items-center">
        <SearchBar setFiltered={setFiltered} timezones={timezones} />
        <span onClick={closeModal} className="text-red-500 cursor-pointer">
          Cancel
        </span>
      </div>
      <div className="divide-y divide-stone-700 overflow-y-auto">
        {filtered.map((tz) => (
          <p
            onClick={() => handleClick(tz)}
            key={tz}
            className="py-2 text-white text-xl font-light cursor-pointer"
          >
            {tz}
          </p>
        ))}
      </div>
    </Modal>
  );
};

export default CityList;
