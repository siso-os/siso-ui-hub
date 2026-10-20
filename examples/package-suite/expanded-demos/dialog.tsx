// uihub: siso:package-workbench
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@siso/blocks/source";
import { Button } from "@siso/blocks/source";

export function RenameProject() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button>Rename</Button></DialogTrigger>
      <DialogContent title="Rename project" description="This changes the URL too.">
        <input defaultValue="Arc" aria-label="Project name" />
        <DialogClose asChild><Button>Save</Button></DialogClose>
      </DialogContent>
    </Dialog>
  );
}
