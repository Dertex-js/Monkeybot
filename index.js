import TelegramBot from "node-telegram-bot-api"
import config from "config"


const TOKEN = config.get('token')
const bot = new TelegramBot(TOKEN, { polling: true })

const KEYBOARD_COMMAND = '/keyboard'
const KEYBOARD_COMMAND_SHOW = 'show'
const KEYBOARD_COMMAND_HIDE = 'hide'
const KEYBOARD_COMMAND_INLINE = 'inline'

const COMMAND_KOFE = 'kofe'
const COMMAND_RAF = 'raf'
const COMMAND_SHOCOMOL = 'shocomol'
const COMMAND_DOBAVKI = 'dobavki'
const COMMAND_POLUFABR = 'polufabr'
const COMMAND_SEZONNOE = 'sezonnoe'


const kofe_disc = 'Тут будет ТТК Кофе'
const raf_disc = 'Тут будет ТТК Раф'
const shocomol_disc = 'Тут будет ТТК Шоколад, Молоко'
const dobavki_disc = 'Тут будет ТТК Добавки'
const polufabr_disc = 'Тут будет ТТК ПФ'
const sezonnoe_disc = 'Тут будет ТТК Сезонное меню'


const inline_keyboard = [
    [
        {
            text: 'Кофе',
            callback_data: COMMAND_KOFE
        },
        {
            text: 'Раф',
            callback_data: COMMAND_RAF
        },
    ],
    [
        {
            text: 'Шоколад, молоко',
            callback_data: COMMAND_SHOCOMOL
        },
        {
            text: 'Добавки',
            callback_data: COMMAND_DOBAVKI
        },
    ],
    [
        {
            text: 'ПФ',
            callback_data: COMMAND_POLUFABR
        },
        {
            text: 'Сезонное меню',
            callback_data: COMMAND_SEZONNOE
        },
    ]
]

//Keyboard
bot.onText(new RegExp(`${KEYBOARD_COMMAND}(.*)`), (msg, [source, match]) => {
    const { chat: { id }} = msg

    switch (match) {
        case KEYBOARD_COMMAND_SHOW:
            bot.sendMessage(id, 'Keyboard', {
                reply_markup: {
                    keyboard: [
                        [
                            'Кофе'
                        ],
                        [
                            `${KEYBOARD_COMMAND}${KEYBOARD_COMMAND_HIDE}`
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
            bot.sendMessage(id, 'Наши ТТК:', {
                reply_markup: {
                    inline_keyboard
                }
            })
            break
        default:
            bot.sendMessage(id, 'Invalid parameters')
    }
})

//Inline Keyboard
bot.on('callback_query', query => {
    const { message: { chat, message_id, text } } = query

    switch (query.data) {
        case COMMAND_KOFE:
            bot.sendMessage(chat.id, kofe_disc)
            break
        case COMMAND_RAF:
            bot.sendMessage(chat.id, raf_disc)
            break
        case COMMAND_SHOCOMOL:
            bot.sendMessage(chat.id, shocomol_disc)
            break
        case COMMAND_DOBAVKI:
            bot.sendMessage(chat.id, dobavki_disc)
            break
        case COMMAND_POLUFABR:
            bot.sendMessage(chat.id, polufabr_disc)
            break
        case COMMAND_SEZONNOE:
            bot.sendMessage(chat.id, sezonnoe_disc)
            break
        // case COMMAND_FORWARD:
        //     bot.forwardMessage(chat.id, chat.id, message_id)
        //     break
        // case COMMAND_REPLY:
        //     bot.sendMessage(chat.id, 'Reply to a message', {
        //         reply_to_message_id: message_id
        //     })
        //     break
        // case COMMAND_EDIT:
        //     bot.editMessageText(`${text} (edited)`, {
        //         chat_id: chat.id,
        //         message_id: message_id,
        //         reply_markup: {
        //             inline_keyboard
        //         }
        //     })
        //     break
        // case COMMAND_DELETE:
        //     bot.deleteMessage(chat.id, message_id)
        //     break
    }
    bot.answerCallbackQuery({ callback_query_id: query.id })
})