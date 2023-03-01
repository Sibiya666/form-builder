import { Schema } from "yup";
import { FieldType, FormField, Option } from "../types";

interface MakeFieldOptions<TValidator = Schema> {
  options?: Option[];
  required?: boolean;
  defaultValue?: string;
  hidden?: boolean;
  validator?: TValidator;
}

export function makeField<TForm, TValidator = Schema>(
  name: keyof TForm,
  type: FieldType,
  label: string,
  options: MakeFieldOptions<TValidator>
): FormField {
  return {
    // TODO: тип never
    name,
    type,
    label,
    ...options,
  } as FormField;
}
