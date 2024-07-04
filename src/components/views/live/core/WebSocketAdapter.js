/*eslint-disable*/
"use strict"

import { w3cwebsocket as W3CWebSocket } from "websocket"
import { RateLimiter } from "limiter"

import {
  MSG_PRESENCE_STATE,
  MSG_GAME_STATE,
  MSG_JOINABLE,
  MSG_JOIN_STATE,
  MSG_PLAYER_STATE,
  MSG_CONNECTED,
  MSG_PROFILE_DATA,
  MSG_TEXT_MESSAGE,
  MSG_STATUS_MESSAGE,
  MSG_NOTIFICATIONS,
  MSG_SEND_NEW_CARD,
  MSG_SEND_NEW_BURN,
  MSG_BUY_IN_REQUEST,
  MSG_BUY_IN_RESPONSE,
  MSG_RE_BUY_REQUEST,
  MSG_RE_BUY_RESPONSE,
  MSG_DEALER_TIP_REQUEST,
  MSG_NEW_GAME,
  MSG_END_GAME,
  MSG_DEALER_STATE,
  MSG_DEALER_SHUFFLE,
  MSG_DEALER_NEW_GAME,
  MSG_DEALER_UPDATE_PLAYERS,
  MSG_DEALER_SHUFFLE_COUNTDOWN,
  MSG_DEALER_SHOWDOWN,
  MSG_UPDATE_GAME_PLAYER,
  MSG_UPDATE_GAME_PLAYERS,
  MSG_UPDATE_SYNC_STATE,
  MSG_UPDATE_GAME_EVALUATION,
  MSG_UPDATE_GAME_EVALUATION_ERROR,
  MSG_UPDATE_PLAYER_STATISTICS,
} from './MessageTypes'

import {
  MSG_TYPE_GAME_ACTION,
  MSG_ACTION_REQUEST,
  MSG_ACTION_PROCESS,
  MSG_ACTION_TEXT_MESSAGE,
  MSG_COMMAND_BUY_IN,
  MSG_COMMAND_RE_BUY,
  MSG_COMMAND_DEALER_TIP,
  MSG_COMMAND_MAKE_MOVE,
  MSG_COMMAND_DEALER_ACTION,
  MSG_COMMAND_TEXT_MESSAGE,
  MSG_COMMAND_PLAYER_SIT_OUT,
  MSG_COMMAND_PLAYER_MUCK_CARDS,
  MSG_COMMAND_PLAYER_EXIT,
  MSG_COMMAND_PLAYER_HEARTBEAT,
} from './ActionTypes'

