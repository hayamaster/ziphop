import Logo from "@/assets/logo.svg";

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center justify-center px-10 py-12">
      <i className="flex justify-center items-center w-full py-8">
        <Logo />
      </i>
      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="미팅 이름을 지어주세요."
          className="w-full px-4 py-2 border-2 border-[#DADADA] rounded-xl placeholder:text-xs text-sm text-center focus:border-[#00B2FF] focus:outline-none"
        />
      </div>
      <div>ziphop</div>
      <div>s</div>
    </main>
  );
}
