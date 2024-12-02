const Certificate = require("../models/Certificate");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const logoPath = path.join(__dirname, "../logo.png");

// Configuração do transporte do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendCertificates = async (req, res) => {
  const { users, eventId, eventName, eventDuration } = req.body;

  if (!users || !eventId || !eventName || !eventDuration) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios estão faltando!" });
  }

  const errors = [];
  const successes = [];

  try {
    for (const { userId, email, userName } of users) {
      if (!userId || !email || !userName) {
        const error = `Dados incompletos para o usuário: ${JSON.stringify({
          userId,
          email,
          userName,
        })}`;
        console.log(error);
        errors.push({ userId, email, message: error });
        continue;
      }

      try {
        // Gerar o PDF
        const pdfPath = path.join(
          __dirname,
          "../certificates",
          `certificate_${userId}_${eventId}.pdf`
        );
        const doc = new PDFDocument({
          size: "A4",
          layout: "landscape",
        });

        doc.pipe(fs.createWriteStream(pdfPath));

        // Tamanho do documento (A4 em paisagem)
        const pageWidth = 842;
        const pageHeight = 595;

        try {
          // Lê a imagem como buffer
          const logoBuffer = fs.readFileSync(logoPath);

          const imageWidth = 150;
          const imageX = (pageWidth - imageWidth) / 2;
          const imageY = 50;

          // Adicione a imagem ao documento
          doc.image(logoBuffer, imageX, imageY, { width: imageWidth });

          // Espaçamento ajustado após a imagem
          const textY = imageY + 200;

          // Título principal centralizado
          doc
            .fontSize(16)
            .font("Helvetica-Bold")
            .text("CERTIFICADO DE PARTICIPAÇÃO EM EVENTO", 0, textY, {
              align: "center",
              width: pageWidth,
            })
            .moveDown(1.5);

          // Texto do certificado
          doc
            .fontSize(12)
            .font("Helvetica")
            .text(
              `Certificamos que ${userName}, participou com êxito da atividade ${eventName}
          com caraga horaria de ${eventDuration} horas`,
              {
                align: "center",
                width: pageWidth,
              }
            )
            .moveDown(2);

          // Texto da data
          doc
            .fontSize(10)
            .font("Helvetica")
            .text(`Recife,  ${new Date().toLocaleDateString()}`, {
              align: "center",
              width: pageWidth,
            });

          doc.end();
        } catch (error) {
          console.error("Erro ao carregar a imagem:", error.message);
          errors.push({
            userId,
            email,
            message: `Erro ao carregar a imagem: ${error.message}`,
          });
        }

        const certificateUrl = `/certificates/certificate_${userId}_${eventId}.pdf`;

        // Salvar no banco de dados
        await Certificate.create({
          userId,
          userName,
          userEmail: email,
          eventId,
          eventName,
          eventDuration,
          certificateUrl,
          isSent: true,
        });

        // Enviar por e-mail
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Seu Certificado de Participação",
          text: "Segue em anexo o certificado de participação no evento.",
          attachments: [
            {
              filename: `certificate_${userId}_${eventId}.pdf`,
              path: pdfPath,
            },
          ],
        };

        await transporter.sendMail(mailOptions);
        console.log(`Certificado enviado para ${email}`);
        successes.push({ userId, email, message: "Enviado com sucesso." });
      } catch (error) {
        console.error(
          `Erro ao processar ou enviar certificado para ${userName} (${email}):`,
          error.message
        );
        errors.push({
          userId,
          email,
          message: `Erro ao processar ou enviar certificado: ${error.message}`,
        });
      }
    }

    res.status(200).json({
      message: "Processamento concluído.",
      successes,
      errors,
    });
  } catch (error) {
    console.error("Erro ao processar os certificados:", error);
    res.status(500).json({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
};
