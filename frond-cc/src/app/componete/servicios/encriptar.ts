import { Injectable } from "@angular/core";
import { privateKey, publicKey } from './key/key';
import { JSEncrypt } from 'jsencrypt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptDataService {

    //Declaracion de variables
    cypherText: any = [];
    jsencrypt: any;

    /**
     * Constructor de la clase
     */
    constructor() {
        this.jsencrypt = new JSEncrypt();
    }

    /**
    * Metodo para encriptar datos
    * @param data - Dato a encriptar
    **/
    encriptar(data: string): any {
        this.jsencrypt.setPublicKey(publicKey);
        this.cypherText = this.jsencrypt.encrypt(data);
        return this.cypherText;
    }

    /**
    * Metodo para desencriptar datos
    * @param data - Dato a desencriptar
    **/
    desencriptar(data: any): any {
        this.jsencrypt.setPrivateKey(privateKey);
        return this.jsencrypt.decrypt(data);
    }


    decrypt(encryptedText: string) {
        const secretKey = 'aB$7pQ2*Zu9!wC8xaB$7pQ2*Zu9!wC8x'; // La misma clave secreta que en Node.js

        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText.toString(), secretKey).toString(CryptoJS.enc.Utf8);
          
            return decryptedBytes;
          } catch (error) {
            console.error('Error al desencriptar:', error);
            throw error;
          }
    }


}