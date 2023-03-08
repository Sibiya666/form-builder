import { Schema } from "yup";

export type FieldType = "input" | "select";

export interface Option<TOption = string> {
  label: string;
  value: TOption;
}

export interface FormField<TForm extends object = {}> {
  //TODO: типизировать name или нет?
  name: keyof TForm;
  type: FieldType;
  label: string;
  options?: Option[];
  required?: boolean;
  defaultValue?: string;
  hidden?: boolean;
  validator?: Schema;
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
