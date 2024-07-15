(function () {
    'use strict'

    const API_URL = 'https://speoovq9o2.execute-api.us-east-1.amazonaws.com';

    function validateEmail(email) {
        const matched = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        return Boolean(matched)
    }

    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('subscriber-email');
    const message = document.getElementById('subscribe-message');

    document.getElementById('subscribe-btn').addEventListener('click', async function (e) {
        let isValid = validateEmail(emailInput.value);

        if (!isValid) {
            // display status message to user
            message.classList.add('text-danger');
            message.classList.remove('text-success');
            message.innerHTML = 'Failed to subscribe';
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            return;
        }

        const email = emailInput.value;

        const response = await fetch(
            API_URL + '/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email
            })
        });

        if (!response.ok) {
            // display status message to user
            message.classList.add('text-danger');
            message.classList.remove('text-success');
            message.innerHTML = 'Failed to subscribe';
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            return;
        }

        const json = await response.json();
        console.log(json);

        // display status message to user
        message.classList.remove('text-danger');
        message.classList.add('text-success');
        message.innerHTML = 'Successfully subscribed!';
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');

    }, false);

    document.getElementById('unsubscribe-btn').addEventListener('click', async function (e) {
        let isValid = validateEmail(emailInput.value);

        if (!isValid) {
            // display status message to user
            message.classList.add('text-danger');
            message.classList.remove('text-success');
            message.innerHTML = 'Failed to unsubscribe. Please contact email listed at the bottom of the <a href="privacy.html">Privacy Policy</a> for assistance.';
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            return;
        }

        const email = emailInput.value;

        const response = await fetch(
            API_URL + '/subscribe', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email
            })
        });


        if (!response.ok) {
            // display status message to user
            message.classList.add('text-danger');
            message.classList.remove('text-success');
            message.innerHTML = 'Failed to unsubscribe. Please contact email listed at the bottom of the <a href="privacy.html">Privacy Policy</a> for assistance.';
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            return;
        }

        const json = await response.json();
        console.log(json);

        // display status message to user
        message.classList.remove('text-danger');
        message.classList.add('text-success');
        message.innerHTML = 'Successfully unsubscribed';
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
    }, false);
})()