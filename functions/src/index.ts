import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// https://us-central1-flic-78b6d.cloudfunctions.net
export const flicRequest = functions.https.onRequest((req: ButtonRequest, res) => {

    if (req.method !== HTTPMethod.POST)
        res.status(400).send('POST request expected')

    if (typeof req.body.button === 'undefined')
        res.status(400).send('Request body must contain "button" field')

    if (typeof req.body.button !== 'number')
        res.status(400).send('"button" field must be a number')

    if (typeof req.body.mode === 'undefined')
        res.status(400).send('Request body must contain "mode" field')

    if (typeof req.body.mode !== 'number')
        res.status(400).send('"mode" field must be a number')

    return admin.firestore().collection('commands').add({
        button: req.body.button,
        mode: req.body.mode,
        timestamp: Date.now()
    }).then(() => res.send())
    .catch(() => res.status(500).send('Server Error: unable to record the command'))
})

interface ButtonRequest  {
    method: string
    body: {
        button: number
        mode: number
    }
}

enum HTTPMethod {
    GET = "GET",
    PUT = "PUT",
    POST =  "POST",
    DELETE = "DELETE"
}