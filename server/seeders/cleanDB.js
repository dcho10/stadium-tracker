const models = require("../models");
const db = require("../config/connection");

module.exports = async (modelName, collectionName) => {
    try {
        if (!models[modelName]) {
            throw new Error(`Model ${modelName} does not exist.`);
        }

        let collectionExists = await db.db.listCollections({ name: collectionName }).toArray();
        
        if (collectionExists.length) {
            await db.db.dropCollection(collectionName);
            console.log(`Collection ${collectionName} dropped successfully.`);
        } else {
            console.log(`Collection ${collectionName} does not exist.`);
        }
    } catch (err) {
        throw err;
    }
}
