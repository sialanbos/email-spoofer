const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

const spoof = (sender, header, message, sendTo) => new Promise((resolve, reject) => {

    fetch('https://server-faquetool.000webhostapp.com/resources/send.php', {
        method: 'POST',
        headers: {
            'authority': 'server-faquetool.000webhostapp.com',
            'cache-control': 'max-age=0',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'upgrade-insecure-requests': '1',
            'origin': 'https://server-faquetool.000webhostapp.com',
            'content-type': 'application/x-www-form-urlencoded',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://server-faquetool.000webhostapp.com/',
            'accept-language': 'en-US,en;q=0.9'
        },
        body: `remitente=${sender}&asunto=${header}&mensaje=${message}&destinatario=${sendTo}`
    })
    .then(res => res.text())
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
});

(async () => {

    console.log(`
███████╗███╗   ███╗ █████╗ ██╗██╗         ███████╗██████╗  ██████╗  ██████╗ ███████╗███████╗██████╗ 
██╔════╝████╗ ████║██╔══██╗██║██║         ██╔════╝██╔══██╗██╔═══██╗██╔═══██╗██╔════╝██╔════╝██╔══██╗
█████╗  ██╔████╔██║███████║██║██║         ███████╗██████╔╝██║   ██║██║   ██║█████╗  █████╗  ██████╔╝
██╔══╝  ██║╚██╔╝██║██╔══██║██║██║         ╚════██║██╔═══╝ ██║   ██║██║   ██║██╔══╝  ██╔══╝  ██╔══██╗
███████╗██║ ╚═╝ ██║██║  ██║██║███████╗    ███████║██║     ╚██████╔╝╚██████╔╝██║     ███████╗██║  ██║
╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚══════╝╚═╝      ╚═════╝  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝                                                                                                            
    `);

    while (true) {

        const sender = readlineSync.question(chalk.blueBright('[+] Email Sender : '));
        const header = readlineSync.question(chalk.blueBright('[+] Email Header : '));
        const message = readlineSync.question(chalk.blueBright('[+] Message : '));
        const sendTo = readlineSync.question(chalk.blueBright('[+] Send To : '));
        console.log('');
        const resultSpoof = await spoof(sender, header, message, sendTo);
        const resultNew = `'${resultSpoof}'`
        const resultJSON = resultNew.split(' ')[1];

        if (resultJSON == 'enviado') {
            console.log(chalk.greenBright(`[+] Success sent to ${sendTo}\n`));
        } else {
            console.log(chalk.redBright('[+] Something wrong !\n'));
        }
    
    }

})();