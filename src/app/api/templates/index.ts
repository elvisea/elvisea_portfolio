import { FormData } from "../types";

import { colors } from "../constants";

import { env } from "@/lib/env";

// Template de email para o recrutador/empresa
const getCompanyEmailTemplate = (data: FormData) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6; 
          color: ${colors.text.primary}; 
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
        }
        .container { 
          max-width: 600px; 
          margin: 20px auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(to right, ${colors.primary}, ${colors.primaryLight});
          color: white;
          padding: 24px 8px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content { 
          padding: 24px 8px;
          background: white;
        }
        .info-group {
          margin-bottom: 24px;
          padding: 20px;
          background: ${colors.secondary};
          border-radius: 8px;
        }
        .info-item { 
          margin: 12px 0;
          display: flex;
          align-items: flex-start;
        }
        .label { 
          font-weight: 600;
          color: ${colors.accent};
          width: 140px;
          flex-shrink: 0;
        }
        .value {
          color: ${colors.text.secondary};
        }
        .footer { 
          text-align: center;
          padding: 24px;
          background: ${colors.secondary};
          color: ${colors.text.light};
          font-size: 14px;
        }
        .divider {
          height: 1px;
          background: ${colors.border};
          margin: 24px 0;
        }
        @media (min-width: 640px) {
          .container {
            margin: 40px auto;
          }
          .header {
            padding: 32px;
          }
          .content {
            padding: 32px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Nova Proposta de Trabalho</h2>
        </div>
        <div class="content">
          <div class="info-group">
            <h3 style="margin-top: 0; color: ${colors.text.primary}">Informações do Recrutador</h3>
            <div class="info-item">
              <span class="label">Nome:</span>
              <span class="value">${data.name}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            <div class="info-item">
              <span class="label">Telefone:</span>
              <span class="value">${data.phone || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="label">Empresa:</span>
              <span class="value">${data.company || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="label">LinkedIn:</span>
              <span class="value">${data.linkedinProfile || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="label">Contato Preferido:</span>
              <span class="value">${data.contactPreference}</span>
            </div>
          </div>

          <div class="info-group">
            <h3 style="margin-top: 0; color: ${colors.text.primary}">Detalhes da Oportunidade</h3>
            <div class="info-item">
              <span class="label">Cargo/Função:</span>
              <span class="value">${data.role}</span>
            </div>
            <div class="info-item">
              <span class="label">Tipo de Contratação:</span>
              <span class="value">${data.jobType}</span>
            </div>
            <div class="info-item">
              <span class="label">Modelo de Trabalho:</span>
              <span class="value">${data.workModel}</span>
            </div>
            <div class="info-item">
              <span class="label">Localização:</span>
              <span class="value">${data.location || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="label">Nível de Experiência:</span>
              <span class="value">${data.experienceLevel}</span>
            </div>
            <div class="info-item">
              <span class="label">Faixa Salarial:</span>
              <span class="value">${data.salaryRange || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="label">Data de Início:</span>
              <span class="value">${data.startDate}</span>
            </div>
          </div>

          <div class="info-group">
            <h3 style="margin-top: 0; color: ${colors.text.primary}">Tecnologias Requeridas</h3>
            <p style="color: ${colors.text.secondary}; margin: 0;">${data.technologies || "Não informado"}</p>
          </div>

          <div class="info-group">
            <h3 style="margin-top: 0; color: ${colors.text.primary}">Benefícios/Vantagens</h3>
            <p style="color: ${colors.text.secondary}; margin: 0;">${data.benefits || "Não informado"}</p>
          </div>

          <div class="info-group">
            <h3 style="margin-top: 0; color: ${colors.text.primary}">Descrição da Vaga</h3>
            <p style="color: ${colors.text.secondary}; margin: 0;">${data.description}</p>
          </div>
        </div>
        <div class="footer">
          <strong>${env.NEXT_PUBLIC_CREATOR_NAME}</strong><br>
          Desenvolvedor Full-Stack
        </div>
      </div>
    </body>
  </html>
`;

// Template de email para o cliente (confirmação de recebimento)
const getClientEmailTemplate = (data: FormData) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6; 
          color: ${colors.text.primary}; 
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
        }
        .container { 
          max-width: 600px; 
          margin: 20px auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(to right, ${colors.primary}, ${colors.primaryLight});
          color: white;
          padding: 24px 8px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content { 
          padding: 24px 8px;
          background: white;
        }
        .thank-you {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
          color: ${colors.text.primary};
        }
        .next-steps {
          background: ${colors.secondary};
          padding: 24px;
          border-radius: 8px;
          margin: 24px 0;
        }
        .next-steps h3 {
          color: ${colors.accent};
          margin-top: 0;
        }
        .next-steps p {
          margin: 8px 0;
          color: ${colors.text.secondary};
        }
        .job-summary {
          background: ${colors.secondary};
          padding: 24px;
          border-radius: 8px;
          margin: 24px 0;
        }
        .job-summary h3 {
          color: ${colors.accent};
          margin-top: 0;
        }
        .job-summary p {
          margin: 8px 0;
          color: ${colors.text.secondary};
        }
        .contact-info {
          background: ${colors.secondary};
          padding: 24px;
          border-radius: 8px;
          margin-top: 24px;
        }
        .contact-info h3 {
          color: ${colors.accent};
          margin-top: 0;
        }
        .contact-method {
          display: flex;
          align-items: center;
          margin: 12px 0;
          color: ${colors.text.secondary};
        }
        .footer { 
          text-align: center;
          padding: 24px;
          background: ${colors.secondary};
          color: ${colors.text.light};
          font-size: 14px;
        }
        @media (min-width: 640px) {
          .container {
            margin: 40px auto;
          }
          .header {
            padding: 32px;
          }
          .content {
            padding: 32px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Proposta Recebida com Sucesso!</h2>
        </div>
        <div class="content">
          <p class="thank-you">Olá ${data.name},</p>
          
          <p>Obrigado por compartilhar sua oportunidade profissional! Recebi sua proposta para a vaga de <strong>${data.role}</strong> e estou muito interessado em conhecer mais detalhes.</p>
          
          <div class="next-steps">
            <h3>Próximos Passos</h3>
            <p>✓ Analisarei sua proposta cuidadosamente</p>
            <p>✓ Entrarei em contato via ${data.contactPreference} em até 48 horas</p>
            <p>✓ Poderemos agendar uma conversa para discutir os detalhes da oportunidade</p>
          </div>

          <div class="job-summary">
            <h3>Resumo da Vaga</h3>
            <p><strong>Cargo:</strong> ${data.role}</p>
            <p><strong>Empresa:</strong> ${data.company}</p>
            <p><strong>Modelo:</strong> ${data.workModel} (${data.jobType})</p>
          </div>
          
          <div class="contact-info">
            <h3>Meus Contatos</h3>
            <div class="contact-method">
              📧  Email: ${env.EMAIL_CONTACT || "contato@bytefulcode.tech"}
            </div>
            <div class="contact-method">
              📱 WhatsApp: ${env.PHONE_NUMBER || "(41) 99219-0528"}
            </div>
            <div class="contact-method">
              🔗 LinkedIn: <a href="${env.NEXT_PUBLIC_LINKEDIN_URL || "#"}">Perfil no LinkedIn</a>
            </div>
          </div>
        </div>
        <div class="footer">
          <strong>${env.NEXT_PUBLIC_CREATOR_NAME}</strong><br>
          Desenvolvedor Full-Stack
        </div>
      </div>
    </body>
  </html>
`;

export { getClientEmailTemplate, getCompanyEmailTemplate };
