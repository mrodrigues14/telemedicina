import puppeteer, { Cookie } from "puppeteer";

export default async function handler(req: { method: string; body: { cpf: any; dataNascimento: any; nome: any }; cookies: { session: never[]; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; cookies?: Cookie[]; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { cpf, dataNascimento, nome } = req.body;
  if (!cpf || !dataNascimento) {
    return res.status(400).json({ error: "CPF e Data de Nascimento são obrigatórios" });
  }

  // Formatando a data de nascimento para dd/mm/yyyy
  const formatDate = (date: string) => {
    return date.split('-').reverse().join('/');
  };
  
  const formattedDataNascimento = formatDate(dataNascimento);
  const email = "rmatheus440@gmail.com";
  const phoneNumber = "61996512722";
  const motivo = "Consulta de rotina e acompanhamento médico.";

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();

    // Habilita o armazenamento de cookies e cache
    await client.send("Network.enable");
    await client.send("Network.setCacheDisabled", { cacheDisabled: false });

    // Carrega os cookies se já existirem
    const cookies = req.cookies.session || [];
    if (cookies.length) {
      await page.setCookie(...cookies);
    }

    await page.goto("https://sulamericavida.docway.com.br/", { waitUntil: "networkidle2" });

    // Simula a digitação do CPF
    await page.waitForSelector("#cpfInput", { visible: true });
    for (const char of cpf) {
      await page.type("#cpfInput", char, { delay: 100 });
    }

    // Simula a digitação da Data de Nascimento formatada
    await page.waitForSelector("#dataNascimentoTitular", { visible: true });
    for (const char of formattedDataNascimento) {
      await page.type("#dataNascimentoTitular", char, { delay: 50 });
    }

    // Clicando no botão "Validar Dados"
    const validarButtonSelector = "#btn-validar";
    await page.waitForSelector(validarButtonSelector, { visible: true });
    await page.click(validarButtonSelector);

    await page.waitForFunction(() => {
      const activeItem = document.querySelector(".carousel-item.active");
      return activeItem && activeItem.querySelector("#btn-agendar");
    }, { timeout: 5000 });

    await page.waitForSelector("#btn-agendar", { visible: true });
    await page.click("#btn-agendar");

    // Aguardar a próxima tela carregar
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    
    // Clicando no botão "ACEITO E QUERO CONTINUAR"
    const continuarButtonSelector = "button.button-next";
    await page.waitForSelector(continuarButtonSelector, { visible: true });
    await page.click(continuarButtonSelector);

    // Aguardar a próxima tela carregar
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    
    // Selecionando o checkbox correspondente ao nome recebido na request
    const checkboxes = await page.$$("label.checkbox-container");
    for (const checkbox of checkboxes) {
      const text = await page.evaluate(el => el.textContent ? el.textContent.trim() : '', checkbox);
      if (text.includes(nome)) {
        await checkbox.click();
        break;
      }
    }

    // Clicando no botão de submissão
    const submitButtonSelector = "button.button-next";
    await page.waitForSelector(submitButtonSelector, { visible: true });
    await page.click(submitButtonSelector);


    await page.waitForSelector("#input-email", { visible: true });
    await page.type("#input-email", email, { delay: 100 });
    
    // Preencher telefone
    await page.waitForSelector("#input-phone", { visible: true });
    await page.type("#input-phone", phoneNumber, { delay: 100 });

    // Clicar na seta para continuar
    const submitButtonSelector2 = "button.button-next";
    await page.waitForSelector(submitButtonSelector2, { visible: true });
    await page.click(submitButtonSelector2);


    await page.waitForSelector("#input-reason", { visible: true });
    await page.type("#input-reason", motivo, { delay: 100 });
    
    // Clicar no botão para finalizar
    const finalizarButtonSelector = "#btnRequest";
    await page.waitForSelector(finalizarButtonSelector, { visible: true });
    await page.click(finalizarButtonSelector);

    const debugBrowser = await puppeteer.launch({ headless: false });
    const debugPage = await debugBrowser.newPage();
    await debugPage.goto(page.url());  // Mantém a sessão na página atual
    const newCookies = await page.cookies();
    res.setHeader("Set-Cookie", newCookies.map(cookie => `${cookie.name}=${cookie.value}; Path=/; HttpOnly`).join("; "));

    console.log("✅ Validação Bem-Sucedida!");
    return res.status(200).json({ message: "Validação bem-sucedida", cookies: newCookies });
  } catch (error) {
    console.error("Erro na validação", error);
    return res.status(500).json({ error: "Erro ao validar os dados" });
  }
}
