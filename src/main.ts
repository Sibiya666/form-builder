import { date, lazy, string } from "yup";
import { makeField } from "./builder/field";
import { makeForm } from "./builder/form";
import { makeGroup } from "./builder/group";

const field = makeField("dateOn", "input", "Дата выхода на работу", {
  validator: date().default(() => new Date()),
});

const group = makeGroup("someName", "", [
  makeField("name", "input", "Имя брата>", {
    validator: string().required(),
  }),
  makeField("jobTitle", "select", "Должность", {
    validator: string().nullable(),
  }),
  //TODO: если добавить дженерик то ломается тип валидатора
  makeField("address", "input", "адрес", {
    validator: lazy((_, options) => {
      if (options.parent?.someName) {
        return string().required();
      }

      return string().nullable();
    }),
  }),
]);

const form = makeForm([group, field]);
console.log(form);
