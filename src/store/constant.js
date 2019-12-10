export const TEST_ENDPOINT = "https://jsonplaceholder.typicode.com/todos";
export const SALES_FORCE_PREFIX = "fashion/secure/agent/salesforce/";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const SET_TOKEN = "SET_TOKEN";
export const USER_DETAILS = "USER_DETAILS";

export const GET__CODE__PATH = `${process.env.REACT_APP_PATH}fashion/agent/salesforce/update_profile/`;
export const SIGNUP__PATH = `${process.env.REACT_APP_PATH}fashion/agent/salesforce/signUp/`;

export const LOGIN__PATH = `${process.env.REACT_APP_PATH}fashion/agent/salesforce/login/`;
export const DASHBOARD__PATH = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}getdashboard/`;

export const GET__BANK__ACCOUNT__PATH = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}get_bank_accounts/`;
export const CREATE__BANK__ACCOUNT__PATH = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}create_bank_accounts/`;
export const GET__SINGLE__BANK__ACCOUNT__PATH = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}view_one_bank_account/`;
export const UPDATE__BANK__ACCOUNT__PATH = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}update_one_bank_account/`;
export const DELETE__BANK__ACCOUNT__PATH = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}delete_one_bank_account/`;

export const MAKE__WITHDRAWAL = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}request_remittance/`;
export const PREVIOUS_WITHDRAWALS = `${process.env.REACT_APP_PATH}${SALES_FORCE_PREFIX}getpayment/`;
