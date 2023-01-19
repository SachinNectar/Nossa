import { BaseModel } from "./BaseModel.js";

export class ProjectModel extends BaseModel {
  static resource = {
    key: "projects",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
