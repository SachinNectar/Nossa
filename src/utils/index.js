// Create List for react select option
import {
  author,
  superAdmin,
  admin,
  consignee,
  buyer,
} from "./../constant/access";
import { FormModel } from "./../model/FormModel";

export const createOptionForReactSelect = (
  list,
  labelKey,
  valueKey,
  newObject = {}
) => {
  const options = [];
  if (!list) {
    return options;
  }

  list.map((instance) => {
    options.push({
      value: getValueFromKey(instance, valueKey),
      label: getValueFromKey(instance, labelKey),
      ...instance,
      ...newObject,
    });
  });

  return options;
};

export const convertFlatListToReactSelectionOption = (list) =>
  list.map(convertOptionForValue);

export const convertOptionForValue = (value) => ({ label: value, value });

//This function will extract data from nested keys
export const getValueFromKey = (object, key) => {
  if (isEmpty(object)) return "";
  const splits = key.split(".");
  if (splits.length === 1) return object[splits[0]];

  return getValueFromKey(object[splits[0]], splits.slice(1).join("."));
};

export const isEmpty = (object) => {
  if (!object) return true;

  return !Object.keys(object).length;
};

export const groupBy = (list, f) => {
  return list.reduce(
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
};

export const updateUserAccessInRedux = (userType) => {
  let access = {};
  switch (userType) {
    case 1:
      access = superAdmin;
      break;
    case 2:
      access = admin;
      break;
    case 3:
      access = author;
      break;
    case 4:
      access = consignee;
      break;
    case 5:
      access = buyer;
      break;
  }

  new FormModel("userAuth")._createForm(access);
};

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const requestSearch = (data, searchValue) => {
  const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
  const filteredRows = data.rows.filter((row) => {
    return Object.keys(row).some((field) => {
      return searchRegex.test(row[field].toString());
    });
  });

  return filteredRows;
};
