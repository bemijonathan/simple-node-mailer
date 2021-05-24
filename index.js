module.exports.hello = (data) => {
    return JSON.stringify(data)
}

/**
 * Mailer Class
 */
class Mailer {

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

        this.from = from;
        this.username = username;
        this.password = password;
        this.preview = preview;
        this.provider = provider;

    }

    /**
     * 
     * @returns {*} a new Email Object
     */
    createEmailPayload = () => {
        try {
            const email = new Email({
                message: {
                    from: this.from
                },
                send: true,
                transport: {
                    service: this.provider.service,
                    host: this.provider.host,
                    auth: {
                        user: this.username,
                        pass: this.password
                    }
                },
                views: {
                    options: {
                        extension: 'ejs'
                    }
                },
                preview: preview || process.env.NODE_ENV ? false : true
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
     * @param {function (*, boolean) } callback that retunrns a boolean and details of the mail
     */
    sendEmail = ({ to, data, template }, callback) => {
        Promise.all(
            [...to.map(
                (element, i) => {
                    this.createEmailPayload()
                        .send({
                            template,
                            message: {
                                to: element,
                            },
                            locals: data[i]
                        })
                        .then(e => {
                            return callback(e, true)
                        })
                        .catch(e => {
                            return callback(e, false)
                        })
                }
            )])
    }
}

module.exports.mailer = Mailer



// const x = new Mailer(forgotPasswordMail = async (email, token) => {
//     let mailOptions = createEmailPayload()
//     sendEmail({
//         mailOptions,
//         to: [email],
//         data: [{ token }],
//         template: 'forgotpassword'
//     }, (response) => {
//         // console.log(chalk.yellow.bold(response, email))
//         return response;
//     })
// }"bemijonathan", 'bemijonathan', 'wertertewrt', { service: 'gmail', host: 'smtp.gmail.com' }, false)