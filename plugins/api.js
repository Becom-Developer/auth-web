export default function ({ app }, inject) {
    const url = 'https://auth-api.becom.co.jp/'
    inject('authapi', (qParams) => {
      return app.$axios.$post(url, {
        resource: qParams[0],
        method: qParams[1],
        params: qParams[2],
        apikey: 'becom',
      })
    })
  }

  // import qs from 'qs'
  // paramsSerializer: (params) =>
  // qs.stringify(params, { arrayFormat: 'repeat' }),
  // })
