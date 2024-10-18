/* eslint-disable prettier/prettier */
import { ImageProps } from "react-native";

const newevent = require("../assets/dasboardAdm/criar novo evento2.png");
const updateuser = require("../assets/dasboardAdm/editar perfil2.png");
const event = require("../assets/dasboardAdm/eventos2.png");
const registeredevents = require("../assets/dasboardAdm/meus eventos cadastrados2.png");
const myeventcreated = require("../assets/dasboardAdm/meus eventos criados.png");
const perfil = require("../assets/dasboardAdm/perfil2.png");
//const vazio = require("../assets/dasboardAdm/vazio.png");
export interface homeManager {
  key: string;
  empty: any;
  name: string;
  background: ImageProps["source"];
  route: string;
}

export const homeManagerList: homeManager[] = [
  {
    name: "Eventos",
    background: event,
    route: "Eventos",
    key: "",
    empty: undefined
  },
  {
    name: "Criar Novo Evento",
    background: newevent,
    route: "CreateEvent",
    key: "",
    empty: undefined
  },
  {
    name: "Meus Eventos Criados",
    background: myeventcreated,
    route: "MyCreatedEvents",
    key: "",
    empty: undefined
  },
  {
    name: "Perfil",
    background: perfil,
    route: "Perfil",
    key: "",
    empty: undefined
  },
  {
    name: "Editar Perfil",
    background: updateuser,
    route: "UpdateProfile",
    key: "",
    empty: undefined
  },

  {
    name: "Meus Eventos Cadastrados",
    background: registeredevents,
    route: "MyEvents",
    key: "",
    empty: undefined
  },

];
