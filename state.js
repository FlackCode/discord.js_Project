let messageId = null
let endedPolls = new Set()

module.exports = {
    getMessageId: () => messageId,
    setMessageId: (id) => { messageId = id },
    isPollEnded: (id) => endedPolls.has(id),
    endPoll: (id) => { endedPolls.add(id) }
}
