import { error } from '@sveltejs/kit';

export const actions = {
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users2').requestPasswordReset(body.email);
			return {
				success: true
			};
		} catch (err) {
			console.log(err);
			throw error(500, 'Something Wrong');
		}
	}
};
