import { FormEntities, FormGroup } from "../types";

export function makeGroup(name: string, id: string, children?: FormEntities[]) {
  return {
    name,
    id,
    children,
  } as FormGroup;
}
