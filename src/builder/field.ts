import { FieldType, FormField, Option } from "../types";

// TODO: Заменить дженерики валидатора на typeof   да и все?
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : any;

interface MakeFieldOptions<TValidator = Function> {
  options?: Option[];
  required?: boolean;
  defaultValue?: string;
  hidden?: boolean;
  validator?: TValidator;
}

export function makeField<TValidator = Function>(
  name: string,
  type: FieldType,
  label: string,
  options: MakeFieldOptions<TValidator>
): FormField {
  return {
    name,
    type,
    label,
    ...options,
  } as FormField;
}
