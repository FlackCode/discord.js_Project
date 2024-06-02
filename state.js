let messageId = null
let endedPolls = new Set()
let currentPage = 1

module.exports = {
    getMessageId: () => messageId,
    setMessageId: (id) => { messageId = id },
    isPollEnded: (id) => endedPolls.has(id),
    endPoll: (id) => { endedPolls.add(id) },
    getCurrentPage: () => currentPage,
    setCurrentPage: (page) => { currentPage = page }
}
