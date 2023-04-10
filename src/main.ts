import { date, lazy, string } from "yup";
import { makeField } from "./builder/field";
import { makeForm } from "./builder/form";
import { makeGroup } from "./builder/group";
import { FormValues } from "./types";

const form = makeForm<FormValues>(
  makeField("dateOn", "input", "Дата выхода на работу", {
    validator: date().default(() => new Date()),
  }),
  makeGroup("someName", [
    makeField("name", "input", "Имя брата>", {
      validator: string().required(),
    }),
    makeField("patronymic", "input", "Отчество", {
      validator: string()
        .nullable()
        .test({
          name: "isEmpty",
          message: "Отчество должно начинаться с большой буквы",
          test: (value) =>
            value ? (value[0].match(/^[А-ЯA-Z]+$/)?.length ?? -1) > 0 : false,
        }),
    }),
    makeField("jobTitle", "select", "Должность", {
      validator: string().nullable(),
    }),
    //TODO: если добавить дженерик то ломается тип валидатора
    makeField("address", "input", "адрес", {
      validator: lazy((_, options) => {
        console.log(_, { options });
        if (options.parent?.someName) {
          return string().required();
        }

        return string().nullable();
      }),
    }),
  ])
);

console.log(form);
