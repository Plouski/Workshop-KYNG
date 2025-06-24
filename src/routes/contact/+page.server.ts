import type { Actions } from './$types';
import { STRAPI_TOKEN, MAILJET_API_KEY, MAILJET_API_SECRET, EMAIL_TO_ADDRESS } from '$env/static/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const message = formData.get('message')?.toString();

		if (!name || !email || !message) {
			return {
				form: {
					formStatus: 'Veuillez remplir tous les champs.'
				}
			};
		}

		try {
			const res = await fetch('http://localhost:1337/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${STRAPI_TOKEN}`
				},
				body: JSON.stringify({
					data: { name, email, message }
				})
			});

			if (!res.ok) {
				console.error('Erreur Strapi :', await res.text());
				return {
					form: {
						formStatus: "Erreur lors de l'enregistrement du message."
					}
				};
			}
		} catch (err) {
			console.error('Erreur réseau Strapi :', err);
			return {
				form: {
					formStatus: "Impossible de contacter le serveur Strapi."
				}
			};
		}

		try {
			const res = await fetch('https://api.mailjet.com/v3.1/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Basic ' + btoa(`${MAILJET_API_KEY}:${MAILJET_API_SECRET}`)
				},
				body: JSON.stringify({
					Messages: [
						{
							From: {
								Email: 'no-reply@workshop-kyng.com',
								Name: 'Workshop KYNG'
							},
							To: [
								{
									Email: `${EMAIL_TO_ADDRESS}`,
									Name: 'Contact'
								}
							],
							Subject: `Nouveau message de ${name}`,
							TextPart: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
							HTMLPart: `
								<h3>Nouveau message reçu</h3>
								<p><strong>Nom:</strong> ${name}</p>
								<p><strong>Email:</strong> ${email}</p>
								<p><strong>Message:</strong><br>${message}</p>
							`
						}
					]
				})
			});

			if (!res.ok) {
				console.error('Erreur Mailjet :', await res.text());
				return {
					form: {
						formStatus: "Le message a été enregistré mais l'email n'a pas pu être envoyé."
					}
				};
			}
		} catch (err) {
			console.error('Erreur réseau Mailjet :', err);
			return {
				form: {
					formStatus: "Le message est bien enregistré, mais l'envoi d'email a échoué."
				}
			};
		}

		return {
			form: {
				formStatus: 'Merci ! Votre message a été envoyé et enregistré.'
			}
		};
	}
};
