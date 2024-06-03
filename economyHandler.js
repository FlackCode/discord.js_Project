const fs = require('node:fs/promises')
const path = require('node:path')

module.exports = {
    getDbFiles: async () => {
        const storagePath = path.join(__dirname, './storage')
        const economyFile = 'economy.json'
        const filePath = path.join(storagePath, economyFile)
        const economyData = await fs.readFile(filePath)
        const parsedData = economyData.length ? JSON.parse(economyData) : []

        return parsedData
    },
    saveDbFiles : async (data) => {
        const storagePath = path.join(__dirname, './storage')
        const economyFile = 'economy.json'
        const filePath = path.join(storagePath, economyFile)
        await fs.writeFile(filePath, JSON.stringify(data, null, 4))
    }
}