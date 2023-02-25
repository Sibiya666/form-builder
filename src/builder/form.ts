//TODO: типизация формы

import { object } from "yup";
import { FormEntities, isGroup } from "../types";

// interface MakeFormProps {
//     [field: string]:
// }
function validatorMapper(acc, formEnity) {
  if (!isGroup(formEnity)) {
    acc[formEnity.name] = formEnity.validator;
  } else {
    acc[formEnity.name] = object(
      formEnity.children.reduce(validatorMapper, {})
    );
  }

  return acc;
}

export function makeForm(config: FormEntities[]) {
  // TODO: reduce in reduce greatest hit =D
  const validation = config.reduce(validatorMapper, {});
  console.log(validation);
  return {
    config,
    schemaValidation: object({ ...validation }),
  };
}
