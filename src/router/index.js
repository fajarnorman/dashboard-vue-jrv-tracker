import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { CHECK_AUTH } from "@/store/actions.type"

import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import middlewarePipeline from '@/middleware/middlewarePipeline'

Vue.use(Router)

const router = new Router({
	base: '/',
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: () => import("@/pages/dashboard"),
			meta: {
				middleware: [ auth ]
			}
		}
	]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
	}

    const middleware = to.meta.middleware
	const context = { to, from, next, store }

	Promise.all([store.dispatch(CHECK_AUTH)]).then(next)

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
