import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Entry, entryTypeLabels, EntryWithoutId } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onEntryAdded: (values: EntryWithoutId) => Promise<void>;
  entryType: Entry["type"];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onEntryAdded,
  entryType,
}: Props) => {
  return (
    <div>
      <Dialog open={modalOpen} onClose={onClose}>
        <DialogTitle>{`Add New ${entryTypeLabels[entryType]} Entry`}</DialogTitle>
        <Divider />
        <DialogContent>
          <AddEntryForm
            entryType={entryType}
            onClose={onClose}
            onEntryAdded={onEntryAdded}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEntryModal;
