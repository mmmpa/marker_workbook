import Plate from "../libs/plate";
export default class WorkbookRecord extends Plate{
  constructor(key){
    super('workbook' + key);
  }
}