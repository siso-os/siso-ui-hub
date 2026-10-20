// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { BottomSheet, BottomSheetClose } from "@siso/ui/blocks/source";
import { Button } from "@siso/ui/atoms/source";

export function TripSheet() {
  return (
    <BottomSheet
      trigger={<Button>Trip details</Button>}
      title="Lisbon, 3 nights"
      description="Oct 12 to Oct 15"
      detents={[0.4, 0.9]}
    >
      <p>Flights, hotel, and bookings.</p>
      <BottomSheetClose asChild><Button variant="secondary">Done</Button></BottomSheetClose>
    </BottomSheet>
  );
}
