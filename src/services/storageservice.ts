import { Carrinho } from './../models/carrinho';
import { LocalUser } from './../models/localuser';
import { STORAGE_KEYS } from './../config/storagekeysconfig';
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        if (user == null) {
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    setLocalUser(obj: LocalUser) {

        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCarrinho() : Carrinho {
        let user = localStorage.getItem(STORAGE_KEYS.carrinho);

        if (user == null) {
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    setCarrinho(obj: Carrinho) {

        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.carrinho);
        } else {
            localStorage.setItem(STORAGE_KEYS.carrinho, JSON.stringify(obj));
        }
    }
}