import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../_Chat.scss";
import DataTable from "../../../../components/common/dataTable/DataTable";
import { getMembers } from "../../../../../core/actions/Chat.action";
import CustomButton from "../../../../components/atom/Button";

function ChatMember({ setUserOpen, setViewUser }) {
  const [allMembers, setAllMembers] = useState([]);
  const dispatch = useDispatch();
  const fetchesUser = useSelector(({ users }) => users.loginUserData);
  const handleView = (userData) => {
    setUserOpen(true);
    setViewUser(userData);
  };
  useEffect(() => {
    async function getAllMembers() {
      let result = await dispatch(getMembers(fetchesUser.user._id));
      if (result?.data?.statusCode === 1) {
        setAllMembers(result.data.result);
      }
    }
    getAllMembers();
  }, []);
  const columns = [
    {
      dataField: "userImage",
      text: "user Img",
      formatter: (cell, row) => (
        <img
          src={row.userImage}
          alt={row.first_name}
          width="46"
          height="46"
        ></img>
      ),
    },
    {
      dataField: "first_name",
      text: "User Name",
      hidden: true,
    },
    {
      dataField: "first_name",
      text: "User Name",
      sort: true,
      formatter: (cell, row) => (
        <CustomButton
          variant="link"
          text={row.first_name}
          type="button"
          id="viewButton"
          onClick={() => handleView(row)}
        />
      ),
    },
    {
      dataField: "email_address",
      text: "Email",
    },

    {
      dataField: "phone_number",
      text: "Phone",
    },
  ];
  return (
    <div className="chat-member">
      <DataTable
        keyField="id"
        defaultSortField="first_name"
        data={allMembers}
        columns={columns}
      />
    </div>
  );
}

export default ChatMember;
