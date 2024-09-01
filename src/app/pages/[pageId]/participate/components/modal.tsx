"use client";
import { CloseIcon } from "@/assets";
import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePostSelectedDays } from "@/apis/hooks";

interface SelectedDays {
  date: string;
  hour: number;
}

interface ModalPorps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedDays: SelectedDays[];
}

const Modal = ({ setShowModal, selectedDays }: ModalPorps) => {
  const pageId = usePathname().split("/")[2];
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate: postSelectedDays, isPending } = usePostSelectedDays();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSetNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    postSelectedDays(
      {
        pageId,
        selectedDays,
        nickname,
        password,
      },
      {
        onSuccess: () => {
          router.push(`/pages/${pageId}`);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="absolute w-full h-full z-40 top-0 left-0 bg-[#B8B8B8] bg-opacity-50 backdrop-blur-sm">
      <div className="absolute w-full bottom-0 flex flex-col justify-center bg-white px-12 pt-6 pb-10 gap-6 z-50">
        <CloseIcon className="w-5 h-5" onClick={handleCloseModal} />
        <div className="flex flex-col py-2 gap-3">
          <input
            className={`w-full text-center text-xs border-2 px-4 py-2 rounded-xl mobile:text-sm focus:border-blue focus:outline-none ${
              nickname
                ? "border-blue bg-[#ECF9FF] text-blue"
                : "border-[#A9A9A9] text-[#A9A9A9]"
            }`}
            placeholder="닉네임을 설정해주세요."
            onChange={handleSetNickname}
          />
          <input
            className={`w-full text-center text-xs border-2 px-4 py-2 rounded-xl mobile:text-sm focus:border-blue focus:outline-none ${
              password
                ? "border-blue bg-[#ECF9FF] text-blue"
                : "border-[#A9A9A9] text-[#A9A9A9]"
            }`}
            placeholder="비밀번호를 설정해주세요."
            onChange={handleSetPassword}
          />
        </div>
        <button
          disabled={!nickname || !password || isPending}
          onClick={handleSubmit}
          className={`w-full px-4 py-2 text-sm mobile:text-base rounded-lg ${
            nickname && password
              ? "bg-blue text-white"
              : "cursor-not-allowed text-[#8A8A8A] bg-[#F0F0F0]"
          }`}
        >
          <span>완료</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