export default function WebSocketAdapter(initialValues, wssHost, channelId, providerId, accessCode) {

  var self = this

  self.wssHost = wssHost
  self.token = localStorage.getItem('token')
  self.channelId = channelId
  self.providerId = providerId
  self.accessCode = accessCode

  self.websocketURL = `${self.wssHost}?token=${self.token}&channel_id=${self.channelId}&provider_id=${self.providerId}&access_code=${self.accessCode}`

  for (var key in initialValues) {
    if (initialValues.hasOwnProperty(key)) {
      this[key] = initialValues[key]
    }
  }

  var client = new W3CWebSocket(self.websocketURL)
  var connected = false

  const requestLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 500, })
  const messageLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 1000, })

  this.close = function () {
    client.close()
  }

  client.onopen = function () {
    connected = true
  }

  this.send = function (payload) {
    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }
    client.send(payload)
  }

  this.isConnected = function () {
    return connected
  }

  client.onmessage = function (event) {

    var msg = JSON.parse(event.data)

    switch (msg.type) {
      case MSG_PRESENCE_STATE:
        self.callback(msg.type, msg)
        break
      case MSG_GAME_STATE:
        self.callback(msg.type, msg)
        break
      case MSG_JOINABLE:
        self.callback(msg.type, msg)
        break
      case MSG_JOIN_STATE:
        self.callback(msg.type, msg)
        break
      case MSG_PLAYER_STATE:
        self.callback(msg.type, msg)
        break
      case MSG_CONNECTED:
        self.callback(msg.type, msg)
        break
      case MSG_PROFILE_DATA:
        self.callback(msg.type, msg)
        break
      case MSG_TEXT_MESSAGE:
        self.callback(msg.type, msg)
        break
      case MSG_STATUS_MESSAGE:
        self.callback(msg.type, msg)
        break
      case MSG_NOTIFICATIONS:
        self.callback(msg.type, msg)
        break
      case MSG_SEND_NEW_CARD:
        self.callback(msg.type, msg)
        break
      case MSG_SEND_NEW_BURN:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_SHUFFLE:
        self.callback(msg.type, msg)
        break
      case MSG_BUY_IN_REQUEST:
        self.callback(msg.type, msg)
        break
      case MSG_BUY_IN_RESPONSE:
        self.callback(msg.type, msg)
        break
      case MSG_RE_BUY_REQUEST:
        self.callback(msg.type, msg)
        break
      case MSG_RE_BUY_RESPONSE:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_TIP_REQUEST:
        self.callback(msg.type, msg)
        break
      case MSG_NEW_GAME:
        self.callback(msg.type, msg)
        break
      case MSG_END_GAME:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_STATE:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_NEW_GAME:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_UPDATE_PLAYERS:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_SHUFFLE_COUNTDOWN:
        self.callback(msg.type, msg)
        break
      case MSG_DEALER_SHOWDOWN:
        self.callback(msg.type, msg)
        break
      case MSG_UPDATE_GAME_PLAYER:
        self.callback(msg.type, msg)
        break
      case MSG_UPDATE_GAME_PLAYERS:
        self.callback(msg.type, msg)
        break
      case MSG_UPDATE_SYNC_STATE:
        self.callback(msg.type, msg)
        break
      case MSG_UPDATE_GAME_EVALUATION:
        self.callback(msg.type, msg)
        break
      case MSG_UPDATE_GAME_EVALUATION_ERROR:
        self.callback(msg.type, msg)
        break
      case MSG_UPDATE_PLAYER_STATISTICS:
        self.callback(msg.type, msg)
        break
      default:
        break
    }
  }

  client.onerror = function (error) {
    self.callbackError(error)
  }

  client.onclose = function (event) {
    connected = false
    self.callbackClose(event)
  }

  this.sendBuyInRequest = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_BUY_IN,
      action: MSG_ACTION_REQUEST,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendBuyInProcess = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_BUY_IN,
      action: MSG_ACTION_PROCESS,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendReBuyRequest = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_RE_BUY,
      action: MSG_ACTION_REQUEST,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendReBuyProcess = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_RE_BUY,
      action: MSG_ACTION_PROCESS,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendDealerTipRequest = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_DEALER_TIP,
      action: MSG_ACTION_REQUEST,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendDealerTipProcess = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_DEALER_TIP,
      action: MSG_ACTION_PROCESS,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendDealerAction = function (id, round, action, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_DEALER_ACTION,
      action: action,
      value: value,
    })

    client.send(payload)
  }

  this.sendGameAction = function (id, round, action, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_MAKE_MOVE,
      action: action,
      value: value,
    })

    client.send(payload)
  }

  this.sendTextMessage = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_TEXT_MESSAGE,
      action: MSG_ACTION_TEXT_MESSAGE,
      value: value,
    })

    if (messageLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendPlayerSitOut = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_PLAYER_SIT_OUT,
      action: MSG_ACTION_REQUEST,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendPlayerMuckCards = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_PLAYER_MUCK_CARDS,
      action: MSG_ACTION_REQUEST,
      value: value,
    })

    if (requestLimiter.tryRemoveTokens(1)) {
      client.send(payload)
    }
  }

  this.sendPlayerExit = function (id, round, value) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: round,
      command: MSG_COMMAND_PLAYER_EXIT,
      action: MSG_ACTION_REQUEST,
      value: value,
    })

    client.send(payload)
  }

  this.sendPlayerHeartbeat = function (id) {

    if (client.readyState == 0 || client.readyState == 2 || client.readyState == 3) {
      return
    }

    var payload = JSON.stringify({
      id: id,
      type: MSG_TYPE_GAME_ACTION,
      round: 'null',
      command: MSG_COMMAND_PLAYER_HEARTBEAT,
      action: MSG_ACTION_REQUEST,
      value: 0,
    })

    client.send(payload)
  }

}