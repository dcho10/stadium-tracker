const models = require("../models");
const db = require("../config/connection");

// Clean the database of any data that was added in and not part of the original seeds and re-seed the database
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
