import { object, ObjectSchema, Schema } from "yup";
import { FormEntities, isGroup } from "../types";

type ValidatorShape = {
  [x: string]: ObjectSchema<{}> | Schema;
};

function validatorMapper(acc: ValidatorShape, formEnity: FormEntities) {
  if (isGroup(formEnity)) {
    acc[formEnity.name] = object(
      formEnity.children.reduce(validatorMapper, {})
    );
  } else if (formEnity.validator) {
    acc[formEnity.name] = formEnity.validator;
  }

  return acc;
}

export function makeForm(config: FormEntities[]) {
  // TODO: reduce in reduce greatest hit =D
  const validation = config.reduce(validatorMapper, {});

  return {
    config,
    schemaValidation: object({ ...validation }),
  };
}
