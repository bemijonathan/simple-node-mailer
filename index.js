const Email = require('email-templates');


/**
 * Mailer Class
 */
class Mailer {

    #from;
    #username;
    #password;
    #preview;
    #provider;

    /**
     * Creates a New Mailer Instance
     * @constructor
     * @param {String} from - example email (john@gmail.com)
     * @param {String} username - email username
     * @param {String} password - email password (*******) - desktop Password
     * @param {Object} provider - The Provider Objects
     * @param {string} provider.service - The name of the employee.
     * @param {string} provider.host - e.g gmail.com
     * @param {Boolean} [preview = true] would you like to preview your email on the browser
     */
    constructor(from, username, password, provider, preview) {

        console.log(arguments[3])
        if (arguments.length < 4) {
            throw new Error('expected 4 or more arguments but got ' + arguments.length);
        }

        if (!arguments[3].service.length) {
            throw new Error('service provider is required');
        }

        if (!arguments[3].host.length) {
            throw new Error('host is required');
        }

        this.#from = from;
        this.#username = username;
        this.#password = password;
        this.#preview = preview;
        this.#provider = provider;
        this.Email = Email

    }

    /**
     * 
     * @returns {*} a new Email Object
     */
    #createEmailPayload = () => {
        try {
            const email = new Email({
                message: {
                    from: this.#from
                },
                send: true,
                transport: {
                    service: this.#provider.service,
                    host: this.#provider.host,
                    auth: {
                        user: this.#username,
                        pass: this.#password
                    }
                },
                views: {
                    options: {
                        extension: 'ejs'
                    }
                },
                preview: this.#preview !== undefined ? this.#preview : process.env.NODE_ENV ? false : true
            })
            return email
        } catch (error) {
            throw new Error(error)
        }
    }


    /**
     * 
     * @param {Object} details details of the payload you want to send
     * @param {String[]} details.to 
     * @param {Array.<Object>} details.data data you want to send to the recieveer
     * @param {String} details.template name of the template folder
     * @param {function (Array.<Object>) } callback that returns an array of details of the mail
     */
    sendmails = async ({ to, data, template }, callback) => {
        await Promise.all(
            to.map(
                (element, i) => {
                    return this.#createEmailPayload()
                        .send({
                            template,
                            message: {
                                to: element,
                            },
                            locals: data[i]
                        })

                }
            )).then( (e) => {
                return callback(e);
            })
    }
}

module.exports = Mailer





// const x = new Mailer(
//     // gmail user name
//     process.env.email_username + 'gmail.com',
//     process.env.email_username,
//     process.env.email_password,
//     { service: 'gmail', host: 'smtp.gmail.com' },
//     false // to enable preview
// )

/**
 * send to as many as your  customers as you wish
 */
// x.sendmails({
//     to: ['john@gmail.com', '---------@gmail.com'],
//     data: [{
//         name: "john",
//         address: "40 london Avenue, Canada"
//     },
//     {
//         name: "Samuel",
//         address: "47 london Avenue, Canada"
//     }],
//     //the name of the template on you root folder
//     template: 'welcome_email'
// }, logOutput)


// function logOutput(output) {
//     console.log(output, "this is the real value of this project")
// }
