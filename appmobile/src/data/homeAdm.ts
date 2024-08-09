/* eslint-disable prettier/prettier */
import { ImageProps } from "react-native";

const newevent = require("../assets/dasboardAdm/criar novo evento.png");
const newuser = require("../assets/dasboardAdm/criar novo usuario.png");
const updateuser = require("../assets/dasboardAdm/editar perfil.png");
const event = require("../assets/dasboardAdm/eventos.png");
const listuser = require("../assets/dasboardAdm/lista de usuarios.png");
const perfil = require("../assets/dasboardAdm/perfil.png");
const vazio = require("../assets/dasboardAdm/vazio.png");


export interface homeAdm {
  name: string;
  background: ImageProps["source"];
  route: string;
}

export const homeAdmList: homeAdm[] = [
  {
    name: "Eventos",
    background: event,
    route: "Eventos",
  },
  {
    name: "Perfil",
    background: perfil,
    route: "Perfil",
  },
  {
    name: "Lista de Usuarios",
    background: listuser,
    route: "UserList",
  },
  {
    name: "Editar Perfil",
    background: updateuser,
    route: "UpdateProfile",
  },
  {
    name: "Criar Novo Usuario",
    background: newuser,
    route: "CreateUser",
  },
  {
    name: "Criar Novo Evento",
    background: newevent,
    route: "Home",
  },
];
