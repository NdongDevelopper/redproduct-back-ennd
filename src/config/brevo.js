const brevo = require('@getbrevo/brevo');

// Initialisation client
const defaultClient = brevo.ApiClient.instance;

// Config API key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Instance email API
const apiInstance = new brevo.TransactionalEmailsApi();

module.exports = apiInstance;