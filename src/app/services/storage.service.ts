import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  export class StorageService{

    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
      this.init();
    }

    async init() {

      const storage = await this.storage.create();
      this._storage = storage;
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any) {
      this._storage?.set(key, value);
    }

    public set(key: string, value: any) {
      this._storage?.set(key);
    }

    public remove(key: string, value: any) {
      this._storage?.remove(key);
    }
    public getAll(){
      this._storage.forEach(( value,key, index) => {
        lista.push(value);
      });
      return lista;
    }

}
