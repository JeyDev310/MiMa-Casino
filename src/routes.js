import React from 'react'
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import Loader from './shared/Loader'

import Layout2 from './shared/layouts/Layout2'
import LayoutBlank from './shared/layouts/LayoutBlank'
import LayoutHorizontalSidenav from './shared/layouts/LayoutHorizontalSidenav'
import LayoutSinglePage from './shared/layouts/LayoutSinglePage'

const lazy = (cb) => loadable(() => pMinDelay(cb(), 200), { fallback: <Loader /> })

export const DefaultLayout = Layout2
export const titleTemplate = '%s - Live Poker Studio™'

export const defaultRoute = '/login'
export const routes = [
  {
    path: '/activate/:uuid/:token',
    component: lazy(() => import('./components/views/auth/AuthActivated')),
    layout: LayoutBlank,
  }, {
    path: '/activity',
    component: lazy(() => import('./components/views/activity/ActivityLog')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/activity/deposits',
    component: lazy(() => import('./components/views/activity/DepositRecord')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/activity/events',
    component: lazy(() => import('./components/views/activity/ActivityLog')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/activity/requests',
    component: lazy(() => import('./components/views/activity/APIRequestLog')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/auth/login',
    component: lazy(() => import('./components/views/auth/AuthLogin')),
    layout: LayoutBlank,
  }, {
    path: '/auth/delegate',
    component: lazy(() => import('./components/views/auth/AuthLoginDelegate')),
    layout: LayoutBlank,
  }, {
    path: '/auth/password_reset',
    component: lazy(() => import('./components/views/auth/AuthPasswordReset')),
    layout: LayoutBlank,
  }, {
    path: '/auth/password_reset/confirm/:token',
    component: lazy(() => import('./components/views/auth/AuthPasswordResetConfirm')),
    layout: LayoutBlank,
  }, {
    path: '/auth/register',
    component: lazy(() => import('./components/views/auth/AuthRegister')),
    layout: LayoutBlank,
  }, {
    path: '/auth/register/success',
    component: lazy(() => import('./components/views/auth/AuthRegisterSuccess')),
    layout: LayoutBlank,
  }, {
    path: '/auth/register/failed',
    component: lazy(() => import('./components/views/auth/AuthRegisterFailed')),
    layout: LayoutBlank,
  }, {
    path: '/contact',
    component: lazy(() => import('./components/views/pages/Contact')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/error/activity',
    component: lazy(() => import('./components/views/errors/SuspiciousActivity')),
    layout: LayoutBlank,
  }, {
    path: '/error/limit',
    component: lazy(() => import('./components/views/errors/TooManyRequests')),
    layout: LayoutBlank,
  }, {
    path: '/everymatrix/games/details/:roundId/:gameId/:userId',
    component: lazy(() => import('./components/views/details/EveryMatrixGetRoundDetails')),
    layout: LayoutSinglePage,
  }, {
    path: '/free',
    component: lazy(() => import('./components/views/free/FreePlay')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/games',
    component: lazy(() => import('./components/views/games/Games')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/games/live/connect/internal/:id/:token',
    component: lazy(() => import('./components/views/live/connect/internal/LiveAppConnect')),
    layout: LayoutBlank,
  }, {
    path: '/games/live/connect/external/:id/:token',
    component: lazy(() => import('./components/views/live/connect/external/LiveAppConnect')),
    layout: LayoutBlank,
  }, {
    path: '/games/live/connect/em/play/:token',
    component: lazy(() => import('./components/views/live/connect/everymatrix/LiveAppConnect')),
    layout: LayoutBlank,
  }, {
    path: '/games/live/connect/internal/exit',
    component: lazy(() => import('./components/views/live/connect/internal/states/ExitState')),
    layout: LayoutBlank,
  }, {
    path: '/games/live/connect/external/exit',
    component: lazy(() => import('./components/views/live/connect/external/states/ExitState')),
    layout: LayoutBlank,
  }, {
    path: '/games/live/connect/everymatrix/exit',
    component: lazy(() => import('./components/views/live/connect/everymatrix/states/ExitState')),
    layout: LayoutBlank,
  }, {
    path: '/help',
    component: lazy(() => import('./components/views/help/Help')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/helpcenter',
    component: lazy(() => import('./components/views/help/HelpCenter')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/leaderboard',
    component: lazy(() => import('./components/views/leaderboard/Leaderboard')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/login',
    component: lazy(() => import('./components/views/auth/AuthLogin')),
    layout: LayoutBlank,
  }, {
    path: '/notifications',
    component: lazy(() => import('./components/views/notifications/Notifications')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/profile',
    component: lazy(() => import('./components/views/profile/Profile')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/settings',
    component: lazy(() => import('./components/views/settings/Settings')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/summary',
    component: lazy(() => import('./components/views/summary/SummaryListView')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/terms',
    component: lazy(() => import('./components/views/pages/Terms')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/transactions',
    component: lazy(() => import('./components/views/transactions/TransactionsListView')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/wallet',
    component: lazy(() => import('./components/views/wallet/main/Wallet')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/wallet/overview',
    component: lazy(() => import('./components/views/wallet/main/Wallet')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/wallet/deposit',
    component: lazy(() => import('./components/views/wallet/deposits/WalletDeposit')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/wallet/notifications',
    component: lazy(() => import('./components/views/wallet/notifications/WalletNotifications')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/wallet/payment/:uuid',
    component: lazy(() => import('./components/views/wallet/deposits/status/DepositPaymentStatus')),
    layout: LayoutBlank,
  }, {
    path: '/wallet/transactions',
    component: lazy(() => import('./components/views/transactions/TransactionsListView')),
    layout: LayoutHorizontalSidenav,
  }, {
    path: '/wallet/withdrawal',
    component: lazy(() => import('./components/views/wallet/withdrawals/WalletWithdrawal')),
    layout: LayoutHorizontalSidenav,
  },
]