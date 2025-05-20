import type { Actions } from './$types';
import { STRAPI_TOKEN } from '$env/static/private';

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
                    data: {
                        name,
                        email,
                        message
                    }
                })
            });            

			if (!res.ok) {
				console.error('Erreur Strapi :', await res.text());
				return {
					form: {
						formStatus: "Une erreur s'est produite lors de l'envoi du message."
					}
				};
			}
		} catch (error) {
			console.error('Erreur réseau vers Strapi :', error);
			return {
				form: {
					formStatus: "Impossible de contacter le serveur. Veuillez réessayer plus tard."
				}
			};
		}

		return {
			form: {
				formStatus: 'Merci pour votre message !'
			}
		};
	}
};