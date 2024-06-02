let messageId = null

module.exports = {
    getMessageId: () => messageId,
    setMessageId: (id) => { messageId = id }
}
