import { CosmosClient } from '@azure/cosmos';
import {
	AZURE_COSMOS_ENDPOINT,
	AZURE_COSMOS_KEY,
	AZURE_COSMOS_DATABASE
} from '$env/static/private';

// Initialize the CosmosClient
const client = new CosmosClient({
	endpoint: AZURE_COSMOS_ENDPOINT,
	key: AZURE_COSMOS_KEY,
	userAgentSuffix: 'CosmosDBJavascriptQuickstart'
});

// Define database and container names
const databaseId = AZURE_COSMOS_DATABASE;

// Get a reference to the database
const database = client.database(databaseId);

// Get a reference to the container
const chatsContainer = database.container('chats');
const messagesContainer = database.container('messages');
const attachmentsContainer = database.container('attachments');

export { client, database, chatsContainer, messagesContainer, attachmentsContainer };

/**
 * Create the database if it does not exist
 */
async function createDatabase() {
	const { database } = await client.databases.createIfNotExists({
		id: databaseId
	});
	console.log(`Created database:\n${database.id}\n`);
}

/**
 * Create the container if it does not exist
 */
async function createContainer(containerId: string) {
	const { container } = await client
		.database(databaseId)
		.containers.createIfNotExists({ id: containerId, partitionKey: '/userid' });
	console.log(`Created container:\n${container.id}\n`);
}

/**
 * Create the database and container if they do not exist
 */
export async function seed() {
	await createDatabase();
	await createContainer('chats');
	await createContainer('messages');
	await createContainer('attachments');
}
