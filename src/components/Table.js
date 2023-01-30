import React, { useState } from "react";
import { useQuery } from "react-query";
import BillModal from "./BillModal";
import Pagination from "./Pagination";
import UpdateModal from "./UpdateModal";

const tableHeaders = [
  "Billing Id",
  "Full Name",
  "Email",
  "Phone",
  "Paid Amount",
  "Action",
];

const Table = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateIsOpen] = useState(false);
  const [paid, setPaid] = useState(0);
  const [bill, setBill] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function openUpdateModal() {
    setUpdateIsOpen(true);
  }
  function closeUpdateModal() {
    setUpdateIsOpen(false);
    setBill({});
  }

  let { data: billings = [], refetch } = useQuery({
    queryKey: ["billing-list"],
    queryFn: async () => {
      const res = await fetch(
        `https://ph-task-server-self.vercel.app/api/billing-list?page=${page}&size=${size}`
      );
      const data = await res.json();
      setCount(data[0]);
      return data[1];
    },
  });

  const size = 10;

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const pages = Math.ceil(count / size);

  const pageHandler = (num) => {
    console.log(num);
    setPage(num);
    fetch(
      `https://ph-task-server-self.vercel.app/api/billing-list?page=${num}&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        billings = data;
        refetch();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`https://ph-task-server-self.vercel.app/api/delete-billing/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };

  const handleUpdate = (e, bill) => {
    e.preventDefault();
    setBill(bill);
    openUpdateModal();
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center px-5 bg-white dark:bg-gray-900">
          <h1 className="text-2xl font-semibold">Billings</h1>
          <h1 className="text-2xl font-semibold">Paid: {paid}</h1>

          <div className="py-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <button className="btn btn-active btn-ghost" onClick={openModal}>
            Add new bill
          </button>
        </div>
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 mb-4">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableHeaders.map((tableHeader, i) => (
                <th scope="col" className="px-6 py-3" key={i}>
                  {tableHeader}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billings.map((bill, i) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={i}
              >
                <td className="px-6 py-4 text-white">{i + 1}</td>
                <td className="px-6 py-4 text-white">{bill.fullName}</td>
                <td className="px-6 py-4 text-white">{bill.email}</td>
                <td className="px-6 py-4 text-white">{bill.phone}</td>
                <td className="px-6 py-4 text-white">${bill.amount}</td>
                <td className="px-6 py-4 text-white">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="btn btn-active btn-ghost"
                      onClick={(e) => handleUpdate(e, bill)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-active btn-ghost"
                      onClick={() => {
                        handleDelete(bill._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BillModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        setPaid={setPaid}
        paid={paid}
        refetch={refetch}
      ></BillModal>
      <UpdateModal
        openUpdateModal={openUpdateModal}
        updateModalIsOpen={updateModalIsOpen}
        closeUpdateModal={closeUpdateModal}
        setPaid={setPaid}
        paid={paid}
        refetch={refetch}
        bill={bill}
        setBill={setBill}
      ></UpdateModal>
      <Pagination pages={pages} pageHandler={pageHandler}></Pagination>
    </div>
  );
};

export default Table;
