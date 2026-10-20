// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Pagination } from "@siso/blocks/source";

export function Results() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
}
