import path from "path"
import fs from 'fs'
import handlebar from 'handlebars'

export const renderTemplate = async (template: string, data: Record<string, any>): Promise<string> => {
    const templatePath = path.join(__dirname, '../mails/templates', `${template}.hbs`);
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
    }
    const templateContent = await fs.promises.readFile(templatePath, { encoding: "utf-8" });
    const compiledTemplate = handlebar.compile(templateContent);
    return compiledTemplate(data);
}