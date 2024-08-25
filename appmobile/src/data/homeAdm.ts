/* eslint-disable prettier/prettier */
import { ImageProps } from "react-native";

const newevent = require("../assets/dasboardAdm/criar novo evento2.png");
const newuser = require("../assets/dasboardAdm/criar novo usuario2.png");
const updateuser = require("../assets/dasboardAdm/editar perfil2.png");
const event = require("../assets/dasboardAdm/eventos2.png");
const listuser = require("../assets/dasboardAdm/lista de usuarios2.png");
const perfil = require("../assets/dasboardAdm/perfil2.png");
//const vazio = require("../assets/dasboardAdm/vazio.png");


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
    route: "CreateEvent",
  },
];
