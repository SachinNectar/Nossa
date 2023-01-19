// import store from '../../../redux/store.js';
import { createForm, updateForm, clearForm } from "../redux/actions/index.js";
import store from "../redux/store";

export class FormModel {
  static formName = "";

  constructor(props) {
    this.formName = props;
  }

  static clear(formName) {
    clearForm(formName);
  }

  static get(formName, key) {
    return store.getState().forms[formName][key] || "";
  }

  static getAll(formName) {
    return store.getState().forms[formName] || "";
  }

  _createForm(initialFormInstance = {}) {
    createForm(this.formName, { validation: {}, ...initialFormInstance });
  }

  _update(updatableFromInstance) {
    updateForm(this.formName, updatableFromInstance);
  }

  _updateValidation(updatableValidationInstance) {
    const validation = FormModel.getAll(this.formName)?.validation;
    updateForm(this.formName, {
      validation: { ...validation, ...updatableValidationInstance },
    });
  }
}
