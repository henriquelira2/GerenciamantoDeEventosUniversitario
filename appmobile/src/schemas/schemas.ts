import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  cpf: yup
    .string()
    .min(11, "Formato de CPF inválido")
    .required("CPF incorreto"),
  password: yup.string().required("Senha incorreta!"),
});

export const RegisterSchema = yup.object().shape({
  cpf: yup
    .string()
    .min(11, "Formato de CPF inválido")
    .required("Preencha o campo!"),
  firstName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de nome inválido",
    )
    .required("Preencha o campo!"),
  lastName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de sobrenome inválido",
    )
    .required("Preencha o campo!"),
  phoneNumber: yup
    .string()
    .min(11, "Formato de Telefone inválido")
    .required("Telefone incorreto"),
  email: yup
    .string()
    .email("Preencha o e-mail da forma correta!")
    .required("Preencha o campo!"),
  password: yup
    .string()
    .min(8, "A senha deve conter 8 caracteres")
    .required("Preenchao campo"),
});

export const UpdateUserSchema = yup.object().shape({
  cpf: yup
    .string()
    .min(11, "Formato de CPF inválido")
    .required("Preencha o campo!"),
  firstName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de nome inválido",
    )
    .required("Preencha o campo!"),
  lastName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de sobrenome inválido",
    )
    .required("Preencha o campo!"),
  phoneNumber: yup
    .string()
    .min(11, "Formato de Telefone inválido")
    .required("Telefone incorreto"),
  email: yup
    .string()
    .email("Preencha o e-mail da forma correta!")
    .required("Preencha o campo!"),
});

export const AdmimUpdateUserSchema = yup.object().shape({
  cpf: yup
    .string()
    .min(11, "Formato de CPF inválido")
    .required("Preencha o campo!"),
  firstName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de nome inválido",
    ),
  lastName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de sobrenome inválido",
    ),
  phoneNumber: yup.string().min(11, "Formato de Telefone inválido"),
  email: yup.string().email("Preencha o e-mail da forma correta!"),
  password: yup.string().min(8, "A senha deve conter 8 caracteres"),
  type: yup.string(),
});

export const ForgotPassWordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "A senha deve conter 8 caracteres")
    .required("Preenchao campo"),
});

export const CreateUserAdmin = yup.object().shape({
  cpf: yup
    .string()
    .min(11, "Formato de CPF inválido")
    .required("Preencha o campo!"),
  firstName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de nome inválido",
    )
    .required("Preencha o campo!"),
  lastName: yup
    .string()
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+$/,
      "Formato de sobrenome inválido",
    )
    .required("Preencha o campo!"),
  phoneNumber: yup
    .string()
    .min(11, "Formato de Telefone inválido")
    .required("Telefone incorreto"),
  email: yup
    .string()
    .email("Preencha o e-mail da forma correta!")
    .required("Preencha o campo!"),
  password: yup
    .string()
    .min(8, "A senha deve conter 8 caracteres")
    .required("Preenchao campo"),
  type: yup
    .string()
    .oneOf(
      ["User", "Manager", "Admin"],
      "O tipo  deve ser um dos seguintes valores: User, Manager, Admin",
    )
    .required("Preencha o campo!"),
});

export const CreateEventSchema = yup.object().shape({
  nameEvent: yup.string().required("Preencha o campo!"),
  imageEvent: yup.string().required("Preencha o campo!"),
  descriptionEvent: yup.string().required("Preencha o campo!"),
  dateEvent: yup.string().required("Preencha o campo!"),
  hourEvent: yup.string().required("Preencha o campo!"),
  priceEvent: yup.string().required("Preenchao campo"),
  organizerEvent: yup.string().required("Preencha o campo!"),
  qtdVacanciesEvent: yup.string().required("Preencha o campo!"),
  locationEvent: yup.string().required("Preencha o campo!"),
  typeEvent: yup.string().required("Preencha o campo!"),
});

export const EventUpdateSchema = yup.object().shape({});
