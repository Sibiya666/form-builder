export type FieldType = "input" | "select";

export interface Option<TOption = string> {
  label: string;
  value: TOption;
}

export interface FormField<TValidator = Function> {
  //TODO: типизировать name или нет?
  name: string;
  type: FieldType;
  label: string;
  options?: Option[];
  required?: boolean;
  defaultValue?: string;
  hidden?: boolean;
  validator?: TValidator;
}

export interface FormGroup {
  name: string;
  id?: string;
  children: FormEntities[];
}

export type FormEntities = FormField | FormGroup;

export function isGroup(entity: FormEntities): entity is FormGroup {
  return "children" in entity;
}
