import React from "react";
import { useConfirmEmailMutation } from "../../features/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmailConfirmationpage = () => {
  const navigate = useNavigate();
  const { confirmationToken } = useParams();
  const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await confirmEmail(confirmationToken);
    navigate("/login");
    toast.success(
      response.message ||
        "you can continue to login , you email has benn verified successfully"
    );
  };
  return (
    <div className="h-[670px] flex flex-col gap-8 justify-center items-center">
      <h2 className="text-3xl text-gray-500 border-b-4 ">
        Verify you email here
      </h2>
      <button
        onClick={handleClick}
        className="bg-blue-500 px-[20px] py-[10px] text-white rounded-md hover:bg-blue-900"
      >
        click me
      </button>
    </div>
  );
};

export default EmailConfirmationpage;
