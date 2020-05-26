export class User {
  constructor(public email: string, public id: string,
              // tslint:disable-next-line:variable-name
              private _token: string, public _tokenExpirationDate: Date) {
  }

  get token() {
    if (!this._token || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }

}
