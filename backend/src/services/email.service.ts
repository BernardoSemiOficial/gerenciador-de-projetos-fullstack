import { PathOrFileDescriptor, readFileSync } from "fs";
import path from "path";
import { ServerError } from "../errors/server-error";
import { libraries } from "../libraries";
import { EmailTemplates } from "../models/email-templates";

const mailer = libraries.mailer;

export class EmailService {
  private static readonly basePathTemplates = "src/templates/emails/";

  private static createTransporter = async () => {
    const account = await mailer.createTestAccount();
    const transporter = mailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    return transporter;
  };

  private static renderTemplate(
    filePath: PathOrFileDescriptor,
    variables: Record<string, string>
  ) {
    // Ler o arquivo HTML
    const template = readFileSync(filePath, "utf-8");
    // Substituir as variáveis no formato ${nomeDaVariavel}
    const html = template.replace(/\$\{(\w+)\}/g, (match, key) => {
      return variables[key] || "";
    });
    return html;
  }

  public static async sendEmail(
    templateName: EmailTemplates,
    to: { address: string; name: string } | string,
    variables: Record<string, string>
  ) {
    // const template = fs.readFileSync(this.basePathTemplates + templateName);
    try {
      const filePath = path.join(this.basePathTemplates, templateName);
      const template = this.renderTemplate(filePath, variables);
      const transporter = await this.createTransporter();
      const info = await transporter.sendMail({
        from: {
          address: "gerenciador-de-projetos@gmail.com",
          name: "Gerenciador de Projetos",
        },
        to,
        html: template,
      });

      console.log(mailer.getTestMessageUrl(info));
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }
}
