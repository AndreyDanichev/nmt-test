<template>
	<v-app-bar app color="primary" dark>
		<div>
			<router-link to="/" class="d-flex align-center">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
				<v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
			</router-link>
		</div>

		<v-spacer />

		<router-link to="/cart">
			<v-btn text>
				<v-icon>mdi-cart-arrow-down</v-icon>
				{{ cart ? JSON.parse(cart).length : 0 }}
			</v-btn>
		</router-link>
	</v-app-bar>
</template>

<script>
import { bus } from '../../main'

export default {
	name: 'header-block',
	data() {
		return {
			cart: localStorage.getItem('cart') || undefined
		}
	},
	created() {
		bus.$on('changeCart', () => {
			this.cart = localStorage.getItem('cart')
		})
	}
}
</script>