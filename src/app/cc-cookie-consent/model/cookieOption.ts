export class CookieOption {
  public Name: string;
  public Checked: boolean;
  public SubText: string;
  public Id: string;

  constructor(name: string, checked: boolean = false, subText: string = '') {
    this.Name = name;
    this.Checked = checked;
    this.SubText = subText;

    this.Id = name.replace(/ /g, '');
  }
}
