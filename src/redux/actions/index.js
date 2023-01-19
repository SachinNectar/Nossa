import store from "../store.js";

export const SAVE_INSTANCE = "SAVE_INSTANCE";
export const UPDATE_INSTANCE = "UPDATE_INSTANCE";
export const REMOVE_INSTANCE = "REMOVE_INSTANCE";
export const REMOVE_ALL = "REMOVE_ALL";
export const SAVE_ALL = "SAVE_ALL";
export const CREATE_FORM = "CREATE_FORM";
export const UPDATE_FORM = "UPDATE_FORM";
export const CLEAR_ALL = "CLEAR_ALL";
export const CLEAR_FORM = "CLEAR_FORM";
export const CLEAR_MODEL = "CLEAR_MODEL";
export const REMOVE_BY_KEY = "REMOVE_BY_KEY";


export function genericDispatcher(instance) {
  return instance;
}
export function saveInstance(resource, instance) {
  return store.dispatch({ type: SAVE_INSTANCE, resource, instance });
}
export function updateInstance(resource, instance) {
  return store.dispatch({ type: UPDATE_INSTANCE, resource, instance });
}
export function removeInstance(resource, id) {
  return store.dispatch({ type: REMOVE_INSTANCE, resource, instance: { id } });
}
export function removeAll(resource) {
  return store.dispatch({ type: REMOVE_ALL, resource });
}
export function saveAll(resource, instance, meta = {}) {
  return store.dispatch({ type: SAVE_ALL, resource, instance, meta });
}
export function createForm(formName, object) {
  return store.dispatch({ type: CREATE_FORM, formName, object });
}
export function updateForm(formName, object) {
  return store.dispatch({ type: UPDATE_FORM, formName, object });
}
export function clearForm(formName) {
  return store.dispatch({ type: CLEAR_FORM, formName });
}
// export function updateRawData(object) {
//   return store.dispatch({ type: UPDATE_RAW_VALUE, object });
// }
// export function deleteRawData(key) {
//   return store.dispatch({ type: DELETE_RAW_VALUE, key });
// }
// export function clearRawData() {
//   return store.dispatch({ type: CLEAR_RAW_VALUE });
// }
export function saveCrossFilter(resource, instance) {
  return store.dispatch({ type: SAVE_ALL, resource, instance });
}
export function removeByKey(resource, key) {
  return store.dispatch({ type: REMOVE_BY_KEY, resource, key });
}
export const genericAction = (
  actionType,
  value,
  successCallback,
  failureCallback
) => {
  return store.dispatch({
    type: actionType,
    payload: value,
    successCallback,
    failureCallback,
  });
};
