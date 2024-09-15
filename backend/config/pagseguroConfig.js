
require("dotenv").config();
const axios = require("axios");

const PAGSEGURO_EMAIL = process.env.PAGSEGURO_EMAIL;
const PAGSEGURO_TOKEN = process.env.PAGSEGURO_TOKEN;
const PAGSEGURO_ENV = process.env.PAGSEGURO_ENV || 'sandbox'; // ou 'production'

const BASE_URL =
  PAGSEGURO_ENV === "production"
    ? "https://api.pagseguro.com/"
    : "https://sandbox.api.pagseguro.com/";

const pagSeguroInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

module.exports = { pagSeguroInstance, PAGSEGURO_EMAIL, PAGSEGURO_TOKEN };
