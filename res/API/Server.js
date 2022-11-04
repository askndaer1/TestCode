import { create } from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';

// let ServerIP = "http://192.168.43.206:8090/";
let ServerIP = "http://159.65.4.107:8090/";


global.config = null;
const instance = create({ baseURL: ServerIP, timeout: 5000 })

export default class Server {
  constructor() {
    this.setToken()
  }

  async setToken() {
    const userToken = await AsyncStorage.getItem("@MySuperStore:access_token");
    instance.setHeader('Authorization', "Bearer " + userToken)
  }

  async CheckServer() {
    const request = await instance.get('serverstatus')
    if (request.ok) {
      return true
    } else {
      return false
    }
  }

  async doLogin(body) {
    const request = await instance.post('user/login', body)
    if (request.ok) {
      instance.setHeader('Authorization', "Bearer " + request.data.token)
      AsyncStorage.setItem('@MySuperStore:access_token', request.data.token);
      return request.data;
    } else {
      return false
    }
  }

  async doRegister(body) {
    const request = await instance.post('user/register', body)
    if (request.ok) {
      instance.setHeader('Authorization', "Bearer " + request.data.token)
      AsyncStorage.setItem('@MySuperStore:access_token', request.data.token);
      return request.data;
    } else {
      return false
    }
  }

  async odCheckPhoneNumberExists(body) {
    const request = await instance.post('user/checknumber', body)
    if (request.ok)
      return true;
    else
      return false
  }

  async getAllCategory() {
    const request = await instance.get('category/category')
    if (request.ok)
      return request.data;
    else
      return false
  }

  async getOrder() {
    const request = await instance.get('order/orderByid')
    if (request.ok)
      return request.data;
    else
      return false
  }

  async getProduct(CategoryCode) {
    const request = await instance.get('product/productByid?CategoryCode=' + CategoryCode)
    if (request.ok)
      return request.data;
    else
      return false
  }

  async getProductName(productName) {
    const request = await instance.get('product/productName?productName=' + productName)
    if (request.ok)
      return request.data;
    else
      return false
  }

  async doOrder(body) {
    const request = await instance.post('order/createorder', body)
    console.log(request)
    if (request.ok) {
      return request.data;
    } else {
      return false
    }
  }


  async fetchPaymentIntentClientSecret(body) {
    const request = await instance.post('create-payment-intent', body)
    console.log(request)
    if (request.ok) {
      return request.data;
    } else {
      return false
    }
  }
}
