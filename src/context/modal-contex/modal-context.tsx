import { createContext, ReactNode, useContext, useState } from "react";
import { Breakpoint } from "@mui/material";
import useNotifier from "../../hooks/useNotifier";

type TOptions = {
  maxWidth: Breakpoint;
};
interface ModalContextInterface {
  open: boolean;
  title: ReactNode;
  content: ReactNode;
  width: string;
  closeModal: () => void;
  openModal: (title: ReactNode, content: ReactNode, width?: string) => void;
}

const ModalContext = createContext({ open: false } as ModalContextInterface);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<ReactNode>("");
  const [content, setContent] = useState<ReactNode>(<></>);
  const [width, setWidth] = useState<string>("");
  const { notifyError } = useNotifier();

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = (title: ReactNode, content: ReactNode, width?: string) => {
    setTitle(title);
    setContent(content);
    if (width) {
      setWidth(width);
    }
    setOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{ open, title, content, closeModal, openModal, width }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
