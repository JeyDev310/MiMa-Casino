import API from '../../api'
import FileSaver from 'file-saver'

import {
  REQ_GAMES_PUBLIC_ALL,
  REQ_GAMES_QS_ALL,
  REQ_GAMES_GET,
  REQ_GAMES_RESET,
  REQ_PROFILE_AVATAR_GET,
  REQ_PROFILE_AVATAR_UPDATE,
  REQ_PROFILE_KYC_1_UPDATE,
  REQ_PROFILE_CLIENT_GET,
  REQ_PROFILE_WALLET_GET,
  REQ_CRYPTO_DEPOSIT,
  REQ_DEPOSIT,
  REQ_WITHDRAWAL,
  REQ_SEND_ISSUE,
  REQ_FIN_HISTORY,
  REQ_PROFILE_SETTINGS_GET,
  REQ_PROFILE_SETTINGS_UPDATE,
  REQ_PROFILE_STATISTICS_GET,
  REQ_PROFILE_NOTIFICATIONS_GET,
  REQ_PROFILE_NOTIFICATIONS_UPDATE,
  REQ_PROFILE_ACTIVITYLOG_GET,
  REQ_PROFILE_ACTIVITYLOG_DOWNLOAD,
  REQ_PROFILE_REQUESTS_GET,
  REQ_SUMMARY_QS_ALL,
  REQ_SUMMARY_GET,
  REQ_TRANSACTION_QS_ALL,
  REQ_TRANSACTION_GET,
  REQ_TEMPLATE_GET,
  REQ_NOTIFICATIONS_GET,
  REQ_LEADERBOARD_GET,
  REQ_OBJECTS_ERROR,
  REQ_OBJECTS_RESET,
  ACTIVATE_ACCOUNT,
  REQ_DEACTIVATE_ACCOUNT,
  REQ_PUBLIC_STATISTICS,
  REQ_SESSION_CREATE,
  REQ_AUTH_RESETPASSWORD_REQUEST,
  REQ_AUTH_RESETPASSWORD_CONFIRM,
  REQ_COMMERCE_TRANSACTION_QUERYSET_ALL,
  REQ_COMMERCE_TRANSACTION_QUERYSET_DEP,
  REQ_COMMERCE_TRANSACTION_QUERYSET_WIT,
  REQ_COMMERCE_TRANSACTION_READ_INSTANCE,
  REQ_COMMERCE_METHODS_QUERYSET_ALL,
  REQ_COMMERCE_COUPON_READ_INSTANCE,
  REQ_COMMERCE_DEPOSIT_CREATE_ALPHAPO,
  REQ_COMMERCE_DEPOSIT_CREATE_REMITEX,
  REQ_COMMERCE_WITHDRAWAL_CREATE_INSTANCE,
  REQ_ACTIVITY_RECORDS_DEPOSIT_ANY,
  REQ_AUTHDRF_CHANGE_PASSWORD,
  REQ_AUTHDRF_VALIDATE_RECAPTCHA,
  REQ_OBJECTS_LOGOUT,
} from './actionTypes'

