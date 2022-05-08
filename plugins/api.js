export default function ({ app }, inject) {
    const authApiURL = process.env.authApiURL
    inject('authapi', (qParams) => {
      return app.$axios.$post(authApiURL, {
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
