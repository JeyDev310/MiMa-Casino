import {
  REQ_GAMES_PUBLIC_ALL,
  REQ_GAMES_QS_ALL,
  REQ_GAMES_GET,
  REQ_PROFILE_AVATAR_GET,
  REQ_PROFILE_CLIENT_GET,
  REQ_PROFILE_WALLET_GET,
  REQ_CRYPTO_DEPOSIT,
  REQ_DEPOSIT,
  REQ_WITHDRAWAL,
  REQ_SEND_ISSUE,
  REQ_FIN_HISTORY,
  REQ_PROFILE_SETTINGS_GET,
  REQ_PROFILE_STATISTICS_GET,
  REQ_PROFILE_NOTIFICATIONS_GET,
  REQ_PROFILE_ACTIVITYLOG_GET,
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
  REQ_OBJECTS_LOGOUT,
  ACTIVATE_ACCOUNT,
  REQ_PUBLIC_STATISTICS,
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
} from './actionTypes'

const initialState = {
  avatar: null,
  activity: {
    deposit: {
      items: null,
      selected: null,
    },
  },
  games: {
    items: null,
    selected: null,
  },
  profile: {
    client: null,
    wallet: null,
    payment_kassa: {},
    settings: null,
    statistics: null,
    activitylog: null,
    requests: null,
  },
  notifications: {
    items: null,
    selected: null,
  },
  template: {
    items: null,
    selected: null,
  },
  statistics: {
    items: null,
    selected: null,
  },
  summary: {
    items: null,
    selected: null,
  },
  transactions: {
    items: null,
    selected: null,
  },
  leaderboard: {
    items: null,
    selected: null,
  },
  commerce: {
    transactions: {
      items: null,
      selected: null,
    },
    deposits: {
      items: null,
      selected: null,
    },
    withdrawals: {
      items: null,
      selected: null,
    },
    methods: {
      items: null,
      selected: null,
    },
    coupons: {
      items: null,
      selected: null,
    },
  },
  isAccountActivated: null,
  error: [],
}

