import { useEffect } from "react";
import { useModalContext } from "@/ModalProvider";

const MockModalTrigger: React.FC<{ target: string; children: React.ReactNode }> = ({ target, children }) => {
  const { register, openModal, isRegistered } = useModalContext();
  
  useEffect(() => {
    if (!isRegistered(target)) {
      register(target);
    }
  }, [target, register, isRegistered]);
  
  return (
    <div onClick={() => openModal(target)} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export { MockModalTrigger };
