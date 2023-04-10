import { FormEntity, FormGroup } from "../types";

export function makeGroup<TForm, K extends keyof TForm>(
  name: K,
  children: FormEntity<TForm[K], any>[]
) {
  return {
    name,
    children,
  } as FormGroup<TForm, K>;
}
