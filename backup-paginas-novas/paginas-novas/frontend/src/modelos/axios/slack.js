const { IncomingWebhook } = require('@slack/webhook');

// URL do webhook do Slack
const url = process.env.SLACK_WEBHOOK_URL;

// Inicializa o webhook
const webhook = new IncomingWebhook(url);

// Função para enviar mensagem
async function sendSlackMessage(message) {
  try {
    await webhook.send({
      text: message,
    });
    console.log('Mensagem enviada ao Slack com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagem ao Slack:', error);
  }
}

module.exports = { sendSlackMessage };
