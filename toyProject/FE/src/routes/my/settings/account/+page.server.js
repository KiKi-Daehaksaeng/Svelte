import { error } from '@sveltejs/kit';

export const actions = {
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		console.log(locals);
		try {
			await locals.pb.collection('users2').requestEmailChange(data.email);
		} catch (err) {
			console.log(err.response);
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users2').getFirstListItem(`username = "${data.username}"`);
		} catch (err) {
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users2')
						.update(locals.user.id, { username: data.username });
					locals.user.username = username;
					return {
						success: true
					};
				} catch (err) {
					console.log(err);
					throw error(err.status, err.message);
				}
			}
			console.log(err);
			throw (err.status, err.message);
		}
	}
};