export default function (state = initialState, action) {

  switch (action.type) {
    case REQ_GAMES_PUBLIC_ALL:
      state = {
        ...state,
        games: {
          ...state.games,
          items: action.payload,
        }
      }
      break

    case REQ_GAMES_QS_ALL:
      state = {
        ...state,
        games: {
          ...state.games,
          items: action.payload,
        }
      }
      break

    case REQ_GAMES_GET:
      state = {
        ...state,
        games: {
          ...state.games,
          selected: action.payload,
        }
      }
      break

    case REQ_PROFILE_AVATAR_GET:
      state = {
        ...state,
        avatar: action.payload,
      }
      break

    case REQ_PROFILE_CLIENT_GET:
      state = {
        ...state,
        profile: {
          ...state.profile,
          client: action.payload,
        }
      }
      break

    case REQ_PROFILE_WALLET_GET:
      state = {
        ...state,
        profile: {
          ...state.profile,
          wallet: action.payload,
        }
      }
      break

    case REQ_CRYPTO_DEPOSIT:
      state = {
        ...state,
        profile: {
          ...state.profile,
          walletCrypto: action.payload,
        }
      }
      break

    case REQ_DEPOSIT:
      state = {
        ...state,
        profile: {
          ...state.profile,
          payment_kassa: action.payload,
        }
      }
      break

    case REQ_WITHDRAWAL:
      state = {
        ...state,
        profile: {
          ...state.profile,
          withdrawal_kassa: action.payload,
        }
      }
      break

    case REQ_SEND_ISSUE:
      state = {
        ...state,
        profile: {
          ...state.profile,
          send_issue: action.payload,
        }
      }
      break

    case REQ_FIN_HISTORY:
      state = {
        ...state,
        profile: {
          ...state.profile,
          financial_history: action.payload,
        }
      }
      break

    case REQ_PROFILE_SETTINGS_GET:
      state = {
        ...state,
        profile: {
          ...state.profile,
          settings: action.payload,
        }
      }
      break

    case REQ_PROFILE_STATISTICS_GET:
      state = {
        ...state,
        profile: {
          ...state.profile,
          statistics: action.payload,
        }
      }
      break

    case REQ_PROFILE_NOTIFICATIONS_GET:
      state = {
        ...state,
        notifications: {
          ...state.notifications,
          selected: action.payload,
        }
      }
      break

    case REQ_PROFILE_ACTIVITYLOG_GET:
      state = {
        ...state,
        profile: {
          ...state.profile,
          activitylog: action.payload,
        }
      }
      break

    case REQ_PROFILE_REQUESTS_GET:
      state = {
        ...state,
        profile: {
          ...state.profile,
          requests: action.payload,
        }
      }
      break

    case REQ_SUMMARY_QS_ALL:
      state = {
        ...state,
        summary: {
          ...state.summary,
          items: action.payload,
        }
      }
      break

    case REQ_SUMMARY_GET:
      state = {
        ...state,
        summary: {
          ...state.summary,
          selected: action.payload,
        }
      }
      break

    case REQ_TRANSACTION_QS_ALL:
      state = {
        ...state,
        transactions: {
          ...state.transactions,
          items: action.payload,
        }
      }
      break

    case REQ_TRANSACTION_GET:
      state = {
        ...state,
        transactions: {
          ...state.transactions,
          selected: action.payload,
        }
      }
      break

    case REQ_TEMPLATE_GET:
      state = {
        ...state,
        template: {
          ...state.template,
          selected: action.payload,
        }
      }
      break

    case REQ_LEADERBOARD_GET:
      state = {
        ...state,
        leaderboard: {
          ...state.leaderboard,
          items: action.payload,
        }
      }
      break

    case REQ_NOTIFICATIONS_GET:
      state = {
        ...state,
        notifications: {
          ...state.notifications,
          items: action.payload,
        }
      }
      break

    case ACTIVATE_ACCOUNT:
      if (action.payload === true) {
        return {
          ...state,
          isAccountActivated: true,
        }
      }
      return {
        ...state,
        isAccountActivated: false,
      }

    case REQ_PUBLIC_STATISTICS:
      state = {
        ...state,
        statistics: {
          ...state.statistics,
          items: action.payload,
        }
      }
      break

    case REQ_COMMERCE_TRANSACTION_QUERYSET_ALL:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          transactions: {
            ...state.commerce.transactions,
            items: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_TRANSACTION_QUERYSET_DEP:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          deposits: {
            ...state.commerce.deposits,
            items: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_TRANSACTION_QUERYSET_WIT:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          withdrawals: {
            ...state.commerce.withdrawals,
            items: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_TRANSACTION_READ_INSTANCE:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          transactions: {
            ...state.commerce.transactions,
            selected: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_METHODS_QUERYSET_ALL:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          methods: {
            ...state.commerce.methods,
            items: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_COUPON_READ_INSTANCE:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          coupons: {
            ...state.commerce.coupons,
            selected: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_DEPOSIT_CREATE_ALPHAPO:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          deposits: {
            ...state.commerce.deposits,
            selected: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_DEPOSIT_CREATE_REMITEX:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          deposits: {
            ...state.commerce.deposits,
            selected: action.payload,
          }
        }
      }
      break

    case REQ_COMMERCE_WITHDRAWAL_CREATE_INSTANCE:
      state = {
        ...state,
        commerce: {
          ...state.commerce,
          withdrawals: {
            ...state.commerce.withdrawals,
            selected: action.payload,
          }
        }
      }
      break

    case REQ_ACTIVITY_RECORDS_DEPOSIT_ANY:
      state = {
        ...state,
        activity: {
          ...state.activity,
          deposit: {
            ...state.activity.deposit,
            items: action.payload,
          }
        }
      }
      break

    case REQ_OBJECTS_RESET:
      state = {
        ...state,
        avatar: null,
        activity: {
          deposit: {
            items: null,
            selected: null,
          },
        },
        profile: {
          client: null,
          wallet: null,
          payment_kassa: {},
          settings: null,
          statistics: null,
          activitylog: null,
          requests: null,
        },
        notifications: {
          items: null,
          selected: null,
        },
        template: {
          items: null,
          selected: null,
        },
        statistics: {
          items: null,
          selected: null,
        },
        summary: {
          items: null,
          selected: null,
        },
        transactions: {
          items: null,
          selected: null,
        },
        leaderboard: {
          items: null,
          selected: null,
        },
        commerce: {
          transactions: {
            items: null,
            selected: null,
          },
          deposits: {
            items: null,
            selected: null,
          },
          withdrawals: {
            items: null,
            selected: null,
          },
          methods: {
            items: null,
            selected: null,
          },
          coupons: {
            items: null,
            selected: null,
          },
        },
        isAccountActivated: null,
      }
      break

    case REQ_OBJECTS_ERROR:
      state = {
        ...state,
        error: action.payload,
      }
      break

    case REQ_OBJECTS_LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      action.payload.push('/login')
      break

    default:
      break
  }

  return state
}