export const objectsRequestHandler = (key, value, history) => (dispatch, getState) => {

  switch (key) {
    case REQ_GAMES_PUBLIC_ALL:
      return new Promise((resolve, reject) => {
        API.get(
          'public/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_public_games',
          }
        }).then(res => {
          dispatch({
            type: REQ_GAMES_PUBLIC_ALL,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            dispatch({
              type: REQ_OBJECTS_RESET,
              payload: null,
            })
            resolve(err)
          } else {
            if (
              err.response &&
              err.response.status === 401
            ) {
              dispatch({
                type: REQ_OBJECTS_LOGOUT,
                payload: history,
              })
            } else {
              dispatch({
                type: REQ_OBJECTS_ERROR,
                payload: err,
              })
            }
            reject(err)
          }
        })
      })

    case REQ_GAMES_QS_ALL:
      return new Promise((resolve, reject) => {
        API.get(
          'event/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_queryset_by_user',
          }
        }).then(res => {
          dispatch({
            type: REQ_GAMES_QS_ALL,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token'); localStorage.removeItem('user');
            dispatch({
              type: REQ_OBJECTS_RESET,
              payload: null,
            })
            resolve()
          } else {
            if (
              err.response &&
              err.response.status === 401
            ) {
              dispatch({
                type: REQ_OBJECTS_LOGOUT,
                payload: history,
              })
            } else {
              dispatch({
                type: REQ_OBJECTS_ERROR,
                payload: err,
              })
            }
            reject(err)
          }
        })
      })

    case REQ_GAMES_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `event/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_event_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_GAMES_GET,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_GAMES_RESET:
      return new Promise((resolve, reject) => {
        API.get(
          'reset/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'reset_all_instances',
          }
        }).then(res => {
          dispatch({
            type: REQ_GAMES_QS_ALL,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_AVATAR_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_profile_avatar',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_AVATAR_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token'); localStorage.removeItem('user');
            dispatch({
              type: REQ_OBJECTS_RESET,
              payload: null,
            })
            resolve()
          } else {
            if (
              err.response &&
              err.response.status === 401
            ) {
              dispatch({
                type: REQ_OBJECTS_LOGOUT,
                payload: history,
              })
            } else {
              dispatch({
                type: REQ_OBJECTS_ERROR,
                payload: err,
              })
            }
            reject(err)
          }
        })
      })

    case REQ_PROFILE_AVATAR_UPDATE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('avatar', value.params)

        API.post(
          `profile/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'update_profile_avatar',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_AVATAR_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_KYC_1_UPDATE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('kyc_document_1', value.params)
        API.post(
          `profile/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'update_profile_kyc_1',
          }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_CLIENT_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_user_client_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_CLIENT_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_WALLET_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_user_wallet_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_WALLET_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_CRYPTO_DEPOSIT:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'crypto_deposit',
            "amount": `${value.amount}`,
          }
        }).then(res => {
          dispatch({
            type: REQ_CRYPTO_DEPOSIT,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_DEPOSIT:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'interkassa_deposit',
            "amount": `${value.amount}`,
            "amount_in_ruble": `${value.amount_in_ruble}`,
            "uuid": `${value.uuid}`,
          }
        }).then(res => {
          dispatch({
            type: REQ_DEPOSIT,
            payload: res.status,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_FIN_HISTORY:
      return new Promise((resolve, reject) => {
        API.get(
          `financial/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          }
        }).then(res => {
          dispatch({
            type: REQ_FIN_HISTORY,
            payload: res,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_WITHDRAWAL:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'interkassa_withdrawal',
            "amount": `${value.amount}`,
            "amount_in_ruble": `${value.amount_in_ruble}`,
            "uuid": `${value.uuid}`,
          }
        }).then(res => {
          dispatch({
            type: REQ_WITHDRAWAL,
            payload: res.status,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_SETTINGS_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_user_account_settings',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_SETTINGS_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_SEND_ISSUE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `support/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'support_email',
          }
        }).then(res => {
          dispatch({
            type: REQ_SEND_ISSUE,
            payload: res.status,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_SETTINGS_UPDATE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)

        API.post(
          `profile/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'update_user_account_settings',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_SETTINGS_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_STATISTICS_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_user_statistics_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_STATISTICS_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_NOTIFICATIONS_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_user_notifications_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_NOTIFICATIONS_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_ACTIVITYLOG_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `profile/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_user_activitylog_instance',
            "page": value.page,
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_ACTIVITYLOG_GET,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_ACTIVITYLOG_DOWNLOAD:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `profile/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'download_profile_activitylog',
          },
          responseType: 'blob',
        }).then(res => {
          if (res.data.type === 'text/csv') {
            FileSaver.saveAs(res.data, 'profile_activity_log.csv')
          }
          if (res.data.type === 'application/json') {
            FileSaver.saveAs(res.data, 'profile_activity_log.json')
          }
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_SUMMARY_QS_ALL:
      return new Promise((resolve, reject) => {
        API.get(
          'summary/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_queryset',
            "page": value.page,
          }
        }).then(res => {
          dispatch({
            type: REQ_SUMMARY_QS_ALL,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_SUMMARY_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `summary/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_SUMMARY_GET,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_TRANSACTION_QS_ALL:
      return new Promise((resolve, reject) => {
        API.get(
          'transactions/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_queryset',
          }
        }).then(res => {
          dispatch({
            type: REQ_TRANSACTION_QS_ALL,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_TRANSACTION_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `transactions/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_TRANSACTION_GET,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_NOTIFICATIONS_UPDATE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.item)

        API.post(
          `profile/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'update_profile_notifications',
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_NOTIFICATIONS_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_TEMPLATE_GET:
      return new Promise((resolve, reject) => {
        API.get(
          `template/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_live_play_template',
          }
        }).then(res => {
          dispatch({
            type: REQ_TEMPLATE_GET,
            payload: res.data,
          })
          resolve(res.data)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_LEADERBOARD_GET:
      return new Promise((resolve, reject) => {
        API.get(
          'event/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_leaderboard_by_user',
          }
        }).then(res => {
          dispatch({
            type: REQ_LEADERBOARD_GET,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_NOTIFICATIONS_GET:
      return new Promise((resolve, reject) => {
        API.get(
          'event/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_notifications_by_user',
          }
        }).then(res => {
          dispatch({
            type: REQ_NOTIFICATIONS_GET,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PUBLIC_STATISTICS:
      return new Promise((resolve, reject) => {
        API.get(
          'public/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_public_statistics',
          }
        }).then(res => {
          dispatch({
            type: REQ_PUBLIC_STATISTICS,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_SESSION_CREATE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `session/${value.id}/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'create_session',
          },
        }).then(res => {
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_AUTH_RESETPASSWORD_REQUEST:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('email', value.email)
        fd.append('recaptcha', value.recaptcha)
        API.post(
          `auth/1/core/password_reset/`, fd, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }).then(res => {
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_AUTH_RESETPASSWORD_CONFIRM:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('token', value.token)
        fd.append('password', value.password)
        fd.append('recaptcha', value.recaptcha)
        API.post(
          `auth/1/core/password_reset/confirm/`, fd, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }).then(res => {
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_TRANSACTION_QUERYSET_ALL:
      return new Promise((resolve, reject) => {
        API.get(
          'commerce/payment/transactions/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'queryset_any',
            "page": value.page,
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_TRANSACTION_QUERYSET_ALL,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_TRANSACTION_QUERYSET_DEP:
      return new Promise((resolve, reject) => {
        API.get(
          'commerce/payment/transactions/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'queryset_deposits',
            "page": value.page,
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_TRANSACTION_QUERYSET_DEP,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_TRANSACTION_QUERYSET_WIT:
      return new Promise((resolve, reject) => {
        API.get(
          'commerce/payment/transactions/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'queryset_withdrawals',
            "page": value.page,
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_TRANSACTION_QUERYSET_WIT,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_TRANSACTION_READ_INSTANCE:
      return new Promise((resolve, reject) => {
        API.get(
          `commerce/payment/transactions/${value.id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'read_instance',
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_TRANSACTION_READ_INSTANCE,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_METHODS_QUERYSET_ALL:
      return new Promise((resolve, reject) => {
        API.get(
          'commerce/payment/methods/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'get_queryset',
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_METHODS_QUERYSET_ALL,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_COUPON_READ_INSTANCE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `commerce/payment/coupons/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'apply_coupon',
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_COUPON_READ_INSTANCE,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_DEPOSIT_CREATE_ALPHAPO:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `commerce/payment/deposit/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'deposit_alphapo',
          },
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_DEPOSIT_CREATE_ALPHAPO,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_DEPOSIT_CREATE_REMITEX:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `commerce/payment/deposit/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'deposit_remitex',
          },
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_DEPOSIT_CREATE_REMITEX,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_COMMERCE_WITHDRAWAL_CREATE_INSTANCE:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `commerce/payment/withdrawal/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'process_withdrawal',
          }
        }).then(res => {
          dispatch({
            type: REQ_COMMERCE_WITHDRAWAL_CREATE_INSTANCE,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_AUTHDRF_CHANGE_PASSWORD:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `auth/1/core/change_password/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'change_password',
          }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case ACTIVATE_ACCOUNT:
      return new Promise((resolve, reject) => {
        API.post(
          'auth/1/core/activate/', {
          uuid64: value.uuid64,
          token: value.token,
        }
        ).then(res => {
          dispatch({
            type: ACTIVATE_ACCOUNT,
            payload: true,
          })
        }).catch(err => {
          dispatch({
            type: ACTIVATE_ACCOUNT,
            payload: false,
          })
        })
      })

    case REQ_DEACTIVATE_ACCOUNT:
      return new Promise((resolve, reject) => {
        API.post(
          'auth/1/core/deactivate/', null, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          }
        }).then(res => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.replace('/')
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_AUTHDRF_VALIDATE_RECAPTCHA:
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('params', value.params)
        API.post(
          `auth/1/core/recaptcha/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
          params: {
            "action": 'validate_recaptcha',
          }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_PROFILE_REQUESTS_GET:
      return new Promise((resolve, reject) => {
        API.get(
          'tracking/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "action": 'core_queryset',
            "page": value.page,
          }
        }).then(res => {
          dispatch({
            type: REQ_PROFILE_REQUESTS_GET,
            payload: res.data,
          })
          resolve(res)
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_ACTIVITY_RECORDS_DEPOSIT_ANY:
      return new Promise((resolve, reject) => {
        API.get(
          'activity/records/deposit/queryset/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          params: {
            "page": value.page,
          },
        }).then(res => {
          dispatch({
            type: REQ_ACTIVITY_RECORDS_DEPOSIT_ANY,
            payload: res.data,
          })
          resolve(getState())
        }).catch(err => {
          if (
            err.response &&
            err.response.status === 401
          ) {
            dispatch({
              type: REQ_OBJECTS_LOGOUT,
              payload: history,
            })
          } else {
            dispatch({
              type: REQ_OBJECTS_ERROR,
              payload: err,
            })
          }
          reject(err)
        })
      })

    case REQ_OBJECTS_RESET:
      return new Promise((resolve) => {
        dispatch({
          type: REQ_OBJECTS_RESET,
          payload: null,
        })
        resolve()
      })

    default:
      return null
  }
}