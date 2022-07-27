import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: 'useutxvp',
	dataset: 'production',
	apiVersion: '2022-07-25',
	token: 'skqkZk4I6fDorVN74HGn05pYq8mwlGttM4w6GzjO4o8kfPlZSJLRhvIsZbLk7s3v6kvFetLmcoxAPvmoN52CuNjwt4mKeaao2RyZ6rKXt6nYhggzcoa5e1b8KLJNZAFyCrtkHJaRiib78CRmehtY0eDXu9ptlsxOoBTSeTdYNhKBw8DSkQJ7',
	useCdn: false,
});