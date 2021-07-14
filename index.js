import TelegramBot from "node-telegram-bot-api"
import config from "config"


const TOKEN = config.get('token')
const bot = new TelegramBot(TOKEN, { polling: true })

const KEYBOARD_COMMAND = '/keyboard'
const KEYBOARD_COMMAND_SHOW = 'show'
const KEYBOARD_COMMAND_HIDE = 'hide'
const KEYBOARD_COMMAND_INLINE = 'inline'

const COMMAND_FORWARD = 'forward'
const COMMAND_REPLY = 'reply'
const COMMAND_EDIT = 'edit'
const COMMAND_DELETE = 'delete'

const inline_keyboard = [
    [
        {
            text: 'Forward',
            callback_data: COMMAND_FORWARD
        },
        {
            text: 'Reply',
            callback_data: COMMAND_REPLY
        },
    ],
    [
        {
            text: 'Edit',
            callback_data: COMMAND_EDIT
        },
        {
            text: 'Delete',
            callback_data: COMMAND_DELETE
        },
    ]
]

bot.onText(new RegExp(`${KEYBOARD_COMMAND} (.*)`), (msg, [source, match]) => {
    const { chat: { id }} = msg

    switch (match) {
        case KEYBOARD_COMMAND_SHOW:
            bot.sendMessage(id, 'Keyboard', {
                reply_markup: {
                    keyboard: [
                        [
                            `${KEYBOARD_COMMAND} ${KEYBOARD_COMMAND_HIDE}`
                        ]
                    ]

                }
            })
            break
        case KEYBOARD_COMMAND_HIDE:
            bot.sendMessage(id, 'Hide a keyboard', {
                reply_markup: {
                    remove_keyboard: true
                }
            })
            break
        case KEYBOARD_COMMAND_INLINE:
            bot.sendMessage(id, 'Inline keyboard is below', {
                reply_markup: {
                    inline_keyboard
                }
            })
            break
        default:
            bot.sendMessage(id, 'Invalid parameters')
    }
})

bot.on('callback_query', query => {
    const { message: { chat, message_id, text } } = query

    switch (query.data) {
        case COMMAND_FORWARD:
            bot.forwardMessage(chat.id, chat.id, message_id)
            break
        case COMMAND_REPLY:
            bot.sendMessage(chat.id, 'Reply to a message', {
                reply_to_message_id: message_id
            })
            break
        case COMMAND_EDIT:
            bot.editMessageText(`${text} (edited)`, {
                chat_id: chat.id,
                message_id: message_id,
                reply_markup: {
                    inline_keyboard
                }
            })
            break
        case COMMAND_DELETE:
            bot.deleteMessage(chat.id, message_id)
            break
    }
    bot.answerCallbackQuery({ callback_query_id: query.id })
})