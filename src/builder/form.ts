import { object, ObjectSchema, Schema } from "yup";
import { FormEntity, isGroup } from "../types";

type ValidatorShape = {
  [x: string]: ObjectSchema<{}> | Schema;
};

function validatorMapper<TForm>(
  acc: ValidatorShape,
  formEnity: FormEntity<TForm, any>
) {
  if (isGroup(formEnity)) {
    acc[formEnity.name as string] = object(
      formEnity.children.reduce(validatorMapper<any>, {}) as any
    );
  } else if (formEnity.validator) {
    acc[formEnity.name as string] = formEnity.validator;
  }

  return acc;
}

export function makeForm<TForm>(...config: FormEntity<TForm, any>[]) {
  // TODO: reduce in reduce greatest hit =D
  const validation = config.reduce(validatorMapper, {});

  return {
    config,
    schemaValidation: object({ ...validation }),
  };
}
