import "./index.scss";
import { Demo } from "@/Example/Demo";
import { DeleteUserModal } from "./DeleteUserModal";

interface Props {
  demoData: { userCount: number; lastAction: string };
}

export function ConfirmationModal({ demoData }: Props) {
  return (
    <Demo
      title="💡 Use Case 1: Confirmation Dialog"
      description="Classic confirmation pattern for destructive actions."
      defaultExpanded={false}
    >
      <DeleteUserModal.Trigger />
      <DeleteUserModal demoData={demoData} />
    </Demo>
  );
}
