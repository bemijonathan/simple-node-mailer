## Simple Node mailer 

### This package is a simple wrapper around the [email-templates package](https://www.npmjs.com/package/email-templates) this give a quick abstraction and help you send emails from your node js application with gmail to see more properties other than basic email sending please use the library above.



## Install 

``` $ npm i --s simple-node-mailer ```

## Usage 

Create a folder in the root of your application called emails create a sub-folder which takes the name of the email template you would love to send.

then create two files `html.ejs` which represents the body of the mail and `subject.ejs` which will be the subject of the mail.

As such you have this file structure when you are done.

```
📦src
📦emails
 ┣ 📂forgot_password
 ┃ ┣ 📜html.ejs
 ┃ ┗ 📜subject.ejs
 ┗ 📂welcome_email
   ┣ 📜html.ejs
   ┗ 📜subject.ejs
```


## Examples

For using your gmail account in sending mails follow this steps

    - first turn on 2fa on your gmail account.
    - https://www.google.com/landing/2step/
    - Create a google mail app password.
    - https://security.google.com/settings/security/apppasswords

```js 

const SimpleMailer = require('simple-node-mailer-viewer');


// if you want to use gmail
// set you email credentials in your environment variables.

const x = new SimpleMailer(
    // gmail credentials
    process.env.email_username + 'gmail.com',
    process.env.email_username,
    process.env.email_password,
    { service: 'gmail', host: 'smtp.gmail.com' },
    false // to enable preview
)

/**
 * send to as many as your  customers as you wish
 */
x.sendmails({
    to: ['john@gmail.com'],
    data: [{
        name: "john",
        address: "40 london Avenue, Canada"
    }],
    //the name of the template on you root folder
    template: 'welcome_email'
}, console.log)


```


## Api