export default function auth ({ next, store }) {
	if(!store.getters.isAutenticated){
		return next({
			name : 'login'
		})
	}

	return next()
}
