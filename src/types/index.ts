import { Schema } from "yup";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface FormValues {
  dateOn: Date;
  someName: {
    name: string;
    patronymic: string;
    jobTitle: string;
    address: string;
  };
}

export type FieldType = "input" | "select";

export interface Option<TOption = string> {
  label: string;
  value: TOption;
}

export interface FormField<TForm, K extends keyof TForm> {
  //TODO: типизировать name или нет?
  name: K;
  type: FieldType;
  label: string;
  options?: Option[];
  required?: boolean;
  defaultValue?: string;
  hidden?: boolean;
  validator?: Schema;
}

export interface FormGroup<TForm, K extends keyof TForm> {
  name: K;
  children: FormEntity<TForm[K], any>[];
}

export type FormEntity<TForm, K extends keyof TForm> =
  | FormField<TForm, K>
  | FormGroup<TForm, K>;

export function isGroup<TForm, K extends keyof TForm>(
  entity: FormEntity<TForm, K>
): entity is FormGroup<TForm, K> {
  return "children" in entity;
}
