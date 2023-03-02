<template>
	<v-app>

		<Header />

		<v-main>
			<keep-alive>
				<router-view />
			</keep-alive>
		</v-main>

	</v-app>
</template>

<script>
import Header from './components/blocks/header.vue'

export default {
	name: 'App',

	components: {
		Header
	}

}
</script>


