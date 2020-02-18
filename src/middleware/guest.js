export default function guest ({ next, store }) {
	if(store.getters.isAutenticated){
		return next({
			name : 'dashboard'
		})
	}

	return next()
}
