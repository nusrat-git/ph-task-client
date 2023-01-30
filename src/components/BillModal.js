import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "grey",
  },
};

Modal.setAppElement("#root");

const BillModal = ({ closeModal, modalIsOpen, setPaid, paid, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    fetch("https://ph-task-server-self.vercel.app/api/add-billing", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        setPaid(paid + parseFloat(formData.amount));
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Bill Modal"
        shouldCloseOnOverlayClick={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="py-9 mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Add Bill</h1>
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Full Name
            </label>
            <input
              {...register("fullName", { required: true })}
              type="text"
              id="fullName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.fullName && <span>This field is required</span>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Phone
            </label>
            <input
              {...register("phone", {
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
              type="text"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.phone && <span>Invalid Number</span>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Payable Amount
            </label>
            <input
              {...register("amount", { required: true, min: 1 })}
              type="amount"
              id="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.amount && <span>Amount must be bigger than 0</span>}
          </div>
          <div className="mb-6 hidden">
            <label
              htmlFor="time"
              className="block mb-2 text-lg font-semibold text-gray-900"
            >
              Time
            </label>
            <input
              {...register("time", { required: true })}
              type="text"
              id="time"
              defaultValue={new Date()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-72 md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.time && <span>This field is required</span>}
          </div>

          {/* <input type="submit" /> */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BillModal;
