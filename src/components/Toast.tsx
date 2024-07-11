import toastReactHot, { Toast } from "react-hot-toast";
import { VscError } from "react-icons/vsc";

export { Toaster } from "react-hot-toast";
export const toast = {
  error: (msg: string) => {
    return toastReactHot.custom((t) => <ToastError t={t} msg={msg} />);
  },
};

type PropsError = {
  t: Toast;
  msg: string;
};

function ToastError({ t, msg }: PropsError) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-red-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex gap-6 items-center">
          <div className="color-red-500">
            <VscError color="red" />
          </div>
          <p className="text-base text-red-500">{msg}</p>
        </div>
      </div>
      <div className="flex border-l border-red-300">
        <button
          onClick={() => toastReactHot.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-500 hover:text-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
