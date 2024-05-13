// CharacterAI.js
const CharacterAI = require("node_characterai");

class CharacterAIClient {
    constructor() {
        this.characterAI = new CharacterAI();
        this.chatInstance = null;
    }

    async authenticateWithToken(token) {
        // Authenticate with token
        await this.characterAI.authenticateWithToken(token);
    }

    async createChat(characterId) {
        // Create or continue chat
        this.chatInstance = await this.characterAI.createOrContinueChat(characterId);
    }

    async sendMessageToAI(message) {
        if (!this.chatInstance) {
            throw new Error("Chat instance not created. Please call createChat() first.");
        }
        const response = await this.chatInstance.sendAndAwaitResponse(message, true);
        return response.text;
    }
}

module.exports = CharacterAIClient;
