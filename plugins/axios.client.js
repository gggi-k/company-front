import { message } from 'ant-design-vue/lib'

export default function ({ $axios, store }) {


  $axios.onRequest(config => {
    const accessToken = store.getters["authentication/getAccessToken"];
    if(accessToken) $axios.setToken(store.getters["authentication/getAccessToken"], 'Bearer');
  })

  $axios.onError(error => {
    const status = error.response.status;
    if(status === 400) {
      return;
    }

    message.error(error.response.data.message);
  })
}
