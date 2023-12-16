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
  password: yup.string().required("Preencha o campo!"),
});
