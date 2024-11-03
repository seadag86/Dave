import {
	AZURE_OPENAI_API_KEY,
	AZURE_OPENAI_ENDPOINT,
	AZURE_OPENAI_DEPLOYMENT
} from '$env/static/private';
import { AzureOpenAI } from 'openai';

// Required Azure OpenAI deployment name and API version
const apiVersion = '2024-10-01-preview';
const deploymentName = AZURE_OPENAI_DEPLOYMENT; //This must match your deployment name.

export const client = new AzureOpenAI({
	endpoint: AZURE_OPENAI_ENDPOINT,
	apiKey: AZURE_OPENAI_API_KEY,
	apiVersion,
	deployment: deploymentName
});
