import { BaseModel } from "./BaseModel.js";

export class EventModel extends BaseModel {
  static resource = {
    key: "event",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
